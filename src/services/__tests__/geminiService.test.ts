// Force Vitest/esbuild to re-parse this file
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the Google GenAI library
vi.mock("@google/genai", () => ({
  GoogleGenAI: vi.fn().mockImplementation(() => ({
    models: {
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: "Mock diagnosis result",
        },
        text: "Mock diagnosis result",
      }),
    },
  })),
}));

describe("geminiService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should analyze X-ray image successfully", async () => {
    const { analyzeXRayImage } = await import("../geminiService");
    const result = await analyzeXRayImage(
      "test-base64-data",
      "image/jpeg",
      "test-api-key"
    );
    expect(result).toBe("Mock diagnosis result");
  });

  it("should throw error when API key is missing", async () => {
    const { analyzeXRayImage } = await import("../geminiService");
    await expect(
      analyzeXRayImage("test-base64-data", "image/jpeg", "")
    ).rejects.toThrow("API key is missing. Please ensure it is configured.");
  });

  it("should throw error when image data is missing", async () => {
    const { analyzeXRayImage } = await import("../geminiService");
    await expect(
      analyzeXRayImage("", "image/jpeg", "test-api-key")
    ).rejects.toThrow("Image data is required");
  });

  it("should throw error when mime type is missing", async () => {
    const { analyzeXRayImage } = await import("../geminiService");
    await expect(
      analyzeXRayImage("test-base64-data", "", "test-api-key")
    ).rejects.toThrow("MIME type is required");
  });
});
