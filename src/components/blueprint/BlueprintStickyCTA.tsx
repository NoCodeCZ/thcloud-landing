"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BlueprintStickyCTA({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;

      const progress = window.scrollY / total;
      setVisible(progress >= 0.4);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-brand-dark/95 p-4 backdrop-blur md:hidden">
      <Button
        asChild
        className="h-12 w-full bg-brand-navy text-base font-medium text-white hover:bg-brand-navy/90"
      >
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
}
