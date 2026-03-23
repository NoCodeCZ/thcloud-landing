"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function getLocalePath(targetLocale: Locale) {
    // Replace current locale prefix with target
    const currentPrefix = `/${locale}`;
    if (pathname === currentPrefix || pathname === `${currentPrefix}/`) {
      return `/${targetLocale}`;
    }
    return pathname.replace(currentPrefix, `/${targetLocale}`);
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-white/30 mx-1">|</span>}
          {l === locale ? (
            <span className="text-white font-medium">{l.toUpperCase()}</span>
          ) : (
            <Link
              href={getLocalePath(l)}
              className="text-white/50 hover:text-white transition-colors"
            >
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
