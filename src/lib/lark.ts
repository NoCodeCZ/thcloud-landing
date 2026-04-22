import type { LeadRecord, LeadSubmission } from "@/lib/lead-crm";

const LARK_LEAD_WEBHOOK_URL = process.env.LARK_LEAD_WEBHOOK_URL;

type LarkText = {
  tag: "lark_md";
  content: string;
};

type LarkField = {
  is_short: boolean;
  text: LarkText;
};

type LarkCard = {
  config: {
    wide_screen_mode: boolean;
    enable_forward: boolean;
  };
  header: {
    template: string;
    title: {
      tag: "plain_text";
      content: string;
    };
  };
  elements: Array<
    | {
        tag: "div";
        text: LarkText;
      }
    | {
        tag: "div";
        fields: LarkField[];
      }
    | {
        tag: "hr";
      }
    | {
        tag: "note";
        elements: LarkText[];
      }
  >;
};

const DEFAULT_VALUE = "Not provided";

const FIELD_LABELS: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone",
  lineId: "LINE ID",
  company: "Company",
  companySize: "Company size",
  industry: "Industry",
  role: "Role",
  revenue: "Revenue",
  challenge: "Challenge",
  aiExperience: "AI experience",
  expectedResult: "Expected result",
  kpi: "KPI",
  currentSoftware: "Current software",
  dataStorages: "Data sources",
  flexibility: "Flexibility",
  security: "Security",
  itTeam: "IT team",
  training: "Training",
  budget: "Budget",
  timeline: "Timeline",
  authority: "Authority",
  source: "Source",
  formType: "Form type",
  consent: "Consent",
  notes: "Notes",
  departmentPriorities: "Department priorities",
  mainProblems: "Main problems",
};

const FORM_META: Record<
  string,
  {
    label: string;
    template: string;
  }
> = {
  "blueprint-lead": {
    label: "Blueprint Lead",
    template: "blue",
  },
  "demo-request": {
    label: "Demo Request",
    template: "red",
  },
  webinar: {
    label: "Webinar Registration",
    template: "green",
  },
};

function escapeLarkText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/([*_`~\[\]()])/g, "\\$1");
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1)}…`;
}

function formatValue(value?: string) {
  const normalized = value?.trim();
  if (!normalized) {
    return DEFAULT_VALUE;
  }

  return truncate(normalized, 280);
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  }).format(date);
}

function titleCase(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function labelForField(key: string) {
  return FIELD_LABELS[key] || titleCase(key);
}

function asField(label: string, value?: string): LarkField {
  return {
    is_short: true,
    text: {
      tag: "lark_md",
      content: `**${escapeLarkText(label)}**\n${escapeLarkText(formatValue(value))}`,
    },
  };
}

function getPrimaryFields(lead: LeadRecord, submission: LeadSubmission) {
  const submittedName =
    submission.fields.name ||
    [submission.fields.firstName, submission.fields.lastName].filter(Boolean).join(" ").trim() ||
    lead.name;

  return [
    asField("Lead", submittedName),
    asField("Email", submission.fields.email || lead.email),
    asField("Phone", submission.fields.phone || submission.fields.lineId || lead.phone),
    asField("Company", submission.fields.company || lead.company),
    asField("Role", submission.fields.role || lead.role),
    asField("Industry", submission.fields.industry || lead.industry),
    asField("Company size", submission.fields.companySize || submission.fields.revenue || lead.companySize),
    asField("Submitted", formatDate(submission.submittedAt)),
  ];
}

function buildDetailLines(submission: LeadSubmission) {
  const detailEntries = Object.entries(submission.fields).filter(([key]) => {
    return ![
      "name",
      "firstName",
      "lastName",
      "email",
      "phone",
      "lineId",
      "company",
      "role",
      "industry",
      "companySize",
      "revenue",
    ].includes(key);
  });

  if (detailEntries.length === 0) {
    return "_No additional fields submitted._";
  }

  return detailEntries
    .map(([key, value]) => `- **${escapeLarkText(labelForField(key))}:** ${escapeLarkText(formatValue(value))}`)
    .join("\n");
}

function buildCard(lead: LeadRecord, submission: LeadSubmission): LarkCard {
  const meta = FORM_META[submission.formType] || {
    label: titleCase(submission.formType),
    template: "turquoise",
  };
  const repeatLabel = lead.submissionCount > 1 ? `Repeat lead (#${lead.submissionCount})` : "New lead";
  const leadLabel = escapeLarkText(lead.name || lead.email);
  const sourceLabel = escapeLarkText(formatValue(submission.source || lead.latestSource));

  return {
    config: {
      wide_screen_mode: true,
      enable_forward: true,
    },
    header: {
      template: meta.template,
      title: {
        tag: "plain_text",
        content: `${meta.label}: ${lead.name || lead.email}`,
      },
    },
    elements: [
      {
        tag: "div",
        text: {
          tag: "lark_md",
          content: `**${repeatLabel}** from **${sourceLabel}**\nCurrent stage: **${escapeLarkText(lead.stage)}**`,
        },
      },
      {
        tag: "div",
        fields: getPrimaryFields(lead, submission),
      },
      {
        tag: "hr",
      },
      {
        tag: "div",
        text: {
          tag: "lark_md",
          content: `**Submission details for ${leadLabel}**\n${buildDetailLines(submission)}`,
        },
      },
      {
        tag: "note",
        elements: [
          {
            tag: "lark_md",
            content: `Lead ID: \`${escapeLarkText(lead.id)}\``,
          },
          {
            tag: "lark_md",
            content: `Latest form: **${escapeLarkText(submission.formType)}**`,
          },
        ],
      },
    ],
  };
}

export async function notifyLarkLead(lead: LeadRecord, submission: LeadSubmission) {
  if (!LARK_LEAD_WEBHOOK_URL) {
    return { delivered: false, skipped: true as const };
  }

  const response = await fetch(LARK_LEAD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      msg_type: "interactive",
      card: buildCard(lead, submission),
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Lark webhook error (${response.status}): ${message}`);
  }

  const result = (await response.json().catch(() => null)) as
    | { code?: number; msg?: string; StatusCode?: number; StatusMessage?: string }
    | null;

  const errorCode = result?.code ?? result?.StatusCode ?? 0;
  if (errorCode !== 0) {
    const errorMessage = result?.msg ?? result?.StatusMessage ?? "Unknown Lark webhook error";
    throw new Error(`Lark webhook rejected the card (${errorCode}): ${errorMessage}`);
  }

  return { delivered: true as const };
}
