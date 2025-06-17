
import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { analyzeXRayImage } from './services/geminiService';
import { UploadIcon, LoadingSpinnerIcon, AlertTriangleIcon, CheckCircleIcon } from './constants';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  useEffect(() => {
    // API_KEY is expected to be in process.env set by the environment
    const key = process.env.API_KEY;
    if (key) {
      setApiKey(key);
      setApiKeyError(null);
    } else {
      setApiKeyError("API_KEY environment variable not found. Please ensure it is set for the application to function.");
    }
  }, []);

  const toBase64 = (file: File): Promise<{base64: string, mimeType: string}> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve({ base64: reader.result.split(',')[1], mimeType: file.type });
        } else {
          reject(new Error('Failed to read file as base64 string.'));
        }
      };
      reader.onerror = (errorEvent) => reject(errorEvent);
    });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type (client-side)
      const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/dicom']; // Added DICOM for acceptance but Gemini might struggle
      if (!acceptedTypes.includes(file.type)) {
        setError('Invalid file type. Please upload a JPEG, PNG, WEBP, or DICOM image.');
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDiagnosis(null);
      setError(null);
    }
  };

  const handleGetDiagnosis = useCallback(async () => {
    if (!selectedFile) {
      setError('Please select an X-ray image file first.');
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
      // For DICOM, Gemini might not interpret it as well as standard image formats.
      // The service will use the provided mimeType.
      const result = await analyzeXRayImage(base64Image, mimeType, apiKey);
      setDiagnosis(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during diagnosis.');
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
    // Clear the file input visually
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };
  
  const DisplayAlert: React.FC<{ message: string; type: 'error' | 'info' | 'success'}> = ({ message, type }) => {
    let bgColor, textColor, Icon;
    switch(type) {
        case 'error':
            bgColor = 'bg-red-100';
            textColor = 'text-red-700';
            Icon = <AlertTriangleIcon className="h-5 w-5 mr-2" />;
            break;
        case 'success':
            bgColor = 'bg-green-100';
            textColor = 'text-green-700';
            Icon = <CheckCircleIcon className="h-5 w-5 mr-2" />;
            break;
        default: // info
            bgColor = 'bg-blue-100';
            textColor = 'text-blue-700';
            Icon = <AlertTriangleIcon className="h-5 w-5 mr-2" />; // Or a specific info icon
            break;
    }
    return (
        <div className={`${bgColor} ${textColor} p-4 rounded-md flex items-center shadow`} role="alert">
            {Icon}
            <span>{message}</span>
        </div>
    );
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-slate-100 flex flex-col items-center p-4 selection:bg-sky-500 selection:text-white">
      <header className="w-full max-w-4xl py-6 mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
          X-Ray Diagnosis Assistant
        </h1>
        <p className="mt-2 text-slate-400 text-lg">Upload an X-ray image to get an AI-powered analysis.</p>
      </header>

      <main className="w-full max-w-3xl bg-slate-800 shadow-2xl rounded-xl p-6 md:p-8 space-y-8">
        {apiKeyError && <DisplayAlert message={apiKeyError} type="error" />}

        <section id="file-upload-section" aria-labelledby="file-upload-heading">
          <h2 id="file-upload-heading" className="text-2xl font-semibold text-sky-300 mb-4">1. Upload X-Ray Image</h2>
          <div className="flex flex-col items-center p-6 border-2 border-dashed border-slate-600 rounded-lg hover:border-sky-500 transition-colors">
            <label
              htmlFor="file-upload"
              className={`flex flex-col items-center justify-center w-full h-48 cursor-pointer rounded-md 
                         ${apiKeyError ? 'bg-slate-700 opacity-50 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              <UploadIcon className="w-12 h-12 text-slate-400 mb-3" />
              <span className="text-slate-300 font-medium">
                {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
              </span>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP, DICOM (Max 5MB)</p>
              <input 
                id="file-upload" 
                name="file-upload" 
                type="file" 
                className="sr-only" 
                onChange={handleFileChange} 
                accept="image/png, image/jpeg, image/webp, application/dicom, .dcm"
                disabled={!!apiKeyError || isLoading}
              />
            </label>
          </div>
          {previewUrl && (
            <div className="mt-6 p-4 bg-slate-700 rounded-lg shadow">
              <h3 className="text-lg font-medium text-sky-400 mb-2">Image Preview:</h3>
              <img src={previewUrl} alt="X-Ray Preview" className="max-w-full max-h-80 mx-auto rounded-md object-contain border border-slate-600" />
            </div>
          )}
        </section>

        <section id="diagnosis-section" aria-labelledby="diagnosis-heading">
          <h2 id="diagnosis-heading" className="text-2xl font-semibold text-sky-300 mb-4">2. Get Analysis</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGetDiagnosis}
              disabled={!selectedFile || isLoading || !!apiKeyError}
              className="flex-grow w-full sm:w-auto justify-center items-center px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <LoadingSpinnerIcon className="w-5 h-5 mr-2" />
                  Analyzing...
                </>
              ) : (
                'Get AI Analysis'
              )}
            </button>
            {(selectedFile || diagnosis || error) && (
                 <button
                 onClick={resetState}
                 disabled={isLoading}
                 className="flex-grow w-full sm:w-auto justify-center items-center px-8 py-3 bg-slate-600 text-slate-300 font-semibold rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 Reset
               </button>
            )}
          </div>
        </section>

        {(error || diagnosis) && (
            <section id="results-section" aria-labelledby="results-heading" className="mt-8">
            <h2 id="results-heading" className="text-2xl font-semibold text-sky-300 mb-4">3. Analysis Results</h2>
            {error && <DisplayAlert message={error} type="error" />}
            {diagnosis && (
              <div className="p-6 bg-slate-700 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-emerald-400 mb-3">AI Analysis:</h3>
                <pre className="text-slate-200 whitespace-pre-wrap break-words text-sm leading-relaxed overflow-x-auto p-3 bg-slate-900/50 rounded-md">
                  {diagnosis}
                </pre>
              </div>
            )}
          </section>
        )}
        
        <footer className="mt-12 pt-8 border-t border-slate-700 text-center">
          <p className="text-sm text-slate-500">
            <strong>Disclaimer:</strong> This AI-powered analysis is for informational purposes only and
            is NOT a substitute for professional medical advice, diagnosis, or treatment.
            Always seek the advice of your physician or other qualified health provider with any
            questions you may have regarding a medical condition.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
