import { NextRequest } from "next/server";

/**
 * Extract visitor IP from trusted Vercel headers first,
 * then fall back to x-forwarded-for.
 */
export function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
