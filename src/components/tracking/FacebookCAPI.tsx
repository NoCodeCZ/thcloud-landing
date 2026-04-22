"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function fbqTrack(
  eventName: string,
  params?: Record<string, string>,
  eventId?: string
): string {
  const id = eventId ?? newEventId();
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, params, { eventID: id });
  }
  return id;
}
