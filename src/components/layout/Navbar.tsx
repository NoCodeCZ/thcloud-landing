"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavItem = {
  label: string;
  href: string;
};

const navItemsTh: NavItem[] = [
  { label: "ปัญหา", href: "#problem" },
  { label: "โซลูชัน", href: "#solution" },
  { label: "แผนงาน", href: "#timeline" },
  { label: "เทคโนโลยี", href: "#stack" },
  { label: "FAQ", href: "#faq" },
];

const navItemsEn: NavItem[] = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Timeline", href: "#timeline" },
  { label: "Stack", href: "#stack" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar({
  locale,
  ctaLabel,
}: {
  locale: string;
  ctaLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = locale === "th" ? navItemsTh : navItemsEn;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTo(href: string) {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function scrollToForm() {
    setMobileOpen(false);
    const el = document.getElementById("lead-form-hero");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = el.querySelector('input[type="email"]') as HTMLInputElement;
        input?.focus();
      }, 500);
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14 md:h-16">
          {/* Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-[family-name:var(--font-bai-jamjuree)] font-bold text-lg md:text-xl text-white hover:opacity-80 transition-opacity"
          >
            THCloud.AI
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="px-3 py-1.5 text-sm text-white/72 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}
            <div className="w-px h-5 bg-white/10 mx-2" />
            <LanguageSwitcher locale={locale as Locale} />
            <button
              onClick={scrollToForm}
              className={`ml-3 px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                scrolled
                  ? "bg-white text-brand-navy hover:scale-105"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {ctaLabel}
            </button>
          </nav>

          {/* Mobile: lang + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSwitcher locale={locale as Locale} />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-brand-dark/95 backdrop-blur-xl border-b border-white/5">
            <nav className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="block w-full text-left px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <button
                onClick={scrollToForm}
                className="block w-full text-center px-3 py-2.5 text-sm font-medium bg-white text-brand-navy rounded-lg hover:bg-white/90 transition-colors"
              >
                {ctaLabel}
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-14 md:h-16" />
    </>
  );
}
