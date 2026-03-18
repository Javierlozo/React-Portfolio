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

  // Verify token with Supabase
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const views = rows || [];

  // Time series (daily)
  const dailyMap: Record<string, number> = {};
  for (const row of views) {
    const date = row.created_at?.split("T")[0] || "unknown";
    dailyMap[date] = (dailyMap[date] || 0) + 1;
  }
  const timeSeries = Object.entries(dailyMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Top pages
  const topPages = countBy(views, "path").slice(0, 10);

  // Breakpoint distribution
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

  // Top referrers (filter out empty)
  const withReferrer = views.filter((r) => r.referrer);
  const referrerMap: Record<string, number> = {};
  for (const r of withReferrer) {
    referrerMap[r.referrer!] = (referrerMap[r.referrer!] || 0) + 1;
  }
  const topReferrers = Object.entries(referrerMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // UTM sources
  const withUtm = views.filter((r) => r.utm_source);
  const utmMap: Record<string, number> = {};
  for (const r of withUtm) {
    const key = [r.utm_source, r.utm_medium, r.utm_campaign].filter(Boolean).join(" / ");
    utmMap[key] = (utmMap[key] || 0) + 1;
  }
  const utmSources = Object.entries(utmMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return NextResponse.json({
    totalViews: views.length,
    uniquePages: new Set(views.map((r) => r.path)).size,
    topCountry: countBy(views, "country")[0]?.name || "N/A",
    topDevice: countBy(views, "device_type")[0]?.name || "N/A",
    timeSeries,
    topPages,
    browsers: countBy(views, "browser").slice(0, 8),
    devices: countBy(views, "device_type"),
    operatingSystems: countBy(views, "os").slice(0, 8),
    countries: countBy(views, "country").slice(0, 10),
    screenBreakpoints,
    topReferrers,
    utmSources,
  });
}
