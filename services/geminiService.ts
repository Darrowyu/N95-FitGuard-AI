import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, FaceShape, MaskType, Language } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in the environment");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeFaceForMaskFit = async (base64Image: string, lang: Language): Promise<AnalysisResult> => {
  const ai = getAiClient();
  
  // Remove data URL prefix if present (supports png, jpeg, webp, etc.)
  const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");

  // Construct prompt based on language
  // We request strict enums for machine-readable fields, but localized free-text for human-readable fields.
  const textPrompt = lang === 'zh'
    ? "Analyze this face for N95 respirator fit. Identify face shape and key dimensions. Provide the 'summary', 'sealIssues' list, and recommendation 'reason' in Simplified Chinese. IMPORTANT: Keep 'faceShape', 'dimensions' values (Low, Medium, High etc), and mask 'type' as the English enum values defined in the schema."
    : "Analyze this face for N95 respirator fit. Identify face shape, nose bridge features, and chin structure. Recommend specific mask styles.";

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
    console.error("Gemini Analysis Failed:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};