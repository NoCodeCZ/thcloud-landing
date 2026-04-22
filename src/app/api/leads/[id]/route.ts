import { NextRequest, NextResponse } from "next/server";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { isValidLeadStage, updateLead } from "@/lib/lead-crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as {
    stage?: string;
    notes?: string;
  };

  if (body.stage && !isValidLeadStage(body.stage)) {
    return NextResponse.json({ error: "Invalid lead stage" }, { status: 400 });
  }

  const stage = body.stage && isValidLeadStage(body.stage) ? body.stage : undefined;

  const lead = await updateLead(id, {
    stage,
    notes: typeof body.notes === "string" ? body.notes.trim() : undefined,
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(
    { lead },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
