import { Building2 } from "lucide-react";

export function CredibilityBlock({
  translations,
}: {
  translations?: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    implementingLabel: string;
    clients: readonly string[];
  };
}) {
  const t = translations ?? {
    title: "Built by a team that has already done this internally",
    paragraph1:
      "Tong Hua Holding PCL (SET:TH) \u2014 Thailand\u2019s stock exchange-listed company with 65 years in Thai business \u2014 used this exact system to manage a 4,000M THB portfolio with AI before offering it to external clients.",
    paragraph2:
      "We are not selling theory. We are deploying this for Thai businesses right now.",
    implementingLabel: "Currently implementing for:",
    clients: [
      "Manufacturing client \u2014 data visualization and AI dashboard phase",
      "SMB client \u2014 operations automation phase",
    ],
  };

  return (
    <section className="max-w-2xl mx-auto w-full bg-white/5 border border-white/5 border-t-indigo-400/30 rounded-[40px] p-8 md:p-10">
      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
        <Building2 className="w-5 h-5 text-indigo-400" />
      </div>
      <h2 className="text-xl md:text-2xl font-medium mb-4 text-white">
        {t.title}
      </h2>
      <p className="text-white/70 leading-relaxed mb-6 font-[family-name:var(--font-prompt)]">
        {t.paragraph1}
      </p>
      <p className="text-white/70 leading-relaxed mb-6 font-[family-name:var(--font-prompt)]">
        {t.paragraph2}
      </p>
      <div className="space-y-2">
        <p className="text-sm text-white/50 font-medium uppercase tracking-wider">
          {t.implementingLabel}
        </p>
        <ul className="text-white/70 space-y-1 font-[family-name:var(--font-prompt)]">
          {t.clients.map((client, i) => (
            <li key={i}>{client}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
