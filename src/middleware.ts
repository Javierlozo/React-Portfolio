import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLabByLegacySlug, getLabPath } from "./data/labs";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

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

export const config = {
  matcher: ['/labs/:path*', '/admin/:path*'],
};
