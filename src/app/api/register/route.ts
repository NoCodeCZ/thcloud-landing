import { NextRequest, NextResponse } from "next/server";
import { fireServerEvent, extractFbContext } from "@/lib/fb-capi";
import { captureLead } from "@/lib/lead-crm";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company } = body;

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Name, email, and company are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    await captureLead({
      formType: "webinar",
      source: "webinar",
      payload: body,
    });

    fireServerEvent({
      eventName: "CompleteRegistration",
      email,
      customData: { content_name: "Webinar Registration" },
      eventId: body.eventId,
      sourceUrl: request.headers.get("referer") || undefined,
      ...extractFbContext(request),
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Failed to register. Please try again." },
      { status: 500 }
    );
  }
}
