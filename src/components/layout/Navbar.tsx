"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { BrandLockup } from "./BrandLockup";

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
    const el = document.getElementById("lead-form-final");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      const expand = el.querySelector<HTMLButtonElement>(
        'button[type="button"]'
      );
      if (expand) expand.click();
      setTimeout(() => {
        const input = el.querySelector<HTMLInputElement>('input[type="email"]');
        input?.focus({ preventScroll: true });
      }, 250);
    }, 600);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-[#E5E7EB]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14 md:h-16">
          {/* Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:opacity-80 transition-opacity"
          >
            <BrandLockup
              textClassName={`text-lg md:text-xl transition-colors ${scrolled ? "text-[#242424]" : "text-white"}`}
              iconClassName="h-7 w-7 md:h-8 md:w-8"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`px-3 py-1.5 text-sm transition-colors rounded-lg ${
                  scrolled
                    ? "text-[#555555] hover:text-[#3B36CC] hover:bg-[#EEF3FF]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className={`w-px h-5 mx-2 ${scrolled ? "bg-[#DFE2E8]" : "bg-white/15"}`} />
            <div className={scrolled ? "text-[#242424]" : "text-white"}>
              <LanguageSwitcher locale={locale as Locale} />
            </div>
            <button
              onClick={scrollToForm}
              className="ml-3 px-4 py-2 text-sm font-medium rounded-xl bg-[#3B36CC] text-white hover:bg-[#2D29A3] transition-colors active:scale-[0.98]"
            >
              {ctaLabel}
            </button>
          </nav>

          {/* Mobile: lang + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <div className={scrolled ? "text-[#242424]" : "text-white"}>
              <LanguageSwitcher locale={locale as Locale} />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-1.5 rounded-lg transition-colors ${scrolled ? "hover:bg-[#F6F7F8]" : "hover:bg-white/10"}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className={`w-5 h-5 ${scrolled ? "text-[#242424]" : "text-white"}`} />
              ) : (
                <Menu className={`w-5 h-5 ${scrolled ? "text-[#242424]" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-[#E5E7EB]">
            <nav className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="block w-full text-left px-3 py-2.5 text-sm text-[#555555] hover:text-[#3B36CC] hover:bg-[#EEF3FF] rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-[#E5E7EB] my-2" />
              <button
                onClick={scrollToForm}
                className="block w-full text-center px-3 py-2.5 text-sm font-medium bg-[#3B36CC] text-white rounded-xl hover:bg-[#2D29A3] transition-colors"
              >
                {ctaLabel}
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
