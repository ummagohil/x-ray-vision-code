import { Base64Result } from "../types";

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/dicom",
];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const toBase64 = (file: File): Promise<Base64Result> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve({ base64: reader.result.split(",")[1], mimeType: file.type });
      } else {
        reject(new Error("Failed to read file as base64 string."));
      }
    };
    reader.onerror = (errorEvent) => reject(errorEvent);
  });

export const validateFile = (file: File): string | null => {
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return "Invalid file type. Please upload a JPEG, PNG, WEBP, or DICOM image.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File size too large. Please upload a file smaller than 5MB.";
  }

  return null;
};

export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

export const clearFileInput = (inputId: string): void => {
  const fileInput = document.getElementById(inputId) as HTMLInputElement;
  if (fileInput) {
    fileInput.value = "";
  }
};
