import { ChangeEvent } from "react";
import { UploadIcon } from "../assets/icons";
import { validateFile, createPreviewUrl } from "../utils/fileUtils";

interface FileUploadProps {
  selectedFile: File | null;
  previewUrl: string | null;
  onFileChange: (
    file: File | null,
    previewUrl: string | null,
    error: string | null
  ) => void;
  disabled?: boolean;
}

export const FileUpload = ({
  selectedFile,
  previewUrl,
  onFileChange,
  disabled = false,
}: FileUploadProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        onFileChange(null, null, validationError);
        return;
      }

      const newPreviewUrl = createPreviewUrl(file);
      onFileChange(file, newPreviewUrl, null);
    }
  };

  return (
    <section id="file-upload-section" aria-labelledby="file-upload-heading">
      <h2
        id="file-upload-heading"
        className="text-2xl font-semibold text-sky-300 mb-4"
      >
        1. Upload X-Ray Image
      </h2>
      <div
        className={`flex flex-col items-center p-6 border-2 border-dashed border-slate-600 rounded-lg hover:border-sky-500 transition-colors${
          disabled ? " opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center w-full h-48 cursor-pointer rounded-md 
                     ${
                       disabled
                         ? "bg-slate-700 opacity-50 cursor-not-allowed"
                         : "bg-slate-700 hover:bg-slate-600"
                     }`}
        >
          <UploadIcon className="w-12 h-12 text-slate-400 mb-3" />
          <span className="text-slate-300 font-medium">
            {selectedFile
              ? selectedFile.name
              : "Click to upload or drag and drop"}
          </span>
          <p className="text-xs text-slate-500 mt-1">
            PNG, JPG, WEBP, DICOM (Max 5MB)
          </p>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp, application/dicom, .dcm"
            disabled={disabled}
          />
        </label>
      </div>
      {previewUrl && (
        <div className="mt-6 p-4 bg-slate-700 rounded-lg shadow">
          <h3 className="text-lg font-medium text-sky-400 mb-2">
            Image Preview:
          </h3>
          <img
            src={previewUrl}
            alt="X-Ray Preview"
            className="max-w-full max-h-80 mx-auto rounded-md object-contain border border-slate-600"
          />
        </div>
      )}
    </section>
  );
};
