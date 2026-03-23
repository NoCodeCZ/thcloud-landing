"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface WebinarPopupProps {
  headline: string;
  body: string;
  buttonText: string;
  buttonHref: string;
  showImmediately?: boolean;
}

export function WebinarPopup({
  headline,
  body,
  buttonText,
  buttonHref,
  showImmediately = false,
}: WebinarPopupProps) {
  const [visible, setVisible] = useState(showImmediately);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (showImmediately) return;

    function handleScroll() {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollPercent >= 0.6);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showImmediately]);

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 left-4 md:left-auto md:w-[400px] z-50
        animate-in slide-in-from-bottom-4 fade-in duration-500
        bg-brand-navy/95 backdrop-blur-lg border border-white/15 rounded-2xl shadow-2xl
        overflow-hidden"
    >
      {/* Accent gradient top border */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500" />

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-semibold text-white leading-snug">
            {headline}
          </h3>
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full
              text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm text-white/65 leading-relaxed mb-4">{body}</p>

        <Button
          asChild
          className="w-full bg-white text-brand-navy hover:bg-white/90 h-11 text-sm font-semibold"
        >
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
}
