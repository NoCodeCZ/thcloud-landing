"use client";

import { useRouter } from "next/navigation";
import { LoaderCircle, ShieldCheck, Sparkles } from "lucide-react";
import { useId, useState } from "react";
import { fbqTrack } from "@/components/tracking/FacebookCAPI";
import { validateLeadPayload } from "@/lib/lead-validation";

type LeadFormTranslations = {
  emailLabel: string;
  emailPlaceholder: string;
  submit: string;
  submitting: string;
  footer: string;
  defaultBadge: string;
  defaultTitle: string;
  defaultIntro: string;
  requiredHint: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  companySizeLabel: string;
  companySizePlaceholder: string;
  companySizes: readonly string[];
  industryLabel: string;
  industryPlaceholder: string;
  industries: readonly string[];
  roleLabel: string;
  rolePlaceholder: string;
  roles: readonly string[];
  consentLabel: string;
  consentHint: string;
  privacyText: string;
  reassurance: string;
  guardrailHint: string;
  expandCta: string;
  progressiveHint: string;
  optionalDetailsCta: string;
  optionalDetailsHideCta: string;
};

export function LeadForm({
  translations,
  locale,
  variant = "default",
  collapsible = false,
}: {
  translations: LeadFormTranslations;
  locale: string;
  variant?: "default" | "inline" | "dark";
  collapsible?: boolean;
}) {
  const t = translations;
  const router = useRouter();
  const emailFieldId = useId();
  const errorId = useId();
  const firstNameId = useId();
  const phoneId = useId();
  const companyId = useId();
  const companySizeId = useId();
  const industryId = useId();
  const roleId = useId();
  const consentId = useId();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(!collapsible || variant !== "default");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const firstName = String(form.get("firstName") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const companySize = String(form.get("companySize") ?? "").trim();
    const industry = String(form.get("industry") ?? "").trim();
    const role = String(form.get("role") ?? "").trim();
    const consent = form.get("consent") === "on";

    const isSimpleVariant = variant === "inline" || variant === "dark";
    const payload = isSimpleVariant
      ? {
          name: email.split("@")[0],
          email,
          company: "",
        }
      : {
          name: firstName,
          email,
          company,
          firstName,
          phone,
          companySize,
          industry,
          role,
          consent,
          source: "blueprint-hero-form",
        };

    const validationError = validateLeadPayload(payload);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const eventId =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, eventId }),
      });

      const data = await res.json();

      if (data.mock || res.ok) {
        fbqTrack("Lead", { content_name: "AI Transformation Blueprint" }, eventId);
        router.push(`/${locale}/blueprint/read?email=${encodeURIComponent(email)}`);
        return;
      }

      throw new Error(data.error || "Something went wrong");
    } catch (err) {
      if (err instanceof Error && err.message.includes("mock")) {
        router.push(`/${locale}/blueprint/read?email=${encodeURIComponent(email)}`);
        return;
      }
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <input
          id={emailFieldId}
          name="email"
          type="email"
          required
          placeholder={t.emailPlaceholder}
          autoComplete="email"
          inputMode="email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="flex-1 px-4 py-3 rounded-full bg-white text-brand-title text-sm border-0 outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-brand-navy font-medium text-sm hover:scale-105 transition-transform duration-200 whitespace-nowrap disabled:opacity-60"
        >
          {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {loading ? t.submitting : t.submit}
        </button>
        {error && (
          <p id={errorId} className="text-red-400 text-xs sm:basis-full" aria-live="polite">
            {error}
          </p>
        )}
      </form>
    );
  }

  if (variant === "dark") {
    return (
      <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-sm">
        <input
          id={emailFieldId}
          name="email"
          type="email"
          required
          placeholder={t.emailPlaceholder}
          autoComplete="email"
          inputMode="email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm outline-none placeholder:text-white/40 focus:border-indigo-400/50 focus:bg-white/12 transition-colors"
        />
        {error && (
          <p id={errorId} className="text-red-400 text-xs" aria-live="polite">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-navy font-medium text-sm hover:scale-[1.02] transition-transform duration-200 disabled:opacity-60"
        >
          {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {loading ? t.submitting : t.submit}
        </button>
        <p className="text-sm text-white/58 text-center">{t.footer}</p>
      </form>
    );
  }

  const labelCls = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500";
  const inputCls =
    "w-full rounded-2xl border border-slate-200/90 bg-slate-50/90 px-4 py-3.5 text-sm text-brand-title outline-none transition-colors placeholder:text-slate-400 focus:border-brand-navy/35 focus:bg-white";
  const selectCls = `${inputCls} appearance-none pr-10`;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl overflow-hidden rounded-[30px] border border-white/10 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.35)]"
    >
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0f1230_0%,#171b46_58%,#1e2b66_100%)] px-6 py-6 text-white md:px-7">
        <div className="absolute inset-y-0 right-[-4rem] w-48 bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.32),transparent_70%)] blur-2xl" />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
            <span className="text-[11px] font-medium tracking-[0.18em] text-white/72 uppercase">
              {t.defaultBadge}
            </span>
          </div>
          <h2 className="max-w-lg text-xl font-medium leading-tight text-white md:text-[1.55rem]">
            {t.defaultTitle}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/68 font-[family-name:var(--font-prompt)]">
            {t.defaultIntro}
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5 text-xs text-white/78">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
              <span>{t.reassurance}</span>
            </div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
              {t.requiredHint}
            </div>
          </div>
        </div>
      </div>

      {!expanded ? (
        <div className="space-y-4 p-6 md:p-7">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-navy px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-brand-navy/92"
          >
            {t.expandCta}
          </button>
          <div className="space-y-1 text-center">
            <p className="text-sm text-slate-600">{t.footer}</p>
            <p className="text-xs text-slate-500">{t.reassurance}</p>
          </div>
        </div>
      ) : (
      <div className="space-y-5 p-6 md:p-7">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor={firstNameId} className={labelCls}>
              {t.firstNameLabel}
            </label>
            <input
              id={firstNameId}
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              placeholder={t.firstNamePlaceholder}
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor={companyId} className={labelCls}>
              {t.companyLabel}
            </label>
            <input
              id={companyId}
              name="company"
              type="text"
              required
              autoComplete="organization"
              placeholder={t.companyPlaceholder}
              className={inputCls}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor={emailFieldId} className={labelCls}>
              {t.emailLabel}
            </label>
            <input
              id={emailFieldId}
              name="email"
              type="email"
              required
              placeholder={t.emailPlaceholder}
              autoComplete="email"
              inputMode="email"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor={phoneId} className={labelCls}>
              {t.phoneLabel}
            </label>
            <input
              id={phoneId}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder={t.phonePlaceholder}
              className={inputCls}
            />
          </div>
          <div className="relative">
            <label htmlFor={companySizeId} className={labelCls}>
              {t.companySizeLabel}
            </label>
            <select
              id={companySizeId}
              name="companySize"
              required
              defaultValue=""
              className={selectCls}
            >
              <option value="" disabled>
                {t.companySizePlaceholder}
              </option>
              {t.companySizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-[2.75rem] text-slate-400">⌄</div>
          </div>
          <div className="relative">
            <label htmlFor={industryId} className={labelCls}>
              {t.industryLabel}
            </label>
            <select
              id={industryId}
              name="industry"
              required
              defaultValue=""
              className={selectCls}
            >
              <option value="" disabled>
                {t.industryPlaceholder}
              </option>
              {t.industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-[2.75rem] text-slate-400">⌄</div>
          </div>
          <div className="relative">
            <label htmlFor={roleId} className={labelCls}>
              {t.roleLabel}
            </label>
            <select
              id={roleId}
              name="role"
              required
              defaultValue=""
              className={selectCls}
            >
              <option value="" disabled>
                {t.rolePlaceholder}
              </option>
              {t.roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-[2.75rem] text-slate-400">⌄</div>
          </div>
        </div>

        <div className="rounded-[24px] border border-emerald-100 bg-emerald-50/70 p-4 text-xs leading-relaxed text-emerald-900 font-[family-name:var(--font-prompt)]">
          {t.guardrailHint}
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50/75 p-4">
          <label htmlFor={consentId} className="flex items-start gap-3 cursor-pointer">
            <input
              id={consentId}
              name="consent"
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-navy focus:ring-brand-navy"
            />
            <span className="space-y-1">
              <span className="block text-sm font-medium text-brand-title">{t.consentLabel}</span>
              <span className="block text-xs leading-relaxed text-slate-500 font-[family-name:var(--font-prompt)]">
                {t.consentHint} {t.privacyText}
              </span>
            </span>
          </label>
        </div>

        {error && (
          <p id={errorId} className="text-xs text-red-500" aria-live="polite">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-navy px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-brand-navy/92 disabled:opacity-60"
        >
          {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {loading ? t.submitting : t.submit}
        </button>

        <div className="space-y-1 text-center">
          <p className="text-sm text-slate-600">{t.footer}</p>
          <p className="text-xs text-slate-500">{t.reassurance}</p>
        </div>
      </div>
      )}
    </form>
  );
}
