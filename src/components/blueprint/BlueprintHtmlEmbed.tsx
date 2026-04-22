"use client";

import { useEffect, useRef, useState } from "react";

export function BlueprintHtmlEmbed({
  src,
  title,
  minHeight = 1800,
}: {
  src: string;
  title: string;
  minHeight?: number;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight);

  useEffect(() => {
    function normalizeDocument(doc: Document) {
      if (!doc.head.querySelector("[data-blueprint-embed-styles]")) {
        const style = doc.createElement("style");
        style.setAttribute("data-blueprint-embed-styles", "true");
        style.textContent = `
          html, body {
            background: #ffffff;
          }

          body {
            margin: 0 auto !important;
            padding: 24px 20px 40px !important;
            max-width: 1120px !important;
            box-sizing: border-box;
          }

          table {
            margin-left: auto !important;
            margin-right: auto !important;
          }

          img {
            max-width: 100% !important;
            height: auto !important;
          }
        `;
        doc.head.appendChild(style);
      }
    }

    function updateHeight() {
      const iframe = iframeRef.current;
      const doc = iframe?.contentWindow?.document;

      if (!doc) return;

      normalizeDocument(doc);

      const nextHeight = Math.max(
        minHeight,
        doc.documentElement.scrollHeight,
        doc.body.scrollHeight,
      );

      setHeight(nextHeight + 8);
    }

    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      updateHeight();
      window.setTimeout(updateHeight, 250);
      window.setTimeout(updateHeight, 1000);
    };

    iframe.addEventListener("load", handleLoad);
    window.addEventListener("resize", updateHeight);

    return () => {
      iframe.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", updateHeight);
    };
  }, [minHeight]);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className="w-full border-0 bg-white"
      style={{ height }}
    />
  );
}
