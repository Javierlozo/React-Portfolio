import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { rateLimit } from "@/src/lib/rate-limit";
import { sanitizeString, sanitizeInt } from "@/src/lib/sanitize";
import { getIp } from "@/src/lib/get-ip";

const ALLOWED_ORIGINS = [
  "https://www.luislozoya.com",
  "https://luislozoya.com",
];

function isValidPublicIp(ip: string): boolean {
  if (ip === "unknown" || ip === "::1") return false;
  // Private IPv4 ranges
  if (
    ip.startsWith("10.") ||
    ip.startsWith("127.") ||
    ip.startsWith("169.254.") ||
    ip.startsWith("192.168.")
  ) return false;
  const match = ip.match(/^172\.(\d+)\./);
  if (match && parseInt(match[1]) >= 16 && parseInt(match[1]) <= 31) return false;
  // Accept valid IPv4 or IPv6
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) return true;
  if (ip.includes(":")) return true; // IPv6
  return false;
}

function parseUserAgent(ua: string) {
  let browser = "Unknown";
  let os = "Unknown";
  let device_type = "desktop";

  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome/") && !ua.includes("Edg/")) browser = "Chrome";
  else if (ua.includes("Safari/") && !ua.includes("Chrome/")) browser = "Safari";
  else if (ua.includes("Opera/") || ua.includes("OPR/")) browser = "Opera";

  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) os = "Linux";

  if (ua.includes("Mobile") || ua.includes("Android")) device_type = "mobile";
  else if (ua.includes("iPad") || ua.includes("Tablet")) device_type = "tablet";

  return { browser, os, device_type };
}

async function lookupIp(ip: string): Promise<{ isp: string | null; org: string | null }> {
  if (!isValidPublicIp(ip)) return { isp: null, org: null };
  try {
    const res = await fetch(`https://ip-api.com/json/${ip}?fields=isp,org`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return { isp: null, org: null };
    const data = await res.json();
    return {
      isp: data.isp || null,
      org: data.org || null,
    };
  } catch {
    return { isp: null, org: null };
  }
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin) && process.env.NODE_ENV === "production") {
      return NextResponse.json({ ok: false }, { status: 403 });
    }

    const ip = getIp(request);

    // Skip tracking for owner IPs (comma-separated in env var)
    const excludedIps = (process.env.EXCLUDED_IPS || "").split(",").map((s) => s.trim()).filter(Boolean);
    if (excludedIps.includes(ip)) {
      return NextResponse.json({ ok: true });
    }

    // Skip bots and monitoring probes
    const ua = request.headers.get("user-agent") || "";
    if (
      !ua ||
      /bot|crawler|spider|vercel|uptimerobot|pingdom|statuscake|headlesschrome|lighthouse|slurp|facebookexternalhit|twitterbot|linkedinbot|googlebot|bingbot|yandex|baidu|semrush|ahref/i.test(ua)
    ) {
      return NextResponse.json({ ok: true });
    }

    const { success } = rateLimit(`track:${ip}`, { maxRequests: 30, windowMs: 60 * 1000 });
    if (!success) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    const body = await request.json();

    const eventType = sanitizeString(body.event_type, 50) || "page_view";
    const validEvents = ["page_view", "click", "download", "session_end"];
    if (!validEvents.includes(eventType)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    if (eventType === "session_end") {
      const visitorId = sanitizeString(body.visitor_id, 100);
      const duration = sanitizeInt(body.session_duration, 0, 86400, 0);
      const path = sanitizeString(body.path, 500);
      if (visitorId && duration && path) {
        await supabase
          .from("page_views")
          .update({ session_duration: duration })
          .eq("visitor_id", visitorId)
          .eq("path", path)
          .eq("event_type", "page_view")
          .is("session_duration", null)
          .order("created_at", { ascending: false })
          .limit(1);
      }
      return NextResponse.json({ ok: true });
    }

    const path = sanitizeString(body.path, 500);
    if (!path) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent")?.slice(0, 500) || "";
    const { browser, os, device_type } = parseUserAgent(userAgent);

    const country = request.headers.get("x-vercel-ip-country") || null;
    const city = request.headers.get("x-vercel-ip-city") || null;
    const region = request.headers.get("x-vercel-ip-country-region") || null;

    let isp: string | null = null;
    let org: string | null = null;
    if (eventType === "page_view") {
      const lookup = await lookupIp(ip);
      isp = lookup.isp;
      org = lookup.org;
    }

    // Skip cloud provider / monitoring traffic
    const orgLower = (org || isp || "").toLowerCase();
    if (/amazon|aws|google cloud|microsoft azure|digitalocean|vercel|cloudflare|hetzner/i.test(orgLower)) {
      return NextResponse.json({ ok: true });
    }

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
      visitor_id: sanitizeString(body.visitor_id, 100),
      ip_address: isValidPublicIp(ip) ? ip : null,
      isp,
      org,
      language: sanitizeString(body.language, 20),
      timezone: sanitizeString(body.timezone, 100),
      event_type: eventType,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Track API error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
