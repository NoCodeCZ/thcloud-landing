"use client";

import { useState } from "react";
import { fbqTrack } from "@/components/tracking/FacebookCAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThankYouState } from "@/components/sections/ThankYouState";

type WebinarFormTranslations = {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  industryLabel: string;
  industryPlaceholder: string;
  industries: readonly string[];
  revenueLabel: string;
  revenuePlaceholder: string;
  revenueRanges: readonly string[];
  challengeLabel: string;
  challengeOptional: string;
  challengePlaceholder: string;
  submit: string;
  submitting: string;
  footer: string;
};

type ThankYouTranslations = {
  title: string;
  emailNotice: string;
  whileYouWait: string;
  downloadPdf: string;
  followLinkedin: string;
};

const defaultTranslations: WebinarFormTranslations = {
  nameLabel: "Full Name",
  namePlaceholder: "Your full name",
  emailLabel: "Work Email",
  emailPlaceholder: "you@company.com",
  companyLabel: "Company Name",
  companyPlaceholder: "Your company",
  industryLabel: "Industry",
  industryPlaceholder: "Select your industry",
  industries: ["Manufacturing", "Retail", "B2B Services", "Other"],
  revenueLabel: "Company Revenue Range",
  revenuePlaceholder: "Select revenue range",
  revenueRanges: [
    "Under 50M THB",
    "50-200M THB",
    "200M-1B THB",
    "Above 1B THB",
  ],
  challengeLabel: "What is your biggest AI challenge right now?",
  challengeOptional: "(optional)",
  challengePlaceholder: "Tell us about your current challenges...",
  submit: "Reserve My Free Spot",
  submitting: "Registering...",
  footer: "Free to watch. We will email you when the webinar is live. No spam.",
};

export function WebinarForm({
  translations,
  thankYouTranslations,
}: {
  translations?: WebinarFormTranslations;
  thankYouTranslations?: ThankYouTranslations;
}) {
  const t = translations ?? defaultTranslations;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [revenue, setRevenue] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const company = form.get("company") as string;
    const challenge = form.get("challenge") as string;

    try {
      const eventId =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          industry,
          revenue,
          challenge,
          eventId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      fbqTrack("CompleteRegistration", { content_name: "Webinar Registration" }, eventId);
      setSubmittedEmail(email);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return <ThankYouState email={submittedEmail} translations={thankYouTranslations} />;
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
          {t.companyLabel}
        </Label>
        <Input
          id="company"
          name="company"
          required
          placeholder={t.companyPlaceholder}
          className="border-gray-200 text-brand-title"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-brand-title">{t.industryLabel}</Label>
        <Select onValueChange={setIndustry}>
          <SelectTrigger className="border-gray-200 text-brand-title">
            <SelectValue placeholder={t.industryPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {t.industries.map((ind) => (
              <SelectItem key={ind} value={ind}>
                {ind}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-brand-title">{t.revenueLabel}</Label>
        <Select onValueChange={setRevenue}>
          <SelectTrigger className="border-gray-200 text-brand-title">
            <SelectValue placeholder={t.revenuePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {t.revenueRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="challenge" className="text-brand-title">
          {t.challengeLabel}{" "}
          <span className="text-brand-subtitle font-normal">{t.challengeOptional}</span>
        </Label>
        <Textarea
          id="challenge"
          name="challenge"
          placeholder={t.challengePlaceholder}
          className="border-gray-200 text-brand-title min-h-[80px]"
        />
      </div>

      {error && <p className="text-brand-alert text-sm">{error}</p>}

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
    </form>
  );
}
