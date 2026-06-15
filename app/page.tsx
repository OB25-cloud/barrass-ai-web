import Nav from "./components/Nav";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";

/* ─── Shared primitives ──────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#B8922A] text-xs font-bold tracking-[0.2em] uppercase mb-5">
      {children}
    </p>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="bg-white pt-32 pb-20 md:pb-28 min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-[#B8922A] text-xs font-bold tracking-[0.2em] uppercase mb-7">
          AI Consulting · Queenstown, NZ
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold text-[#111827] leading-[1.0] tracking-tight max-w-4xl mb-8">
          AI built for your business.{" "}
          <span className="text-[#B8922A]">Not someone else&apos;s.</span>
        </h1>

        <p className="text-[#6b7280] text-lg md:text-xl max-w-xl leading-relaxed mb-10">
          I help NZ businesses cut manual admin, replace tools that don&apos;t
          fit, and build systems designed around how they actually work.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-block bg-[#B8922A] hover:bg-[#a07824] text-white font-bold text-base px-8 py-4 rounded transition-colors tracking-wide"
          >
            Book a free discovery call
          </a>
          <a
            href="#work"
            className="inline-block border border-gray-200 hover:border-gray-400 text-[#111827] font-semibold text-base px-8 py-4 rounded transition-colors"
          >
            See our work
          </a>
        </div>

        <div className="mt-16 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {[
              { value: "$88k+", label: "identified across active projects" },
              { value: "$40k+", label: "average value found per audit" },
              { value: "Queenstown-based", label: "NZ-wide" },
            ].map((s) => (
              <div key={s.value}>
                <p className="text-[#111827] font-semibold text-sm">{s.value}</p>
                <p className="text-[#6b7280] text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Social Proof Bar ───────────────────────────────────────── */

