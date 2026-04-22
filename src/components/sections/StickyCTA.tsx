"use client";

import { useState, useEffect } from "react";

const DEFAULT_HIDDEN_IDS = ["lead-form-hero", "lead-form-inline", "lead-form-final"];

export function StickyCTA({
  label,
  onClick,
  hiddenWhenVisibleIds = DEFAULT_HIDDEN_IDS,
}: {
  label: string;
  onClick?: () => void;
  hiddenWhenVisibleIds?: string[];
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const visibleForms = new Set<string>();
    let frame = 0;

    const syncVisibility = () => {
      setVisible(window.scrollY > 600 && visibleForms.size === 0);
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(syncVisibility);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          if (!id) {
            return;
          }
          if (entry.isIntersecting) {
            visibleForms.add(id);
          } else {
            visibleForms.delete(id);
          }
        });
        syncVisibility();
      },
      { threshold: 0.3 }
    );

    hiddenWhenVisibleIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    syncVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hiddenWhenVisibleIds]);

  function scrollToForm() {
    if (onClick) {
      onClick();
      return;
    }
    const el = document.getElementById("lead-form-hero");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Focus the email input
      setTimeout(() => {
        const input = el.querySelector('input[type="email"]') as HTMLInputElement;
        input?.focus();
      }, 500);
    }
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="border-t border-white/10 bg-brand-dark/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
        <button
          onClick={scrollToForm}
          className="w-full rounded-2xl bg-white py-3.5 text-sm font-medium text-brand-navy shadow-[0_16px_40px_rgba(15,23,42,0.25)] transition-colors hover:bg-white/90"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
