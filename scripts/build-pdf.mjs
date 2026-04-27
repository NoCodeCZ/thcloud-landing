#!/usr/bin/env node
/**
 * Renders the THCloud.AI Blueprint pages to PDF using Puppeteer.
 *
 * Usage:
 *   1. Start the Next.js server in another terminal:
 *        npm run dev          (development)
 *        npm run build && npm run start   (production)
 *   2. Run: npm run build:pdf
 *
 * Override target URL with BLUEPRINT_URL env var, e.g.:
 *   BLUEPRINT_URL=https://thcloud.ai npm run build:pdf
 */

import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const OUTPUT_DIR = resolve(PROJECT_ROOT, "public/downloads");

const BASE_URL = process.env.BLUEPRINT_URL || "http://localhost:3000";

const PAGES = [
  { locale: "th", path: "/th/blueprint/read", filename: "ai-blueprint-th.pdf" },
  { locale: "en", path: "/en/blueprint/read", filename: "ai-blueprint-en.pdf" },
];

async function checkServer(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok || res.status < 500;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const reachable = await checkServer(BASE_URL);
  if (!reachable) {
    console.error(`\n❌ Could not reach ${BASE_URL}`);
    console.error(`   Start the Next.js server first:`);
    console.error(`     npm run dev`);
    console.error(`   or set BLUEPRINT_URL=https://your-deployed-url\n`);
    process.exit(1);
  }

  console.log(`Launching headless Chromium…`);
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const page of PAGES) {
      const url = `${BASE_URL}${page.path}`;
      const outPath = resolve(OUTPUT_DIR, page.filename);
      console.log(`\n→ ${page.locale.toUpperCase()}  ${url}`);

      const tab = await browser.newPage();
      await tab.setViewport({ width: 1280, height: 1800, deviceScaleFactor: 2 });

      await tab.goto(url, { waitUntil: "networkidle0", timeout: 90_000 });

      // Force web fonts to settle and trigger any lazy images.
      await tab.evaluate(async () => {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((r) => setTimeout(r, 600));
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 200));
      });

      await tab.emulateMediaType("print");

      await tab.pdf({
        path: outPath,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: false,
        margin: { top: "16mm", bottom: "16mm", left: "12mm", right: "12mm" },
      });

      console.log(`✓ wrote ${outPath}`);
      await tab.close();
    }
  } finally {
    await browser.close();
  }

  console.log(`\nDone. PDFs in public/downloads/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
