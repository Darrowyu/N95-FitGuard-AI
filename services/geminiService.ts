import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, FaceShape, MaskType, Language } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

// 获取 AI 客户端实例
const getAiClient = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error("环境变量中未定义 API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

// 延迟函数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 判断错误是否可重试
const isRetryableError = (error: unknown): boolean => {
  if (error instanceof Error) {
    // 网络错误（无响应、超时等）
    if (error.message.includes('fetch') || 
        error.message.includes('network') ||
        error.message.includes('timeout') ||
        error.message.includes('ECONNREFUSED') ||
        error.message.includes('ETIMEDOUT')) {
      return true;
    }
    
    // 检查是否为 5xx 错误
    const statusMatch = error.message.match(/(\d{3})/);
    if (statusMatch) {
      const statusCode = parseInt(statusMatch[1], 10);
      // 5xx 服务器错误可重试，4xx 客户端错误不重试
      return statusCode >= 500 && statusCode < 600;
    }
  }
  return false;
};

// 分析面部以进行口罩适配
export const analyzeFaceForMaskFit = async (base64Image: string, lang: Language): Promise<AnalysisResult> => {
  const ai = getAiClient();
  
  // 移除 data URL 前缀（支持 png、jpeg、webp 等）
  const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");

  // 根据语言构建提示词
  // 我们要求机器可读字段使用严格的枚举值，但人类可读字段使用本地化的自由文本
  const textPrompt = lang === 'zh'
    ? "分析此面部以进行 N95 呼吸器适配。识别脸型和关键尺寸。请用简体中文提供 'summary'、'sealIssues' 列表和推荐 'reason'。重要提示：保持 'faceShape'、'dimensions' 值（Low、Medium、High 等）和口罩 'type' 为架构中定义的英文枚举值。"
    : "分析此面部以进行 N95 呼吸器适配。识别脸型、鼻梁特征和下巴结构。推荐特定的口罩样式。";

  const maxRetries = 3;
  // 指数退避策略: 1s, 2s, 4s
  const getRetryDelay = (attempt: number): number => 1000 * Math.pow(2, attempt - 1);
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              faceShape: {
                type: Type.STRING,
                enum: Object.values(FaceShape),
                description: "The detected geometric shape of the face.",
              },
              dimensions: {
                type: Type.OBJECT,
                properties: {
                  noseBridgeHeight: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                  chinWidth: { type: Type.STRING, enum: ['Narrow', 'Medium', 'Wide'] },
                  faceWidth: { type: Type.STRING, enum: ['Narrow', 'Medium', 'Wide'] },
                  cheekboneProminence: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                },
                required: ['noseBridgeHeight', 'chinWidth', 'faceWidth', 'cheekboneProminence']
              },
              overallFitScore: {
                type: Type.NUMBER,
                description: "A score from 0 to 100 indicating general ease of fitting standard N95s.",
              },
              sealIssues: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Potential leak points (e.g., 'High nose bridge gap', 'Small chin gap'). Localized.",
              },
              metrics: {
                type: Type.OBJECT,
                description: "Compatibility scores (0-100) for specific zones.",
                properties: {
                  noseFit: { type: Type.NUMBER },
                  chinFit: { type: Type.NUMBER },
                  cheekFit: { type: Type.NUMBER },
                  jawFit: { type: Type.NUMBER },
                },
                required: ["noseFit", "chinFit", "cheekFit", "jawFit"]
              },
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING, enum: Object.values(MaskType) },
                    modelName: { type: Type.STRING, description: "Example model name like '3M Aura' or 'Generic Cup'" },
                    matchScore: { type: Type.NUMBER, description: "0-100 compatibility" },
                    reason: { type: Type.STRING, description: "Why this mask fits this specific face. Localized." },
                  },
                  required: ['type', 'modelName', 'matchScore', 'reason']
                }
              },
              summary: {
                type: Type.STRING,
                description: "A concise professional summary of the analysis. Localized."
              }
            },
            required: ['faceShape', 'dimensions', 'overallFitScore', 'sealIssues', 'recommendations', 'summary', 'metrics'],
          },
        },
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: cleanBase64,
              },
            },
            {
              text: textPrompt,
            },
          ],
        },
      });

      const text = response.text;
      if (!text) throw new Error("No response from Gemini");

      const result = JSON.parse(text) as AnalysisResult;
      return result;

    } catch (error) {
      console.error(`Gemini 分析失败 (attempt ${attempt}/${maxRetries}):`, error);
      
      // 如果是最后一次尝试，抛出错误
      if (attempt === maxRetries) {
        throw new Error("分析图像失败。请重试。");
      }
      
      // 判断是否需要重试
      if (!isRetryableError(error)) {
        throw new Error("分析图像失败。请重试。");
      }
      
      // 使用指数退避策略等待后重试
      const retryDelay = getRetryDelay(attempt);
      console.log(`API 调用失败，将在 ${retryDelay}ms 后进行第 ${attempt + 1} 次重试...`);
      await delay(retryDelay);
    }
  }
  
  // 理论上不会执行到这里，但 TypeScript 需要返回值
  throw new Error("分析图像失败。请重试。");
};
