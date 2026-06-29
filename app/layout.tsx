import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barrass AI — Custom Software for NZ Businesses",
  description:
    "We build custom software, automation and business systems for trades, construction, tourism and SMEs across New Zealand. Fixed price. You own the code.",
  openGraph: {
    title: "Barrass AI — Custom software built around your business.",
    description:
      "Custom software, workflow automation and business systems for NZ SMEs. Fixed price, no lock-in, Queenstown-based.",
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
