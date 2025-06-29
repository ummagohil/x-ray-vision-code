import { LoadingSpinnerIcon } from "../assets/icons";

interface DiagnosisSectionProps {
  selectedFile: File | null;
  isLoading: boolean;
  hasApiKeyError: boolean;
  onGetDiagnosis: () => void;
  onReset: () => void;
  hasResults: boolean;
}

export const DiagnosisSection = ({
  selectedFile,
  isLoading,
  hasApiKeyError,
  onGetDiagnosis,
  onReset,
  hasResults,
}: DiagnosisSectionProps) => {
  return (
    <section id="diagnosis-section" aria-labelledby="diagnosis-heading">
      <h2
        id="diagnosis-heading"
        className="text-2xl font-semibold text-sky-300 mb-4"
      >
        2. Get Analysis
      </h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onGetDiagnosis}
          disabled={!selectedFile || isLoading || hasApiKeyError}
          className="flex-grow w-full sm:w-auto justify-center items-center px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <LoadingSpinnerIcon className="w-5 h-5 mr-2" />
              Analyzing...
            </>
          ) : (
            "Get AI Analysis"
          )}
        </button>
        {hasResults && (
          <button
            onClick={onReset}
            disabled={isLoading}
            className="flex-grow w-full sm:w-auto justify-center items-center px-8 py-3 bg-slate-600 text-slate-300 font-semibold rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        )}
      </div>
    </section>
  );
};
