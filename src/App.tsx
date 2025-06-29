import { useState, useCallback } from "react";
import { analyzeXRayImage } from "./services/geminiService";
import { toBase64, clearFileInput } from "./utils/fileUtils";
import { useApiKey } from "./hooks/useApiKey";
import { Header } from "./components/Header";
import { FileUpload } from "./components/FileUpload";
import { DiagnosisSection } from "./components/DiagnosisSection";
import { ResultsSection } from "./components/ResultsSection";
import { Footer } from "./components/Footer";
import { Alert } from "./components/Alert";

const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { apiKey, apiKeyError } = useApiKey();

  const handleFileChange = (
    file: File | null,
    previewUrl: string | null,
    error: string | null
  ) => {
    setSelectedFile(file);
    setPreviewUrl(previewUrl);
    setDiagnosis(null);
    setError(error);
  };

  const handleGetDiagnosis = useCallback(async () => {
    if (!selectedFile) {
      setError("Please select an X-ray image file first.");
      return;
    }
    if (!apiKey) {
      setError(apiKeyError || "API Key is not configured.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setDiagnosis(null);

    try {
      const { base64: base64Image, mimeType } = await toBase64(selectedFile);
      const result = await analyzeXRayImage(base64Image, mimeType, apiKey);
      setDiagnosis(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred during diagnosis.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, apiKey, apiKeyError]);

  const resetState = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setDiagnosis(null);
    setError(null);
    setIsLoading(false);
    clearFileInput("file-upload");
  };

  const hasResults = !!(selectedFile || diagnosis || error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-slate-100 flex flex-col items-center p-4 selection:bg-sky-500 selection:text-white">
      <Header />

      <main className="w-full max-w-3xl bg-slate-800 shadow-2xl rounded-xl p-6 md:p-8 space-y-8">
        {apiKeyError && <Alert message={apiKeyError} type="error" />}

        <FileUpload
          selectedFile={selectedFile}
          previewUrl={previewUrl}
          onFileChange={handleFileChange}
          disabled={!!apiKeyError || isLoading}
        />

        <DiagnosisSection
          selectedFile={selectedFile}
          isLoading={isLoading}
          hasApiKeyError={!!apiKeyError}
          onGetDiagnosis={handleGetDiagnosis}
          onReset={resetState}
          hasResults={hasResults}
        />

        <ResultsSection error={error} diagnosis={diagnosis} />

        <Footer />
      </main>
    </div>
  );
};

export default App;
