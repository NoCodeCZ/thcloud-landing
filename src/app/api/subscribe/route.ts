import { NextRequest, NextResponse } from "next/server";
import { createOrUpdateSubscriber } from "@/lib/listmonk";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company } = body;

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

    const listId = parseInt(
      process.env.LISTMONK_BLUEPRINT_LIST_ID || "1",
      10
    );

    await createOrUpdateSubscriber(email, name || email.split("@")[0], [listId], {
      company: company || "",
      source: "blueprint",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
