import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LeadForm } from "@/components/forms/LeadForm";
import { TrustLogos } from "@/components/sections/TrustLogos";
import { StickyCTA } from "@/components/sections/StickyCTA";
import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";
import {
  Database,
  BarChart3,
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  Check,
  X,
  HelpCircle,
  Server,
  Brain,
  Monitor,
  Sparkles,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
    alternates: {
      languages: { th: "/th", en: "/en", "x-default": "/th" },
    },
  };
}

const problemIcons = [Database, MessageSquare, Brain];
const layerIcons = [Server, BarChart3, Monitor];
const diffIcons = [Zap, Globe, Sparkles, Shield];
const landingImages = {
  hero: "/landing/hero-banner.jpg",
  dataFoundation: "/landing/data-foundation.jpg",
  dataIntelligence: "/landing/data-intelligence.jpg",
  aiInterface: "/landing/ai-interface.jpg",
  processImplement: "/landing/process-implement.jpg",
  results: "/landing/results.jpg",
  techStack: "/landing/tech-stack.jpg",
} as const;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.home;
  const heroHighlights = t.whatWeBuild.layers.map((layer, index) => ({
    label: layer.name,
    Icon: layerIcons[index],
  }));

  return (
    <>
      <main className="min-h-screen bg-brand-dark text-white">
        <Navbar locale={locale} ctaLabel={t.ctaButton} />

        {/* ═══════════════════════════════════════════════════════
            HERO — Form above the fold
        ═══════════════════════════════════════════════════════ */}
        <section className="relative px-6 pt-8 pb-20 md:pt-20 md:pb-28 overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-indigo-600/8 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/15 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-sm font-medium text-indigo-200 tracking-wide">
                  {t.hero.tagline}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-medium leading-[1.1] mb-6 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
                {t.hero.headline}
              </h1>
              <p className="text-base md:text-xl text-white/72 leading-relaxed font-[family-name:var(--font-prompt)] max-w-xl mx-auto lg:mx-0 mb-8">
                {t.hero.subhead}
              </p>
              {/* Hero visual */}
              <div className="relative max-w-2xl mx-auto lg:mx-0">
                <div className="absolute -inset-x-10 -inset-y-8 rounded-[40px] bg-gradient-to-r from-indigo-500/20 via-sky-400/10 to-cyan-400/10 blur-3xl pointer-events-none" />
                <div className="absolute inset-x-4 inset-y-6 rounded-[34px] bg-gradient-to-br from-white/8 via-indigo-400/8 to-transparent blur-2xl pointer-events-none" />

                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-2 shadow-[0_28px_90px_rgba(15,23,42,0.65)]">
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/18 via-white/6 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 rounded-[30px] ring-1 ring-inset ring-indigo-300/10 pointer-events-none" />
                  <Image
                    src={landingImages.hero}
                    alt="เปลียนข้อมูลที่กระจัดกระจายให้กลายเป็นระบบธุรกิจ"
                    width={1200}
                    height={514}
                    className="w-full rounded-[26px] border border-white/6 object-cover saturate-[1.08] contrast-[1.03]"
                    priority
                  />
                </div>

                <div className="mt-5 hidden md:grid grid-cols-3 gap-3">
                  {heroHighlights.map(({ label, Icon }) => (
                    <div
                      key={label}
                      className="flex min-w-0 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-xl shadow-[0_18px_50px_rgba(15,23,42,0.35)]"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-indigo-300" />
                      <span className="text-center text-xs font-medium text-white/85">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full max-w-xl shrink-0 scroll-mt-24" id="lead-form-hero">
              <LeadForm translations={t.form} locale={locale} collapsible progressive />
            </div>
          </div>
        </section>

        {/* Trust Logos */}
        <section className="px-6 pb-16">
          <TrustLogos label={dict.components.trustLogos.label} />
        </section>

        {/* ═══════════════════════════════════════════════════════
            WHO THIS IS FOR
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 py-16 md:py-24 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.22em] text-indigo-200/75 mb-3 font-medium">{t.sectionLabels.targetAudience}</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-10">{t.whoIsFor.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.whoIsFor.items.map((item, i) => (
                <div key={i} className="flex gap-3 items-start bg-white/[0.02] rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="text-base text-white/80 font-[family-name:var(--font-prompt)] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-white/65 italic font-[family-name:var(--font-prompt)] text-center text-base">{t.whoIsFor.closing}</p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CORE PROBLEM
        ═══════════════════════════════════════════════════════ */}
        <section id="problem" className="px-6 py-16 md:py-24 border-t border-white/5 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.22em] text-red-300/75 mb-3 font-medium">{t.sectionLabels.theChallenge}</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-12">{t.coreProblem.title}</h2>
            <div className="space-y-6">
              {t.coreProblem.problems.map((p, i) => {
                const Icon = problemIcons[i];
                return (
                  <div key={i} className="flex gap-4 items-start bg-white/[0.02] rounded-2xl p-5 md:p-6 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-indigo-300/70" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-medium mb-2">{p.title}</h3>
                      <p className="text-base text-white/78 font-[family-name:var(--font-prompt)] leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 p-5 rounded-2xl bg-red-500/[0.04] border border-red-500/10">
              <p className="text-white/78 font-[family-name:var(--font-prompt)] flex items-start gap-3 text-base leading-relaxed">
                <AlertTriangle className="w-5 h-5 text-red-400/60 shrink-0 mt-0.5" />
                {t.coreProblem.result}
              </p>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="px-6 pb-16 flex flex-col items-center scroll-mt-24" id="lead-form-inline">
          <LeadForm translations={t.form} locale={locale} variant="inline" />
          <p className="mt-4 text-sm text-white/55">{t.form.footer}</p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            WHAT WE BUILD — 3 LAYERS
        ═══════════════════════════════════════════════════════ */}
        <section id="solution" className="px-6 py-16 md:py-24 border-t border-white/5 scroll-mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.02] to-transparent pointer-events-none" />
          <div className="relative max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.22em] text-indigo-200/75 mb-3 font-medium">{t.sectionLabels.ourSolution}</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-3">{t.whatWeBuild.title}</h2>
            <p className="mb-14 text-lg text-white/72 font-[family-name:var(--font-prompt)] leading-relaxed">{t.whatWeBuild.subtitle}</p>

            <div className="space-y-20">
              {t.whatWeBuild.layers.map((layer, i) => {
                const Icon = layerIcons[i];
                return (
                  <div key={i} className="relative">
                    {/* Layer number accent */}
                    <div className="absolute -left-4 md:-left-12 top-0 text-[80px] font-bold text-white/[0.02] leading-none select-none pointer-events-none">
                      {layer.number}
                    </div>

                    {/* Layer header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-200/75 font-medium">
                          Layer {layer.number}
                        </p>
                        <h3 className="text-xl font-medium">{layer.name}</h3>
                      </div>
                    </div>
                    <p className="mb-3 pl-14 text-base text-indigo-100/75 italic">{layer.tagline}</p>
                    <p className="mb-6 text-base text-white/76 font-[family-name:var(--font-prompt)] leading-relaxed">
                      {layer.description}
                    </p>

                    {/* Layer visual */}
                    <div className="mb-6">
                      <Image
                        src={
                          i === 0
                            ? landingImages.dataFoundation
                            : i === 1
                            ? landingImages.dataIntelligence
                            : landingImages.aiInterface
                        }
                        alt={layer.name}
                        width={1200}
                        height={675}
                        className="w-full rounded-2xl"
                      />
                    </div>

                    {/* Layer 1: data sources table */}
                    {"sources" in layer && layer.sources && (
                      <div className="overflow-x-auto mb-6 bg-white/[0.02] rounded-xl border border-white/5 p-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-2 pr-4 text-white/60 font-medium text-[11px] uppercase tracking-wider">Source</th>
                              <th className="text-left py-2 pr-4 text-white/60 font-medium text-[11px] uppercase tracking-wider">Method</th>
                              <th className="text-left py-2 text-white/60 font-medium text-[11px] uppercase tracking-wider">Data</th>
                            </tr>
                          </thead>
                          <tbody>
                            {layer.sources.map((s, j) => (
                              <tr key={j} className="border-b border-white/[0.03]">
                                <td className="py-2.5 pr-4 text-white/82 font-[family-name:var(--font-prompt)] text-sm">{s.source}</td>
                                <td className="py-2.5 pr-4 text-indigo-200/80 font-[family-name:var(--font-prompt)] text-sm">{s.method}</td>
                                <td className="py-2.5 text-white/72 font-[family-name:var(--font-prompt)] text-sm leading-relaxed">{s.data}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {"output" in layer && layer.output && (
                      <p className="mb-4 pl-1 text-sm text-white/68 font-[family-name:var(--font-prompt)] leading-relaxed">{layer.output}</p>
                    )}

                    {/* Layer 2: dashboards + agent examples */}
                    {"dashboards" in layer && layer.dashboards && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                        {layer.dashboards.map((d, j) => (
                          <div key={j} className="bg-white/[0.03] rounded-xl p-4 border border-white/5 hover:border-indigo-500/15 transition-colors">
                            <h4 className="mb-3 text-sm font-medium text-indigo-100 uppercase tracking-wider">{d.name}</h4>
                            <ul className="space-y-1.5">
                              {d.items.map((item, k) => (
                                <li key={k} className="flex gap-1.5 items-start text-sm text-white/74 font-[family-name:var(--font-prompt)] leading-relaxed">
                                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-300/65" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {"agentExamples" in layer && layer.agentExamples && (
                      <div className="bg-gradient-to-br from-indigo-500/[0.04] to-transparent rounded-xl p-5 border border-indigo-500/10">
                        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-indigo-100/70 font-medium">
                          {t.sectionLabels.aiAgentExamples}
                        </p>
                        <div className="space-y-2.5">
                          {layer.agentExamples.map((ex, j) => (
                            <p key={j} className="border-l-2 border-indigo-400/25 pl-3 text-base text-white/78 italic font-[family-name:var(--font-prompt)] leading-relaxed">
                              {ex}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Layer 3: team & admin features */}
                    {"teamFeatures" in layer && layer.teamFeatures && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div className="bg-white/[0.02] rounded-xl p-5 border border-white/5">
                          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium">{t.sectionLabels.yourTeamGets}</p>
                          <ul className="space-y-2.5">
                            {layer.teamFeatures.map((f, j) => (
                              <li key={j} className="flex gap-2 items-start text-sm text-white/76 font-[family-name:var(--font-prompt)] leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-indigo-400/60 shrink-0 mt-0.5" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white/[0.02] rounded-xl p-5 border border-white/5">
                          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium">{t.sectionLabels.youControl}</p>
                          <ul className="space-y-2.5">
                            {("adminFeatures" in layer ? layer.adminFeatures : []).map((f, j) => (
                              <li key={j} className="flex gap-2 items-start text-sm text-white/76 font-[family-name:var(--font-prompt)] leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-indigo-400/60 shrink-0 mt-0.5" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {layer.tech.map((tech) => (
                        <span key={tech} className="rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/65 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            TIMELINE
        ═══════════════════════════════════════════════════════ */}
        <section id="timeline" className="px-6 py-16 md:py-24 border-t border-white/5 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.22em] text-indigo-200/75 mb-3 font-medium">{t.sectionLabels.implementation}</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-8">{t.timeline.title}</h2>

            {/* Timeline overview visual */}
            <div className="mb-12">
              <Image
                src={landingImages.processImplement}
                alt="แผนการดำเนินงาน — ทีละขั้นตอน"
                width={1200}
                height={514}
                className="w-full rounded-2xl"
              />
            </div>

            <div className="space-y-0">
              {t.timeline.steps.map((step, i) => (
                <div key={i} className="flex gap-5 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-medium text-indigo-300 shrink-0">
                      {i + 1}
                    </div>
                    {i < t.timeline.steps.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-indigo-500/15 to-transparent my-2" />
                    )}
                  </div>
                  <div className="pb-10">
                    <span className="mb-2 inline-block rounded-md bg-indigo-500/10 px-2.5 py-1 text-[11px] text-indigo-100/80 font-medium">
                      {step.week}
                    </span>
                    <h3 className="text-base font-medium mb-1.5">{step.title}</h3>
                    <p className="mb-2 text-base text-white/74 font-[family-name:var(--font-prompt)] leading-relaxed">{step.description}</p>
                    <p className="text-sm text-white/58 font-[family-name:var(--font-prompt)] leading-relaxed">{step.deliverable}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            BEFORE / AFTER
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 py-16 md:py-24 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.22em] text-green-300/75 mb-3 font-medium">{t.sectionLabels.results}</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-8">{t.beforeAfter.title}</h2>

            {/* Before/After visual */}
            <div className="mb-10">
              <Image
                src={landingImages.results}
                alt="อะไรเปลียน หลังจากนี้ — Before & After"
                width={1200}
                height={514}
                className="w-full rounded-2xl"
              />
            </div>

            <div className="space-y-3">
              {t.beforeAfter.rows.map((row, i) => (
                <div key={i} className="bg-white/[0.02] rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                  <p className="text-sm font-medium text-white/80 mb-3">{row.situation}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex gap-2.5 items-start bg-red-500/[0.03] rounded-lg p-3">
                      <X className="w-4 h-4 text-red-400/40 shrink-0 mt-0.5" />
                      <p className="text-sm text-white/65 font-[family-name:var(--font-prompt)] leading-relaxed">{row.before}</p>
                    </div>
                    <div className="flex gap-2.5 items-start bg-green-500/[0.03] rounded-lg p-3">
                      <Check className="w-4 h-4 text-green-400/50 shrink-0 mt-0.5" />
                      <p className="text-sm text-white/82 font-[family-name:var(--font-prompt)] leading-relaxed">{row.after}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            DIFFERENTIATORS
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 py-16 md:py-24 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.22em] text-indigo-200/75 mb-3 font-medium">{t.sectionLabels.whyUs}</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-10">{t.differentiators.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.differentiators.items.map((item, i) => {
                const Icon = diffIcons[i];
                return (
                  <div key={i} className="bg-white/[0.02] rounded-xl p-5 border border-white/5 hover:border-indigo-500/15 transition-colors group">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/[0.07] flex items-center justify-center mb-3 group-hover:bg-indigo-500/10 transition-colors">
                      <Icon className="w-4 h-4 text-indigo-400/60" />
                    </div>
                    <h3 className="text-sm font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-white/74 font-[family-name:var(--font-prompt)] leading-relaxed">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            TECH STACK
        ═══════════════════════════════════════════════════════ */}
        <section id="stack" className="px-6 py-16 md:py-24 border-t border-white/5 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.22em] text-indigo-200/75 mb-3 font-medium">{t.sectionLabels.technology}</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-8">{t.stack.title}</h2>

            {/* Architecture diagram */}
            <div className="mb-10">
              <Image
                src={landingImages.techStack}
                alt="Tech Stack ที่ขับเคลื่อนระบบ"
                width={1200}
                height={675}
                className="w-full rounded-2xl"
              />
            </div>

            <div className="bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="text-left py-3 px-5 text-white/60 font-medium text-[11px] uppercase tracking-wider">Layer</th>
                      <th className="text-left py-3 px-5 text-white/60 font-medium text-[11px] uppercase tracking-wider">Tool</th>
                      <th className="text-left py-3 px-5 text-white/60 font-medium text-[11px] uppercase tracking-wider">What it does</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.stack.items.map((item, i) => (
                      <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-5 text-white/78 font-[family-name:var(--font-prompt)] text-sm">{item.layer}</td>
                        <td className="py-3 px-5 text-indigo-100/85 font-medium text-sm">{item.tool}</td>
                        <td className="py-3 px-5 text-white/70 font-[family-name:var(--font-prompt)] text-sm leading-relaxed">{item.what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FAQ
        ═══════════════════════════════════════════════════════ */}
        <section id="faq" className="px-6 py-16 md:py-24 border-t border-white/5 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.22em] text-indigo-200/75 mb-3 font-medium">{t.sectionLabels.faq}</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-10">{t.faq.title}</h2>
            <div className="space-y-3">
              {t.faq.items.map((item, i) => (
                <div key={i} className="bg-white/[0.02] rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex gap-3 items-start">
                    <HelpCircle className="w-4 h-4 text-indigo-300/30 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium mb-2">{item.q}</h3>
                      <p className="text-sm text-white/74 font-[family-name:var(--font-prompt)] leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CREDIBILITY + FINAL CTA
        ═══════════════════════════════════════════════════════ */}
        <section className="px-6 py-20 md:py-28 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/[0.03] to-transparent pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center space-y-8">
            <p className="max-w-md mx-auto text-sm text-white/58 font-[family-name:var(--font-prompt)] leading-relaxed">
              {t.credibility.line}
            </p>

            <h2 className="text-3xl md:text-4xl font-medium bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              {t.finalCta.title}
            </h2>
            <p className="text-base text-white/76 font-[family-name:var(--font-prompt)] leading-relaxed">
              {t.finalCta.body}
            </p>

            <div className="flex justify-center pt-2 scroll-mt-24" id="lead-form-final">
              <LeadForm translations={t.form} locale={locale} collapsible />
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-3 justify-center mb-4">
                <div className="flex-1 max-w-[80px] h-px bg-white/10" />
                <span className="text-sm text-white/35">or</span>
                <div className="flex-1 max-w-[80px] h-px bg-white/10" />
              </div>
              <a
                href={`/${locale}/demo`}
                className="text-base text-indigo-100/80 hover:text-indigo-100 transition-colors font-medium"
              >
                {t.finalCta.bookCall} &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-10 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="font-[family-name:var(--font-bai-jamjuree)] font-bold text-sm text-white/45">
              THCloud.AI
            </span>
            <p className="text-xs text-white/40 font-[family-name:var(--font-prompt)]">
              {t.footer.tagline}
            </p>
            <p className="text-xs text-white/28">{t.footer.copyright}</p>
          </div>
        </footer>
      </main>

      {/* Sticky mobile CTA */}
      <StickyCTA
        label={t.ctaButton}
        hiddenWhenVisibleIds={["lead-form-hero", "lead-form-inline", "lead-form-final"]}
      />
    </>
  );
}
