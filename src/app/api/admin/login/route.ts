import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { rateLimit } from "@/src/lib/rate-limit";
import { getIp } from "@/src/lib/get-ip";

export async function POST(request: NextRequest) {
  try {
    const ip = getIp(request);
    const { success } = rateLimit(`login:${ip}`, { maxRequests: 5, windowMs: 60 * 1000 });
    if (!success) {
      return NextResponse.json({ error: "Too many attempts. Please wait." }, { status: 429 });
    }

    const { email, password } = await request.json();

    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ ok: true });

    response.cookies.set("admin_token", data.session.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
