import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { WebinarForm } from "@/components/forms/WebinarForm";
import { BulletList } from "@/components/sections/BulletList";
import { WhoIsFor } from "@/components/sections/WhoIsFor";
import { PresenterBio } from "@/components/sections/PresenterBio";
import { SecondaryCTA } from "@/components/sections/SecondaryCTA";
import { RegistrationCounter } from "@/components/sections/RegistrationCounter";
import { TopBar } from "@/components/layout/TopBar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.metadata.webinar.title,
    description: dict.metadata.webinar.description,
    alternates: {
      languages: {
        th: "/th/webinar",
        en: "/en/webinar",
        "x-default": "/th/webinar",
      },
    },
  };
}

export default async function WebinarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.webinar;
  const c = dict.components;

  return (
    <main className="min-h-screen bg-brand-dark">
      <TopBar locale={locale} />

      {/* Hero + Form */}
      <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-lg md:text-xl text-white/60 mb-3 font-[family-name:var(--font-prompt)]">
              {t.tagline}
            </p>
            <h1 className="text-3xl md:text-4xl font-medium leading-tight mb-6 text-white">
              {t.headline}
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6 font-[family-name:var(--font-prompt)] max-w-lg mx-auto lg:mx-0">
              {t.subhead}
            </p>
            <p className="text-sm text-white/50 italic font-[family-name:var(--font-prompt)] max-w-lg mx-auto lg:mx-0">
              {t.notice}
            </p>
          </div>
          <div className="w-full max-w-md shrink-0">
            <WebinarForm
              translations={c.webinarForm}
              thankYouTranslations={c.thankYou}
            />
          </div>
        </div>
      </section>

      {/* What You Will See */}
      <section className="px-6 py-12 md:py-16">
        <BulletList
          title={t.bulletTitle}
          items={[...t.bullets]}
        />
      </section>

      {/* Registration Counter */}
      <section className="px-6">
        <RegistrationCounter translations={c.registrationCounter} />
      </section>

      {/* Who Is For */}
      <section className="px-6 py-12 md:py-16">
        <WhoIsFor
          forTitle={t.whoIsFor.forTitle}
          forItems={[...t.whoIsFor.items]}
          notForTitle={t.whoIsNotFor.notForTitle}
          notForItems={[...t.whoIsNotFor.items]}
        />
      </section>

      {/* Presenter Bio */}
      <section className="px-6 py-12 md:py-16">
        <PresenterBio
          translations={{
            role: "Chief Technology Officer",
            company: "THCloud.AI",
            quote:
              locale === "th"
                ? "ระบบที่ผมจะพาดูไม่ใช่แค่แนวคิด — ผมสร้างมันและมันทำงานอยู่จริง ผมจะแสดงให้เห็นว่าหน้าตาเป็นอย่างไร"
                : "The system I will walk through is not a concept \u2014 I built it and it is running. I will show you exactly what it looks like.",
            footer:
              locale === "th"
                ? "THCloud.AI คือหน่วยงาน AI Implementation ของ ตงฮั้ว โฮลดิ้ง จำกัด (มหาชน)"
                : "THCloud.AI is the AI implementation arm of Tong Hua Holding PCL (SET:TH)",
          }}
        />
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-12 md:py-16">
        <SecondaryCTA
          headline={t.secondaryCta.headline}
          body={t.secondaryCta.body}
          buttonText={t.secondaryCta.buttonText}
          buttonHref="https://cal.tonghuagroup.com/tatchat"
        />
      </section>
    </main>
  );
}
