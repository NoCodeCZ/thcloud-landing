import { NextRequest, NextResponse } from "next/server";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { getLeadStages, listLeads } from "@/lib/lead-crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [leads, stages] = await Promise.all([listLeads(), Promise.resolve(getLeadStages())]);

  return NextResponse.json(
    { leads, stages },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
