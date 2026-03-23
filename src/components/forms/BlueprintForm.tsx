"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BlueprintFormTranslations = {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyOptional: string;
  companyPlaceholder: string;
  submit: string;
  submitting: string;
  footer: string;
};

const defaultTranslations: BlueprintFormTranslations = {
  nameLabel: "Full Name",
  namePlaceholder: "Your full name",
  emailLabel: "Work Email",
  emailPlaceholder: "you@company.com",
  companyLabel: "Company Name",
  companyOptional: "(optional)",
  companyPlaceholder: "Your company",
  submit: "Get the Free Blueprint",
  submitting: "Sending...",
  footer: "Sent to your email instantly. No spam. Unsubscribe anytime.",
};

export function BlueprintForm({
  translations,
  secondaryCta,
}: {
  translations?: BlueprintFormTranslations;
  secondaryCta?: { text: string; href: string };
}) {
  const t = translations ?? defaultTranslations;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const company = form.get("company") as string;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/blueprint/read");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[40px] p-8 md:p-10 space-y-5 w-full max-w-md"
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="text-brand-title">
          {t.nameLabel}
        </Label>
        <Input
          id="name"
          name="name"
          required
          placeholder={t.namePlaceholder}
          className="border-gray-200 text-brand-title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-brand-title">
          {t.emailLabel}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t.emailPlaceholder}
          className="border-gray-200 text-brand-title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="text-brand-title">
          {t.companyLabel}{" "}
          <span className="text-brand-subtitle font-normal">{t.companyOptional}</span>
        </Label>
        <Input
          id="company"
          name="company"
          placeholder={t.companyPlaceholder}
          className="border-gray-200 text-brand-title"
        />
      </div>

      {error && (
        <p className="text-brand-alert text-sm">{error}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-navy text-white hover:bg-brand-navy/90 h-12 text-base font-medium"
      >
        {loading ? t.submitting : t.submit}
      </Button>

      <p className="text-xs text-brand-subtitle text-center">
        {t.footer}
      </p>

      {secondaryCta && (
        <div className="pt-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-brand-subtitle">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <a
            href={secondaryCta.href}
            className="block w-full text-center text-sm text-brand-navy/70 hover:text-brand-navy font-medium py-2 transition-colors duration-200"
          >
            {secondaryCta.text} &rarr;
          </a>
        </div>
      )}
    </form>
  );
}
