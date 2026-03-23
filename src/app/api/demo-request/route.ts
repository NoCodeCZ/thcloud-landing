import { NextRequest, NextResponse } from "next/server";
import { createOrUpdateSubscriber } from "@/lib/listmonk";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role, industry, revenue, channels, challenge } = body;

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

    // Mock mode: if Listmonk is not configured
    if (!process.env.LISTMONK_URL || process.env.LISTMONK_URL === "http://localhost:9000") {
      console.log(`[MOCK] Demo request from: ${name} <${email}> at ${company} (${role})`);
      console.log(`[MOCK] Industry: ${industry}, Revenue: ${revenue}`);
      console.log(`[MOCK] Channels: ${channels?.join(", ")}`);
      console.log(`[MOCK] Challenge: ${challenge}`);
      return NextResponse.json({ success: true, mock: true });
    }

    const listId = parseInt(
      process.env.LISTMONK_BLUEPRINT_LIST_ID || "1",
      10
    );

    await createOrUpdateSubscriber(email, name, [listId], {
      company: company || "",
      role: role || "",
      industry: industry || "",
      revenue: revenue || "",
      channels: channels?.join(", ") || "",
      challenge: challenge || "",
      source: "demo-request",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo request error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
