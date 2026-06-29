"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How is this different from hiring a developer?",
    a: "A developer builds what you specify. We start by understanding your business properly — where the real problems are, what's costing you time and money, and what software will actually make a difference. You get strategy and execution combined, not just a contractor waiting for a brief. Everything is fixed price, so you always know the cost before work begins.",
  },
  {
    q: "Do I need to be technical to work with you?",
    a: "Not at all. You understand your business — we handle the technology. We talk in plain language about outcomes and problems, not APIs or code. If you want to go deeper into how something works, we're happy to explain, but it's never required.",
  },
  {
    q: "How long does a project take?",
    a: "Automation projects typically deliver in two to four weeks. Custom software builds vary by scope — anywhere from four weeks for something targeted to a few months for a full operational system. We agree a timeline upfront before any work begins, so you're never left wondering.",
  },
  {
    q: "What does the scoping process involve?",
    a: "We spend time properly understanding your business through calls and a detailed questionnaire. We map your current workflows, tools, and pain points, then produce a clear written proposal with a fixed price, scope and timeline. You know exactly what you're getting before anything starts.",
  },
  {
    q: "Do you work outside Queenstown?",
    a: "Yes. Most of our work happens remotely, so location is rarely a constraint. We're Queenstown-based and work with businesses across New Zealand — trades in Canterbury, tourism operators in Rotorua, professional services in Auckland. If you need us in person, we can usually make that work too.",
  },
  {
    q: "Who owns the software?",
    a: "You do. Everything we build for your business is yours — the code, the data, the workflows. No ongoing licence fees to us, no lock-in. Some projects use third-party services (like cloud hosting or payment providers) that have their own costs, but we make those clear in the proposal upfront.",
  },
  {
    q: "What if my needs change after the build?",
    a: "That's exactly what our ongoing partnership is for. We don't disappear after launch. Most clients continue with us on a rolling basis — iterating on what we've built, adding new features as the business grows, and staying ahead of problems before they become expensive. One relationship, long term.",
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
            <span className="text-[#0F172A] font-semibold text-base md:text-lg group-hover:text-[#D4AF37] transition-colors">
              {item.q}
            </span>
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] transition-transform duration-200 ${
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
            <p className="text-[#64748B] leading-relaxed text-base">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
