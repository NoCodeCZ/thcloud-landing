import { NextResponse } from "next/server";
import { getLeadStages, listLeads } from "@/lib/lead-crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
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
