export function PresenterBio({
  translations,
}: {
  translations?: {
    role: string;
    company: string;
    quote: string;
    footer: string;
  };
}) {
  const t = translations ?? {
    role: "Chief Technology Officer",
    company: "THCloud.AI",
    quote:
      "The system I will walk through is not a concept \u2014 I built it and it is running. I will show you exactly what it looks like.",
    footer:
      "THCloud.AI is the AI implementation arm of Tong Hua Holding PCL (SET:TH)",
  };

  return (
    <section className="max-w-2xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row gap-6 items-start bg-white/5 rounded-[40px] p-8 md:p-10">
        <div className="w-20 h-20 rounded-full bg-brand-navy shrink-0 flex items-center justify-center text-white text-2xl font-bold font-[family-name:var(--font-bai-jamjuree)]">
          CTO
        </div>
        <div>
          <p className="text-white font-medium text-lg mb-1">{t.role}</p>
          <p className="text-white/50 text-sm mb-4">{t.company}</p>
          <blockquote className="text-white/70 italic leading-relaxed font-[family-name:var(--font-prompt)]">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <p className="text-white/40 text-sm mt-4 font-[family-name:var(--font-prompt)]">
            {t.footer}
          </p>
        </div>
      </div>
    </section>
  );
}
