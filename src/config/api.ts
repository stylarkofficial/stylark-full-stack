export function getApiBaseUrls(configuredApiBaseUrl: string): string[] {
  const candidates = [
    configuredApiBaseUrl.trim(),
    "http://localhost:8000",
    "http://127.0.0.1:8000",
  ]
    .filter(Boolean)
    .map((url) => url.replace(/\/$/, ""));

  return Array.from(new Set(candidates));
}
