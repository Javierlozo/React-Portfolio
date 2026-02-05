import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLabByLegacySlug, getLabPath } from "./data/labs";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // /labs/[single-segment] → legacy flat URL, redirect to /labs/[course]/[slug]
  const labsMatch = pathname.match(/^\/labs\/([^/]+)$/);
  if (labsMatch) {
    const segment = labsMatch[1];
    const lab = getLabByLegacySlug(segment);
    if (lab) {
      return NextResponse.redirect(new URL(getLabPath(lab), request.url));
    }
  }

  return NextResponse.next();
}
