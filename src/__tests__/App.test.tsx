import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

// Mock the hooks and services
vi.mock("../hooks/useApiKey", () => ({
  useApiKey: () => ({
    apiKey: "test-api-key",
    apiKeyError: null,
  }),
}));

vi.mock("../services/geminiService", () => ({
  analyzeXRayImage: vi.fn(),
}));

vi.mock("../utils/fileUtils", () => ({
  toBase64: vi.fn(),
  clearFileInput: vi.fn(),
}));

describe("App", () => {
  it("should render the application header", () => {
    const { getByText } = render(<App />);

    expect(getByText("X-Ray Diagnosis Assistant")).toBeInTheDocument();
    expect(
      getByText("Upload an X-ray image to get an AI-powered analysis.")
    ).toBeInTheDocument();
  });

  it("should render file upload section", () => {
    const { getByText } = render(<App />);

    expect(getByText("1. Upload X-Ray Image")).toBeInTheDocument();
    expect(getByText("Click to upload or drag and drop")).toBeInTheDocument();
  });

  it("should render diagnosis section", () => {
    const { getByText } = render(<App />);

    expect(getByText("2. Get Analysis")).toBeInTheDocument();
    expect(getByText("Get AI Analysis")).toBeInTheDocument();
  });

  it("should render footer with disclaimer", () => {
    const { getByText } = render(<App />);

    expect(getByText(/Disclaimer:/)).toBeInTheDocument();
    expect(
      getByText(/This AI-powered analysis is for informational purposes only/)
    ).toBeInTheDocument();
  });

  it("should disable analyze button when no file is selected", () => {
    const { getByText } = render(<App />);

    expect(getByText("Get AI Analysis")).toBeDisabled();
  });
});
