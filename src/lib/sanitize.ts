/** Truncate a string to maxLen characters, returning null if input is falsy. */
export function sanitizeString(val: unknown, maxLen: number): string | null {
  if (!val || typeof val !== "string") return null;
  return val.slice(0, maxLen).trim() || null;
}

/** Validate that a number is a finite integer within bounds. */
export function sanitizeInt(
  val: unknown,
  min: number,
  max: number,
  fallback: number
): number {
  const n = typeof val === "string" ? parseInt(val, 10) : Number(val);
  if (!Number.isFinite(n) || n < min || n > max) return fallback;
  return Math.floor(n);
}
