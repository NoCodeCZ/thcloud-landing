import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LangUpdater } from "@/components/layout/LangUpdater";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};

  const dict = await getDictionary(locale as Locale);
  const otherLocale = locale === "th" ? "en" : "th";

  return {
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
    alternates: {
      languages: {
        th: "/th",
        en: "/en",
        "x-default": "/th",
      },
      canonical: `/${locale}`,
    },
    openGraph: {
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: otherLocale === "th" ? "th_TH" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <>
      <LangUpdater locale={locale} />
      {children}
    </>
  );
}
