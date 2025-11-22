import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, FaceShape, MaskType, Language } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

// 获取 AI 客户端实例
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("环境变量中未定义 API_KEY");
  }
  return new GoogleGenAI({ apiKey });
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
    console.error("Gemini 分析失败:", error);
    throw new Error("分析图像失败。请重试。");
  }
};