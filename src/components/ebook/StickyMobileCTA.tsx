"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollPercent >= 0.7);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-brand-dark/95 backdrop-blur border-t border-white/10 md:hidden">
      <Button
        asChild
        className="w-full bg-brand-navy text-white hover:bg-brand-navy/90 h-12 text-base font-medium"
      >
        <Link href="/webinar">Reserve Webinar Spot</Link>
      </Button>
    </div>
  );
}
