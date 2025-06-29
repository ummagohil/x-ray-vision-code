import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Alert } from "../Alert";

describe("Alert", () => {
  it("should render error alert correctly", () => {
    const { getByRole, getByText } = render(
      <Alert message="Test error message" type="error" />
    );

    expect(getByRole("alert")).toBeInTheDocument();
    expect(getByText("Test error message")).toBeInTheDocument();
    expect(getByRole("alert")).toHaveClass("bg-red-100", "text-red-700");
  });

  it("should render success alert correctly", () => {
    const { getByRole, getByText } = render(
      <Alert message="Test success message" type="success" />
    );

    expect(getByRole("alert")).toBeInTheDocument();
    expect(getByText("Test success message")).toBeInTheDocument();
    expect(getByRole("alert")).toHaveClass("bg-green-100", "text-green-700");
  });

  it("should render info alert correctly", () => {
    const { getByRole, getByText } = render(
      <Alert message="Test info message" type="info" />
    );

    expect(getByRole("alert")).toBeInTheDocument();
    expect(getByText("Test info message")).toBeInTheDocument();
    expect(getByRole("alert")).toHaveClass("bg-blue-100", "text-blue-700");
  });

  it("should render with default type when not specified", () => {
    const { getByRole, getByText } = render(
      <Alert message="Test message" type="info" />
    );

    expect(getByRole("alert")).toBeInTheDocument();
    expect(getByText("Test message")).toBeInTheDocument();
  });
});
