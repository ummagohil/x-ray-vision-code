import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  toBase64,
  validateFile,
  createPreviewUrl,
  clearFileInput,
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "../fileUtils";

describe("fileUtils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("toBase64", () => {
    it("should convert file to base64", async () => {
      const mockFile = new File(["test content"], "test.jpg", {
        type: "image/jpeg",
      });

      const result = await toBase64(mockFile);

      expect(result).toEqual({
        base64: "test-base64-data",
        mimeType: "image/jpeg",
      });
    });

    it("should reject on file read error", async () => {
      const mockFile = new File(["test content"], "test.jpg", {
        type: "image/jpeg",
      });

      // Mock FileReader to simulate error
      const originalFileReader = global.FileReader;
      global.FileReader = class {
        onload:
          | ((this: FileReader, ev: ProgressEvent<FileReader>) => unknown)
          | null = null;
        onerror:
          | ((this: FileReader, ev: ProgressEvent<FileReader>) => unknown)
          | null = null;
        result: string | ArrayBuffer | null = null;

        readAsDataURL() {
          setTimeout(() => {
            if (this.onerror) {
              this.onerror(new ProgressEvent("error"));
            }
          }, 0);
        }
      } as unknown as typeof FileReader;

      await expect(toBase64(mockFile)).rejects.toThrow();

      global.FileReader = originalFileReader;
    });
  });

  describe("validateFile", () => {
    it("should return null for valid file", () => {
      const validFile = new File(["content"], "test.jpg", {
        type: "image/jpeg",
      });

      const result = validateFile(validFile);

      expect(result).toBeNull();
    });

    it("should return error for invalid file type", () => {
      const invalidFile = new File(["content"], "test.txt", {
        type: "text/plain",
      });

      const result = validateFile(invalidFile);

      expect(result).toBe(
        "Invalid file type. Please upload a JPEG, PNG, WEBP, or DICOM image."
      );
    });

    it("should return error for file too large", () => {
      const largeFile = new File(["x".repeat(MAX_FILE_SIZE + 1)], "test.jpg", {
        type: "image/jpeg",
      });

      const result = validateFile(largeFile);

      expect(result).toBe(
        "File size too large. Please upload a file smaller than 5MB."
      );
    });
  });

  describe("createPreviewUrl", () => {
    it("should create preview URL for file", () => {
      const file = new File(["content"], "test.jpg", { type: "image/jpeg" });

      const result = createPreviewUrl(file);

      expect(result).toBe("mock-preview-url");
      expect(URL.createObjectURL).toHaveBeenCalledWith(file);
    });
  });

  describe("clearFileInput", () => {
    it("should clear file input value", () => {
      // Mock DOM element
      const mockInput = {
        value: "test-value",
      } as HTMLInputElement;

      vi.spyOn(document, "getElementById").mockReturnValue(mockInput);

      clearFileInput("test-input");

      expect(mockInput.value).toBe("");
    });

    it("should handle non-existent input element", () => {
      vi.spyOn(document, "getElementById").mockReturnValue(null);

      expect(() => clearFileInput("non-existent")).not.toThrow();
    });
  });

  describe("constants", () => {
    it("should have correct accepted file types", () => {
      expect(ACCEPTED_FILE_TYPES).toEqual([
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/dicom",
      ]);
    });

    it("should have correct max file size", () => {
      expect(MAX_FILE_SIZE).toBe(5 * 1024 * 1024); // 5MB
    });
  });
});
