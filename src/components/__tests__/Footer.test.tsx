import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Footer } from "../Footer";

describe("Footer", () => {
  it("should render footer with disclaimer", () => {
    const { getByText } = render(<Footer />);

    expect(getByText(/Disclaimer:/)).toBeInTheDocument();
    expect(
      getByText(/This AI-powered analysis is for informational purposes only/)
    ).toBeInTheDocument();
    expect(
      getByText(/Always seek the advice of your physician/)
    ).toBeInTheDocument();
  });

  it("should have correct CSS classes", () => {
    const { getByRole } = render(<Footer />);

    const footer = getByRole("contentinfo");
    expect(footer).toHaveClass(
      "mt-12",
      "pt-8",
      "border-t",
      "border-slate-700",
      "text-center"
    );
  });

  it("should contain strong disclaimer text", () => {
    const { getByText } = render(<Footer />);

    const disclaimer = getByText("Disclaimer:");
    expect(disclaimer.tagName).toBe("STRONG");
  });
});
