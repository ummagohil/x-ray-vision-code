import { useState, useEffect } from "react";
import { ApiKeyState } from "../types";

export const useApiKey = (): ApiKeyState => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  useEffect(() => {
    const key = process.env.API_KEY;
    if (key) {
      setApiKey(key);
      setApiKeyError(null);
    } else {
      setApiKeyError(
        "API_KEY environment variable not found. Please ensure it is set for the application to function."
      );
    }
  }, []);

  return { apiKey, apiKeyError };
};
