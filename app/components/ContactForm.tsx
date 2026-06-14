"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#B8922A] hover:bg-[#a07824] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg text-base tracking-wide transition-colors"
    >
      {pending ? "Sending…" : "Send Enquiry"}
    </button>
  );
}

function SelectField({
  name,
  label,
  required,
  options,
}: {
  name: string;
  label: string;
  required?: boolean;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-[#111111]/50 text-sm mb-2">
        {label}
        {required && <span className="text-[#B8922A] ml-0.5"> *</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          defaultValue=""
          required={required}
          className="w-full appearance-none bg-white rounded-lg border border-[#111111]/12 px-4 py-3 pr-10 text-[#111111] focus:outline-none focus:border-[#B8922A] transition-colors text-base cursor-pointer"
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#111111]/35">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

const initial: ContactState = { status: "idle", message: "" };

const inputClass =
  "w-full bg-white rounded-lg border border-[#111111]/12 px-4 py-3 text-[#111111] placeholder-[#111111]/30 focus:outline-none focus:border-[#B8922A] transition-colors text-base";

export default function ContactForm() {
  const [state, action] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div className="bg-[#B8922A]/10 rounded-xl p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-[#B8922A]/20 flex items-center justify-center mx-auto mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="#B8922A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-[#111111] font-semibold text-lg">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      {/* Row 1: Name + Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[#111111]/50 text-sm mb-2">
            Name <span className="text-[#B8922A]">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-[#111111]/50 text-sm mb-2">
            Business name
          </label>
          <input
            type="text"
            name="business"
            placeholder="Company name"
            className={inputClass}
          />
        </div>
      </div>

      {/* Industry */}
      <div>
        <label className="block text-[#111111]/50 text-sm mb-2">Industry</label>
        <input
          type="text"
          name="industry"
          placeholder="e.g. Trades, Hospitality, Professional services…"
          className={inputClass}
        />
      </div>

      {/* Row 2: Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SelectField
          name="challenge"
          label="Biggest challenge"
          options={[
            "Too much manual admin",
            "Tools that don't fit my business",
            "Missing leads after hours",
            "No visibility on performance",
            "Other",
          ]}
        />
        <SelectField
          name="looking_for"
          label="What are you looking for"
          options={[
            "Free discovery call",
            "AI Audit",
            "Custom software build",
            "Not sure yet",
          ]}
        />
      </div>

      {/* Row 3: Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[#111111]/50 text-sm mb-2">
            Email <span className="text-[#B8922A]">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@business.co.nz"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-[#111111]/50 text-sm mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="022 000 0000"
            className={inputClass}
          />
        </div>
      </div>

      {/* Additional context */}
      <div>
        <label className="block text-[#111111]/50 text-sm mb-2">
          Additional context{" "}
          <span className="text-[#111111]/30 font-normal">(optional)</span>
        </label>
        <textarea
          name="context"
          rows={4}
          placeholder="Anything else that would help me understand your situation…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {state.status === "error" && (
        <p className="text-red-600 text-sm">{state.message}</p>
      )}

      <SubmitButton />
    </form>
  );
}
