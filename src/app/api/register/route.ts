import { NextRequest, NextResponse } from "next/server";
import { createOrUpdateSubscriber } from "@/lib/listmonk";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, industry, revenue, challenge } = body;

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

    const listId = parseInt(
      process.env.LISTMONK_WEBINAR_LIST_ID || "2",
      10
    );

    await createOrUpdateSubscriber(email, name, [listId], {
      company,
      industry: industry || "",
      revenue: revenue || "",
      challenge: challenge || "",
      source: "webinar",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Failed to register. Please try again." },
      { status: 500 }
    );
  }
}
