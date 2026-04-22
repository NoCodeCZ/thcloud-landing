import { NextRequest, NextResponse } from "next/server";
import { setAdminSessionCookie, validateAdminCredentials } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    username?: string;
    password?: string;
  };

  const username = body.username?.trim() || "";
  const password = body.password?.trim() || "";

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  setAdminSessionCookie(response, username);
  return response;
}
