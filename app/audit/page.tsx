import type { Metadata } from "next";
import Link from "next/link";
import AuditFlow from "./AuditFlow";

export const metadata: Metadata = {
  title: "Free AI Audit — Barrass AI",
  description:
    "Answer five questions and get an instant, personalised report showing where your business is losing time and money, and what custom software could fix.",
  openGraph: {
    title: "Free AI Audit — Barrass AI",
    description:
      "Five questions. An instant, personalised report on where your business is losing time and money.",
    siteName: "Barrass AI",
  },
};

export default function AuditPage() {
  return (
    <main className="relative min-h-svh overflow-hidden" style={{ background: "#0A0C10" }}>
      {/* Same faint grid + green glow as the homepage hero */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "-10%",
            width: "60%",
            height: "45%",
            background: "radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Minimal header: wordmark home, nothing else to click */}
      <header className="relative">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-[17px] tracking-[0.06em] uppercase text-white"
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "#10B981" }} aria-hidden />
            Barrass AI
          </Link>
          <Link
            href="/"
            className="text-[13.5px] transition-colors duration-200 text-white/60 hover:text-white"
          >
            Back to site
          </Link>
        </div>
      </header>

      <div className="relative max-w-6xl mx-auto px-6 pt-10 md:pt-16 pb-24 md:pb-32">
        <AuditFlow />
      </div>
    </main>
  );
}
