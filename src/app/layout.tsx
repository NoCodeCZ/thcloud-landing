import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Prompt, Bai_Jamjuree } from "next/font/google";
import { FacebookPixel } from "@/components/tracking/FacebookPixel";
import "./globals.css";

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

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${ibmPlexSansThai.variable} ${prompt.variable} ${baiJamjuree.variable} antialiased bg-brand-dark text-white`}
      >
        <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID || ""} />
        {children}
      </body>
    </html>
  );
}
