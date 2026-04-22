"use client";

import { useEffect, useState } from "react";
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
  new: "border-sky-200 bg-sky-50 text-sky-700",
  contacted: "border-amber-200 bg-amber-50 text-amber-700",
  qualified: "border-violet-200 bg-violet-50 text-violet-700",
  proposal: "border-indigo-200 bg-indigo-50 text-indigo-700",
  won: "border-emerald-200 bg-emerald-50 text-emerald-700",
  lost: "border-rose-200 bg-rose-50 text-rose-700",
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

export function LeadKanbanBoard({ locale }: { locale: string }) {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});
  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingLeadId, setSavingLeadId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadLeads() {
    setError("");

    try {
      const response = await fetch("/api/leads", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to load leads");
      }

      const data = (await response.json()) as LeadApiResponse;
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
      setError(loadError instanceof Error ? loadError.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadLeads();
  }, []);

  async function saveLead(leadId: string, updates: { stage?: LeadStage; notes?: string }) {
    setSavingLeadId(leadId);
    setError("");

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

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
              Drag a card between columns or update it from the dropdown on the card.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
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
          <div className="mt-6 grid gap-4 overflow-x-auto xl:grid-cols-6">
            {stages.map((stage) => {
              const stageLeads = leads.filter((lead) => lead.stage === stage.id);

              return (
                <div
                  key={stage.id}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => handleStageDrop(stage.id)}
                  className="min-h-[520px] rounded-[28px] border border-white/10 bg-[#08111f]/55 p-4"
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

                        return (
                          <article
                            key={lead.id}
                            draggable
                            onDragStart={() => setDraggingLeadId(lead.id)}
                            onDragEnd={() => setDraggingLeadId(null)}
                            className="rounded-3xl border border-white/10 bg-white p-4 text-brand-title shadow-[0_18px_42px_rgba(15,23,42,0.16)]"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="text-base font-medium text-brand-title">
                                  {lead.name || lead.email}
                                </h3>
                                <p className="mt-1 text-sm text-brand-subtitle">
                                  {lead.company || "No company yet"}
                                </p>
                              </div>
                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                                {lead.latestFormType}
                              </span>
                            </div>

                            <div className="mt-4 space-y-2 text-sm text-brand-subtitle">
                              <p className="break-all">{lead.email}</p>
                              {lead.phone && <p>{lead.phone}</p>}
                              {(lead.role || lead.industry) && (
                                <p>{[lead.role, lead.industry].filter(Boolean).join(" • ")}</p>
                              )}
                              {lead.companySize && <p>{lead.companySize}</p>}
                            </div>

                            {summary && (
                              <p className="mt-4 rounded-2xl bg-slate-50 px-3 py-2 text-sm leading-relaxed text-slate-600">
                                {summary}
                              </p>
                            )}

                            <div className="mt-4 flex flex-wrap gap-2">
                              {lead.sources.map((source) => (
                                <span
                                  key={`${lead.id}-${source}`}
                                  className="rounded-full bg-brand-navy/8 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-brand-navy"
                                >
                                  {source}
                                </span>
                              ))}
                            </div>

                            <div className="mt-4 grid gap-2 text-xs text-slate-500">
                              <p>Updated {formatDate(lead.updatedAt, locale)}</p>
                              <p>{lead.submissionCount} form submission{lead.submissionCount === 1 ? "" : "s"}</p>
                            </div>

                            <div className="mt-4 space-y-2">
                              <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                Move stage
                              </label>
                              <select
                                value={lead.stage}
                                onChange={(event) =>
                                  void saveLead(lead.id, { stage: event.target.value as LeadStage })
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-brand-title outline-none transition-colors focus:border-brand-navy/30"
                              >
                                {stages.map((entry) => (
                                  <option key={entry.id} value={entry.id}>
                                    {entry.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="mt-4 space-y-2">
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
