import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { FileUpload } from "../FileUpload";

// Mock the utils
vi.mock("../../utils/fileUtils", () => ({
  validateFile: vi.fn(),
  createPreviewUrl: vi.fn(),
}));

describe("FileUpload", () => {
  const mockOnFileChange = vi.fn();
  const defaultProps = {
    selectedFile: null,
    previewUrl: null,
    onFileChange: mockOnFileChange,
    disabled: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render file upload section", () => {
    const { getByText } = render(<FileUpload {...defaultProps} />);

    expect(getByText("1. Upload X-Ray Image")).toBeInTheDocument();
    expect(getByText("Click to upload or drag and drop")).toBeInTheDocument();
    expect(getByText("PNG, JPG, WEBP, DICOM (Max 5MB)")).toBeInTheDocument();
  });

  it("should show selected file name when file is selected", () => {
    const file = new File(["content"], "test-image.jpg", {
      type: "image/jpeg",
    });
    const { getByText } = render(
      <FileUpload {...defaultProps} selectedFile={file} />
    );

    expect(getByText("test-image.jpg")).toBeInTheDocument();
  });

  it("should show image preview when previewUrl is provided", () => {
    const { getByAltText } = render(
      <FileUpload {...defaultProps} previewUrl="test-preview-url" />
    );

    const previewImage = getByAltText("X-Ray Preview");
    expect(previewImage).toBeInTheDocument();
    expect(previewImage).toHaveAttribute("src", "test-preview-url");
  });

  it("should be disabled when disabled prop is true", () => {
    const { getByText } = render(
      <FileUpload {...defaultProps} disabled={true} />
    );
    // Find the dropzone by text, then traverse up to the dropzone div
    const dropzoneText = getByText("Click to upload or drag and drop");
    const dropzone = dropzoneText.closest("div");
    expect(dropzone).toHaveClass("opacity-50", "cursor-not-allowed");
  });

  it("should have correct accessibility attributes", () => {
    const { getByRole, getByLabelText } = render(
      <FileUpload {...defaultProps} />
    );

    expect(getByRole("region")).toHaveAttribute(
      "aria-labelledby",
      "file-upload-heading"
    );
    expect(getByLabelText(/Click to upload or drag and drop/)).toHaveAttribute(
      "id",
      "file-upload"
    );
  });
});
