import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";

const MODEL_NAME = "gemini-1.5-flash";

export async function analyzeXRayImage(
  base64ImageData: string,
  mimeType: string,
  apiKey: string
): Promise<string> {
  if (!apiKey) {
    throw new Error("API key is missing. Please ensure it is configured.");
  }
  if (!base64ImageData) {
    throw new Error("Image data is required");
  }
  if (!mimeType) {
    throw new Error("MIME type is required");
  }

  const ai = new GoogleGenAI({ apiKey });

  const imagePart: Part = {
    inlineData: {
      mimeType: mimeType,
      data: base64ImageData,
    },
  };

  const textPart: Part = {
    text: `You are an AI assistant specialized in analyzing X-ray images. 
Based on the provided X-ray, describe potential medical findings, anomalies, or conditions. 
Structure your response clearly, using bullet points or numbered lists for distinct observations if applicable.
Please provide a concise summary followed by detailed observations.
IMPORTANT: This analysis is for informational purposes only and is not a substitute for diagnosis by a qualified medical professional. Always consult a doctor for health concerns.
Do not use markdown formatting in your response.
Example of a finding:
- Observation: Possible slight opacity in the lower left lung field.
- Implication: This could suggest [potential condition A] or [potential condition B], further investigation may be warranted.
End your response with the disclaimer: "Disclaimer: This AI analysis is for informational purposes only and not a substitute for professional medical advice. Consult a qualified healthcare provider."`,
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ parts: [imagePart, textPart] }],
      config: {
        // No specific thinkingConfig, use default for higher quality.
        temperature: 0.3, // Lower temperature for more factual, less creative responses
        topP: 0.9,
        topK: 32,
      },
    });

    if (!response.text) {
      throw new Error("No response text received from Gemini API.");
    }

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      if (error.message.includes("API key not valid")) {
        throw new Error(
          "Invalid API Key. Please check your API key configuration."
        );
      }
      throw new Error(
        `Failed to get diagnosis from Gemini API: ${error.message}`
      );
    }
    throw new Error(
      "An unknown error occurred while communicating with the Gemini API."
    );
  }
}
