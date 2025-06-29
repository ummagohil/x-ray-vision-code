import { Alert } from "./Alert";

interface ResultsSectionProps {
  error: string | null;
  diagnosis: string | null;
}

export const ResultsSection = ({ error, diagnosis }: ResultsSectionProps) => {
  if (!error && !diagnosis) {
    return null;
  }

  return (
    <section
      id="results-section"
      aria-labelledby="results-heading"
      className="mt-8"
    >
      <h2
        id="results-heading"
        className="text-2xl font-semibold text-sky-300 mb-4"
      >
        3. Analysis Results
      </h2>
      {error && <Alert message={error} type="error" />}
      {diagnosis && (
        <div className="p-6 bg-slate-700 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-emerald-400 mb-3">
            AI Analysis:
          </h3>
          <pre className="text-slate-200 whitespace-pre-wrap break-words text-sm leading-relaxed overflow-x-auto p-3 bg-slate-900/50 rounded-md">
            {diagnosis}
          </pre>
        </div>
      )}
    </section>
  );
};
