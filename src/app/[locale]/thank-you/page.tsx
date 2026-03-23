import type { Metadata } from "next";
import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { FacebookCAPI } from "@/components/tracking/FacebookCAPI";
import { CheckCircle2, Calendar, Play, ArrowRight } from "lucide-react";

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

  // Fire server-side CAPI event
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

      <div className="flex-1 flex items-center justify-center px-6 py-12 md:py-16">
        <div className="max-w-lg w-full space-y-10">
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

          {/* Next step options */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/30 font-medium text-center">
              {t.nextStepTitle}
            </p>

            {/* Option 1: Book a Demo */}
            <a
              href={t.options.demo.href}
              className="block w-full bg-white rounded-2xl p-6 group hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-navy/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-brand-navy" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-medium text-brand-title">
                      {t.options.demo.label}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-navy text-white font-medium">
                      {t.options.demo.badge}
                    </span>
                  </div>
                  <p className="text-sm text-brand-subtitle font-[family-name:var(--font-prompt)] leading-relaxed">
                    {t.options.demo.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-navy/30 group-hover:text-brand-navy group-hover:translate-x-1 transition-all shrink-0 mt-3" />
              </div>
            </a>

            {/* Option 2: Watch Webinar */}
            <Link
              href={`/${locale}/webinar`}
              className="block w-full bg-white/[0.04] border border-white/10 rounded-2xl p-6 group hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Play className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-white mb-1">
                    {t.options.webinar.label}
                  </h3>
                  <p className="text-sm text-white/40 font-[family-name:var(--font-prompt)] leading-relaxed">
                    {t.options.webinar.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/40 group-hover:translate-x-1 transition-all shrink-0 mt-3" />
              </div>
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

      {/* Client-side pixel fallback + server CAPI tracking */}
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

  const eventData = {
    data: [
      {
        event_name: "CompleteRegistration",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        user_data: {
          em: [hashedEmail],
        },
      },
    ],
  };

  try {
    await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      }
    );
  } catch {
    // Silently fail — don't block the page
  }
}
