"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function DemoForm({
  translations,
  submittedTranslations,
  defaultEmail,
  onSubmitted,
}: {
  translations: any;
  submittedTranslations: { title: string; subtitle: string };
  defaultEmail?: string;
  onSubmitted?: () => void;
}) {
  const t = translations;
  const s = t.sections;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    email: defaultEmail || "",
    departmentPriorities: {} as Record<string, string>,
    mainProblems: [] as string[],
    dataStorages: [] as string[],
  });

  const totalSteps = 5;

  function update(key: string, value: any) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleArrayItem(key: string, item: string) {
    setFormData((prev) => {
      const arr = (prev[key] || []) as string[];
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item],
      };
    });
  }

  function setDeptPriority(dept: string, level: string) {
    setFormData((prev) => ({
      ...prev,
      departmentPriorities: { ...prev.departmentPriorities, [dept]: level },
    }));
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.mock || res.ok) {
        if (onSubmitted) {
          onSubmitted();
        } else {
          setSubmitted(true);
        }
        return;
      }
      throw new Error(data.error || "Something went wrong");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7 text-green-500" />
        </div>
        <h3 className="text-xl font-medium text-brand-title">{submittedTranslations.title}</h3>
        <p className="text-sm text-brand-subtitle font-[family-name:var(--font-prompt)]">
          {submittedTranslations.subtitle}
        </p>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-brand-title text-sm outline-none focus:border-brand-navy/30 transition-colors placeholder:text-gray-400";
  const labelCls = "text-sm font-medium text-brand-title";
  const selectCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-brand-title text-sm outline-none focus:border-brand-navy/30 transition-colors bg-white";

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 w-full shadow-2xl shadow-black/20">
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-6">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i + 1 <= step ? "bg-brand-navy" : "bg-gray-100"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-base font-medium text-brand-title">{s.s1.title}</h3>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s1.nameLabel} *</label>
            <input className={inputCls} value={formData.name || ""} onChange={(e) => update("name", e.target.value)} placeholder={s.s1.namePlaceholder} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelCls}>{s.s1.roleLabel} *</label>
              <input className={inputCls} value={formData.role || ""} onChange={(e) => update("role", e.target.value)} placeholder={s.s1.rolePlaceholder} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>{s.s1.companyLabel} *</label>
              <input className={inputCls} value={formData.company || ""} onChange={(e) => update("company", e.target.value)} placeholder={s.s1.companyPlaceholder} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelCls}>{s.s1.industryLabel} *</label>
              <select className={selectCls} value={formData.industry || ""} onChange={(e) => update("industry", e.target.value)}>
                <option value="" disabled>{s.s1.industryPlaceholder}</option>
                {s.s1.industries.map((ind: string) => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>{s.s1.companySizeLabel} *</label>
              <select className={selectCls} value={formData.companySize || ""} onChange={(e) => update("companySize", e.target.value)}>
                <option value="" disabled>{s.s1.companySizePlaceholder}</option>
                {s.s1.companySizes.map((sz: string) => <option key={sz} value={sz}>{sz}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelCls}>{s.s1.phoneLabel} *</label>
              <input className={inputCls} value={formData.phone || ""} onChange={(e) => update("phone", e.target.value)} placeholder={s.s1.phonePlaceholder} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>{s.s1.emailLabel} *</label>
              <input className={inputCls} type="email" value={formData.email || ""} onChange={(e) => update("email", e.target.value)} placeholder={s.s1.emailPlaceholder} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s1.lineLabel}</label>
            <input className={inputCls} value={formData.lineId || ""} onChange={(e) => update("lineId", e.target.value)} placeholder={s.s1.linePlaceholder} />
          </div>
        </div>
      )}

      {/* Step 2: AI Needs & Goals */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-base font-medium text-brand-title">{s.s2.title}</h3>
            <p className="text-xs text-brand-subtitle mt-1 font-[family-name:var(--font-prompt)]">{s.s2.subtitle}</p>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s2.aiExperienceLabel} *</label>
            <div className="space-y-2">
              {s.s2.aiExperiences.map((exp: string) => (
                <label key={exp} className="flex items-center gap-2.5 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${formData.aiExperience === exp ? "border-brand-navy bg-brand-navy" : "border-gray-300 group-hover:border-gray-400"}`}>
                    {formData.aiExperience === exp && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm text-brand-title font-[family-name:var(--font-prompt)]">{exp}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className={labelCls}>{s.s2.departmentsLabel} *</label>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left py-1.5 pr-2 text-brand-subtitle font-medium" />
                    {s.s2.priorityLevels.map((level: string) => (
                      <th key={level} className="text-center py-1.5 px-1 text-brand-subtitle font-medium whitespace-nowrap">{level}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.s2.departments.map((dept: string) => (
                    <tr key={dept} className="border-t border-gray-50">
                      <td className="py-2 pr-2 text-brand-title font-[family-name:var(--font-prompt)]">{dept}</td>
                      {s.s2.priorityLevels.map((level: string) => (
                        <td key={level} className="text-center py-2 px-1">
                          <button
                            type="button"
                            onClick={() => setDeptPriority(dept, level)}
                            className={`w-5 h-5 rounded-full border-2 transition-colors ${
                              (formData.departmentPriorities || {})[dept] === level ? "border-brand-navy bg-brand-navy" : "border-gray-300 hover:border-gray-400"
                            }`}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-2">
            <label className={labelCls}>{s.s2.mainProblemLabel} *</label>
            <div className="flex flex-wrap gap-2">
              {s.s2.mainProblems.map((p: string) => (
                <button key={p} type="button" onClick={() => toggleArrayItem("mainProblems", p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    (formData.mainProblems || []).includes(p) ? "bg-brand-navy text-white border-brand-navy" : "bg-white text-brand-subtitle border-gray-200 hover:border-brand-navy/30"
                  }`}>{p}</button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s2.expectedResultLabel} *</label>
            <textarea className={inputCls + " resize-none"} rows={2} value={formData.expectedResult || ""} onChange={(e) => update("expectedResult", e.target.value)} placeholder={s.s2.expectedResultPlaceholder} />
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s2.kpiLabel} *</label>
            <textarea className={inputCls + " resize-none"} rows={2} value={formData.kpi || ""} onChange={(e) => update("kpi", e.target.value)} placeholder={s.s2.kpiPlaceholder} />
          </div>
        </div>
      )}

      {/* Step 3: Technical & Current Systems */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-base font-medium text-brand-title">{s.s3.title}</h3>
            <p className="text-xs text-brand-subtitle mt-1 font-[family-name:var(--font-prompt)]">{s.s3.subtitle}</p>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s3.currentSoftwareLabel} *</label>
            <textarea className={inputCls + " resize-none"} rows={3} value={formData.currentSoftware || ""} onChange={(e) => update("currentSoftware", e.target.value)} placeholder={s.s3.currentSoftwarePlaceholder} />
          </div>
          <div className="space-y-2">
            <label className={labelCls}>{s.s3.dataStorageLabel} *</label>
            <div className="flex flex-wrap gap-2">
              {s.s3.dataStorages.map((ds: string) => (
                <button key={ds} type="button" onClick={() => toggleArrayItem("dataStorages", ds)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    (formData.dataStorages || []).includes(ds) ? "bg-brand-navy text-white border-brand-navy" : "bg-white text-brand-subtitle border-gray-200 hover:border-brand-navy/30"
                  }`}>{ds}</button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s3.flexibilityLabel} *</label>
            <div className="space-y-2">
              {s.s3.flexibilities.map((f: string) => (
                <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${formData.flexibility === f ? "border-brand-navy bg-brand-navy" : "border-gray-300 group-hover:border-gray-400"}`}>
                    {formData.flexibility === f && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm text-brand-title font-[family-name:var(--font-prompt)]">{f}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s3.securityLabel}</label>
            <input className={inputCls} value={formData.security || ""} onChange={(e) => update("security", e.target.value)} placeholder={s.s3.securityPlaceholder} />
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s3.itTeamLabel} *</label>
            <div className="space-y-2">
              {s.s3.itTeams.map((it: string) => (
                <label key={it} className="flex items-center gap-2.5 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${formData.itTeam === it ? "border-brand-navy bg-brand-navy" : "border-gray-300 group-hover:border-gray-400"}`}>
                    {formData.itTeam === it && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm text-brand-title font-[family-name:var(--font-prompt)]">{it}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s3.trainingLabel} *</label>
            <div className="space-y-2">
              {s.s3.trainings.map((tr: string) => (
                <label key={tr} className="flex items-center gap-2.5 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${formData.training === tr ? "border-brand-navy bg-brand-navy" : "border-gray-300 group-hover:border-gray-400"}`}>
                    {formData.training === tr && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm text-brand-title font-[family-name:var(--font-prompt)]">{tr}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Project Considerations */}
      {step === 4 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-base font-medium text-brand-title">{s.s4.title}</h3>
            <p className="text-xs text-brand-subtitle mt-1 font-[family-name:var(--font-prompt)]">{s.s4.subtitle}</p>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s4.budgetLabel} *</label>
            <select className={selectCls} value={formData.budget || ""} onChange={(e) => update("budget", e.target.value)}>
              <option value="" disabled>{s.s4.budgetPlaceholder}</option>
              {s.s4.budgets.map((b: string) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s4.timelineLabel} *</label>
            <div className="space-y-2">
              {s.s4.timelines.map((tl: string) => (
                <label key={tl} className="flex items-center gap-2.5 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${formData.timeline === tl ? "border-brand-navy bg-brand-navy" : "border-gray-300 group-hover:border-gray-400"}`}>
                    {formData.timeline === tl && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm text-brand-title font-[family-name:var(--font-prompt)]">{tl}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s4.authorityLabel} *</label>
            <div className="space-y-2">
              {s.s4.authorities.map((a: string) => (
                <label key={a} className="flex items-center gap-2.5 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${formData.authority === a ? "border-brand-navy bg-brand-navy" : "border-gray-300 group-hover:border-gray-400"}`}>
                    {formData.authority === a && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm text-brand-title font-[family-name:var(--font-prompt)]">{a}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Additional Info */}
      {step === 5 && (
        <div className="space-y-5">
          <h3 className="text-base font-medium text-brand-title">{s.s5.title}</h3>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s5.sourceLabel} *</label>
            <div className="flex flex-wrap gap-2">
              {s.s5.sources.map((src: string) => (
                <button key={src} type="button" onClick={() => update("source", src)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    formData.source === src ? "bg-brand-navy text-white border-brand-navy" : "bg-white text-brand-subtitle border-gray-200 hover:border-brand-navy/30"
                  }`}>{src}</button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>{s.s5.notesLabel}</label>
            <textarea className={inputCls + " resize-none"} rows={3} value={formData.notes || ""} onChange={(e) => update("notes", e.target.value)} placeholder={s.s5.notesPlaceholder} />
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-3">{error}</p>}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        {step > 1 ? (
          <button type="button" onClick={() => setStep(step - 1)}
            className="px-4 py-2 text-sm text-brand-subtitle hover:text-brand-title transition-colors">
            {t.back}
          </button>
        ) : <div />}

        {step < totalSteps ? (
          <button type="button" onClick={() => setStep(step + 1)}
            className="px-6 py-2.5 rounded-xl bg-brand-navy text-white text-sm font-medium hover:bg-brand-navy/90 transition-colors">
            {t.next}
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-brand-navy text-white text-sm font-medium hover:bg-brand-navy/90 transition-colors disabled:opacity-60">
            {loading ? t.submitting : t.submit}
          </button>
        )}
      </div>

      <p className="text-[10px] text-gray-400 text-center mt-3">
        {step}/{totalSteps} — {t.footer}
      </p>
    </div>
  );
}
