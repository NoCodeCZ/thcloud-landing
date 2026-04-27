import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Prompt, Bai_Jamjuree, Anuphan } from "next/font/google";
import { FacebookPixel } from "@/components/tracking/FacebookPixel";
import "./globals.css";

const anuphan = Anuphan({
  variable: "--font-anuphan",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500"],
});

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
});

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  subsets: ["thai", "latin"],
  weight: ["700"],
});

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${anuphan.variable} ${ibmPlexSansThai.variable} ${prompt.variable} ${baiJamjuree.variable} antialiased bg-white text-[#242424]`}
      >
        <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID || ""} />
        {children}
      </body>
    </html>
  );
}
