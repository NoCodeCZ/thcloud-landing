"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import type { LeadRecord, LeadStage } from "@/lib/lead-crm";

type Stage = {
  id: LeadStage;
  label: string;
};

type LeadApiResponse = {
  leads: LeadRecord[];
  stages: Stage[];
};

const stageTheme: Record<LeadStage, string> = {
  lead: "border-sky-200 bg-sky-50 text-sky-700",
  moved_to_lark: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getLeadSummary(lead: LeadRecord) {
  const latestSubmission = lead.submissions[0];
  if (!latestSubmission) {
    return "";
  }

  const fields = latestSubmission.fields;

  return (
    fields.expectedResult ||
    fields.challenge ||
    fields.mainProblems ||
    fields.notes ||
    fields.currentSoftware ||
    ""
  );
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

export function LeadKanbanBoard({ locale }: { locale: string }) {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});
  const [expandedLeadIds, setExpandedLeadIds] = useState<Record<string, boolean>>({});
  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingLeadId, setSavingLeadId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadLeads() {
      setError("");

      try {
        const response = await fetch("/api/leads", { cache: "no-store" });
        if (response.status === 401) {
          router.replace(`/${locale}/crm/login`);
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to load leads");
        }

        const data = (await response.json()) as LeadApiResponse;

        if (!active) {
          return;
        }

        setLeads(data.leads);
        setStages(data.stages);
        setDraftNotes((current) => {
          const next = { ...current };
          for (const lead of data.leads) {
            if (!(lead.id in next)) {
              next[lead.id] = lead.notes;
            }
          }
          return next;
        });
      } catch (loadError) {
        if (!active) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : "Failed to load leads");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadLeads();

    return () => {
      active = false;
    };
  }, [locale, router]);

  async function saveLead(leadId: string, updates: { stage?: LeadStage; notes?: string }) {
    setSavingLeadId(leadId);
    setError("");

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (response.status === 401) {
        router.replace(`/${locale}/crm/login`);
        return;
      }

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Failed to update lead");
      }

      const data = (await response.json()) as { lead: LeadRecord };
      setLeads((current) =>
        current
          .map((lead) => (lead.id === leadId ? data.lead : lead))
          .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime())
      );
      setDraftNotes((current) => ({ ...current, [leadId]: data.lead.notes }));
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to update lead");
    } finally {
      setSavingLeadId(null);
    }
  }

  function handleStageDrop(stage: LeadStage) {
    if (!draggingLeadId) {
      return;
    }

    const currentLead = leads.find((lead) => lead.id === draggingLeadId);
    setDraggingLeadId(null);

    if (!currentLead || currentLead.stage === stage) {
      return;
    }

    void saveLead(draggingLeadId, { stage });
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace(`/${locale}/crm/login`);
    router.refresh();
  }

  function toggleLeadExpanded(leadId: string) {
    setExpandedLeadIds((current) => ({
      ...current,
      [leadId]: !current[leadId],
    }));
  }

  return (
    <section className="mx-auto w-full max-w-[1600px] px-6 pb-12">
      <div className="rounded-[32px] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
              Lead CRM
            </p>
            <h1 className="text-3xl font-medium text-white md:text-4xl">
              Lead board fed directly by your live forms
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-white/68">
              Every submission from the blueprint, webinar, and demo forms is stored here automatically.
              Keep leads in the board until they are handed off, then move them to Lark. Cards stay compact
              and expand only when you need notes or the full submission context.
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/8 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/12"
            >
              Log out
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stages.map((stage) => {
              const count = leads.filter((lead) => lead.stage === stage.id).length;
              return (
                <div
                  key={stage.id}
                  className="rounded-2xl border border-white/10 bg-black/12 px-4 py-3"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">{stage.label}</p>
                  <p className="mt-1 text-2xl font-medium text-white">{count}</p>
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-sm text-white/60">Loading leads...</div>
        ) : (
          <div className="mt-6 grid gap-4 overflow-x-auto lg:grid-cols-2">
            {stages.map((stage) => {
              const stageLeads = leads.filter((lead) => lead.stage === stage.id);

              return (
                <div
                  key={stage.id}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => handleStageDrop(stage.id)}
                  className="min-h-[460px] rounded-[28px] border border-white/10 bg-[#08111f]/55 p-4"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-medium text-white">{stage.label}</h2>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/38">
                        {stageLeads.length} leads
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${stageTheme[stage.id]}`}
                    >
                      {stage.label}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {stageLeads.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/35">
                        Drop leads here.
                      </div>
                    ) : (
                      stageLeads.map((lead) => {
                        const noteValue = draftNotes[lead.id] ?? lead.notes;
                        const noteChanged = noteValue !== lead.notes;
                        const summary = getLeadSummary(lead);
                        const isExpanded = Boolean(expandedLeadIds[lead.id]);
                        const quickSummary = truncateText(summary, 120);

                        return (
                          <article
                            key={lead.id}
                            draggable
                            onDragStart={() => setDraggingLeadId(lead.id)}
                            onDragEnd={() => setDraggingLeadId(null)}
                            className="rounded-[26px] border border-white/10 bg-white px-4 py-3.5 text-brand-title shadow-[0_16px_32px_rgba(15,23,42,0.14)] transition-shadow hover:shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <h3 className="truncate text-[15px] font-semibold text-brand-title">
                                  {lead.name || lead.email}
                                </h3>
                                <p className="mt-1 truncate text-sm text-brand-subtitle">
                                  {lead.company || "No company yet"}
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                  {lead.latestFormType}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => toggleLeadExpanded(lead.id)}
                                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
                                >
                                  {isExpanded ? (
                                    <>
                                      Collapse
                                      <ChevronUp className="h-3.5 w-3.5" />
                                    </>
                                  ) : (
                                    <>
                                      Expand
                                      <ChevronDown className="h-3.5 w-3.5" />
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="truncate rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                                {lead.email}
                              </span>
                              {lead.phone && (
                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                                  {lead.phone}
                                </span>
                              )}
                            </div>

                            {(lead.role || lead.industry || lead.companySize) && (
                              <p className="mt-3 text-xs text-slate-500">
                                {[lead.role, lead.industry, lead.companySize].filter(Boolean).join(" • ")}
                              </p>
                            )}

                            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                              <p>Updated {formatDate(lead.updatedAt, locale)}</p>
                              <p>
                                {lead.submissionCount} form submission{lead.submissionCount === 1 ? "" : "s"}
                              </p>
                            </div>

                            {quickSummary && (
                              <p className="mt-3 rounded-2xl bg-slate-50 px-3 py-2 text-sm leading-relaxed text-slate-600">
                                {quickSummary}
                              </p>
                            )}

                            <div className="mt-3 flex flex-wrap gap-2">
                              {lead.sources.map((source) => (
                                <span
                                  key={`${lead.id}-${source}`}
                                  className="rounded-full bg-brand-navy/8 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-brand-navy"
                                >
                                  {source}
                                </span>
                              ))}
                            </div>

                            {isExpanded && (
                              <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
                                {summary && (
                                  <p className="rounded-2xl bg-slate-50 px-3 py-3 text-sm leading-relaxed text-slate-600">
                                    {summary}
                                  </p>
                                )}

                                <div className="space-y-2">
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                    Stage
                                  </p>
                                  <div className="grid grid-cols-2 gap-2">
                                    {stages.map((entry) => {
                                      const isActive = lead.stage === entry.id;
                                      return (
                                        <button
                                          key={entry.id}
                                          type="button"
                                          disabled={isActive || savingLeadId === lead.id}
                                          onClick={() => void saveLead(lead.id, { stage: entry.id })}
                                          className={`rounded-2xl border px-3 py-2 text-sm font-medium transition-colors ${
                                            isActive
                                              ? `${stageTheme[entry.id]} cursor-default`
                                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                          } disabled:cursor-not-allowed disabled:opacity-70`}
                                        >
                                          {entry.label}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                    Internal notes
                                  </label>
                                  <textarea
                                    value={noteValue}
                                    onChange={(event) =>
                                      setDraftNotes((current) => ({
                                        ...current,
                                        [lead.id]: event.target.value,
                                      }))
                                    }
                                    rows={3}
                                    placeholder="Add context, next step, or owner notes..."
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-brand-title outline-none transition-colors placeholder:text-slate-400 focus:border-brand-navy/30 focus:bg-white"
                                  />
                                  <button
                                    type="button"
                                    disabled={!noteChanged || savingLeadId === lead.id}
                                    onClick={() => void saveLead(lead.id, { notes: noteValue })}
                                    className="inline-flex items-center justify-center rounded-2xl bg-brand-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/92 disabled:cursor-not-allowed disabled:opacity-45"
                                  >
                                    {savingLeadId === lead.id ? "Saving..." : "Save note"}
                                  </button>
                                </div>
                              </div>
                            )}
                          </article>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
