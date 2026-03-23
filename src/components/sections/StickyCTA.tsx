"use client";

import { useState, useEffect } from "react";

export function StickyCTA({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 600px (past the hero)
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="bg-brand-dark/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
        <button
          onClick={scrollToForm}
          className="w-full py-3 rounded-xl bg-white text-brand-navy font-medium text-sm hover:bg-white/90 transition-colors"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
