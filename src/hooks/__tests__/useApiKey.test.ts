import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useApiKey } from "../useApiKey";

describe("useApiKey", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  it("should set apiKey when API_KEY is available", () => {
    process.env.API_KEY = "test-api-key";

    const { result } = renderHook(() => useApiKey());

    expect(result.current.apiKey).toBe("test-api-key");
    expect(result.current.apiKeyError).toBeNull();
  });

  it("should set apiKeyError when API_KEY is not available", () => {
    delete process.env.API_KEY;

    const { result } = renderHook(() => useApiKey());

    expect(result.current.apiKey).toBeNull();
    expect(result.current.apiKeyError).toBe(
      "API_KEY environment variable not found. Please ensure it is set for the application to function."
    );
  });

  it("should handle empty API_KEY", () => {
    process.env.API_KEY = "";

    const { result } = renderHook(() => useApiKey());

    expect(result.current.apiKey).toBeNull();
    expect(result.current.apiKeyError).toBe(
      "API_KEY environment variable not found. Please ensure it is set for the application to function."
    );
  });
});
