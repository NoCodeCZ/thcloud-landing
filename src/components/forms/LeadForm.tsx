"use client";

import { LoaderCircle, ShieldCheck, Sparkles } from "lucide-react";
import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { fbqTrack } from "@/components/tracking/FacebookCAPI";

export function LeadForm({
  translations,
  locale,
  variant = "default",
}: {
  translations: {
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
    footer: string;
  };
  locale: string;
  variant?: "default" | "inline" | "dark";
}) {
  const t = translations;
  const isThai = locale === "th";
  const router = useRouter();
  const emailFieldId = useId();
  const errorId = useId();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formCopy = isThai
    ? {
        badge: "ส่งฟรีทางอีเมล",
        title: "รับ Blueprint พร้อมภาพรวมระบบที่ทีมคุณนำไปคุยต่อได้ทันที",
        bullets: [
          "โครงสร้าง 3 ชั้น: Data, Intelligence และ AI Interface",
          "ตัวอย่าง use case ที่เชื่อมกับข้อมูลธุรกิจจริง",
          "เช็กลิสต์เพื่อประเมินความพร้อมก่อนลงมือ",
        ],
        reassurance: "ใช้ Business Email เพื่อให้ทีมเราส่งรายละเอียดกลับได้ถูกต้อง",
      }
    : {
        badge: "Free email delivery",
        title: "Get the blueprint your team can use to align architecture and next steps.",
        bullets: [
          "A clear 3-layer system map for your rollout",
          "Real examples of AI connected to live business data",
          "A readiness checklist to guide implementation",
        ],
        reassurance: "Use your business email so we can send the blueprint and follow-up details.",
      };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: email.split("@")[0], email, company: "" }),
      });

      const data = await res.json();

      // If API returns mock mode or success, redirect to thank you
      if (data.mock || res.ok) {
        fbqTrack("Lead", { content_name: "AI Transformation Blueprint" });
        router.push(`/${locale}/thank-you?email=${encodeURIComponent(email)}`);
        return;
      }

      throw new Error(data.error || "Something went wrong");
    } catch (err) {
      if (err instanceof Error && err.message.includes("mock")) {
        router.push(`/${locale}/thank-you?email=${encodeURIComponent(email)}`);
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

  // default — white card variant for above-the-fold
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md overflow-hidden rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_28px_90px_rgba(15,23,42,0.32)] md:p-7"
    >
      <div className="mb-5 rounded-[22px] bg-slate-950 px-5 py-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
          <span className="text-[11px] font-medium tracking-[0.18em] text-white/70 uppercase">
            {formCopy.badge}
          </span>
        </div>
        <h2 className="text-lg font-medium leading-snug text-white">
          {formCopy.title}
        </h2>
        <ul className="mt-4 space-y-2.5">
          {formCopy.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70"
            >
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor={emailFieldId} className="text-sm font-medium text-brand-title">
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
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-brand-title outline-none transition-colors placeholder:text-slate-400 focus:border-brand-navy/35 focus:bg-white"
        />
      </div>
        {error && (
          <p id={errorId} className="text-red-500 text-xs" aria-live="polite">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-navy px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
        >
          {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {loading ? t.submitting : t.submit}
        </button>
        <div className="space-y-1 text-center">
          <p className="text-sm text-slate-600">{t.footer}</p>
          <p className="text-xs text-slate-500">{formCopy.reassurance}</p>
        </div>
      </div>
    </form>
  );
}
