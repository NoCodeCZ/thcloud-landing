import { Button } from "@/components/ui/button";

export function ThankYouState({
  email,
  translations,
}: {
  email: string;
  translations?: {
    title: string;
    emailNotice: string;
    whileYouWait: string;
    downloadPdf: string;
    followLinkedin: string;
  };
}) {
  const t = translations ?? {
    title: "You are on the list.",
    emailNotice: "We will email you at {email} the moment the webinar is live.",
    whileYouWait: "While you wait:",
    downloadPdf: "Download the Blueprint PDF",
    followLinkedin: "Follow on LinkedIn",
  };

  // Split emailNotice around {email} placeholder
  const emailParts = t.emailNotice.split("{email}");

  return (
    <div className="text-center max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl md:text-3xl font-medium text-white">
        {t.title}
      </h2>
      <p className="text-white/70 font-[family-name:var(--font-prompt)] leading-relaxed">
        {emailParts[0]}
        <span className="text-white font-medium">{email}</span>
        {emailParts[1]}
      </p>
      <div className="space-y-3">
        <p className="text-white/50 text-sm">{t.whileYouWait}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <a href="/blueprint.pdf" download>
              {t.downloadPdf}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <a
              href="https://linkedin.com/company/thcloud-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.followLinkedin}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
