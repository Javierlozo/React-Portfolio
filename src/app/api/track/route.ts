import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { rateLimit } from "@/src/lib/rate-limit";
import { sanitizeString, sanitizeInt } from "@/src/lib/sanitize";

function parseUserAgent(ua: string) {
  let browser = "Unknown";
  let os = "Unknown";
  let device_type = "desktop";

  // Browser
  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome/") && !ua.includes("Edg/")) browser = "Chrome";
  else if (ua.includes("Safari/") && !ua.includes("Chrome/")) browser = "Safari";
  else if (ua.includes("Opera/") || ua.includes("OPR/")) browser = "Opera";

  // OS
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) os = "Linux";

  // Device type
  if (ua.includes("Mobile") || ua.includes("Android")) device_type = "mobile";
  else if (ua.includes("iPad") || ua.includes("Tablet")) device_type = "tablet";

  return { browser, os, device_type };
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { success } = rateLimit(`track:${ip}`, { maxRequests: 30, windowMs: 60 * 1000 });
    if (!success) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    const body = await request.json();

    const path = sanitizeString(body.path, 500);
    if (!path) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent")?.slice(0, 500) || "";
    const { browser, os, device_type } = parseUserAgent(userAgent);

    // Geo headers are set by Vercel automatically
    const country = request.headers.get("x-vercel-ip-country") || null;
    const city = request.headers.get("x-vercel-ip-city") || null;
    const region = request.headers.get("x-vercel-ip-country-region") || null;

    const { error } = await supabase.from("page_views").insert({
      path,
      referrer: sanitizeString(body.referrer, 2000),
      user_agent: userAgent || null,
      country,
      city,
      region,
      browser,
      os,
      device_type,
      screen_width: sanitizeInt(body.screen_width, 0, 10000, 0) || null,
      utm_source: sanitizeString(body.utm_source, 200),
      utm_medium: sanitizeString(body.utm_medium, 200),
      utm_campaign: sanitizeString(body.utm_campaign, 200),
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
