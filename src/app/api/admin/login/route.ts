import { NextRequest, NextResponse } from "next/server";
import { setAdminSessionCookie, validateAdminCredentials } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; firstAt: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAt: now });
    return { blocked: false };
  }
  entry.count += 1;
  if (entry.count > MAX_ATTEMPTS) {
    return { blocked: true, retryAfter: Math.ceil((WINDOW_MS - (now - entry.firstAt)) / 1000) };
  }
  return { blocked: false };
}

function clientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  const limit = rateLimit(ip);
  if (limit.blocked) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 60) } }
    );
  }

  const body = (await request.json()) as {
    username?: string;
    password?: string;
  };

  const username = body.username?.trim() || "";
  const password = body.password?.trim() || "";

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  attempts.delete(ip);
  const response = NextResponse.json({ success: true });
  setAdminSessionCookie(response, username);
  return response;
}
