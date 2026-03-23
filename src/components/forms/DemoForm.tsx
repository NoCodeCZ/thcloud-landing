"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type DemoFormTranslations = {
  nameLabel: string;
  namePlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  roleLabel: string;
  rolePlaceholder: string;
  industryLabel: string;
  industryPlaceholder: string;
  industries: readonly string[];
  revenueLabel: string;
  revenuePlaceholder: string;
  revenueRanges: readonly string[];
  channelsLabel: string;
  channelsPlaceholder: string;
  channels: readonly string[];
  challengeLabel: string;
  challengePlaceholder: string;
  submit: string;
  submitting: string;
  footer: string;
};

type SubmittedTranslations = {
  title: string;
  subtitle: string;
};

export function DemoForm({
  translations,
  submittedTranslations,
  defaultEmail,
  onSubmitted,
}: {
  translations: DemoFormTranslations;
  submittedTranslations: SubmittedTranslations;
  defaultEmail?: string;
  onSubmitted?: () => void;
}) {
  const t = translations;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  function toggleChannel(channel: string) {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const payload = {
      name: form.get("name") as string,
      email: defaultEmail || form.get("email") as string,
      company: form.get("company") as string,
      role: form.get("role") as string,
      industry: form.get("industry") as string,
      revenue: form.get("revenue") as string,
      channels: selectedChannels,
      challenge: form.get("challenge") as string,
    };

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      if (err instanceof Error && err.message.includes("mock")) {
        if (onSubmitted) {
          onSubmitted();
        } else {
          setSubmitted(true);
        }
        return;
      }
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

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 md:p-8 space-y-4 w-full shadow-2xl shadow-black/20"
    >
      {/* Name */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-brand-title">{t.nameLabel}</label>
        <input
          name="name"
          required
          placeholder={t.namePlaceholder}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-brand-title text-sm outline-none focus:border-brand-navy/30 transition-colors placeholder:text-gray-400"
        />
      </div>

      {/* Email (hidden, pre-filled from query param) */}
      {defaultEmail && (
        <input type="hidden" name="email" value={defaultEmail} />
      )}

      {/* Company + Role row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-brand-title">{t.companyLabel}</label>
          <input
            name="company"
            required
            placeholder={t.companyPlaceholder}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-brand-title text-sm outline-none focus:border-brand-navy/30 transition-colors placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-brand-title">{t.roleLabel}</label>
          <input
            name="role"
            placeholder={t.rolePlaceholder}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-brand-title text-sm outline-none focus:border-brand-navy/30 transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Industry + Revenue row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-brand-title">{t.industryLabel}</label>
          <select
            name="industry"
            defaultValue=""
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-brand-title text-sm outline-none focus:border-brand-navy/30 transition-colors bg-white appearance-none"
          >
            <option value="" disabled className="text-gray-400">{t.industryPlaceholder}</option>
            {t.industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-brand-title">{t.revenueLabel}</label>
          <select
            name="revenue"
            defaultValue=""
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-brand-title text-sm outline-none focus:border-brand-navy/30 transition-colors bg-white appearance-none"
          >
            <option value="" disabled className="text-gray-400">{t.revenuePlaceholder}</option>
            {t.revenueRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Channels — multi-select chips */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-brand-title">{t.channelsLabel}</label>
        <div className="flex flex-wrap gap-2">
          {t.channels.map((channel) => {
            const selected = selectedChannels.includes(channel);
            return (
              <button
                key={channel}
                type="button"
                onClick={() => toggleChannel(channel)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  selected
                    ? "bg-brand-navy text-white border-brand-navy"
                    : "bg-white text-brand-subtitle border-gray-200 hover:border-brand-navy/30"
                }`}
              >
                {channel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Challenge */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-brand-title">{t.challengeLabel}</label>
        <textarea
          name="challenge"
          rows={3}
          placeholder={t.challengePlaceholder}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-brand-title text-sm outline-none focus:border-brand-navy/30 transition-colors placeholder:text-gray-400 resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 rounded-xl bg-brand-navy text-white font-medium text-sm hover:bg-brand-navy/90 transition-colors disabled:opacity-60"
      >
        {loading ? t.submitting : t.submit}
      </button>

      <p className="text-[11px] text-gray-400 text-center">{t.footer}</p>
    </form>
  );
}
