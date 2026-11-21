import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Head } from "nextra/components";
import type { ReactNode } from "react";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.fullName, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "KNIHAL", url: "https://github.com/KNIHAL" }],
  keywords: ["AI agents", "handoff", "continuity", "MCP", "Claude", "Cursor", "git", "CLI"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.fullName,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: site.fullName,
    description: site.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0d",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <Head />
      <body>{children}</body>
    </html>
  );
}
