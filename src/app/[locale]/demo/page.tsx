import type { Metadata } from "next";
import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";
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
    title: locale === "th" ? "จองนัด Demo Call | THCloud.AI" : "Book a Demo Call | THCloud.AI",
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
        locale={locale}
        defaultEmail={email}
        formTranslations={t.demoForm}
        submittedTranslations={t.submitted}
        demoTitle={t.demoTitle}
        demoSubtitle={t.demoSubtitle}
        calUrl="https://cal.tonghuagroup.com/tatchat"
        demoFeatures={
          locale === "th"
            ? [
                "Dashboard สดดึงข้อมูลทุกช่องทาง",
                "AI Agent ตอบคำถามจากข้อมูลธุรกิจจริง",
                "ระบบ Workflow อัตโนมัติทำงานจริง",
                "แผนการติดตั้งเฉพาะสำหรับธุรกิจคุณ",
              ]
            : [
                "Live dashboards pulling data from all channels",
                "AI agents answering questions from real business data",
                "Automated workflows running in real time",
                "Implementation plan tailored to your business",
              ]
        }
        backLabel={t.backHome}
        backHref={`/${locale}`}
        step1Label={locale === "th" ? "กรอกข้อมูล" : "Your Info"}
        step2Label={locale === "th" ? "เลือกเวลา" : "Pick a Time"}
      />
    </main>
  );
}
