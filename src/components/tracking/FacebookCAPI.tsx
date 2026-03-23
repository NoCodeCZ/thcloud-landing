"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function FacebookCAPI({ email }: { email?: string }) {
  useEffect(() => {
    // Fire client-side pixel event as fallback
    if (typeof window.fbq === "function") {
      window.fbq("track", "CompleteRegistration", {
        content_name: "AI Transformation Blueprint",
        ...(email ? { email } : {}),
      });
    }
  }, [email]);

  // No visible UI
  return null;
}
