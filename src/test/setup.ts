import "@testing-library/jest-dom";

// Mock environment variables
process.env.API_KEY = "test-api-key";

// Mock console.error to avoid noise in tests
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  // Only log errors that aren't from our expected test scenarios
  if (
    typeof args[0] === "string" &&
    (args[0].includes("Error calling Gemini API") ||
      args[0].includes("API key not valid") ||
      args[0].includes("No response text received"))
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Mock FileReader
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
      if (this.onload) {
        this.result = "data:image/jpeg;base64,test-base64-data";
        this.onload(new ProgressEvent("load"));
      }
    }, 0);
  }
} as unknown as typeof FileReader;

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => "mock-preview-url");
global.URL.revokeObjectURL = vi.fn();
