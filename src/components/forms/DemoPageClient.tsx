"use client";

import { useState } from "react";
import Link from "next/link";
import { Monitor, Calendar, Check } from "lucide-react";
import { DemoForm } from "./DemoForm";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function DemoPageClient({
  locale,
  defaultEmail,
  formTranslations,
  submittedTranslations,
  demoTitle,
  demoSubtitle,
  calUrl,
  demoFeatures,
  backLabel,
  backHref,
  step1Label,
  step2Label,
}: {
  locale: string;
  defaultEmail?: string;
  formTranslations: any;
  submittedTranslations: { title: string; subtitle: string };
  demoTitle: string;
  demoSubtitle: string;
  calUrl: string;
  demoFeatures: string[];
  backLabel: string;
  backHref: string;
  step1Label: string;
  step2Label: string;
}) {
  const [phase, setPhase] = useState<"form" | "calendar">("form");

  return (
    <div className="px-6 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">

        {/* Phase indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            phase === "form"
              ? "bg-white text-brand-navy"
              : "bg-green-500/10 text-green-400"
          }`}>
            {phase === "calendar" ? (
              <Check className="w-4 h-4" />
            ) : (
              <span className="w-5 h-5 rounded-full bg-brand-navy/20 text-white text-xs flex items-center justify-center">1</span>
            )}
            {step1Label}
          </div>
          <div className="w-8 h-px bg-white/20" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            phase === "calendar"
              ? "bg-white text-brand-navy"
              : "bg-white/5 text-white/30"
          }`}>
            <span className="w-5 h-5 rounded-full bg-white/10 text-xs flex items-center justify-center">2</span>
            {step2Label}
          </div>
        </div>

        {phase === "form" ? (
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Left: pitch */}
            <div className="flex-1 space-y-6 lg:sticky lg:top-24">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-indigo-400" />
                </div>
                <h1 className="text-2xl md:text-3xl font-medium">{demoTitle}</h1>
              </div>
              <p className="text-sm text-white/50 font-[family-name:var(--font-prompt)] leading-relaxed">
                {demoSubtitle}
              </p>
              <p className="text-xs text-white/30 font-[family-name:var(--font-prompt)]">
                {formTranslations.intro}
              </p>

              <div className="space-y-3 pt-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-medium">
                  {locale === "th" ? "สิ่งที่คุณจะเห็นใน Demo" : "What you'll see in the demo"}
                </p>
                {demoFeatures.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-indigo-400/60" />
                    </div>
                    <p className="text-sm text-white/40 font-[family-name:var(--font-prompt)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: multi-step form */}
            <div className="w-full lg:max-w-lg shrink-0">
              <DemoForm
                translations={formTranslations}
                submittedTranslations={submittedTranslations}
                defaultEmail={defaultEmail}
                onSubmitted={() => setPhase("calendar")}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-medium">
                {locale === "th" ? "เลือกเวลาที่สะดวก" : "Pick a time that works"}
              </h2>
              <p className="text-sm text-white/40 font-[family-name:var(--font-prompt)]">
                {locale === "th"
                  ? "เลือกวันเวลาจากปฏิทินด้านล่าง เราจะยืนยันทางอีเมล"
                  : "Choose a date and time below. We'll confirm via email."}
              </p>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
              <iframe
                src={calUrl}
                className="w-full border-0"
                style={{ height: "680px" }}
                title="Book a Demo Call"
              />
            </div>
          </div>
        )}

        <div className="text-center pt-10">
          <Link href={backHref} className="text-sm text-white/20 hover:text-white/40 transition-colors">
            &larr; {backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
