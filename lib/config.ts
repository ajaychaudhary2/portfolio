export const GEMINI_API_KEYS = (process.env.NEXT_PUBLIC_GEMINI_KEYS || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);