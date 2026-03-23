"use client";

import { useEffect, useState, useCallback } from "react";
import type { EbookSection } from "@/data/ebook-content";

export function ChapterNav({ sections }: { sections: EbookSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id || "");

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-20% 0px -70% 0px",
    });

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections, handleIntersection]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <nav className="sticky top-0 z-20 bg-white border-b border-gray-100 overflow-x-auto">
      <div className="flex gap-1 p-2 min-w-max">
        {sections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className={`px-3 py-2 text-xs md:text-sm rounded-lg whitespace-nowrap transition-colors ${
              activeId === section.id
                ? "bg-brand-navy text-white"
                : "text-brand-subtitle hover:bg-brand-surface"
            }`}
          >
            <span className="font-[family-name:var(--font-bai-jamjuree)] font-bold mr-1.5">
              {i + 1}
            </span>
            <span className="hidden md:inline">{section.title}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
