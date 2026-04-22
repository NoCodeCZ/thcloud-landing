import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { notifyLarkLead } from "@/lib/lark";

export const LEAD_STAGES = [
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "qualified", label: "Qualified" },
  { id: "proposal", label: "Proposal" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
] as const;

export type LeadStage = (typeof LEAD_STAGES)[number]["id"];

export type LeadSubmission = {
  id: string;
  submittedAt: string;
  formType: string;
  source: string;
  fields: Record<string, string>;
};

export type LeadRecord = {
  id: string;
  email: string;
  name: string;
  company: string;
  phone: string;
  industry: string;
  role: string;
  companySize: string;
  stage: LeadStage;
  notes: string;
  createdAt: string;
  updatedAt: string;
  lastSubmissionAt: string;
  submissionCount: number;
  sources: string[];
  forms: string[];
  latestSource: string;
  latestFormType: string;
  submissions: LeadSubmission[];
};

type LeadStore = {
  leads: LeadRecord[];
};

type CaptureLeadInput = {
  formType: string;
  source?: string;
  payload: Record<string, unknown>;
};

type UpdateLeadInput = {
  stage?: LeadStage;
  notes?: string;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

const EMPTY_STORE: LeadStore = { leads: [] };

function isLeadStage(value: string): value is LeadStage {
  return LEAD_STAGES.some((stage) => stage.id === value);
}

function toText(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => toText(item))
      .filter(Boolean)
      .join(", ");
  }

  if (value && typeof value === "object") {
    return JSON.stringify(value);
  }

  return "";
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function compactFields(payload: Record<string, unknown>) {
  const fields: Record<string, string> = {};

  for (const [key, value] of Object.entries(payload)) {
    const text = toText(value);
    if (text) {
      fields[key] = text;
    }
  }

  return fields;
}

function deriveName(fields: Record<string, string>, email: string) {
  if (fields.name) {
    return fields.name;
  }

  const combined = [fields.firstName, fields.lastName].filter(Boolean).join(" ").trim();
  if (combined) {
    return combined;
  }

  return email.split("@")[0] ?? email;
}

function getSubmittedName(fields: Record<string, string>) {
  if (fields.name) {
    return fields.name;
  }

  return [fields.firstName, fields.lastName].filter(Boolean).join(" ").trim();
}

function mergeText(primary: string, fallback: string) {
  return primary || fallback;
}

function sortSubmissions(submissions: LeadSubmission[]) {
  return [...submissions].sort(
    (left, right) => new Date(right.submittedAt).getTime() - new Date(left.submittedAt).getTime()
  );
}

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function readStore(): Promise<LeadStore> {
  try {
    const raw = await readFile(LEADS_FILE, "utf8");
    const parsed = JSON.parse(raw) as LeadStore;
    return {
      leads: Array.isArray(parsed.leads) ? parsed.leads : [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return EMPTY_STORE;
    }

    throw error;
  }
}

async function writeStore(store: LeadStore) {
  await ensureDataDir();
  const tempFile = `${LEADS_FILE}.tmp`;
  await writeFile(tempFile, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  await rename(tempFile, LEADS_FILE);
}

export async function listLeads() {
  const store = await readStore();
  return [...store.leads].sort(
    (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
  );
}

export async function captureLead(input: CaptureLeadInput) {
  const store = await readStore();
  const fields = compactFields(input.payload);
  const email = fields.email.toLowerCase();

  if (!email) {
    throw new Error("Lead email is required");
  }

  const submittedAt = new Date().toISOString();
  const source = input.source || fields.source || input.formType;
  const submission: LeadSubmission = {
    id: randomUUID(),
    submittedAt,
    formType: input.formType,
    source,
    fields,
  };

  const existingLead = store.leads.find((lead) => lead.email === email);

  if (existingLead) {
    const nextLead: LeadRecord = {
      ...existingLead,
      name: mergeText(getSubmittedName(fields), existingLead.name),
      company: mergeText(fields.company, existingLead.company),
      phone: mergeText(fields.phone || fields.lineId, existingLead.phone),
      industry: mergeText(fields.industry, existingLead.industry),
      role: mergeText(fields.role, existingLead.role),
      companySize: mergeText(fields.companySize || fields.revenue, existingLead.companySize),
      updatedAt: submittedAt,
      lastSubmissionAt: submittedAt,
      submissionCount: existingLead.submissionCount + 1,
      sources: unique([...existingLead.sources, source]),
      forms: unique([...existingLead.forms, input.formType]),
      latestSource: source,
      latestFormType: input.formType,
      submissions: sortSubmissions([submission, ...existingLead.submissions]).slice(0, 12),
    };

    store.leads = store.leads.map((lead) => (lead.id === existingLead.id ? nextLead : lead));
    await writeStore(store);
    await notifyLarkLead(nextLead, submission).catch((error) => {
      console.error("Lark lead notification error:", error);
    });
    return nextLead;
  }

  const lead: LeadRecord = {
    id: randomUUID(),
    email,
    name: deriveName(fields, email),
    company: fields.company || "",
    phone: fields.phone || fields.lineId || "",
    industry: fields.industry || "",
    role: fields.role || "",
    companySize: fields.companySize || fields.revenue || "",
    stage: "new",
    notes: "",
    createdAt: submittedAt,
    updatedAt: submittedAt,
    lastSubmissionAt: submittedAt,
    submissionCount: 1,
    sources: unique([source]),
    forms: unique([input.formType]),
    latestSource: source,
    latestFormType: input.formType,
    submissions: [submission],
  };

  store.leads = [lead, ...store.leads];
  await writeStore(store);
  await notifyLarkLead(lead, submission).catch((error) => {
    console.error("Lark lead notification error:", error);
  });
  return lead;
}

export async function updateLead(id: string, updates: UpdateLeadInput) {
  const store = await readStore();
  const lead = store.leads.find((entry) => entry.id === id);

  if (!lead) {
    return null;
  }

  if (updates.stage && !isLeadStage(updates.stage)) {
    throw new Error("Invalid lead stage");
  }

  const nextLead: LeadRecord = {
    ...lead,
    stage: updates.stage ?? lead.stage,
    notes: updates.notes ?? lead.notes,
    updatedAt: new Date().toISOString(),
  };

  store.leads = store.leads.map((entry) => (entry.id === id ? nextLead : entry));
  await writeStore(store);
  return nextLead;
}

export function getLeadStages() {
  return LEAD_STAGES;
}

export function isValidLeadStage(value: string): value is LeadStage {
  return isLeadStage(value);
}
