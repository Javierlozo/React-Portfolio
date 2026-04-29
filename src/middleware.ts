import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getLabByLegacySlug, getLabPath } from "./data/labs";

function buildCsp(nonce: string, isDev: boolean): string {
  // Prod uses strict-dynamic + nonce: every script must be nonced or transitively
  // loaded by a nonced script. Dev loosens to 'unsafe-inline' / 'unsafe-eval' so
  // Next.js HMR and the error overlay can inject inline scripts without a nonce.
  const scriptSrc = isDev
    ? `'self' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval'`
    : `'self' 'nonce-${nonce}' 'strict-dynamic'`;
  return [
    `default-src 'self'`,
    `script-src ${scriptSrc}`,
    `style-src 'self' 'unsafe-inline' fonts.googleapis.com`,
    `img-src 'self' data: blob: *.githubusercontent.com img.shields.io`,
    `font-src 'self' fonts.gstatic.com`,
    `connect-src 'self' api.emailjs.com api.openai.com *.supabase.co`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ].join("; ");
}

function attachCsp(response: NextResponse, csp: string): NextResponse {
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Per-request nonce for CSP. 16 random bytes, base64-encoded.
  const nonceBytes = new Uint8Array(16);
  crypto.getRandomValues(nonceBytes);
  const nonce = btoa(String.fromCharCode(...nonceBytes));
  const csp = buildCsp(nonce, process.env.NODE_ENV === "development");

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return attachCsp(NextResponse.redirect(new URL("/admin/login", request.url)), csp);
    }

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data.user) {
        const response = NextResponse.redirect(new URL("/admin/login", request.url));
        response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
        return attachCsp(response, csp);
      }
    } catch {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
      return attachCsp(response, csp);
    }
  }

  // /labs/[single-segment] -> redirect to canonical course path
  const labsMatch = pathname.match(/^\/labs\/([^/]+)$/);
  if (labsMatch) {
    const segment = labsMatch[1];
    const lab = getLabByLegacySlug(segment);
    if (lab) {
      return attachCsp(NextResponse.redirect(new URL(getLabPath(lab), request.url)), csp);
    }
  }

  // Forward both the nonce and the CSP to the rendered route. Next.js reads the CSP
  // off the request headers to know which nonce to stamp onto its bootstrap scripts.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  return attachCsp(response, csp);
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf|otf)).*)",
    },
  ],
};
