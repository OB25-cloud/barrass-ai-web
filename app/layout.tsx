import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barrass AI — AI Consulting for NZ Businesses",
  description:
    "Barrass AI helps New Zealand businesses replace manual admin and generic tools with custom AI built for their operations. Based in Queenstown.",
  openGraph: {
    title: "Barrass AI — AI built for your business. Not someone else's.",
    description:
      "Custom AI consulting for NZ businesses. Fixed price, local Queenstown-based, real results.",
    siteName: "Barrass AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
