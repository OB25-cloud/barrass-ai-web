"use client";

import { useEffect, useRef, useState } from "react";
import { BUSINESS_TYPES, TEAM_SIZES, TIME_WASTERS } from "../lib/audit-options";

/* ─── Free AI audit — five questions, then details, then the report.
   Dark surface to match the hero and contact sections. Inputs reuse
   the existing .dark-input styles; buttons mirror ButtonPrimary /
   ButtonSecondary from the homepage.
──────────────────────────────────────────────────────────────── */

type Answers = {
  businessType: string;
  teamSize: string;
  currentSoftware: string;
  timeWasters: string[];
  biggestFrustration: string;
  name: string;
  email: string;
};

const QUESTION_COUNT = 5;
const DETAILS_STEP = QUESTION_COUNT; // index 5

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LOADING_LINES = [
  "Reading your answers",
  "Mapping where the hours go",
  "Sizing the opportunities",
  "Writing your report",
];

function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 13l4 4L19 7" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
  multi = false,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onClick}
      className="w-full text-left flex items-center justify-between gap-4 px-5 py-4 rounded-xl text-[15.5px] transition-[border-color,background-color] duration-200"
      style={{
        border: selected ? "1px solid rgba(16,185,129,0.7)" : "1px solid rgba(255,255,255,0.1)",
        background: selected ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.04)",
        color: selected ? "#ffffff" : "rgba(255,255,255,0.85)",
      }}
    >
      <span>{label}</span>
      <span
        className="flex-shrink-0 flex items-center justify-center rounded-full transition-colors duration-200"
        style={{
          width: "22px",
          height: "22px",
          border: selected ? "1px solid rgba(16,185,129,0.6)" : "1px solid rgba(255,255,255,0.14)",
          background: selected ? "rgba(16,185,129,0.14)" : "transparent",
        }}
        aria-hidden
      >
        {selected && <Check />}
      </span>
    </button>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  color: "rgba(255,255,255,0.5)",
  fontWeight: 500,
  marginBottom: "7px",
};

