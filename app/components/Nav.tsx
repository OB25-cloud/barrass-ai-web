"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F5F0E8]/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <a
          href="#"
          className="text-[#B8922A] font-bold text-lg tracking-widest uppercase"
        >
          BARRASS AI
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm tracking-wide transition-colors ${
                scrolled
                  ? "text-[#111111]/60 hover:text-[#111111]"
                  : "text-[#F5F0E8]/70 hover:text-[#F5F0E8]"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#B8922A] hover:bg-[#a07824] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors tracking-wide"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`block h-0.5 w-6 transition-all duration-200 ${
                scrolled ? "bg-[#111111]" : "bg-[#F5F0E8]"
              } ${
                n === 1 && open ? "translate-y-2 rotate-45" :
                n === 2 && open ? "opacity-0" :
                n === 3 && open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu — always dark for legibility over hero */}
      {open && (
        <div className="md:hidden bg-[#111111] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[#F5F0E8]/80 hover:text-[#F5F0E8] text-base transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-[#B8922A] text-white font-semibold px-5 py-3 rounded text-center mt-2"
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}
