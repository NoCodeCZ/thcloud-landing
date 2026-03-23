import { Button } from "@/components/ui/button";

export function SecondaryCTA({
  headline,
  body,
  buttonText,
  buttonHref,
}: {
  headline: string;
  body?: string;
  buttonText: string;
  buttonHref: string;
}) {
  return (
    <section className="max-w-2xl mx-auto w-full text-center py-8 border-t border-white/10">
      <h3 className="text-lg md:text-xl font-medium text-white mb-3">
        {headline}
      </h3>
      {body && (
        <p className="text-white/70 mb-6 font-[family-name:var(--font-prompt)] leading-relaxed">
          {body}
        </p>
      )}
      <Button
        asChild
        variant="outline"
        className="border-white/20 text-white hover:bg-white/10"
      >
        <a href={buttonHref}>{buttonText}</a>
      </Button>
    </section>
  );
}