function SocialProof() {
  return (
    <div className="bg-white border-y border-gray-100 py-5">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-[#6b7280] text-sm text-center">
          Working with businesses across trades, hospitality, professional
          services, retail and more — Queenstown and beyond.
        </p>
      </div>
    </div>
  );
}

/* ─── Problem ────────────────────────────────────────────────── */

const problems = [
  {
    title: "Drowning in manual admin",
    body: "Hours every week lost to data entry, scheduling, and chasing paperwork. It feels inevitable — just part of running a business. But most of it can be automated, and the businesses that figure this out gain back 10 or more hours every single week.",
  },
  {
    title: "Generic tools that don't fit",
    body: "Off-the-shelf software built for an average business, not yours. You've bent your processes around the tool's limitations instead of the other way around. Meanwhile you're paying monthly for features you don't use and missing the ones you actually need.",
  },
  {
    title: "No real visibility",
    body: "You know things are falling through the cracks but can't see exactly where. Reporting is manual, delayed, or non-existent — so decisions get made on gut feel rather than facts. By the time you spot the problem, revenue's already gone.",
  },
  {
    title: "Leads falling through the gaps",
    body: "Enquiries going cold because follow-up depends on someone remembering at the right moment. After-hours leads sitting in an inbox until Monday. Revenue leaking quietly through gaps that nobody has time to properly fix.",
  },
];

function Problem() {
  return (
    <section className="bg-[#f9fafb] py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <Label>The problem</Label>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] leading-[1.05] tracking-tight mb-16 md:mb-20 max-w-xs">
          Sound familiar?
        </h2>

        <div>
          {problems.map((p) => (
            <div
              key={p.title}
              className="flex gap-5 py-10 border-b border-gray-100 last:border-b-0"
            >
              <div className="shrink-0 mt-1.5">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M9 1.5L16.5 9 9 16.5 1.5 9 9 1.5z"
                    fill="#B8922A"
                    fillOpacity="0.15"
                    stroke="#B8922A"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-[#111827] font-bold text-xl md:text-2xl mb-3">
                  {p.title}
                </h3>
                <p className="text-[#6b7280] text-base md:text-lg leading-relaxed max-w-2xl">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────── */

const services = [
  {
    number: "01",
    title: "AI Audit",
    body: "We spend time properly understanding your business before recommending anything. I map your actual workflows, talk to the people doing the work, and identify where AI genuinely makes sense — and where it doesn't. You get a clear written report with priorities and rough cost/benefit estimates. Whether you work with me after that is entirely up to you.",
  },
  {
    number: "02",
    title: "Quick Wins",
    body: "Targeted automations live within days, not months. Invoice processing, review request sequences, lead capture and routing, report generation — these are the things that eat hours every week and can be fixed fast. Scoped and delivered in two to four weeks with measurable results from day one.",
  },
  {
    number: "03",
    title: "Custom Builds",
    body: "Software built specifically for your business, scoped and priced upfront — and you own it outright. No licensing fees, no lock-in. Whether it's a custom CRM replacing an expensive generic tool, a client portal, or an end-to-end operational system, it's built from scratch around how your business actually works.",
  },
  {
    number: "04",
    title: "AI Partner",
    body: "Ongoing support, not a one-off job. Once we've built something, I stay close — monitoring what's working, iterating on what isn't, and building new pieces as your business grows. Think of it as having an in-house AI person without the overhead of a full-time hire.",
  },
];

function Services() {
  return (
    <section id="services" className="bg-white py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <Label>What I do</Label>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] leading-[1.05] tracking-tight mb-16 md:mb-20 max-w-xs">
          Services
        </h2>

        <div className="divide-y divide-gray-100">
          {services.map((s) => (
            <div key={s.number} className="flex gap-8 md:gap-16 py-12 md:py-14">
              <span className="text-[#B8922A] text-sm font-bold shrink-0 w-8 pt-1">
                {s.number}
              </span>
              <div className="flex-1">
                <h3 className="text-[#111827] font-bold text-2xl md:text-3xl mb-4">
                  {s.title}
                </h3>
                <p className="text-[#6b7280] text-base md:text-lg leading-relaxed max-w-2xl">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How it works ───────────────────────────────────────────── */

const steps = [
  {
    n: "1",
    title: "Discovery Call",
    body: "Free 20-minute call. We talk about your business, what's costing you time and money, and whether AI is genuinely the right tool. No pitch, no obligation — just an honest conversation to see if it's worth going further.",
  },
  {
    n: "2",
    title: "AI Audit",
    body: "Paid, in-person or remote deep-dive into how your business actually operates. I map your workflows, identify the highest-value opportunities, and deliver a full written report with priorities and cost/benefit estimates. You own the report regardless of what happens next.",
  },
  {
    n: "3",
    title: "Build and Partner",
    body: "Fixed price, agreed upfront — you always know the total cost before work begins. I build, test, and deploy, and you own the result outright. Optionally continue as an AI Partner: I stay embedded, iterate on what we've built, and keep building as your needs grow.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-[#f9fafb] py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <Label>The process</Label>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] leading-[1.05] tracking-tight mb-16 md:mb-20 max-w-xs">
          How it works
        </h2>

        <div className="max-w-2xl">
          {steps.map((step, i) => (
            <div key={step.n} className="flex gap-8 md:gap-12">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border border-[#B8922A] flex items-center justify-center text-[#B8922A] font-bold text-sm shrink-0">
                  {step.n}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-[#B8922A]/20 my-3" />
                )}
              </div>
              <div className={i < steps.length - 1 ? "pb-12 md:pb-16" : ""}>
                <h3 className="text-[#111827] font-bold text-xl md:text-2xl mb-3 mt-1.5">
                  {step.title}
                </h3>
                <p className="text-[#6b7280] text-base md:text-lg leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Video Testimonial ──────────────────────────────────────── */

function VideoTestimonial() {
  return (
    <section className="bg-white py-24 md:py-36">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <Label>In their own words</Label>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight mb-4">
            What our clients say
          </h2>
          <p className="text-[#6b7280] text-base md:text-lg max-w-md mx-auto">
            Hear directly from a business owner on what working together
            actually looks like.
          </p>
        </div>

        <div className="max-w-[700px] mx-auto">
          <iframe
            src="https://www.youtube.com/embed/oInjRnVlFfk?modestbranding=1&rel=0"
            title="Client testimonial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full aspect-video rounded-2xl shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Current Work ───────────────────────────────────────────── */

function CurrentWork() {
  return (
    <section id="work" className="bg-[#f9fafb] py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <Label>Current projects</Label>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] leading-[1.05] tracking-tight mb-4 max-w-sm">
          What I&apos;m building
        </h2>
        <p className="text-[#6b7280] text-base md:text-lg mb-16 md:mb-20">
          Real businesses, real results. Names withheld by agreement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Case Study 1 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col">
            <div className="flex items-start justify-between mb-8">
              <p className="text-[#B8922A] text-xs font-bold tracking-[0.15em] uppercase">
                Trades &amp; Landscaping · South Island
              </p>
              <span className="ml-3 shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-[#B8922A]/10 text-[#B8922A]">
                In build
              </span>
            </div>

            <div className="space-y-6 flex-1">
              <div>
                <p className="text-[#111827] text-xs font-bold uppercase tracking-widest mb-2">
                  Problem
                </p>
                <p className="text-[#6b7280] text-sm leading-relaxed">
                  Running 30+ jobs a day on generic project management software
                  costing $600/month that couldn&apos;t be automated. Hours of
                  daily admin — updating job statuses, chasing invoices, copying
                  data between systems that didn&apos;t talk to each other.
                </p>
              </div>

              <div>
                <p className="text-[#111827] text-xs font-bold uppercase tracking-widest mb-2">
                  Solution
                </p>
                <p className="text-[#6b7280] text-sm leading-relaxed">
                  Full custom CRM to replace the off-the-shelf tool entirely.
                  Integrated directly with their accounting software, automated
                  job scheduling and status updates, and gave the owner
                  real-time visibility on every job in progress.
                </p>
              </div>

              <div>
                <p className="text-[#B8922A] text-xs font-bold uppercase tracking-widest mb-2">
                  Outcome
                </p>
                <p className="text-[#111827] font-semibold text-base leading-snug">
                  $40k+ annual value identified across workflow automation and
                  tool replacement.
                </p>
              </div>
            </div>
          </div>

          {/* Case Study 2 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col">
            <div className="flex items-start justify-between mb-8">
              <p className="text-[#B8922A] text-xs font-bold tracking-[0.15em] uppercase">
                Hospitality · Queenstown
              </p>
              <span className="ml-3 shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-gray-100 text-[#6b7280]">
                In progress
              </span>
            </div>

            <div className="space-y-6 flex-1">
              <div>
                <p className="text-[#111827] text-xs font-bold uppercase tracking-widest mb-2">
                  Problem
                </p>
                <p className="text-[#6b7280] text-sm leading-relaxed">
                  Zero social media presence, no structured group booking
                  pipeline, and manual kitchen processes creating daily chaos.
                  The team had the ambition to grow but no systems capable of
                  supporting it.
                </p>
              </div>

              <div>
                <p className="text-[#111827] text-xs font-bold uppercase tracking-widest mb-2">
                  Solution
                </p>
                <p className="text-[#6b7280] text-sm leading-relaxed">
                  AI content engine for consistent social presence, automated
                  group booking pipeline from first enquiry through to
                  confirmation, and a kitchen management system to reduce prep
                  chaos and improve communication.
                </p>
              </div>

              <div>
                <p className="text-[#B8922A] text-xs font-bold uppercase tracking-widest mb-2">
                  Outcome
                </p>
                <p className="text-[#111827] font-semibold text-base leading-snug">
                  $48k+ annual value identified across 4 priority projects. All
                  underway simultaneously.
                </p>
              </div>
            </div>
          </div>

          {/* Case Study 3 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col">
            <div className="flex items-start justify-between mb-8">
              <p className="text-[#B8922A] text-xs font-bold tracking-[0.15em] uppercase">
                E-commerce · Online Business
              </p>
              <span className="ml-3 shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                Complete
              </span>
            </div>

            <div className="space-y-6 flex-1">
              <div>
                <p className="text-[#111827] text-xs font-bold uppercase tracking-widest mb-2">
                  Problem
                </p>
                <p className="text-[#6b7280] text-sm leading-relaxed">
                  All social media managed manually — content creation,
                  scheduling, performance tracking, and lead management done by
                  hand across multiple platforms. Hours lost every week with
                  inconsistent results and no way to scale.
                </p>
              </div>

              <div>
                <p className="text-[#111827] text-xs font-bold uppercase tracking-widest mb-2">
                  Solution
                </p>
                <p className="text-[#6b7280] text-sm leading-relaxed">
                  AI social media engine built from scratch. Automated content
                  scanning, post scheduling, lead tracking, and performance
                  analytics — all running without manual input.
                </p>
              </div>

              <div>
                <p className="text-[#B8922A] text-xs font-bold uppercase tracking-widest mb-2">
                  Outcome
                </p>
                <p className="text-[#111827] font-semibold text-base leading-snug">
                  10–15 hours per week saved in manual social media admin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────── */

function About() {
  return (
    <section id="about" className="bg-white py-24 md:py-36">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-3 leading-tight">
            Oliver Barrass
          </h2>
          <p className="text-[#B8922A] font-medium text-base md:text-lg">
            Founder · Barrass AI · Queenstown
          </p>
        </div>

        <div className="space-y-5 text-[#6b7280] text-base md:text-lg leading-relaxed">
          <p>
            I&apos;m an AI consultant and builder based in Queenstown, New
            Zealand. I work directly with business owners — no middlemen, no
            account managers — to identify where AI can genuinely make a
            difference and then build it.
          </p>
          <p>
            My background is in recruitment and operations. I spent years inside
            businesses that were losing real money to manual admin, misaligned
            tools, and processes nobody had time to fix. That&apos;s what led me
            to AI — not as a buzzword, but as a practical answer to problems
            I&apos;d seen up close.
          </p>
          <p>
            What makes Barrass AI different is the end-to-end approach. I do the
            strategy, the build, and the ongoing support — locally, in person
            where possible. You&apos;re not outsourcing to a team in another
            country or paying for a generic platform. You&apos;re getting
            something built specifically for your business, by someone who
            understands it.
          </p>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-block bg-[#B8922A] hover:bg-[#a07824] text-white font-bold px-8 py-4 rounded transition-colors text-base tracking-wide"
          >
            Book a free call
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────── */

function FAQSection() {
  return (
    <section className="bg-[#f9fafb] py-24 md:py-36">
      <div className="max-w-3xl mx-auto px-6">
        <Label>Common questions</Label>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] leading-tight mb-16 md:mb-20 max-w-xs">
          FAQ
        </h2>
        <FAQ />
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────── */

function Contact() {
  return (
    <section id="contact" className="bg-white py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <Label>Get started</Label>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6 leading-tight">
              Let&apos;s talk about your business
            </h2>
            <p className="text-[#6b7280] text-base md:text-lg leading-relaxed mb-12">
              The first call is free and there&apos;s no obligation. Tell me
              what you&apos;re working with and I&apos;ll give you an honest
              view of where AI can help.
            </p>

            <div className="space-y-5">
              <a
                href="mailto:obarrass@outlook.com"
                className="flex items-center gap-4 group"
              >
                <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#B8922A]/10 transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#B8922A]"
                  >
                    <path
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-[#6b7280] group-hover:text-[#B8922A] text-sm transition-colors">
                  obarrass@outlook.com
                </span>
              </a>

              <a
                href="tel:+64225482473"
                className="flex items-center gap-4 group"
              >
                <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#B8922A]/10 transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#B8922A]"
                  >
                    <path
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-[#6b7280] group-hover:text-[#B8922A] text-sm transition-colors">
                  022 548 2473
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#B8922A]"
                  >
                    <path
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
                <span className="text-[#6b7280] text-sm">
                  Queenstown, New Zealand
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#111827] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-[#B8922A] font-bold tracking-widest uppercase text-sm">
          BARRASS AI
        </p>
        <p className="text-white/25 text-xs">
          © {new Date().getFullYear()} Barrass AI · Queenstown, New Zealand
        </p>
        <div className="flex gap-6 text-white/30 text-xs">
          {[
            ["Services", "#services"],
            ["Work", "#work"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="hover:text-white/60 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
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
        <SocialProof />
        <Problem />
        <Services />
        <HowItWorks />
        <VideoTestimonial />
        <CurrentWork />
        <About />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
