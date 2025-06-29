export const Header = () => {
  return (
    <header className="w-full max-w-4xl py-6 mb-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
        X-Ray Diagnosis Assistant
      </h1>
      <p className="mt-2 text-slate-400 text-lg">
        Upload an X-ray image to get an AI-powered analysis.
      </p>
    </header>
  );
};
