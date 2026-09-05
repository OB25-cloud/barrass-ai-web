import Image from "next/image";
import Nav from "./components/Nav";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import AnimateOnScroll from "./components/AnimateOnScroll";

/* ─── Design system
   Ink (dark):   #0A0C10 base · #111318 raised
   Paper:        #FFFFFF base · #F7F7F5 alt
   Text (light): #0A0A0A heading · #52525B body · #8A8A93 muted
   Accent:       #10B981 — used only for live-status dots and the audit CTA
   Width:        max-w-6xl · Section rhythm: py-24 md:py-32
──────────────────────────────────────────────────────────────────── */

const CALENDLY = "https://calendly.com/oliver-barrassai/30min";

/* ─── Shared primitives ──────────────────────────────────────── */

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className="font-mono text-[11px] tracking-[0.14em] uppercase mb-5"
      style={{ color: dark ? "rgba(255,255,255,0.45)" : "#8A8A93" }}
    >
      {children}
    </p>
  );
}

function LiveBadge({ label = "Live", dark = false }: { label?: string; dark?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] uppercase"
      style={{ color: dark ? "rgba(255,255,255,0.6)" : "#52525B" }}
    >
      <span className="live-dot" />
      {label}
    </span>
  );
}

function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalArrow({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Browser-frame presentation. The image is rendered at its intrinsic aspect
   ratio (width/height from the file) so the full screenshot is always visible —
   nothing is cropped. */
function BrowserFrame({
  src,
  alt,
  width,
  height,
  url,
  sizes,
  preload = false,
  dark = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  url: string;
  sizes: string;
  preload?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl"
      style={{
        background: dark ? "#111318" : "#ffffff",
        border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
        boxShadow: dark
          ? "0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 80px -20px rgba(0,0,0,0.7)"
          : "0 1px 2px rgba(0,0,0,0.04), 0 20px 50px -20px rgba(0,0,0,0.18)",
      }}
    >
      <div
        className="flex items-center gap-3 px-3.5"
        style={{
          height: "34px",
          borderBottom: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
          background: dark ? "#0F1116" : "#FAFAF9",
        }}
      >
        <div className="flex items-center gap-1.5" aria-hidden>
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              className="block rounded-full"
              style={{ width: "8px", height: "8px", background: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)" }}
            />
          ))}
        </div>
        <div className="flex-1 flex justify-center">
          <span
            className="font-mono text-[10.5px] tracking-[0.02em] truncate px-3 py-[3px] rounded-md"
            style={{
              color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.42)",
              background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
              maxWidth: "60%",
            }}
          >
            {url}
          </span>
        </div>
        <div style={{ width: "38px" }} aria-hidden />
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        preload={preload}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}

function ButtonPrimary({
  href,
  children,
  external = false,
  tone = "dark",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  tone?: "dark" | "light" | "accent";
}) {
  const styles: Record<string, React.CSSProperties> = {
    dark: { background: "#0A0A0A", color: "#ffffff" },
    light: { background: "#ffffff", color: "#0A0A0A" },
    accent: { background: "#10B981", color: "#062B1F" },
  };
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center justify-center gap-2 font-medium text-[15px] px-5 py-3 rounded-lg transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px"
      style={styles[tone]}
    >
      {children}
      <Arrow />
    </a>
  );
}

function ButtonSecondary({
  href,
  children,
  external = false,
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center justify-center gap-2 font-medium text-[15px] px-5 py-3 rounded-lg transition-colors duration-200"
      style={{
        border: dark ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(0,0,0,0.12)",
        color: dark ? "rgba(255,255,255,0.85)" : "#0A0A0A",
        background: "transparent",
      }}
    >
      {children}
    </a>
  );
}

