import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getLabByLegacySlug, getLabPath } from "./data/labs";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Verify token cryptographically with Supabase
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data.user) {
        const response = NextResponse.redirect(new URL("/admin/login", request.url));
        response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
        return response;
      }
    } catch {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  // /labs/[single-segment] -> legacy flat URL, redirect to /labs/[course]/[slug]
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
