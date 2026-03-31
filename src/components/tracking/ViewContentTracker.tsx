"use client";

import { useEffect } from "react";
import { fbqTrack } from "./FacebookCAPI";

export function ViewContentTracker({
  contentName,
}: {
  contentName: string;
}) {
  useEffect(() => {
    fbqTrack("ViewContent", { content_name: contentName });
  }, [contentName]);

  return null;
}
