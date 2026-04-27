"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ImageScrub({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const inner = ref.current.querySelector<HTMLElement>("[data-scrub]");
      if (!inner) return;

      gsap.set(inner, { scale: 0.92, opacity: 0.55 });
      gsap.to(inner, {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "top 35%",
          scrub: 0.8,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      <div data-scrub className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
