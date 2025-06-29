export interface FileUploadState {
  selectedFile: File | null;
  previewUrl: string | null;
}

export interface DiagnosisState {
  diagnosis: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ApiKeyState {
  apiKey: string | null;
  apiKeyError: string | null;
}

export interface Base64Result {
  base64: string;
  mimeType: string;
}

export type AlertType = "error" | "info" | "success";

export interface AlertProps {
  message: string;
  type: AlertType;
}

export interface IconProps {
  className?: string;
}
