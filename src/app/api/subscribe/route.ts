import { NextRequest, NextResponse } from "next/server";
import { fireServerEvent, extractFbContext } from "@/lib/fb-capi";
import { captureLead } from "@/lib/lead-crm";
import { validateLeadPayload } from "@/lib/lead-validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      firstName,
      company,
      phone,
      companySize,
      industry,
      role,
      consent,
      source,
    } = body;

    const validationError = validateLeadPayload({
      email,
      firstName,
      company,
      phone,
      companySize,
      industry,
      role,
      consent,
      source,
    });

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    await captureLead({
      formType: "blueprint-lead",
      source: source || "blueprint",
      payload: body,
    });

    fireServerEvent({
      eventName: "Lead",
      email,
      customData: { content_name: "AI Transformation Blueprint" },
      eventId: body.eventId,
      sourceUrl: request.headers.get("referer") || undefined,
      ...extractFbContext(request),
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
