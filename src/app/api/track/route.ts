import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { rateLimit } from "@/src/lib/rate-limit";
import { sanitizeString, sanitizeInt } from "@/src/lib/sanitize";
import { getIp } from "@/src/lib/get-ip";

const ALLOWED_ORIGINS = [
  "https://www.luislozoya.com",
  "https://luislozoya.com",
];


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


export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin) && process.env.NODE_ENV === "production") {
      return NextResponse.json({ ok: false }, { status: 403 });
    }

    // Read, never stored. `getIp` feeds the rate limiter and the owner-IP
    // exclusion below, both of which happen in memory and end with the
    // request. No column holds it any more.
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

    // Country only, off the edge header, which never touches an IP here.
    //
    // City and region came out with the IP address and the ISP lookup. A
    // country tells me whether anything is being read outside the US, which is
    // the question this was built to answer; a city and an ISP name identify a
    // person, and nothing here was reading them.
    const country = request.headers.get("x-vercel-ip-country") || null;

    // The cloud-provider filter went with the ISP lookup that fed it. The
    // user-agent bot check above already catches crawlers, monitoring probes
    // and headless browsers, which is most of what that filter was for.

    const { error } = await supabase.from("page_views").insert({
      path,
      referrer: sanitizeString(body.referrer, 2000),
      user_agent: userAgent || null,
      country,
      browser,
      os,
      device_type,
      screen_width: sanitizeInt(body.screen_width, 0, 10000, 0) || null,
      utm_source: sanitizeString(body.utm_source, 200),
      utm_medium: sanitizeString(body.utm_medium, 200),
      utm_campaign: sanitizeString(body.utm_campaign, 200),
      // Ephemeral: a per-page-load id from the browser, held in memory and
      // never written to a cookie, so a page view and its session_end can find
      // each other and nothing else can be joined to either.
      visitor_id: sanitizeString(body.visitor_id, 100),
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
