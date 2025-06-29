import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { DiagnosisSection } from "../DiagnosisSection";

describe("DiagnosisSection", () => {
  const mockOnGetDiagnosis = vi.fn();
  const mockOnReset = vi.fn();
  const defaultProps = {
    selectedFile: null,
    isLoading: false,
    hasApiKeyError: false,
    onGetDiagnosis: mockOnGetDiagnosis,
    onReset: mockOnReset,
    hasResults: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render diagnosis section", () => {
    const { getByText } = render(<DiagnosisSection {...defaultProps} />);

    expect(getByText("2. Get Analysis")).toBeInTheDocument();
    expect(getByText("Get AI Analysis")).toBeInTheDocument();
  });

  it("should show loading state when isLoading is true", () => {
    const { getByText } = render(
      <DiagnosisSection {...defaultProps} isLoading={true} />
    );

    const loadingBtn = getByText("Analyzing...");
    expect(loadingBtn).toBeInTheDocument();
    expect(loadingBtn.closest("button")).toBeDisabled();
  });

  it("should disable analyze button when no file is selected", () => {
    const { getByText } = render(<DiagnosisSection {...defaultProps} />);

    expect(getByText("Get AI Analysis")).toBeDisabled();
  });

  it("should disable analyze button when there is API key error", () => {
    const { getByText } = render(
      <DiagnosisSection {...defaultProps} hasApiKeyError={true} />
    );

    expect(getByText("Get AI Analysis")).toBeDisabled();
  });

  it("should show reset button when hasResults is true", () => {
    const { getByText } = render(
      <DiagnosisSection {...defaultProps} hasResults={true} />
    );

    expect(getByText("Reset")).toBeInTheDocument();
  });

  it("should not show reset button when hasResults is false", () => {
    const { queryByText } = render(
      <DiagnosisSection {...defaultProps} hasResults={false} />
    );

    expect(queryByText("Reset")).not.toBeInTheDocument();
  });

  it("should disable reset button when loading", () => {
    const { getByText } = render(
      <DiagnosisSection {...defaultProps} hasResults={true} isLoading={true} />
    );

    expect(getByText("Reset")).toBeDisabled();
  });
});
