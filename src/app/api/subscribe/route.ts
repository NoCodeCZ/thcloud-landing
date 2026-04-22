import { NextRequest, NextResponse } from "next/server";
import { fireServerEvent, extractFbContext } from "@/lib/fb-capi";
import { captureLead } from "@/lib/lead-crm";

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

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const requiresBusinessDetails =
      source === "blueprint-hero-form" ||
      Boolean(firstName || company || phone || companySize || industry || role);

    if (requiresBusinessDetails) {
      const hasMissingRequiredDetails =
        !firstName || !company || !phone || !companySize || !industry || !role;

      if (hasMissingRequiredDetails || !consent) {
        return NextResponse.json(
          {
            error:
              "First name, company, phone, company size, industry, role, and consent are required",
          },
          { status: 400 }
        );
      }
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
