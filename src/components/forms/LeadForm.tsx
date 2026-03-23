"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: email.split("@")[0], email, company: "" }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      router.push(`/${locale}/thank-you?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <input
          name="email"
          type="email"
          required
          placeholder={t.emailPlaceholder}
          className="flex-1 px-4 py-3 rounded-full bg-white text-brand-title text-sm border-0 outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-full bg-white text-brand-navy font-medium text-sm hover:scale-105 transition-transform duration-200 whitespace-nowrap disabled:opacity-60"
        >
          {loading ? t.submitting : t.submit}
        </button>
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </form>
    );
  }

  if (variant === "dark") {
    return (
      <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-sm">
        <input
          name="email"
          type="email"
          required
          placeholder={t.emailPlaceholder}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm outline-none placeholder:text-white/40 focus:border-indigo-400/50 transition-colors"
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 rounded-xl bg-white text-brand-navy font-medium text-sm hover:scale-[1.02] transition-transform duration-200 disabled:opacity-60"
        >
          {loading ? t.submitting : t.submit}
        </button>
        <p className="text-xs text-white/40 text-center">{t.footer}</p>
      </form>
    );
  }

  // default — white card variant for above-the-fold
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 space-y-4 w-full max-w-sm shadow-2xl shadow-black/20">
      <div className="space-y-1.5">
        <label htmlFor="hero-email" className="text-sm font-medium text-brand-title">
          {t.emailLabel}
        </label>
        <input
          id="hero-email"
          name="email"
          type="email"
          required
          placeholder={t.emailPlaceholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-brand-title text-sm outline-none focus:border-brand-navy/30 transition-colors placeholder:text-gray-400"
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
      <p className="text-xs text-gray-400 text-center">{t.footer}</p>
    </form>
  );
}
