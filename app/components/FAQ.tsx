"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How is this different from hiring a developer?",
    a: "A developer builds what you specify. I start by identifying where AI actually creates value in your business — often in places you wouldn't think to look. You get strategy plus execution, not just a contractor waiting for a brief. And everything is fixed price, so you're never watching a meter run.",
  },
  {
    q: "Do I need to understand AI to work with you?",
    a: "Not at all. You understand your business — I handle the technology. We talk in plain language about outcomes and problems, not model architectures or APIs. If you want to go deeper, I'm happy to explain, but it's never required.",
  },
  {
    q: "How long does a project take?",
    a: "The AI Audit takes around 1–2 weeks. Quick Win projects typically deliver in 2–4 weeks. Custom builds vary by scope, but we agree a timeline upfront before any work begins. You'll never be left wondering.",
  },
  {
    q: "What does the audit involve?",
    a: "We spend a few hours together — over calls and a detailed questionnaire — mapping your current workflows, tools, and pain points. I then produce a written report identifying the highest-value AI opportunities in your business, with rough cost/benefit estimates and a recommended priority order.",
  },
  {
    q: "Do you work outside Queenstown?",
    a: "Yes. The majority of work happens remotely, so location is rarely a constraint. I'm Queenstown-based and proud of it, but I work with businesses across New Zealand.",
  },
  {
    q: "Who owns the software?",
    a: "You do. Everything built for your business is yours — the code, the data, the workflows. There are no ongoing licence fees to me. You may use third-party AI services (like OpenAI) that have their own subscription costs, but I'll make those clear in the proposal.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-100">
      {faqs.map((item, i) => (
        <div key={i}>
          <button
            className="w-full text-left py-5 flex items-center justify-between gap-4 group"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="text-[#111827] font-semibold text-base md:text-lg group-hover:text-[#B8922A] transition-colors">
              {item.q}
            </span>
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full border border-[#B8922A] flex items-center justify-center text-[#B8922A] transition-transform duration-200 ${
                openIndex === i ? "rotate-45" : ""
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1v10M1 6h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? "max-h-96 pb-5" : "max-h-0"
            }`}
          >
            <p className="text-[#6b7280] leading-relaxed text-base">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
