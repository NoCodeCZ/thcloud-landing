import Link from "next/link";
import { Button } from "@/components/ui/button";

export function TransitionCTA() {
  return (
    <section className="text-center py-12 border-t border-gray-200 mt-12">
      <h2 className="text-2xl md:text-3xl font-medium text-brand-title mb-4">
        Want to See This Running Live?
      </h2>
      <p className="text-brand-subtitle leading-relaxed max-w-xl mx-auto mb-2 font-[family-name:var(--font-prompt)]">
        We are currently building this exact 5-layer system for a manufacturing
        business in Thailand.
      </p>
      <p className="text-brand-subtitle leading-relaxed max-w-xl mx-auto mb-8 font-[family-name:var(--font-prompt)]">
        In a few weeks, our CTO will walk through the live system — real
        dashboards, real data queries, real AI agents — in a 30-minute recorded
        session.
      </p>
      <Button
        asChild
        className="bg-brand-navy text-white hover:bg-brand-navy/90 h-12 px-8 text-base font-medium"
      >
        <Link href="/webinar">Reserve My Spot on the Webinar</Link>
      </Button>
      <p className="text-sm text-brand-subtitle mt-3">
        Free to watch. No commitment.
      </p>
    </section>
  );
}
