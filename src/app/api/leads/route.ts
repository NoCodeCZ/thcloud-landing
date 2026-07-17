import { NextRequest, NextResponse } from "next/server";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { getLeadStages, listLeads, type LeadRecord } from "@/lib/lead-crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CSV_COLUMNS: Array<{ key: string; header: string; value: (lead: LeadRecord) => string }> = [
  { key: "id", header: "id", value: (l) => l.id },
  { key: "createdAt", header: "createdAt", value: (l) => l.createdAt },
  { key: "lastSubmissionAt", header: "lastSubmissionAt", value: (l) => l.lastSubmissionAt },
  { key: "name", header: "name", value: (l) => l.name },
  { key: "email", header: "email", value: (l) => l.email },
  { key: "phone", header: "phone", value: (l) => l.phone },
  { key: "company", header: "company", value: (l) => l.company },
  { key: "role", header: "role", value: (l) => l.role },
  { key: "industry", header: "industry", value: (l) => l.industry },
  { key: "companySize", header: "companySize", value: (l) => l.companySize },
  { key: "stage", header: "stage", value: (l) => l.stage },
  { key: "submissionCount", header: "submissionCount", value: (l) => String(l.submissionCount) },
  { key: "latestFormType", header: "latestFormType", value: (l) => l.latestFormType },
  { key: "latestSource", header: "latestSource", value: (l) => l.latestSource },
  { key: "forms", header: "forms", value: (l) => l.forms.join("|") },
  { key: "sources", header: "sources", value: (l) => l.sources.join("|") },
  { key: "notes", header: "notes", value: (l) => l.notes },
];

function csvEscape(value: string): string {
  if (value === "") return "";
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toCsv(leads: LeadRecord[]): string {
  const header = CSV_COLUMNS.map((c) => c.header).join(",");
  const rows = leads.map((lead) =>
    CSV_COLUMNS.map((c) => csvEscape(c.value(lead) ?? "")).join(",")
  );
  return [header, ...rows].join("\r\n");
}

export async function GET(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const format = request.nextUrl.searchParams.get("format");
  const leads = await listLeads();

  if (format === "csv") {
    const csv = toCsv(leads);
    const filename = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    return new NextResponse("﻿" + csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  }

  const stages = getLeadStages();
  return NextResponse.json(
    { leads, stages },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
