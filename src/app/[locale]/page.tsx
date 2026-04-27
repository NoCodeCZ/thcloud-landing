import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LeadForm } from "@/components/forms/LeadForm";
import { TrustLogos } from "@/components/sections/TrustLogos";
import { StickyCTA } from "@/components/sections/StickyCTA";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { Navbar } from "@/components/layout/Navbar";
import { Reveal } from "@/components/effects/Reveal";
import { ImageScrub } from "@/components/effects/ImageScrub";
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

  const renderSectionCta = () => (
    <div className="mt-12 flex flex-col gap-4 rounded-xl bg-[#EEF3FF] p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-[#242424]">{t.sectionCta.title}</p>
        <p className="mt-1 text-sm text-[#4A4F66] leading-relaxed">
          {t.sectionCta.body}
        </p>
      </div>
      <a
        href="#lead-form-final"
        className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#3B36CC] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2D29A3] active:scale-[0.98]"
      >
        {t.sectionCta.button}
      </a>
    </div>
  );

  return (
    <>
      <main className="min-h-[100dvh] bg-white text-[#242424] font-[family-name:var(--font-anuphan)]">
        <Navbar locale={locale} ctaLabel={t.ctaButton} />

        {/* ═══════════════════════════════════════════════════════
            HERO — dark navy, matches main site
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#0F1635] text-white overflow-hidden">
          {/* Subtle radial spotlight (single, restrained) */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,106,243,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />

          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 pt-20 pb-28 text-center md:pt-28 md:pb-36">
            <Reveal stagger className="w-full">
              <div data-reveal-child className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 text-[#C6D4FF]" />
                <span className="text-sm font-medium tracking-wide text-[#C6D4FF]">
                  {t.hero.tagline}
                </span>
              </div>
              <h1 data-reveal-child className="mx-auto mb-6 max-w-5xl text-[2.6rem] font-medium leading-[1.08] tracking-tight text-white md:text-[4.25rem]">
                {t.hero.headline}
              </h1>
              <p data-reveal-child className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-white/75 md:text-xl">
                {t.hero.subhead}
              </p>

              {/* Hero visual — clean, no gradient halos */}
              <div data-reveal-child className="relative mx-auto max-w-3xl">
                <div className="group overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5">
                  <Image
                    src={landingImages.hero}
                    alt="THCloud.AI — Intelligent automation"
                    width={1200}
                    height={514}
                    className="w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    priority
                  />
                </div>

                <div className="mt-5 hidden grid-cols-3 gap-3 md:grid">
                  {heroHighlights.map(({ label, Icon }) => (
                    <div
                      key={label}
                      className="flex min-w-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.08]"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[#C6D4FF]" />
                      <span className="text-center text-xs font-medium text-white/85">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="w-full max-w-xl" id="lead-form-hero">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#lead-form-final"
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#3B36CC] px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-[#2D29A3] active:scale-[0.98]"
                >
                  {t.ctaButton}
                </a>
                <a
                  href={`/${locale}/demo`}
                  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium text-[#C6D4FF] transition-colors hover:text-white"
                >
                  {t.finalCta.bookCall} &rarr;
                </a>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/55">
                {t.form.footer}
              </p>
            </div>
          </div>
        </section>

        {/* Trust Logos — light panel */}
        <section className="bg-[#F6F7F8] px-6 py-12">
          <TrustLogos label={dict.components.trustLogos.label} />
        </section>

        {/* ═══════════════════════════════════════════════════════
            WHO THIS IS FOR
        ═══════════════════════════════════════════════════════ */}
        <section className="border-t border-[#E5E7EB] bg-white px-6 py-24 md:py-36">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#3B36CC]">
              {t.sectionLabels.targetAudience}
            </p>
            <h2 className="mb-12 text-3xl font-medium tracking-tight text-[#242424] md:text-[2.5rem] md:leading-[1.1]">
              {t.whoIsFor.title}
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {t.whoIsFor.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-[#F6F7F8] p-5 transition-colors hover:bg-[#EEF3FF]"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#E0E8FF]">
                    <Check className="h-3.5 w-3.5 text-[#3B36CC]" />
                  </div>
                  <span className="text-base leading-relaxed text-[#242424]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-base italic leading-relaxed text-[#6A718A]">
              {t.whoIsFor.closing}
            </p>
            {renderSectionCta()}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CORE PROBLEM
        ═══════════════════════════════════════════════════════ */}
        <section
          id="problem"
          className="scroll-mt-20 border-t border-[#E5E7EB] bg-[#F6F7F8] px-6 py-24 md:py-36"
        >
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#B83129]">
              {t.sectionLabels.theChallenge}
            </p>
            <h2 className="mb-14 text-3xl font-medium tracking-tight text-[#242424] md:text-[2.5rem] md:leading-[1.1]">
              {t.coreProblem.title}
            </h2>
            <div className="space-y-4">
              {t.coreProblem.problems.map((p, i) => {
                const Icon = problemIcons[i];
                return (
                  <div
                    key={i}
                    className="flex items-start gap-5 rounded-xl bg-white p-6 md:p-7"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E0E8FF]">
                      <Icon className="h-5 w-5 text-[#3B36CC]" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-base font-semibold text-[#242424] md:text-lg">
                        {p.title}
                      </h3>
                      <p className="text-base leading-relaxed text-[#555555]">
                        {p.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 rounded-xl bg-[#FEE7EC] p-5">
              <p className="flex items-start gap-3 text-base leading-relaxed text-[#242424]">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#EB4569]" />
                {t.coreProblem.result}
              </p>
            </div>
            {renderSectionCta()}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            WHAT WE BUILD — 3 LAYERS
        ═══════════════════════════════════════════════════════ */}
        <section
          id="solution"
          className="relative scroll-mt-20 border-t border-[#E5E7EB] bg-white px-6 py-24 md:py-36"
        >
          <div className="relative mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#3B36CC]">
              {t.sectionLabels.ourSolution}
            </p>
            <h2 className="mb-4 text-3xl font-medium tracking-tight text-[#242424] md:text-[2.5rem] md:leading-[1.1]">
              {t.whatWeBuild.title}
            </h2>
            <p className="mb-16 text-lg leading-relaxed text-[#6A718A]">
              {t.whatWeBuild.subtitle}
            </p>

            <div className="space-y-20">
              {t.whatWeBuild.layers.map((layer, i) => {
                const Icon = layerIcons[i];
                return (
                  <div key={i} className="relative">
                    <div className="pointer-events-none absolute -left-4 top-0 select-none text-[80px] font-bold leading-none text-[#3B36CC]/[0.05] md:-left-12">
                      {layer.number}
                    </div>

                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E0E8FF]">
                        <Icon className="h-5 w-5 text-[#3B36CC]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#3B36CC]">
                          Layer {layer.number}
                        </p>
                        <h3 className="text-xl font-semibold text-[#242424]">
                          {layer.name}
                        </h3>
                      </div>
                    </div>
                    <p className="mb-3 pl-14 text-base italic text-[#3B36CC]">
                      {layer.tagline}
                    </p>
                    <p className="mb-6 text-base leading-relaxed text-[#555555]">
                      {layer.description}
                    </p>

                    <ImageScrub className="mb-6">
                      <div className="group overflow-hidden rounded-xl">
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
                          className="w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                    </ImageScrub>

                    {"sources" in layer && layer.sources && (
                      <div className="mb-6 overflow-x-auto rounded-xl bg-[#F6F7F8] p-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-[#DFE2E8]">
                              <th className="py-2 pr-4 text-left text-[11px] font-medium uppercase tracking-wider text-[#6A718A]">
                                Source
                              </th>
                              <th className="py-2 pr-4 text-left text-[11px] font-medium uppercase tracking-wider text-[#6A718A]">
                                Method
                              </th>
                              <th className="py-2 text-left text-[11px] font-medium uppercase tracking-wider text-[#6A718A]">
                                Data
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {layer.sources.map((s, j) => (
                              <tr key={j} className="border-b border-[#DFE2E8]/60 last:border-0">
                                <td className="py-2.5 pr-4 text-sm text-[#242424]">
                                  {s.source}
                                </td>
                                <td className="py-2.5 pr-4 text-sm font-medium text-[#3B36CC]">
                                  {s.method}
                                </td>
                                <td className="py-2.5 text-sm leading-relaxed text-[#555555]">
                                  {s.data}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {"output" in layer && layer.output && (
                      <p className="mb-4 pl-1 text-sm leading-relaxed text-[#6A718A]">
                        {layer.output}
                      </p>
                    )}

                    {"dashboards" in layer && layer.dashboards && (
                      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
                        {layer.dashboards.map((d, j) => (
                          <div
                            key={j}
                            className="rounded-xl bg-[#F6F7F8] p-5"
                          >
                            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#3B36CC]">
                              {d.name}
                            </h4>
                            <ul className="space-y-1.5">
                              {d.items.map((item, k) => (
                                <li
                                  key={k}
                                  className="flex items-start gap-1.5 text-sm leading-relaxed text-[#242424]"
                                >
                                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3B36CC]" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {"agentExamples" in layer && layer.agentExamples && (
                      <div className="rounded-xl bg-[#EEF3FF] p-5">
                        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#3B36CC]">
                          {t.sectionLabels.aiAgentExamples}
                        </p>
                        <div className="space-y-2.5">
                          {layer.agentExamples.map((ex, j) => (
                            <p
                              key={j}
                              className="border-l-2 border-[#3B36CC] pl-3 text-base italic leading-relaxed text-[#242424]"
                            >
                              {ex}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {"teamFeatures" in layer && layer.teamFeatures && (
                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-xl bg-[#F6F7F8] p-5">
                          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6A718A]">
                            {t.sectionLabels.yourTeamGets}
                          </p>
                          <ul className="space-y-2.5">
                            {layer.teamFeatures.map((f, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2 text-sm leading-relaxed text-[#242424]"
                              >
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3B36CC]" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-xl bg-[#F6F7F8] p-5">
                          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6A718A]">
                            {t.sectionLabels.youControl}
                          </p>
                          <ul className="space-y-2.5">
                            {("adminFeatures" in layer ? layer.adminFeatures : []).map((f, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2 text-sm leading-relaxed text-[#242424]"
                              >
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3B36CC]" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {layer.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-[#F6F7F8] px-3 py-1 text-[11px] font-medium text-[#555555]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {renderSectionCta()}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            TIMELINE
        ═══════════════════════════════════════════════════════ */}
        <section
          id="timeline"
          className="scroll-mt-20 border-t border-[#E5E7EB] bg-[#F6F7F8] px-6 py-24 md:py-36"
        >
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#3B36CC]">
              {t.sectionLabels.implementation}
            </p>
            <h2 className="mb-10 text-3xl font-medium tracking-tight text-[#242424] md:text-[2.5rem] md:leading-[1.1]">
              {t.timeline.title}
            </h2>

            <ImageScrub className="mb-12">
              <div className="group overflow-hidden rounded-xl bg-white">
                <Image
                  src={landingImages.processImplement}
                  alt={t.timeline.title}
                  width={1200}
                  height={514}
                  className="w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
            </ImageScrub>

            <div className="space-y-0">
              {t.timeline.steps.map((step, i) => (
                <div key={i} className="relative flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3B36CC] text-xs font-semibold text-white">
                      {i + 1}
                    </div>
                    {i < t.timeline.steps.length - 1 && (
                      <div className="my-2 w-px flex-1 bg-[#3B36CC]/20" />
                    )}
                  </div>
                  <div className="pb-10">
                    <span className="mb-2 inline-block rounded-full bg-[#E0E8FF] px-3 py-1 text-[11px] font-semibold text-[#3B36CC]">
                      {step.week}
                    </span>
                    <h3 className="mb-1.5 text-base font-semibold text-[#242424]">
                      {step.title}
                    </h3>
                    <p className="mb-2 text-base leading-relaxed text-[#555555]">
                      {step.description}
                    </p>
                    <p className="text-sm leading-relaxed text-[#6A718A]">
                      {step.deliverable}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {renderSectionCta()}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            BEFORE / AFTER
        ═══════════════════════════════════════════════════════ */}
        <section className="border-t border-[#E5E7EB] bg-white px-6 py-24 md:py-36">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#3B36CC]">
              {t.sectionLabels.results}
            </p>
            <h2 className="mb-10 text-3xl font-medium tracking-tight text-[#242424] md:text-[2.5rem] md:leading-[1.1]">
              {t.beforeAfter.title}
            </h2>

            <ImageScrub className="mb-10">
              <div className="group overflow-hidden rounded-xl">
                <Image
                  src={landingImages.results}
                  alt={t.beforeAfter.title}
                  width={1200}
                  height={514}
                  className="w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
            </ImageScrub>

            <div className="space-y-3">
              {t.beforeAfter.rows.map((row, i) => (
                <div key={i} className="rounded-xl bg-[#F6F7F8] p-5">
                  <p className="mb-3 text-sm font-semibold text-[#242424]">
                    {row.situation}
                  </p>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="flex items-start gap-2.5 rounded-lg bg-white p-3">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-[#EB4569]" />
                      <p className="text-sm leading-relaxed text-[#6A718A]">
                        {row.before}
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5 rounded-lg bg-[#EEF3FF] p-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3B36CC]" />
                      <p className="text-sm leading-relaxed text-[#242424]">
                        {row.after}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {renderSectionCta()}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            DIFFERENTIATORS
        ═══════════════════════════════════════════════════════ */}
        <section className="border-t border-[#E5E7EB] bg-[#F6F7F8] px-6 py-24 md:py-36">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#3B36CC]">
              {t.sectionLabels.whyUs}
            </p>
            <h2 className="mb-12 text-3xl font-medium tracking-tight text-[#242424] md:text-[2.5rem] md:leading-[1.1]">
              {t.differentiators.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {t.differentiators.items.map((item, i) => {
                const Icon = diffIcons[i];
                return (
                  <div
                    key={i}
                    className="group rounded-xl bg-white p-6 transition-colors hover:bg-[#EEF3FF]"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E0E8FF]">
                      <Icon className="h-5 w-5 text-[#3B36CC]" />
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-[#242424]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555555]">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
            {renderSectionCta()}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            TECH STACK
        ═══════════════════════════════════════════════════════ */}
        <section
          id="stack"
          className="scroll-mt-20 border-t border-[#E5E7EB] bg-white px-6 py-24 md:py-36"
        >
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#3B36CC]">
              {t.sectionLabels.technology}
            </p>
            <h2 className="mb-10 text-3xl font-medium tracking-tight text-[#242424] md:text-[2.5rem] md:leading-[1.1]">
              {t.stack.title}
            </h2>

            <ImageScrub className="mb-10">
              <div className="group overflow-hidden rounded-xl">
                <Image
                  src={landingImages.techStack}
                  alt={t.stack.title}
                  width={1200}
                  height={675}
                  className="w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
            </ImageScrub>

            <div className="overflow-hidden rounded-xl bg-[#F6F7F8]">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#DFE2E8] bg-[#EEF3FF]">
                      <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#3B36CC]">
                        Layer
                      </th>
                      <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#3B36CC]">
                        Tool
                      </th>
                      <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#3B36CC]">
                        What it does
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.stack.items.map((item, i) => (
                      <tr
                        key={i}
                        className="border-b border-[#DFE2E8]/60 last:border-0 transition-colors hover:bg-white"
                      >
                        <td className="px-5 py-3 text-sm text-[#242424]">
                          {item.layer}
                        </td>
                        <td className="px-5 py-3 text-sm font-semibold text-[#3B36CC]">
                          {item.tool}
                        </td>
                        <td className="px-5 py-3 text-sm leading-relaxed text-[#555555]">
                          {item.what}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {renderSectionCta()}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FAQ
        ═══════════════════════════════════════════════════════ */}
        <section
          id="faq"
          className="scroll-mt-20 border-t border-[#E5E7EB] bg-[#F6F7F8] px-6 py-24 md:py-36"
        >
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#3B36CC]">
              {t.sectionLabels.faq}
            </p>
            <h2 className="mb-12 text-3xl font-medium tracking-tight text-[#242424] md:text-[2.5rem] md:leading-[1.1]">
              {t.faq.title}
            </h2>
            <div className="space-y-3">
              {t.faq.items.map((item, i) => (
                <div key={i} className="rounded-xl bg-white p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#3B36CC]" />
                    <div>
                      <h3 className="mb-2 text-base font-semibold text-[#242424]">
                        {item.q}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#555555]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {renderSectionCta()}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CREDIBILITY + FINAL CTA — dark, matches main site
        ═══════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#0F1635] px-6 py-24 text-white md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(97,106,243,0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-3xl space-y-8 text-center">
            <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 shadow-[0_0_24px_rgba(97,106,243,0.25)] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t.credibility.badge}
              </span>
              <p className="text-base leading-relaxed text-white/85 md:text-lg">
                <span className="text-white/60">{t.credibility.lead} </span>
                <span className="font-semibold text-white">
                  {t.credibility.company}
                </span>
              </p>
              <p className="text-sm leading-relaxed text-white/60">
                {t.credibility.tail}
              </p>
            </div>

            <h2 className="text-3xl font-medium tracking-tight text-white md:text-5xl md:leading-[1.05]">
              {t.finalCta.title}
            </h2>
            <p className="text-base leading-relaxed text-white/75">
              {t.finalCta.body}
            </p>

            <div
              className="flex scroll-mt-24 justify-center pt-2"
              id="lead-form-final"
            >
              <LeadForm translations={t.form} locale={locale} collapsible />
            </div>

            <div className="pt-4">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px max-w-[80px] flex-1 bg-white/15" />
                <span className="text-sm text-white/40">or</span>
                <div className="h-px max-w-[80px] flex-1 bg-white/15" />
              </div>
              <a
                href={`/${locale}/demo`}
                className="text-base font-medium text-[#C6D4FF] transition-colors hover:text-white"
              >
                {t.finalCta.bookCall} &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Footer — dark */}
        <footer className="bg-[#0B1029] px-6 py-12 text-white/60">
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <div className="flex justify-center">
              <BrandLockup
                textClassName="text-sm text-white/70"
                iconClassName="h-6 w-6 opacity-90"
              />
            </div>
            <p className="text-xs text-white/55">{t.footer.tagline}</p>
            <p className="text-xs text-white/35">{t.footer.copyright}</p>
          </div>
        </footer>
      </main>

      <StickyCTA
        label={t.ctaButton}
        hiddenWhenVisibleIds={["lead-form-hero", "lead-form-final"]}
      />
    </>
  );
}
