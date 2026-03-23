"use client";

import { ebookSections } from "@/data/ebook-content";
import { ChapterNav } from "./ChapterNav";
import { EbookSection } from "./EbookSection";
import { TransitionCTA } from "./TransitionCTA";
import { StickyMobileCTA } from "./StickyMobileCTA";

export function EbookContainer() {
  return (
    <>
      <div className="bg-white rounded-[40px] overflow-hidden max-w-4xl mx-auto">
        <ChapterNav sections={ebookSections} />
        <div className="p-6 md:p-10 space-y-12">
          {ebookSections.map((section) => (
            <EbookSection
              key={section.id}
              id={section.id}
              title={section.title}
              blocks={section.blocks}
            />
          ))}
          <TransitionCTA />
        </div>
      </div>
      <StickyMobileCTA />
    </>
  );
}
