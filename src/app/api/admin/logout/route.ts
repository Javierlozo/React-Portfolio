import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/src/lib/rate-limit";
import { getIp } from "@/src/lib/get-ip";

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const { success } = rateLimit(`logout:${ip}`, { maxRequests: 10, windowMs: 60 * 1000 });
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
