import { NextRequest, NextResponse } from "next/server";
import { createOrUpdateSubscriber } from "@/lib/listmonk";
import { fireServerEvent } from "@/lib/fb-capi";
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
      formType: "demo-request",
      source: body.source || "demo-request",
      payload: body,
    });

    // Mock mode
    if (!process.env.LISTMONK_URL || process.env.LISTMONK_URL === "http://localhost:9000") {
      console.log(`[MOCK] Demo request from: ${name} <${email}> at ${company}`);
      console.log(`[MOCK] Full data:`, JSON.stringify(body, null, 2));
      return NextResponse.json({ success: true, mock: true });
    }

    const listId = parseInt(process.env.LISTMONK_BLUEPRINT_LIST_ID || "1", 10);

    await createOrUpdateSubscriber(email, name, [listId], {
      company: company || "",
      role: body.role || "",
      industry: body.industry || "",
      companySize: body.companySize || "",
      phone: body.phone || "",
      lineId: body.lineId || "",
      aiExperience: body.aiExperience || "",
      departmentPriorities: JSON.stringify(body.departmentPriorities || {}),
      mainProblems: (body.mainProblems || []).join(", "),
      expectedResult: body.expectedResult || "",
      kpi: body.kpi || "",
      currentSoftware: body.currentSoftware || "",
      dataStorages: (body.dataStorages || []).join(", "),
      flexibility: body.flexibility || "",
      security: body.security || "",
      itTeam: body.itTeam || "",
      training: body.training || "",
      budget: body.budget || "",
      timeline: body.timeline || "",
      authority: body.authority || "",
      source: body.source || "",
      notes: body.notes || "",
      formType: "demo-request",
    });

    fireServerEvent({
      eventName: "SubmitApplication",
      email,
      customData: {
        content_name: "Demo Request",
        industry: body.industry || "",
        company_size: body.companySize || "",
      },
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo request error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
