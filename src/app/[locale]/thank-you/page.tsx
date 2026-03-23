import type { Metadata } from "next";
import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { FacebookCAPI } from "@/components/tracking/FacebookCAPI";
import { DemoForm } from "@/components/forms/DemoForm";
import { CheckCircle2, Monitor } from "lucide-react";

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
    <main className="min-h-screen bg-brand-dark text-white">
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href={`/${locale}`}>
          <span className="font-[family-name:var(--font-bai-jamjuree)] font-bold text-xl text-white">
            THCloud.AI
          </span>
        </Link>
        <LanguageSwitcher locale={locale as Locale} />
      </header>

      <div className="px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Top: confirmation + form side by side */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

            {/* Left: confirmation + demo pitch */}
            <div className="flex-1 space-y-8">
              {/* Confirmation */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-medium">{t.title}</h1>
                  <p className="text-white/50 font-[family-name:var(--font-prompt)] mt-1">
                    {t.subtitle}
                  </p>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              {/* Demo pitch */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h2 className="text-xl font-medium">{t.demoTitle}</h2>
                </div>
                <p className="text-sm text-white/50 font-[family-name:var(--font-prompt)] leading-relaxed pl-[52px]">
                  {t.demoSubtitle}
                </p>
              </div>

              {/* What you'll see in the demo */}
              <div className="pl-[52px] space-y-3">
                {[
                  locale === "th" ? "Dashboard สดดึงข้อมูลทุกช่องทาง" : "Live dashboards pulling data from all channels",
                  locale === "th" ? "AI Agent ตอบคำถามจากข้อมูลธุรกิจจริง" : "AI agents answering questions from your real business data",
                  locale === "th" ? "ระบบ Workflow อัตโนมัติทำงานจริง" : "Automated workflows running in real time",
                  locale === "th" ? "แผนการติดตั้งเฉพาะสำหรับธุรกิจคุณ" : "Implementation plan tailored to your business",
                ].map((item, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 mt-1.5 shrink-0" />
                    <p className="text-xs text-white/40 font-[family-name:var(--font-prompt)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: pre-qualification form */}
            <div className="w-full lg:max-w-md shrink-0">
              <DemoForm
                translations={t.demoForm}
                submittedTranslations={t.submitted}
                defaultEmail={email}
              />
            </div>
          </div>

          {/* Back link */}
          <div className="text-center pt-10">
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
    // Silently fail
  }
}
