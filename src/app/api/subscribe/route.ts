import { NextRequest, NextResponse } from "next/server";
import { createOrUpdateSubscriber } from "@/lib/listmonk";
import { fireServerEvent } from "@/lib/fb-capi";
import { captureLead } from "@/lib/lead-crm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      firstName,
      lastName,
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

    await captureLead({
      formType: "blueprint-lead",
      source: source || "blueprint",
      payload: body,
    });

    // Mock mode: if Listmonk is not configured, skip the API call
    if (!process.env.LISTMONK_URL || process.env.LISTMONK_URL === "http://localhost:9000") {
      console.log(`[MOCK] Would subscribe: ${email}`);
      return NextResponse.json({ success: true, mock: true });
    }

    const listId = parseInt(
      process.env.LISTMONK_BLUEPRINT_LIST_ID || "1",
      10
    );

    await createOrUpdateSubscriber(email, name || email.split("@")[0], [listId], {
      company: company || "",
      firstName: firstName || "",
      lastName: lastName || "",
      phone: phone || "",
      companySize: companySize || "",
      industry: industry || "",
      role: role || "",
      consent: consent ? "true" : "false",
      source: source || "blueprint",
      formType: "blueprint-lead",
    });

    fireServerEvent({
      eventName: "Lead",
      email,
      customData: { content_name: "AI Transformation Blueprint" },
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
