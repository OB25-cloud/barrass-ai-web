import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barrass AI: software products, built and shipped",
  description:
    "Ollie Barrass designs, builds and launches software products: MockMonkey, Title Wave, a Shorts editing engine and the platform that runs Zaminka Dog Motels.",
  openGraph: {
    title: "Barrass AI: software products, built and shipped",
    description:
      "MockMonkey, Title Wave, a Shorts editing engine and the platform that runs Zaminka Dog Motels. Watch them work.",
    siteName: "Barrass AI",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${display.variable} h-full`}>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