/* ─── 1. Hero (dark) ─────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0A0C10" }}>
      {/* Faint grid + single cool glow behind the screenshot */}
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
            top: "42%",
            width: "70%",
            height: "40%",
            background: "radial-gradient(ellipse, rgba(16,185,129,0.14) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Two-column split: copy left, Pawly frame right. Sized so both columns
          sit above the fold on a 1080p display (min-height 100svh, nav offset). */}
      <div
        className="relative max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 pt-28 pb-16 lg:pt-16 lg:pb-0 flex items-center"
        style={{ minHeight: "100svh" }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="mb-7">
              <LiveBadge label="Platforms live in production across NZ" dark />
            </div>

            <h1
              className="font-semibold text-white tracking-[-0.035em] leading-[1.02] mb-6"
              style={{ fontSize: "clamp(2.5rem, 4.3vw, 3.75rem)" }}
            >
              Replace the spreadsheets. Own the software.
            </h1>

            <p
              className="text-[17px] md:text-[18px] leading-relaxed mb-9"
              style={{ color: "rgba(255,255,255,0.58)", maxWidth: "480px" }}
            >
              Barrass AI designs and builds bespoke, AI-powered management platforms
              for New Zealand businesses — fixed price, delivered in weeks, and yours outright.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <ButtonPrimary href={CALENDLY} external tone="light">
                Book a Discovery Call
              </ButtonPrimary>
              <ButtonSecondary href="#work" dark>
                View Our Work
              </ButtonSecondary>
            </div>
          </div>

          {/* Hero product visual — Pawly, shown in full. On large screens the
              frame bleeds slightly past the container's right edge for scale. */}
          <div className="lg:col-span-7 lg:-mr-10 xl:-mr-20 2xl:-mr-40">
            <BrowserFrame
              src="/case-studies/pet-management.png"
              alt="Pawly — dog daycare operations platform dashboard showing today's arrivals, van pickups and revenue"
              width={1888}
              height={988}
              url="pawly-orpin.vercel.app"
              sizes="(min-width: 1024px) 60vw, 100vw"
              preload
              dark
            />
            <p
              className="font-mono text-[11px] tracking-[0.08em] uppercase mt-4"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Pawly — operations platform for a Wellington dog daycare
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Trust bar (dark) ────────────────────────────────────── */

const deployed = [
  { name: "Pawly", vertical: "Pet services" },
  { name: "BCR Connect", vertical: "Vehicle rental" },
  { name: "Dealer Fleet", vertical: "Automotive" },
  { name: "Operify", vertical: "Landscaping & trades" },
];

function TrustBar() {
  return (
    <section style={{ background: "#0A0C10", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-9">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <p
            className="font-mono text-[11px] tracking-[0.14em] uppercase shrink-0"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Live and deployed
          </p>
          <div className="grid grid-cols-2 md:flex md:flex-1 md:justify-between gap-y-5 gap-x-8">
            {deployed.map((d) => (
              <div key={d.name} className="flex items-center gap-3">
                <span className="live-dot" />
                <div className="leading-tight">
                  <p className="text-white text-[15px] font-medium tracking-[-0.01em]">{d.name}</p>
                  <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>{d.vertical}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Case studies (light) ────────────────────────────────── */

type CaseStudy = {
  category: string;
  name: string;
  description: string;
  features: string[];
  result: string;
  href: string;
  cta: string;
  image: { src: string; alt: string; width: number; height: number; url: string };
};

const featured: CaseStudy = {
  category: "Pet services · Flagship platform",
  name: "Pawly",
  description:
    "A complete operations platform for a Wellington dog daycare. One-tap check-ins with photos, van-run routing with automated SMS ETAs, vaccination tracking, AI-written visit notes and a client portal — five disconnected tools replaced by one system the team actually enjoys using.",
  features: [
    "One-tap check-in",
    "Van run routing",
    "AI visit notes",
    "Client portal",
    "Vaccination tracking",
    "Automated SMS & email",
  ],
  result: "Demo live",
  href: "https://pawly-orpin.vercel.app/demo",
  cta: "Open the live demo",
  image: {
    src: "/case-studies/pet-management.png",
    alt: "Pawly dashboard",
    width: 1888,
    height: 988,
    url: "pawly-orpin.vercel.app",
  },
};

const platforms: CaseStudy[] = [
  {
    category: "Vehicle rental",
    name: "BCR Connect",
    description:
      "Fleet compliance, timesheets, rostering, fine tracking and provider billing for a NZ car rental operator — with an offline-capable app for staff on the yard.",
    features: ["Fleet compliance", "Timesheets & rosters", "Fine tracking", "Provider billing", "Offline PWA"],
    result: "6+ tools replaced",
    href: "https://bcr-connect.vercel.app/demo",
    cta: "View demo",
    image: { src: "/case-studies/bcr-connect.png", alt: "BCR Connect dashboard", width: 1917, height: 1013, url: "bcr-connect.vercel.app" },
  },
  {
    category: "Automotive",
    name: "Dealer Fleet",
    description:
      "Stock, compliance, PDI & WoF boards, yard audits and AI number-plate scanning across two dealership entities for a Queenstown motor group.",
    features: ["Stock management", "Compliance alerts", "AI plate scanning", "PDI & WoF boards", "Yard audit"],
    result: "130+ vehicles · 2 entities",
    href: "https://qmg-smg-fleet.vercel.app/demo",
    cta: "View demo",
    image: { src: "/case-studies/dealer-fleet.png", alt: "Dealer Fleet dashboard", width: 1897, height: 870, url: "qmg-smg-fleet.vercel.app" },
  },
  {
    category: "Landscaping & trades",
    name: "Operify",
    description:
      "Job scheduling, quote-to-invoice, purchase orders, staff and CRM for field service businesses — with natural-language search across the whole operation.",
    features: ["Job scheduling", "Quote to invoice", "Purchase orders", "Client CRM", "AI search"],
    result: "133 jobs · $33k tracked",
    href: "https://simofy.vercel.app/demo",
    cta: "View demo",
    image: { src: "/case-studies/operify.png", alt: "Operify dashboard", width: 1918, height: 991, url: "simofy.vercel.app" },
  },
];

const websites: CaseStudy[] = [
  {
    category: "Beauty",
    name: "Ange Enoka Hair & Bridal",
    description: "Premium bridal hair studio — gallery, testimonials and a clean enquiry flow.",
    features: ["Gallery", "Testimonials", "Enquiry form"],
    result: "Live",
    href: "https://angeenokahairandbridal.com",
    cta: "Visit site",
    image: { src: "/case-studies/ange-enoka.png", alt: "Ange Enoka Hair & Bridal homepage", width: 1889, height: 988, url: "angeenokahairandbridal.com" },
  },
  {
    category: "Wellness",
    name: "Align Within",
    description: "EFT tapping therapy practice in Wellington — services, testimonials and booking.",
    features: ["Services", "Booking", "SEO"],
    result: "Live",
    href: "https://alignwithin.co.nz",
    cta: "Visit site",
    image: { src: "/case-studies/align-within.png", alt: "Align Within homepage", width: 1892, height: 981, url: "alignwithin.co.nz" },
  },
  {
    category: "Trade",
    name: "Pete's Custom Creations",
    description: "Metal fabrication showcase for a Whanganui craftsman — projects, gallery, mobile-first enquiry.",
    features: ["Project showcase", "Gallery", "Mobile-first"],
    result: "Live",
    href: "https://petescustomcreations.co.nz",
    cta: "Visit site",
    image: { src: "/case-studies/petes-custom-creations.png", alt: "Pete's Custom Creations homepage", width: 1897, height: 991, url: "petescustomcreations.co.nz" },
  },
];

function FeatureList({ items, compact = false }: { items: string[]; compact?: boolean }) {
  return (
    <ul className={`flex flex-wrap ${compact ? "gap-x-3 gap-y-1.5" : "gap-x-4 gap-y-2"}`}>
      {items.map((f) => (
        <li
          key={f}
          className={`inline-flex items-center gap-1.5 ${compact ? "text-[12.5px]" : "text-[13.5px]"}`}
          style={{ color: "#52525B" }}
        >
          <span className="inline-block rounded-full" style={{ width: "4px", height: "4px", background: "#A1A1AA" }} aria-hidden />
          {f}
        </li>
      ))}
    </ul>
  );
}

function CaseStudyCard({ study, sizes }: { study: CaseStudy; sizes: string }) {
  return (
    <article className="flex flex-col h-full">
      <a href={study.href} target="_blank" rel="noopener noreferrer" className="block group" aria-label={`${study.name} — ${study.cta}`}>
        <div className="transition-transform duration-300 group-hover:-translate-y-1">
          <BrowserFrame
            src={study.image.src}
            alt={study.image.alt}
            width={study.image.width}
            height={study.image.height}
            url={study.image.url}
            sizes={sizes}
          />
        </div>
      </a>
      <div className="flex flex-col flex-1 pt-6">
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase mb-2.5" style={{ color: "#8A8A93" }}>
          {study.category}
        </p>
        <h3 className="text-[#0A0A0A] font-semibold text-[19px] tracking-[-0.02em] mb-2.5">{study.name}</h3>
        <p className="text-[14.5px] leading-relaxed mb-5" style={{ color: "#52525B" }}>
          {study.description}
        </p>
        <div className="mb-6">
          <FeatureList items={study.features} compact />
        </div>
        <div className="mt-auto flex items-center justify-between gap-4 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <a
            href={study.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0A0A0A] hover:opacity-70 transition-opacity"
          >
            {study.cta}
            <ExternalArrow />
          </a>
          <LiveBadge label={study.result} />
        </div>
      </div>
    </article>
  );
}

function CaseStudies() {
  return (
    <section id="work" className="py-24 md:py-32" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="max-w-2xl mb-14 md:mb-20">
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="text-[#0A0A0A] font-semibold tracking-[-0.03em] leading-[1.05] text-[2.25rem] md:text-[3rem] mb-5">
              Built, shipped, and in use every day.
            </h2>
            <p className="text-[17px] leading-relaxed" style={{ color: "#52525B" }}>
              Every platform below is live in production. Open a demo and use it yourself.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Featured — Pawly */}
        <AnimateOnScroll>
          <article
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center rounded-2xl p-6 md:p-10 mb-6"
            style={{ background: "#F7F7F5", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-5">
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: "#8A8A93" }}>
                  {featured.category}
                </p>
              </div>
              <h3 className="text-[#0A0A0A] font-semibold tracking-[-0.03em] text-[2rem] md:text-[2.5rem] leading-[1.05] mb-4">
                {featured.name}
              </h3>
              <p className="text-[15.5px] leading-relaxed mb-7" style={{ color: "#52525B" }}>
                {featured.description}
              </p>
              <div className="mb-8">
                <FeatureList items={featured.features} />
              </div>
              <div className="flex items-center gap-5 flex-wrap">
                <ButtonPrimary href={featured.href} external>
                  {featured.cta}
                </ButtonPrimary>
                <LiveBadge label="Wellington dog daycare · Live" />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <BrowserFrame
                src={featured.image.src}
                alt={featured.image.alt}
                width={featured.image.width}
                height={featured.image.height}
                url={featured.image.url}
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </div>
          </article>
        </AnimateOnScroll>

        {/* Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-14 mt-14 md:mt-20">
          {platforms.map((s, i) => (
            <AnimateOnScroll key={s.name} delay={i * 70} className="flex">
              <CaseStudyCard study={s} sizes="(min-width: 768px) 360px, 100vw" />
            </AnimateOnScroll>
          ))}
        </div>

        {/* Websites */}
        <div className="mt-20 md:mt-28 pt-14 md:pt-16" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <AnimateOnScroll>
            <div className="flex items-end justify-between gap-6 mb-10 md:mb-12">
              <div>
                <Eyebrow>Websites</Eyebrow>
                <h3 className="text-[#0A0A0A] font-semibold tracking-[-0.02em] text-[1.5rem] md:text-[1.75rem]">
                  Fast, custom-built sites that bring in work.
                </h3>
              </div>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-14">
            {websites.map((s, i) => (
              <AnimateOnScroll key={s.name} delay={i * 70} className="flex">
                <CaseStudyCard study={s} sizes="(min-width: 768px) 360px, 100vw" />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Services (light alt) ────────────────────────────────── */

const services = [
  {
    title: "Management platforms",
    body: "Scheduling, jobs, clients, compliance and reporting in one place — the core system your operation runs on.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "AI where it pays off",
    body: "Number-plate scanning, AI-written visit notes, plain-English search across your data. Practical, not a chatbot bolted on.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" /><path d="M19 17l.7 1.8 1.8.7-1.8.7L19 22l-.7-1.8-1.8-.7 1.8-.7L19 17z" />
      </svg>
    ),
  },
  {
    title: "Automation",
    body: "SMS ETAs, reminders, invoicing and follow-ups that happen on their own — so admin stops eating the week.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    title: "Integrations",
    body: "Xero, payments, mapping and messaging connected properly, so data flows through without re-entry.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7" />
      </svg>
    ),
  },
  {
    title: "Field & mobile apps",
    body: "Installable apps that work offline on the yard, in the van or on site, and sync when you're back in range.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2.5" /><path d="M11 18h2" />
      </svg>
    ),
  },
  {
    title: "Websites & client portals",
    body: "Fast, custom-built sites and self-service portals that capture leads and keep clients in the loop.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
      </svg>
    ),
  },
];

function Services() {
  return (
    <section id="services" className="py-24 md:py-32" style={{ background: "#F7F7F5" }}>
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="max-w-2xl mb-14 md:mb-16">
            <Eyebrow>What we build</Eyebrow>
            <h2 className="text-[#0A0A0A] font-semibold tracking-[-0.03em] leading-[1.05] text-[2.25rem] md:text-[3rem] mb-5">
              One system for the whole operation.
            </h2>
            <p className="text-[17px] leading-relaxed" style={{ color: "#52525B" }}>
              From the first quote to the final invoice — designed around the way your team already works, not a template you adapt to.
            </p>
          </div>
        </AnimateOnScroll>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden"
          style={{ background: "rgba(0,0,0,0.06)", gap: "1px", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          {services.map((s, i) => (
            <AnimateOnScroll key={s.title} delay={i * 50} className="flex">
              <div className="flex flex-col w-full p-7 md:p-8" style={{ background: "#FFFFFF" }}>
                <div className="mb-6 text-[#0A0A0A]/70">{s.icon}</div>
                <h3 className="text-[#0A0A0A] font-semibold text-[17px] tracking-[-0.01em] mb-2">{s.title}</h3>
                <p className="text-[14.5px] leading-relaxed" style={{ color: "#52525B" }}>
                  {s.body}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. How it works (light) ────────────────────────────────── */

const steps = [
  {
    n: "01",
    title: "Discovery",
    body: "A free 30-minute call. We look at where time and money are leaking and whether custom software is the right fix. No pitch.",
  },
  {
    n: "02",
    title: "Scope & fixed price",
    body: "We map your workflows, pick the highest-value pieces, and set a fixed price and timeline before any code is written.",
  },
  {
    n: "03",
    title: "Build, launch, partner",
    body: "We build, test and deploy. You own the code and data outright. Then we stay on — iterating as the business grows.",
  },
];

const principles = [
  { k: "Fixed price", v: "Agreed before we start. No surprises." },
  { k: "You own it", v: "Code, data, everything. No licence fees." },
  { k: "Weeks, not months", v: "Most builds ship in 4–12 weeks." },
];

function HowItWorks() {
  return (
    <section id="process" className="py-24 md:py-32" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="max-w-2xl mb-14 md:mb-16">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-[#0A0A0A] font-semibold tracking-[-0.03em] leading-[1.05] text-[2.25rem] md:text-[3rem]">
              A clear price, a clear timeline, and software you keep.
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((s, i) => (
            <AnimateOnScroll key={s.n} delay={i * 80}>
              <div className="pt-6" style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                <p className="font-mono text-[11px] tracking-[0.14em] mb-5" style={{ color: "#8A8A93" }}>
                  {s.n}
                </p>
                <h3 className="text-[#0A0A0A] font-semibold text-[19px] tracking-[-0.02em] mb-3">{s.title}</h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "#52525B" }}>
                  {s.body}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <div
            className="grid grid-cols-1 sm:grid-cols-3 mt-16 md:mt-20 rounded-2xl overflow-hidden"
            style={{ background: "rgba(0,0,0,0.06)", gap: "1px", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            {principles.map((p) => (
              <div key={p.k} className="p-6 md:p-7" style={{ background: "#F7F7F5" }}>
                <p className="text-[#0A0A0A] font-semibold text-[17px] tracking-[-0.01em] mb-1">{p.k}</p>
                <p className="text-[14px]" style={{ color: "#52525B" }}>{p.v}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

/* ─── 6. Social proof (light alt) ────────────────────────────── */

function SocialProof() {
  return (
    <section className="py-20 md:py-24" style={{ background: "#F7F7F5", borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Placeholder attribution — swap in the real client when available. */}
        <AnimateOnScroll>
          <figure className="max-w-3xl mx-auto text-center">
            <blockquote
              className="text-[#0A0A0A] font-medium tracking-[-0.02em] leading-[1.3] text-[1.5rem] md:text-[2rem] mb-8"
            >
              “Working with Oliver was straightforward from day one. The system does exactly what we needed and the team picked it up immediately.”
            </blockquote>
            <figcaption className="text-[14px]" style={{ color: "#8A8A93" }}>
              <span className="text-[#0A0A0A] font-medium">Client Name</span> · Owner, Wellington Business
            </figcaption>
          </figure>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

/* ─── 7. About (light) ───────────────────────────────────────── */

function About() {
  const facts = [
    { k: "Oliver Barrass", v: "Founder" },
    { k: "Queenstown, NZ", v: "Working nationwide" },
    { k: "Founder-led", v: "On every project" },
  ];

  return (
    <section id="about" className="py-24 md:py-32" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <AnimateOnScroll className="lg:col-span-5">
            <div
              className="relative overflow-hidden rounded-2xl w-full max-w-md"
              style={{ aspectRatio: "4 / 5", background: "#F7F7F5" }}
            >
              <Image
                src="/oliver.jpg"
                alt="Oliver Barrass, founder of Barrass AI"
                fill
                sizes="(min-width: 1024px) 440px, 100vw"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={80} className="lg:col-span-7">
            <Eyebrow>The founder</Eyebrow>
            <h2 className="text-[#0A0A0A] font-semibold tracking-[-0.03em] leading-[1.08] text-[2rem] md:text-[2.6rem] mb-8">
              I spent years inside NZ businesses before I built software for them.
            </h2>
            <div className="space-y-5 text-[16px] leading-relaxed" style={{ color: "#52525B" }}>
              <p>
                Before Barrass AI, I worked in recruitment and business development — building a branch from scratch and finishing my first year at 147% of budget. The useful part wasn&apos;t the numbers. It was sitting inside dozens of trades, tourism, rental and service businesses every week and watching good operators get slowed down by software that didn&apos;t fit.
              </p>
              <p>
                So every project here starts before any code: time with the people doing the work, mapping how the business actually runs. What comes out is software that fits the operation as it already is — and that the owner keeps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              {facts.map((f) => (
                <div key={f.k}>
                  <p className="text-[#0A0A0A] font-medium text-[15px] tracking-[-0.01em]">{f.k}</p>
                  <p className="text-[13.5px]" style={{ color: "#8A8A93" }}>{f.v}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#0A0A0A] hover:opacity-70 transition-opacity"
              >
                Start a conversation
                <Arrow />
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

/* ─── 8. FAQ (light alt) ─────────────────────────────────────── */

function FAQSection() {
  return (
    <section className="py-24 md:py-32" style={{ background: "#F7F7F5" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <AnimateOnScroll className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="text-[#0A0A0A] font-semibold tracking-[-0.03em] leading-[1.05] text-[2rem] md:text-[2.5rem]">
              The things people ask before they book.
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={80} className="lg:col-span-8">
            <FAQ />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

/* ─── 9. CTA + Contact (dark) ────────────────────────────────── */

function CTAAndContact() {
  const details = [
    { label: "Phone", value: "022 548 2473", href: "tel:+64225482473" },
    { label: "Email", value: "oliver@barrassai.com", href: "mailto:oliver@barrassai.com" },
    { label: "Location", value: "Queenstown, New Zealand", href: undefined },
  ];

  return (
    <section className="relative overflow-hidden" style={{ background: "#0A0C10" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "-10%",
            width: "60%",
            height: "50%",
            background: "radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* CTA */}
      <div className="relative max-w-6xl mx-auto px-6 pt-24 md:pt-32 pb-20 md:pb-24">
        <AnimateOnScroll>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow dark>Free AI audit</Eyebrow>
            <h2
              className="text-white font-semibold tracking-[-0.035em] leading-[1.04] mb-6"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
            >
              Find out where your business is losing time.
            </h2>
            <p className="text-[17px] leading-relaxed mb-10 mx-auto" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "540px" }}>
              A free 30-minute audit. We&apos;ll identify the highest-value opportunities for software and automation and send you a written summary. No obligation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonPrimary href={CALENDLY} external tone="accent">
                Book your free audit
              </ButtonPrimary>
              <ButtonSecondary href="#contact" dark>
                Send a message
              </ButtonSecondary>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Contact */}
      <div id="contact" className="relative max-w-6xl mx-auto px-6 pt-16 md:pt-20 pb-24 md:pb-32" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <AnimateOnScroll className="lg:col-span-5">
            <Eyebrow dark>Get in touch</Eyebrow>
            <h3 className="text-white font-semibold tracking-[-0.03em] leading-[1.08] text-[1.75rem] md:text-[2.25rem] mb-5">
              Tell us about your business.
            </h3>
            <p className="text-[15.5px] leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>
              Replacing software that doesn&apos;t fit, or starting from scratch — either way, we reply within one business day.
            </p>
            <dl className="space-y-5">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="font-mono text-[10.5px] tracking-[0.14em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {d.label}
                  </dt>
                  <dd className="text-[15px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {d.href ? (
                      <a href={d.href} className="hover:text-white transition-colors">{d.value}</a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100} className="lg:col-span-7">
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ background: "#111318", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <ContactForm />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer (dark) ──────────────────────────────────────────── */

function Footer() {
  const links = [
    ["Work", "#work"],
    ["Services", "#services"],
    ["Process", "#process"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ];

  return (
    <footer style={{ background: "#0A0C10", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2 h-2 rounded-[2px]" style={{ background: "#10B981" }} aria-hidden />
          <span className="text-white font-semibold text-[15px] tracking-tight">Barrass AI</span>
          <span className="text-[13px] ml-2 hidden sm:inline" style={{ color: "rgba(255,255,255,0.35)" }}>
            Custom software for NZ businesses
          </span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-white transition-colors">
              {label}
            </a>
          ))}
          <a href="mailto:oliver@barrassai.com" className="hover:text-white transition-colors">
            oliver@barrassai.com
          </a>
        </div>
        <p className="text-[12.5px]" style={{ color: "rgba(255,255,255,0.3)" }}>
          © {new Date().getFullYear()} Barrass AI · Queenstown, NZ
        </p>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <CaseStudies />
        <Services />
        <HowItWorks />
        <SocialProof />
        <About />
        <FAQSection />
        <CTAAndContact />
      </main>
      <Footer />
    </>
  );
}
