import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { DemoPageClient } from "@/components/forms/DemoPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.demo.title,
    description: dict.metadata.home.description,
  };
}

export default async function DemoPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const { locale } = await params;
  const { email } = await searchParams;
  const dict = await getDictionary(locale as Locale);
  const t = dict.thankYou;

  return (
    <main className="min-h-screen bg-brand-dark text-white">
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href={`/${locale}`}>
          <span className="font-[family-name:var(--font-bai-jamjuree)] font-bold text-xl text-white">
            THCloud.AI
          </span>
        </Link>
        <LanguageSwitcher locale={locale as Locale} />
      </header>

      <DemoPageClient
        defaultEmail={email}
        formTranslations={t.demoForm}
        submittedTranslations={t.submitted}
        demoTitle={t.demoTitle}
        demoSubtitle={t.demoSubtitle}
        calUrl="https://cal.tonghuagroup.com/tatchat"
        demoFeatures={[...dict.demo.demoFeatures]}
        backLabel={t.backHome}
        backHref={`/${locale}`}
        step1Label={dict.demo.step1Label}
        step2Label={dict.demo.step2Label}
        seeInDemoLabel={dict.demo.seeInDemo}
        pickTimeLabel={dict.demo.pickTime}
        pickTimeSubtitleLabel={dict.demo.pickTimeSubtitle}
      />
    </main>
  );
}