export default function AuditFlow() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"form" | "loading" | "report" | "error">("form");
  const [answers, setAnswers] = useState<Answers>({
    businessType: "",
    teamSize: "",
    currentSoftware: "",
    timeWasters: [],
    biggestFrustration: "",
    name: "",
    email: "",
  });
  const [reportHtml, setReportHtml] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingLine, setLoadingLine] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  // Scroll the question into view on step change (matters on phones).
  useEffect(() => {
    if (step === 0) return;
    topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [step, phase]);

  // Rotate the loading sub-line so the wait feels alive.
  useEffect(() => {
    if (phase !== "loading") return;
    const id = setInterval(() => setLoadingLine((n) => (n + 1) % LOADING_LINES.length), 2600);
    return () => clearInterval(id);
  }, [phase]);

  const stepValid = (() => {
    switch (step) {
      case 0: return answers.businessType !== "";
      case 1: return answers.teamSize !== "";
      case 2: return answers.currentSoftware.trim().length >= 2;
      case 3: return answers.timeWasters.length >= 2;
      case 4: return answers.biggestFrustration.trim().length >= 10;
      default: return true;
    }
  })();

  const detailsValid = answers.name.trim().length >= 1 && EMAIL_RE.test(answers.email.trim());

  const next = () => {
    if (!stepValid) return;
    setStep((s) => Math.min(s + 1, DETAILS_STEP));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggleWaster = (w: string) =>
    set(
      "timeWasters",
      answers.timeWasters.includes(w)
        ? answers.timeWasters.filter((x) => x !== w)
        : [...answers.timeWasters, w]
    );

  const generate = async () => {
    if (!detailsValid) return;
    setLoadingLine(0);
    setPhase("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          name: answers.name.trim(),
          email: answers.email.trim(),
          currentSoftware: answers.currentSoftware.trim(),
          biggestFrustration: answers.biggestFrustration.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { reportHtml?: string; error?: string };
      if (!res.ok || !data.reportHtml) {
        throw new Error(data.error || "Something went wrong generating your report.");
      }
      setReportHtml(data.reportHtml);
      setPhase("report");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong generating your report.");
      setPhase("error");
    }
  };

  // Ctrl/Cmd+Enter advances from a textarea without hijacking plain Enter.
  const onTextareaKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      next();
    }
  };

  /* ─── Loading ─────────────────────────────────────────────── */
  if (phase === "loading") {
    return (
      <div ref={topRef} className="max-w-2xl mx-auto flex flex-col items-center text-center py-20 md:py-28 audit-enter">
        <div className="audit-pulse mb-8" aria-hidden />
        <p className="text-white font-semibold tracking-[-0.02em] text-[1.5rem] md:text-[1.75rem] mb-3">
          Analysing your business…
        </p>
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: "rgba(255,255,255,0.45)" }} aria-live="polite">
          {LOADING_LINES[loadingLine]}
        </p>
        <p className="text-[14px] mt-8" style={{ color: "rgba(255,255,255,0.35)" }}>
          This usually takes 20–40 seconds.
        </p>
      </div>
    );
  }

  /* ─── Error ───────────────────────────────────────────────── */
  if (phase === "error") {
    return (
      <div ref={topRef} className="max-w-2xl mx-auto py-16 md:py-24 audit-enter">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
          Something went wrong
        </p>
        <h1 className="text-white font-semibold tracking-[-0.03em] leading-[1.08] text-[1.75rem] md:text-[2.25rem] mb-4">
          We couldn&apos;t generate your report.
        </h1>
        <p className="text-[15.5px] leading-relaxed mb-8" style={{ color: "#F87171" }}>
          {errorMessage}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={generate}
            className="inline-flex items-center justify-center gap-2 font-medium text-[15px] px-5 py-3 rounded-lg transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px"
            style={{ background: "#ffffff", color: "#0A0A0A" }}
          >
            Try again
            <Arrow />
          </button>
          <button
            type="button"
            onClick={() => setPhase("form")}
            className="inline-flex items-center justify-center gap-2 font-medium text-[15px] px-5 py-3 rounded-lg transition-colors duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.85)", background: "transparent" }}
          >
            Edit my answers
          </button>
        </div>
      </div>
    );
  }

  /* ─── Report ──────────────────────────────────────────────── */
  if (phase === "report") {
    return (
      <div ref={topRef} className="max-w-3xl mx-auto audit-enter">
        <div className="mb-8 md:mb-10">
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
            Your report is ready
          </p>
          <h1 className="text-white font-semibold tracking-[-0.03em] leading-[1.08] text-[1.75rem] md:text-[2.25rem]">
            Here&apos;s where {answers.name.trim()}&apos;s business is losing time.
          </h1>
        </div>

        <div
          className="audit-report rounded-2xl p-6 md:p-10"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 30px 80px -20px rgba(0,0,0,0.7)",
          }}
          dangerouslySetInnerHTML={{ __html: reportHtml }}
        />

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center gap-5">
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 font-medium text-[15px] px-5 py-3 rounded-lg transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px"
            style={{ background: "#10B981", color: "#062B1F" }}
          >
            Book a free call
            <Arrow />
          </a>
          <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            Your report has been emailed to {answers.email.trim()}.
          </p>
        </div>
      </div>
    );
  }

  /* ─── Form ────────────────────────────────────────────────── */
  const isDetails = step === DETAILS_STEP;
  const progress = isDetails ? 100 : (step / QUESTION_COUNT) * 100;

  return (
    <div ref={topRef} className="max-w-2xl mx-auto scroll-mt-24">
      {/* Progress */}
      <div className="mb-10 md:mb-12">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
            {isDetails ? "Last step" : `Step ${step + 1} of ${QUESTION_COUNT}`}
          </p>
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
            Free AI audit
          </p>
        </div>
        <div className="w-full rounded-full overflow-hidden" style={{ height: "2px", background: "rgba(255,255,255,0.08)" }} aria-hidden>
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%`, background: "#10B981" }}
          />
        </div>
      </div>

      <div key={step} className="audit-enter">
        {step === 0 && (
          <Question title="What type of business do you run?">
            <div className="grid grid-cols-1 gap-2.5" role="radiogroup">
              {BUSINESS_TYPES.map((t) => (
                <OptionButton key={t} label={t} selected={answers.businessType === t} onClick={() => set("businessType", t)} />
              ))}
            </div>
          </Question>
        )}

        {step === 1 && (
          <Question title="How many people work in your business?">
            <div className="grid grid-cols-1 gap-2.5" role="radiogroup">
              {TEAM_SIZES.map((t) => (
                <OptionButton key={t} label={t} selected={answers.teamSize === t} onClick={() => set("teamSize", t)} />
              ))}
            </div>
          </Question>
        )}

        {step === 2 && (
          <Question title="What do you currently use to run your business?">
            <textarea
              autoFocus
              rows={4}
              value={answers.currentSoftware}
              onChange={(e) => set("currentSoftware", e.target.value)}
              onKeyDown={onTextareaKey}
              placeholder="e.g. spreadsheets, pen and paper, Xero, a mix of apps..."
              className="dark-input"
              style={{ resize: "none" }}
              maxLength={1000}
            />
          </Question>
        )}

        {step === 3 && (
          <Question
            title="Where does your team waste the most time?"
            hint={
              answers.timeWasters.length < 2
                ? `Pick at least two.${answers.timeWasters.length === 1 ? " One more." : ""}`
                : `${answers.timeWasters.length} selected.`
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="group">
              {TIME_WASTERS.map((w) => (
                <OptionButton key={w} label={w} multi selected={answers.timeWasters.includes(w)} onClick={() => toggleWaster(w)} />
              ))}
            </div>
          </Question>
        )}

        {step === 4 && (
          <Question title="What's your biggest frustration right now?" hint="Two or three sentences is perfect.">
            <textarea
              autoFocus
              rows={5}
              value={answers.biggestFrustration}
              onChange={(e) => set("biggestFrustration", e.target.value)}
              onKeyDown={onTextareaKey}
              placeholder="Tell us what's slowing you down or costing you the most..."
              className="dark-input"
              style={{ resize: "none" }}
              maxLength={2000}
            />
          </Question>
        )}

        {isDetails && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generate();
            }}
          >
            <Question title="Where should we send your report?">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="audit-name" style={labelStyle}>
                    First name <span style={{ color: "#10B981" }}>*</span>
                  </label>
                  <input
                    id="audit-name"
                    type="text"
                    name="name"
                    autoComplete="given-name"
                    autoFocus
                    required
                    value={answers.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Your first name"
                    className="dark-input"
                    maxLength={80}
                  />
                </div>
                <div>
                  <label htmlFor="audit-email" style={labelStyle}>
                    Email <span style={{ color: "#10B981" }}>*</span>
                  </label>
                  <input
                    id="audit-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={answers.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@business.co.nz"
                    className="dark-input"
                    maxLength={200}
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={!detailsValid}
                  className="w-full inline-flex items-center justify-center gap-2 font-medium text-[15px] px-5 py-3.5 rounded-lg transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40 disabled:active:translate-y-0"
                  style={{ background: "#10B981", color: "#062B1F" }}
                >
                  Generate my report
                  <Arrow />
                </button>
                <p className="text-center text-[13.5px] mt-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Your report will appear instantly and be emailed to you.
                </p>
              </div>
            </Question>
          </form>
        )}
      </div>

      {/* Back / Next */}
      <div className="mt-8 md:mt-10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={back}
          className={`inline-flex items-center justify-center gap-2 font-medium text-[15px] px-5 py-3 rounded-lg transition-colors duration-200 ${step === 0 ? "invisible" : ""}`}
          style={{ border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.85)", background: "transparent" }}
          aria-hidden={step === 0}
          tabIndex={step === 0 ? -1 : 0}
        >
          Back
        </button>
        {!isDetails && (
          <button
            type="button"
            onClick={next}
            disabled={!stepValid}
            className="inline-flex items-center justify-center gap-2 font-medium text-[15px] px-5 py-3 rounded-lg transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40 disabled:active:translate-y-0"
            style={{ background: "#ffffff", color: "#0A0A0A" }}
          >
            Next
            <Arrow />
          </button>
        )}
      </div>
    </div>
  );
}

function Question({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-white font-semibold tracking-[-0.03em] leading-[1.08] text-[1.75rem] md:text-[2.25rem] mb-3">
        {title}
      </h1>
      <p className="text-[15px] mb-8 min-h-[1.5em]" style={{ color: "rgba(255,255,255,0.5)" }}>
        {hint ?? ""}
      </p>
      {children}
    </div>
  );
}
