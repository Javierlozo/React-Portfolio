import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { path, referrer } = await request.json();

    const userAgent = request.headers.get("user-agent") || null;
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || null;

    // Geo headers are set by Vercel automatically
    const country = request.headers.get("x-vercel-ip-country") || null;
    const city = request.headers.get("x-vercel-ip-city") || null;

    const { error } = await supabase.from("page_views").insert({
      path,
      referrer: referrer || null,
      user_agent: userAgent,
      country,
      city,
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
