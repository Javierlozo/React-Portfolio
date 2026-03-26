import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

function countBy<T>(arr: T[], key: keyof T): { name: string; count: number }[] {
  const map: Record<string, number> = {};
  for (const item of arr) {
    const val = (item[key] as string) || "Unknown";
    map[val] = (map[val] || 0) + 1;
  }
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: userData, error: authError } = await supabase.auth.getUser(token);
  if (authError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawDays = parseInt(request.nextUrl.searchParams.get("days") || "30", 10);
  const days = Number.isFinite(rawDays) ? Math.max(1, Math.min(365, rawDays)) : 30;

  let query = supabase.from("page_views").select("*").order("created_at", { ascending: false });

  if (days > 0) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    query = query.gte("created_at", cutoff.toISOString());
  }

  const { data: rows, error } = await query.limit(10000);

  if (error) {
    console.error("Analytics query error:", error);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }

  const allRows = rows || [];
  const views = allRows.filter((r) => r.event_type === "page_view" || !r.event_type);
  const events = allRows.filter((r) => r.event_type && r.event_type !== "page_view" && r.event_type !== "session_end");

  const dailyMap: Record<string, number> = {};
  for (const row of views) {
    const date = row.created_at?.split("T")[0] || "unknown";
    dailyMap[date] = (dailyMap[date] || 0) + 1;
  }
  const timeSeries = Object.entries(dailyMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const topPages = countBy(views, "path").slice(0, 10);
  const uniqueVisitors = new Set(views.map((r) => r.visitor_id).filter(Boolean)).size;

  const durations = views.map((r) => r.session_duration).filter((d): d is number => d != null && d > 0);
  const avgSessionDuration = durations.length > 0
    ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
    : 0;

  const recentVisitors = views.slice(0, 100).map((r) => ({
    id: r.id,
    time: r.created_at,
    path: r.path,
    ip_address: r.ip_address,
    city: r.city,
    region: r.region,
    country: r.country,
    org: r.org || r.isp,
    browser: r.browser,
    os: r.os,
    device_type: r.device_type,
    referrer: r.referrer,
    session_duration: r.session_duration,
    visitor_id: r.visitor_id?.slice(0, 8),
    language: r.language,
  }));

  const withOrg = views.filter((r) => r.org || r.isp);
  const orgMap: Record<string, number> = {};
  for (const r of withOrg) {
    const name = r.org || r.isp || "Unknown";
    orgMap[name] = (orgMap[name] || 0) + 1;
  }
  const topOrgs = Object.entries(orgMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  const withCity = views.filter((r) => r.city);
  const cityMap: Record<string, number> = {};
  for (const r of withCity) {
    const label = r.region ? `${r.city}, ${r.region}` : r.city!;
    cityMap[label] = (cityMap[label] || 0) + 1;
  }
  const topCities = Object.entries(cityMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const breakpoints = views
    .filter((r) => r.screen_width)
    .map((r) => {
      const w = r.screen_width!;
      if (w < 768) return { ...r, breakpoint: "Mobile (<768)" };
      if (w < 1024) return { ...r, breakpoint: "Tablet (768-1023)" };
      if (w < 1440) return { ...r, breakpoint: "Desktop (1024-1439)" };
      return { ...r, breakpoint: "Large (1440+)" };
    });
  const screenBreakpoints = countBy(breakpoints, "breakpoint" as never);

  const withReferrer = views.filter((r) => r.referrer);
  const referrerMap: Record<string, number> = {};
  for (const r of withReferrer) {
    referrerMap[r.referrer!] = (referrerMap[r.referrer!] || 0) + 1;
  }
  const topReferrers = Object.entries(referrerMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const withUtm = views.filter((r) => r.utm_source);
  const utmMap: Record<string, number> = {};
  for (const r of withUtm) {
    const key = [r.utm_source, r.utm_medium, r.utm_campaign].filter(Boolean).join(" / ");
    utmMap[key] = (utmMap[key] || 0) + 1;
  }
  const utmSources = Object.entries(utmMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const eventCounts = countBy(events, "event_type");
  const clickedItems = events
    .filter((r) => r.event_type === "click" || r.event_type === "download")
    .map((r) => r.path);
  const clickMap: Record<string, number> = {};
  for (const p of clickedItems) {
    if (p) clickMap[p] = (clickMap[p] || 0) + 1;
  }
  const topInteractions = Object.entries(clickMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topLanguages = countBy(views, "language" as never).slice(0, 8);

  return NextResponse.json({
    totalViews: views.length,
    uniqueVisitors,
    uniquePages: new Set(views.map((r) => r.path)).size,
    avgSessionDuration,
    topCountry: countBy(views, "country")[0]?.name || "N/A",
    topDevice: countBy(views, "device_type")[0]?.name || "N/A",
    timeSeries,
    topPages,
    browsers: countBy(views, "browser").slice(0, 8),
    devices: countBy(views, "device_type"),
    operatingSystems: countBy(views, "os").slice(0, 8),
    countries: countBy(views, "country").slice(0, 10),
    topCities,
    topOrgs,
    screenBreakpoints,
    topReferrers,
    utmSources,
    recentVisitors,
    eventCounts,
    topInteractions,
    topLanguages,
  });
}
