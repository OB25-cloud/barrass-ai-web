"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Over the dark hero the nav is transparent and light-on-dark; once the page
  // scrolls it becomes a frosted light bar so it reads on every section below.
  const onDark = !scrolled && !open;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        onDark
          ? "bg-transparent border-b border-transparent"
          : "bg-white/85 backdrop-blur-xl border-b border-black/[0.06]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a
          href="#"
          className={`flex items-center gap-2.5 font-semibold text-[15px] tracking-tight transition-colors duration-300 ${
            onDark ? "text-white" : "text-[#0A0A0A]"
          }`}
        >
          <span
            className="inline-block w-2 h-2 rounded-[2px]"
            style={{ background: "#10B981" }}
            aria-hidden
          />
          Barrass AI
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[13.5px] transition-colors duration-200 ${
                onDark
                  ? "text-white/60 hover:text-white"
                  : "text-[#0A0A0A]/60 hover:text-[#0A0A0A]"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://calendly.com/oliver-barrassai/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[13px] font-medium px-3.5 py-1.5 rounded-md transition-colors duration-200 ${
              onDark
                ? "bg-white text-[#0A0A0A] hover:bg-white/90"
                : "bg-[#0A0A0A] text-white hover:bg-[#26262B]"
            }`}
          >
            Book a call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`block h-[1.5px] w-5 transition-all duration-200 ${
                onDark ? "bg-white" : "bg-[#0A0A0A]"
              } ${
                n === 1 && open
                  ? "translate-y-2 rotate-45"
                  : n === 2 && open
                  ? "opacity-0"
                  : n === 3 && open
                  ? "-translate-y-2 -rotate-45"
                  : ""
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-black/[0.06] px-6 py-5 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[#0A0A0A]/75 hover:text-[#0A0A0A] text-[15px] py-2.5 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://calendly.com/oliver-barrassai/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="bg-[#0A0A0A] text-white font-medium px-5 py-3 rounded-md text-center mt-3 text-[14px]"
          >
            Book a call
          </a>
        </div>
      )}
    </nav>
  );
}
