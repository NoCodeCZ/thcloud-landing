import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { EbookContainer } from "@/components/ebook/EbookContainer";
import { WebinarPopup } from "@/components/sections/WebinarPopup";
import { ViewContentTracker } from "@/components/tracking/ViewContentTracker";

export const metadata: Metadata = {
  title: "Your Blueprint Is Ready | THCloud.AI",
  description:
    "Read the AI-Ready Business Blueprint — the 5-layer architecture for turning your business into a connected AI operating system.",
};

export default function BlueprintReadPage() {
  return (
    <main className="min-h-screen bg-brand-dark">
      <ViewContentTracker contentName="AI Transformation Blueprint" />
      <TopBar actionLabel="Download PDF" actionHref="/blueprint.pdf" />

      {/* Hero */}
      <section className="px-6 pt-8 pb-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">
            Your Blueprint Is Ready
          </h1>
          <p className="text-white/70 leading-relaxed font-[family-name:var(--font-prompt)]">
            Read it below or download the PDF. At the end, we will show you what
            this looks like running live in a real Thai business.
          </p>
        </div>
      </section>

      {/* E-book Content */}
      <section className="px-4 md:px-6 pb-20">
        <EbookContainer />
      </section>

      <WebinarPopup
        showImmediately
        headline="See This Blueprint Running Live"
        body="Join our free webinar and watch a real Thai business run on the 5-layer AI OS — live demo, real numbers, real results."
        buttonText="Reserve Your Seat"
        buttonHref="/th/webinar"
      />
    </main>
  );
}
