import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Header } from "../Header";

describe("Header", () => {
  it("should render header with title and description", () => {
    const { getByText } = render(<Header />);

    expect(getByText("X-Ray Diagnosis Assistant")).toBeInTheDocument();
    expect(
      getByText("Upload an X-ray image to get an AI-powered analysis.")
    ).toBeInTheDocument();
  });

  it("should have correct heading structure", () => {
    const { getByRole } = render(<Header />);

    const heading = getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("X-Ray Diagnosis Assistant");
  });

  it("should have correct CSS classes", () => {
    const { getByRole } = render(<Header />);

    const header = getByRole("banner");
    expect(header).toHaveClass(
      "w-full",
      "max-w-4xl",
      "py-6",
      "mb-8",
      "text-center"
    );
  });
});
