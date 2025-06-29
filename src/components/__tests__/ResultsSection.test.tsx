import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ResultsSection } from "../ResultsSection";

describe("ResultsSection", () => {
  it("should not render when no error or diagnosis", () => {
    const { container } = render(
      <ResultsSection error={null} diagnosis={null} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render error alert when error is provided", () => {
    const { getByText, queryByText } = render(
      <ResultsSection error="Test error message" diagnosis={null} />
    );

    expect(getByText("3. Analysis Results")).toBeInTheDocument();
    expect(getByText("Test error message")).toBeInTheDocument();
    expect(queryByText("AI Analysis:")).not.toBeInTheDocument();
  });

  it("should render diagnosis when diagnosis is provided", () => {
    const diagnosisText = "Test diagnosis result";
    const { getByText } = render(
      <ResultsSection error={null} diagnosis={diagnosisText} />
    );

    expect(getByText("3. Analysis Results")).toBeInTheDocument();
    expect(getByText("AI Analysis:")).toBeInTheDocument();
    expect(getByText(diagnosisText)).toBeInTheDocument();
  });

  it("should render both error and diagnosis when both are provided", () => {
    const diagnosisText = "Test diagnosis result";
    const { getByText } = render(
      <ResultsSection error="Test error message" diagnosis={diagnosisText} />
    );

    expect(getByText("3. Analysis Results")).toBeInTheDocument();
    expect(getByText("Test error message")).toBeInTheDocument();
    expect(getByText("AI Analysis:")).toBeInTheDocument();
    expect(getByText(diagnosisText)).toBeInTheDocument();
  });

  it("should have correct accessibility attributes", () => {
    const { getByRole } = render(
      <ResultsSection error="Test error" diagnosis={null} />
    );

    expect(getByRole("region")).toHaveAttribute(
      "aria-labelledby",
      "results-heading"
    );
  });
});
