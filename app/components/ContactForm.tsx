"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full font-bold py-4 px-8 rounded-xl text-base tracking-wide transition-all"
      style={{
        background: "#D4AF37",
        color: "#0D1B2A",
        opacity: pending ? 0.6 : 1,
        cursor: pending ? "not-allowed" : "pointer",
        boxShadow: pending ? "none" : "0 4px 20px rgba(212,175,55,0.3)",
      }}
    >
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

const initial: ContactState = { status: "idle", message: "" };

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  color: "rgba(255,255,255,0.42)",
  fontWeight: 500,
  marginBottom: "7px",
};

export default function ContactForm() {
  const [state, action] = useActionState(submitContact, initial);
  const [filled, setFilled] = useState<Record<string, boolean>>({});

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilled((prev) => ({ ...prev, [e.target.name]: !!e.target.value }));
  };

  const selectColor = (name: string): React.CSSProperties => ({
    color: filled[name] ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)",
  });

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-12">
        <div
          className="flex items-center justify-center rounded-full mb-5"
          style={{
            width: "52px",
            height: "52px",
            background: "rgba(212,175,55,0.15)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-white font-semibold text-lg mb-2">{state.message}</p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">

      {/* Name + Email — side by side on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle}>
            Name <span style={{ color: "#D4AF37" }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="dark-input"
          />
        </div>
        <div>
          <label style={labelStyle}>
            Email <span style={{ color: "#D4AF37" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@business.co.nz"
            className="dark-input"
          />
        </div>
      </div>

      {/* Industry */}
      <div>
        <label style={labelStyle}>What best describes your business?</label>
        <select
          name="industry"
          className="dark-select"
          defaultValue=""
          onChange={onSelectChange}
          style={selectColor("industry")}
        >
          <option value="" disabled>Select your industry</option>
          <option>Trades &amp; Construction</option>
          <option>Landscaping &amp; Grounds</option>
          <option>Hospitality &amp; Food</option>
          <option>Vehicle Rental</option>
          <option>Retail &amp; E-commerce</option>
          <option>Professional Services</option>
          <option>Other</option>
        </select>
      </div>

      {/* Objective */}
      <div>
        <label style={labelStyle}>What are you looking to do?</label>
        <select
          name="objective"
          className="dark-select"
          defaultValue=""
          onChange={onSelectChange}
          style={selectColor("objective")}
        >
          <option value="" disabled>Select your goal</option>
          <option>Replace existing software that doesn't fit</option>
          <option>Automate manual admin and repetitive tasks</option>
          <option>Build something new from scratch</option>
          <option>Not sure yet — just want to explore</option>
        </select>
      </div>

      {/* Headcount */}
      <div>
        <label style={labelStyle}>Roughly how many staff?</label>
        <select
          name="headcount"
          className="dark-select"
          defaultValue=""
          onChange={onSelectChange}
          style={selectColor("headcount")}
        >
          <option value="" disabled>Select team size</option>
          <option>Just me</option>
          <option>2–5 staff</option>
          <option>6–20 staff</option>
          <option>20+ staff</option>
        </select>
      </div>

      {/* Optional context */}
      <div>
        <label style={labelStyle}>
          Anything else we should know?{" "}
          <span style={{ color: "rgba(255,255,255,0.22)", fontWeight: 400 }}>
            (optional)
          </span>
        </label>
        <textarea
          name="context"
          rows={4}
          placeholder="Any extra context — current tools you use, biggest pain points, timelines."
          className="dark-input"
          style={{ resize: "none" }}
        />
      </div>

      {state.status === "error" && (
        <p style={{ color: "#F87171", fontSize: "13px" }}>{state.message}</p>
      )}

      <SubmitButton />
    </form>
  );
}
