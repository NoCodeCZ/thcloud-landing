import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LeadForm } from "@/components/forms/LeadForm";
import { TrustLogos } from "@/components/sections/TrustLogos";
import { StickyCTA } from "@/components/sections/StickyCTA";
import { Navbar } from "@/components/layout/Navbar";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.home;

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

          <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/15 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-medium text-indigo-300/80 tracking-wide">
                  {t.hero.tagline}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-medium leading-[1.1] mb-6 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
                {t.hero.headline}
              </h1>
              <p className="text-base md:text-lg text-white/50 leading-relaxed font-[family-name:var(--font-prompt)] max-w-lg mx-auto lg:mx-0 mb-8">
                {t.hero.subhead}
              </p>
              {/* Hero visual */}
              <div className="max-w-lg mx-auto lg:mx-0">
                <ImagePlaceholder
                  label="Hero Image"
                  aspect="wide"
                  hint="Dashboard mockup, before/after diagram, or product screenshot"
                />
              </div>
            </div>
            <div className="w-full max-w-sm shrink-0" id="lead-form-hero">
              <LeadForm translations={t.form} locale={locale} />
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
            <p className="text-xs uppercase tracking-widest text-indigo-300/40 mb-3 font-medium">Target audience</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-10">{t.whoIsFor.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.whoIsFor.items.map((item, i) => (
                <div key={i} className="flex gap-3 items-start bg-white/[0.02] rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="text-sm text-white/60 font-[family-name:var(--font-prompt)] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-white/40 italic font-[family-name:var(--font-prompt)] text-center">{t.whoIsFor.closing}</p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CORE PROBLEM
        ═══════════════════════════════════════════════════════ */}
        <section id="problem" className="px-6 py-16 md:py-24 border-t border-white/5 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-red-400/40 mb-3 font-medium">The challenge</p>
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
                      <p className="text-sm text-white/50 font-[family-name:var(--font-prompt)] leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 p-5 rounded-2xl bg-red-500/[0.04] border border-red-500/10">
              <p className="text-white/60 font-[family-name:var(--font-prompt)] flex items-start gap-3 text-sm">
                <AlertTriangle className="w-5 h-5 text-red-400/60 shrink-0 mt-0.5" />
                {t.coreProblem.result}
              </p>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="px-6 pb-16 flex flex-col items-center">
          <LeadForm translations={t.form} locale={locale} variant="inline" />
          <p className="text-xs text-white/25 mt-4">{t.form.footer}</p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            WHAT WE BUILD — 3 LAYERS
        ═══════════════════════════════════════════════════════ */}
        <section id="solution" className="px-6 py-16 md:py-24 border-t border-white/5 scroll-mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.02] to-transparent pointer-events-none" />
          <div className="relative max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-indigo-300/40 mb-3 font-medium">Our solution</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-3">{t.whatWeBuild.title}</h2>
            <p className="text-white/50 mb-14 font-[family-name:var(--font-prompt)]">{t.whatWeBuild.subtitle}</p>

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
                        <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-300/50 font-medium">
                          Layer {layer.number}
                        </p>
                        <h3 className="text-xl font-medium">{layer.name}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-indigo-300/40 italic mb-3 pl-14">{layer.tagline}</p>
                    <p className="text-white/50 font-[family-name:var(--font-prompt)] leading-relaxed mb-6 text-sm">
                      {layer.description}
                    </p>

                    {/* Layer visual */}
                    <div className="mb-6">
                      <ImagePlaceholder
                        label={`Layer ${layer.number} Visual`}
                        aspect="video"
                        hint={
                          i === 0
                            ? "Data flow diagram or warehouse architecture visual"
                            : i === 1
                            ? "Dashboard screenshot or AI agent conversation demo"
                            : "OpenWebUI interface screenshot with team workspace"
                        }
                      />
                    </div>

                    {/* Layer 1: data sources table */}
                    {"sources" in layer && layer.sources && (
                      <div className="overflow-x-auto mb-6 bg-white/[0.02] rounded-xl border border-white/5 p-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-2 pr-4 text-white/30 font-medium text-xs uppercase tracking-wider">Source</th>
                              <th className="text-left py-2 pr-4 text-white/30 font-medium text-xs uppercase tracking-wider">Method</th>
                              <th className="text-left py-2 text-white/30 font-medium text-xs uppercase tracking-wider">Data</th>
                            </tr>
                          </thead>
                          <tbody>
                            {layer.sources.map((s, j) => (
                              <tr key={j} className="border-b border-white/[0.03]">
                                <td className="py-2.5 pr-4 text-white/60 font-[family-name:var(--font-prompt)] text-xs">{s.source}</td>
                                <td className="py-2.5 pr-4 text-indigo-300/50 font-[family-name:var(--font-prompt)] text-xs">{s.method}</td>
                                <td className="py-2.5 text-white/40 font-[family-name:var(--font-prompt)] text-xs">{s.data}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {"output" in layer && layer.output && (
                      <p className="text-xs text-white/40 font-[family-name:var(--font-prompt)] mb-4 pl-1">{layer.output}</p>
                    )}

                    {/* Layer 2: dashboards + agent examples */}
                    {"dashboards" in layer && layer.dashboards && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                        {layer.dashboards.map((d, j) => (
                          <div key={j} className="bg-white/[0.03] rounded-xl p-4 border border-white/5 hover:border-indigo-500/15 transition-colors">
                            <h4 className="text-xs font-medium text-indigo-300/80 mb-3 uppercase tracking-wider">{d.name}</h4>
                            <ul className="space-y-1.5">
                              {d.items.map((item, k) => (
                                <li key={k} className="text-[11px] text-white/40 font-[family-name:var(--font-prompt)] flex gap-1.5 items-start">
                                  <ChevronRight className="w-3 h-3 text-indigo-400/30 mt-0.5 shrink-0" />
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
                        <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-300/40 mb-3 font-medium">
                          AI Agent Examples
                        </p>
                        <div className="space-y-2.5">
                          {layer.agentExamples.map((ex, j) => (
                            <p key={j} className="text-sm text-white/50 italic font-[family-name:var(--font-prompt)] pl-3 border-l-2 border-indigo-500/15">
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
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 mb-4 font-medium">Your team gets</p>
                          <ul className="space-y-2.5">
                            {layer.teamFeatures.map((f, j) => (
                              <li key={j} className="text-xs text-white/50 font-[family-name:var(--font-prompt)] flex gap-2 items-start">
                                <Check className="w-3.5 h-3.5 text-indigo-400/60 shrink-0 mt-0.5" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white/[0.02] rounded-xl p-5 border border-white/5">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 mb-4 font-medium">You control</p>
                          <ul className="space-y-2.5">
                            {("adminFeatures" in layer ? layer.adminFeatures : []).map((f, j) => (
                              <li key={j} className="text-xs text-white/50 font-[family-name:var(--font-prompt)] flex gap-2 items-start">
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
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/30 border border-white/[0.04] font-mono">
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
            <p className="text-xs uppercase tracking-widest text-indigo-300/40 mb-3 font-medium">Implementation</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-8">{t.timeline.title}</h2>

            {/* Timeline overview visual */}
            <div className="mb-12">
              <ImagePlaceholder
                label="Timeline Infographic"
                aspect="wide"
                hint="10-week roadmap visual: Discovery → Setup → Data → Dashboards → AI → Handover"
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
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300/60 font-medium mb-2">
                      {step.week}
                    </span>
                    <h3 className="text-base font-medium mb-1.5">{step.title}</h3>
                    <p className="text-sm text-white/45 font-[family-name:var(--font-prompt)] mb-2 leading-relaxed">{step.description}</p>
                    <p className="text-xs text-white/25 font-[family-name:var(--font-prompt)]">{step.deliverable}</p>
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
            <p className="text-xs uppercase tracking-widest text-green-400/40 mb-3 font-medium">Results</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-8">{t.beforeAfter.title}</h2>

            {/* Before/After visual */}
            <div className="mb-10">
              <ImagePlaceholder
                label="Before & After Visual"
                aspect="wide"
                hint="Side-by-side comparison: messy spreadsheets vs clean AI dashboard"
              />
            </div>

            <div className="space-y-3">
              {t.beforeAfter.rows.map((row, i) => (
                <div key={i} className="bg-white/[0.02] rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                  <p className="text-sm font-medium text-white/80 mb-3">{row.situation}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex gap-2.5 items-start bg-red-500/[0.03] rounded-lg p-3">
                      <X className="w-4 h-4 text-red-400/40 shrink-0 mt-0.5" />
                      <p className="text-xs text-white/35 font-[family-name:var(--font-prompt)]">{row.before}</p>
                    </div>
                    <div className="flex gap-2.5 items-start bg-green-500/[0.03] rounded-lg p-3">
                      <Check className="w-4 h-4 text-green-400/50 shrink-0 mt-0.5" />
                      <p className="text-xs text-white/55 font-[family-name:var(--font-prompt)]">{row.after}</p>
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
            <p className="text-xs uppercase tracking-widest text-indigo-300/40 mb-3 font-medium">Why us</p>
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
                    <p className="text-xs text-white/40 font-[family-name:var(--font-prompt)] leading-relaxed">{item.body}</p>
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
            <p className="text-xs uppercase tracking-widest text-indigo-300/40 mb-3 font-medium">Technology</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-8">{t.stack.title}</h2>

            {/* Architecture diagram */}
            <div className="mb-10">
              <ImagePlaceholder
                label="Architecture Diagram"
                aspect="video"
                hint="Full stack diagram showing how all tools connect: Data → Intelligence → Interface"
              />
            </div>

            <div className="bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="text-left py-3 px-5 text-white/30 font-medium text-[10px] uppercase tracking-wider">Layer</th>
                      <th className="text-left py-3 px-5 text-white/30 font-medium text-[10px] uppercase tracking-wider">Tool</th>
                      <th className="text-left py-3 px-5 text-white/30 font-medium text-[10px] uppercase tracking-wider">What it does</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.stack.items.map((item, i) => (
                      <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-5 text-white/50 font-[family-name:var(--font-prompt)] text-xs">{item.layer}</td>
                        <td className="py-3 px-5 text-indigo-300/60 font-medium text-xs">{item.tool}</td>
                        <td className="py-3 px-5 text-white/35 font-[family-name:var(--font-prompt)] text-xs">{item.what}</td>
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
            <p className="text-xs uppercase tracking-widest text-indigo-300/40 mb-3 font-medium">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-medium mb-10">{t.faq.title}</h2>
            <div className="space-y-3">
              {t.faq.items.map((item, i) => (
                <div key={i} className="bg-white/[0.02] rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex gap-3 items-start">
                    <HelpCircle className="w-4 h-4 text-indigo-300/30 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium mb-2">{item.q}</h3>
                      <p className="text-xs text-white/40 font-[family-name:var(--font-prompt)] leading-relaxed">{item.a}</p>
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
          <div className="relative max-w-xl mx-auto text-center space-y-8">
            <p className="text-xs text-white/30 font-[family-name:var(--font-prompt)] max-w-md mx-auto">
              {t.credibility.line}
            </p>

            <h2 className="text-3xl md:text-4xl font-medium bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              {t.finalCta.title}
            </h2>
            <p className="text-white/50 font-[family-name:var(--font-prompt)] leading-relaxed text-sm">
              {t.finalCta.body}
            </p>

            <div className="flex justify-center pt-2">
              <LeadForm translations={t.form} locale={locale} variant="dark" />
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-3 justify-center mb-4">
                <div className="flex-1 max-w-[80px] h-px bg-white/10" />
                <span className="text-xs text-white/15">or</span>
                <div className="flex-1 max-w-[80px] h-px bg-white/10" />
              </div>
              <a
                href="https://cal.tonghuagroup.com/tatchat"
                className="text-sm text-indigo-300/50 hover:text-indigo-300 transition-colors font-medium"
              >
                {t.finalCta.bookCall} &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-10 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="font-[family-name:var(--font-bai-jamjuree)] font-bold text-sm text-white/20">
              THCloud.AI
            </span>
            <p className="text-[10px] text-white/15 font-[family-name:var(--font-prompt)]">
              Built on open-source infrastructure &middot; Deployable anywhere &middot; You own the system
            </p>
            <p className="text-[10px] text-white/10">&copy; 2026 THCloud.AI &middot; Tong Hua Holding PCL (SET:TH)</p>
          </div>
        </footer>
      </main>

      {/* Sticky mobile CTA */}
      <StickyCTA label={t.ctaButton} />
    </>
  );
}
