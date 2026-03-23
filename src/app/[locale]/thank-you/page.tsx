import type { Metadata } from "next";
import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { FacebookCAPI } from "@/components/tracking/FacebookCAPI";
import { CheckCircle2, Monitor, ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.metadata.thankYou.title,
    description: dict.metadata.thankYou.description,
  };
}

export default async function ThankYouPage({
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

  if (email) {
    fireServerCAPI(email).catch(() => {});
  }

  return (
    <main className="min-h-screen bg-brand-dark text-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href={`/${locale}`}>
          <span className="font-[family-name:var(--font-bai-jamjuree)] font-bold text-xl text-white">
            THCloud.AI
          </span>
        </Link>
        <LanguageSwitcher locale={locale as Locale} />
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full space-y-10">
          {/* Confirmation */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-medium">{t.title}</h1>
            <p className="text-white/50 font-[family-name:var(--font-prompt)]">
              {t.subtitle}
            </p>
          </div>

          <div className="h-px bg-white/10" />

          {/* Demo CTA */}
          <div className="space-y-4 text-center">
            <p className="text-xs uppercase tracking-widest text-white/30 font-medium">
              {t.demoTitle}
            </p>
            <p className="text-sm text-white/50 font-[family-name:var(--font-prompt)] leading-relaxed">
              {t.demoSubtitle}
            </p>
            <Link
              href={`/${locale}/demo${email ? `?email=${encodeURIComponent(email)}` : ""}`}
              className="inline-flex items-center gap-2 bg-white text-brand-navy font-medium px-8 py-4 rounded-xl text-base hover:scale-105 transition-transform duration-200 group"
            >
              <Monitor className="w-5 h-5" />
              {t.demoForm.submit}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Back link */}
          <div className="text-center pt-2">
            <Link
              href={`/${locale}`}
              className="text-sm text-white/20 hover:text-white/40 transition-colors"
            >
              &larr; {t.backHome}
            </Link>
          </div>
        </div>
      </div>

      <FacebookCAPI email={email} />
    </main>
  );
}

async function fireServerCAPI(email: string) {
  const pixelId = process.env.FB_PIXEL_ID;
  const accessToken = process.env.FB_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) return;

  const crypto = await import("crypto");
  const hashedEmail = crypto
    .createHash("sha256")
    .update(email.toLowerCase().trim())
    .digest("hex");

  try {
    await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [{
            event_name: "CompleteRegistration",
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            user_data: { em: [hashedEmail] },
          }],
        }),
      }
    );
  } catch {
    // Silently fail
  }
}
