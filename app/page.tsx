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

function Accent() {
  return <span className="block w-10 h-px bg-[#B8922A] mb-8" />;
}

/* ─── Hero ───────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      className="min-h-[85vh] flex flex-col justify-center pt-20"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #1c1c1c 0%, #0d0d0d 65%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <Label>AI Consulting · Queenstown, NZ</Label>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F5F0E8] leading-[1.0] tracking-tight max-w-4xl mb-10">
          AI built for your business.{" "}
          <span className="text-[#B8922A]">Not someone else&apos;s.</span>
        </h1>

        <p className="text-[#F5F0E8]/55 text-lg md:text-xl max-w-lg leading-relaxed mb-12">
          I help New Zealand businesses replace manual admin and generic tools
          with AI that&apos;s built around how you actually operate.
        </p>

        <a
          href="#contact"
          className="inline-block bg-[#B8922A] hover:bg-[#a07824] text-white font-bold text-base px-9 py-4 rounded transition-colors tracking-wide"
        >
          Book a free discovery call
        </a>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            { stat: "End to end", label: "Strategy, build, and ongoing support" },
            { stat: "Fixed price", label: "All costs agreed upfront — no surprises" },
            { stat: "Local", label: "Queenstown-based, NZ focused" },
          ].map((item) => (
            <div key={item.stat}>
              <p className="text-[#F5F0E8] font-bold text-2xl mb-1.5">{item.stat}</p>
              <p className="text-[#F5F0E8]/40 text-sm leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Problem ────────────────────────────────────────────────── */

const problems = [
  {
    title: "Drowning in manual admin",
    body: "Hours every week lost to data entry, copy-pasting, and chasing documents — tasks that feel inevitable but aren't.",
  },
  {
    title: "Generic tools that don't fit",
    body: "Off-the-shelf software built for someone else. You've adapted your processes to fit the tool, not the other way around.",
  },
  {
    title: "No real visibility",
    body: "You know things are falling through the cracks but can't see exactly where. Reporting is manual, delayed, or non-existent.",
  },
  {
    title: "Leads falling through",
    body: "Enquiries going cold because follow-up depends on someone remembering. Revenue leaking quietly through gaps no one has time to fix.",
  },
];

function Problem() {
  return (
    <section className="bg-[#F5F0E8] py-28 md:py-40">
      <div className="max-w-5xl mx-auto px-6">
        <Label>The problem</Label>
        <Accent />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-[1.05] tracking-tight mb-16 md:mb-24 max-w-sm">
          Sound familiar?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-14 md:gap-y-16">
          {problems.map((p) => (
            <div key={p.title}>
              <h3 className="text-[#111111] font-bold text-xl md:text-2xl mb-3">
                {p.title}
              </h3>
              <p className="text-[#111111]/55 text-base md:text-lg leading-relaxed">
                {p.body}
              </p>
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
    tag: "Start here",
    body: "A structured deep-dive into your business. I map your workflows, identify the highest-value AI opportunities, and deliver a clear written report with priorities and recommendations.",
  },
  {
    number: "02",
    title: "Quick Wins",
    tag: null,
    body: "Targeted automations that deliver fast, measurable results — typically delivered in two to four weeks. Document processing, lead routing, reporting, and more.",
  },
  {
    number: "03",
    title: "Custom Builds",
    tag: null,
    body: "End-to-end custom systems: CRMs, client portals, AI-powered workflows integrated with your existing tools. Built from scratch around how your business actually works.",
  },
  {
    number: "04",
    title: "AI Partner",
    tag: "Most popular",
    body: "Ongoing support, iteration, and development as your business evolves. I stay close to your operations, monitor what's working, and keep building as your needs grow.",
  },
];

function Services() {
  return (
    <section id="services" className="bg-[#F5F0E8] py-28 md:py-40">
      <div className="max-w-5xl mx-auto px-6">
        <Label>What I do</Label>
        <Accent />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-[1.05] tracking-tight mb-16 md:mb-24 max-w-sm">
          Services
        </h2>

        <div className="divide-y divide-[#111111]/10">
          {services.map((s) => (
            <div
              key={s.number}
              className="flex gap-8 md:gap-16 py-10 md:py-14"
            >
              <span className="text-[#B8922A] text-sm font-bold shrink-0 w-8 pt-1.5">
                {s.number}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-[#111111] font-bold text-2xl md:text-3xl">
                    {s.title}
                  </h3>
                  {s.tag && (
                    <span className="bg-[#B8922A] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                      {s.tag}
                    </span>
                  )}
                </div>
                <p className="text-[#111111]/55 text-base md:text-lg leading-relaxed max-w-2xl">
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
    title: "Free discovery call",
    body: "30 minutes. We talk about your business, your biggest pain points, and whether AI is genuinely the right tool. No pitch, no obligation.",
  },
  {
    n: "2",
    title: "AI Audit",
    body: "A structured assessment of your workflows and opportunities. You receive a clear written report — useful whether you work with me or not.",
  },
  {
    n: "3",
    title: "Proposal",
    body: "Based on the audit, I produce a fixed-price proposal with a defined scope, timeline, and total cost. No surprises.",
  },
  {
    n: "4",
    title: "Build and go-live",
    body: "I build, test, and deploy. You're involved throughout with clear updates — no disappearing into a cave.",
  },
  {
    n: "5",
    title: "AI Partner (optional)",
    body: "Once we've shipped, you can continue with an ongoing retainer. I monitor, iterate, and keep building as your needs evolve.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-[#F5F0E8] py-28 md:py-40">
      <div className="max-w-5xl mx-auto px-6">
        <Label>The process</Label>
        <Accent />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-[1.05] tracking-tight mb-16 md:mb-24 max-w-sm">
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
              <div className={i < steps.length - 1 ? "pb-12 md:pb-14" : ""}>
                <h3 className="text-[#111111] font-bold text-xl md:text-2xl mb-3 mt-1.5">
                  {step.title}
                </h3>
                <p className="text-[#111111]/55 text-base leading-relaxed">
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

/* ─── Current Work ───────────────────────────────────────────── */

function CurrentWork() {
  return (
    <section id="work" className="bg-[#F5F0E8] py-28 md:py-40">
      <div className="max-w-5xl mx-auto px-6">
        <Label>Current projects</Label>
        <Accent />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-[1.05] tracking-tight mb-6 max-w-sm">
          What I&apos;m building
        </h2>
        <p className="text-[#111111]/45 text-base md:text-lg mb-16 md:mb-24">
          Real businesses, real results. Names withheld by agreement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-2xl p-8 md:p-10">
            <p className="text-[#B8922A] text-xs font-bold tracking-[0.15em] uppercase mb-6">
              Trades &amp; Landscaping · South Island
            </p>
            <h3 className="text-[#111111] font-bold text-2xl md:text-3xl mb-5 leading-tight">
              Full custom CRM
            </h3>
            <p className="text-[#111111]/55 text-base leading-relaxed">
              A growing trades business was managing leads, quotes, and job
              tracking across spreadsheets and texts. Built a custom CRM with
              automated follow-up, job tracking, and quote generation —
              cutting admin time by over 60%.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10">
            <p className="text-[#B8922A] text-xs font-bold tracking-[0.15em] uppercase mb-6">
              Hospitality · Queenstown
            </p>
            <h3 className="text-[#111111] font-bold text-2xl md:text-3xl mb-5 leading-tight">
              AI social engine
            </h3>
            <p className="text-[#111111]/55 text-base leading-relaxed">
              A hospitality operator was spending hours each week writing
              social content with inconsistent brand voice. Built an AI
              content engine that generates on-brand posts, schedules across
              channels, and learns from engagement data over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Video Testimonial ──────────────────────────────────────── */

function VideoTestimonial() {
  return (
    <section className="bg-[#F5F0E8] py-28 md:py-40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <Label>In their own words</Label>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] leading-tight mb-4">
            &ldquo;It&apos;s a lot more useful than I expected.&rdquo;
          </h2>
          <p className="text-[#111111]/45 text-base md:text-lg max-w-md mx-auto">
            Hear directly from a business owner on what working together actually looks like.
          </p>
        </div>

        <iframe
          src="https://www.youtube.com/embed/oInjRnVlFfk?modestbranding=1&rel=0"
          title="Client testimonial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full aspect-video rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────── */

function About() {
  return (
    <section id="about" className="bg-[#F5F0E8] py-28 md:py-40">
      <div className="max-w-2xl mx-auto px-6">
        <Label>About</Label>
        <Accent />
        <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-3 leading-tight">
          Oliver Barrass
        </h2>
        <p className="text-[#B8922A] font-medium text-base md:text-lg mb-10">
          Founder, Barrass AI · Queenstown
        </p>
        <div className="space-y-5 text-[#111111]/60 text-base md:text-lg leading-relaxed">
          <p>
            My background is in recruitment and operations — industries built on
            repetitive process, manual admin, and things falling through the
            cracks. I got tired of watching good businesses lose time and money
            to problems that technology could fix, so I went deep on AI and
            figured out how to actually apply it.
          </p>
          <p>
            I started Barrass AI to help NZ businesses use AI properly — not
            the generic chatbot version, but real systems built around how your
            business actually works. Every project is scoped, priced, and
            delivered by me directly. No account managers, no outsourcing, no
            disappearing after go-live.
          </p>
          <p>
            I&apos;m based in Queenstown and work with clients across New
            Zealand. If you&apos;re looking for someone to tell you the truth
            about what AI can and can&apos;t do for your business — and then
            build it — that&apos;s what I&apos;m here for.
          </p>
        </div>
        <div className="mt-12">
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
    <section className="bg-[#F5F0E8] py-28 md:py-40">
      <div className="max-w-3xl mx-auto px-6">
        <Label>Common questions</Label>
        <Accent />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-16 md:mb-20">
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
    <section id="contact" className="bg-[#F5F0E8] py-28 md:py-40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <Label>Get started</Label>
            <Accent />
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
              Let&apos;s talk about your business
            </h2>
            <p className="text-[#111111]/55 text-base md:text-lg leading-relaxed mb-12">
              The first call is free and there&apos;s no obligation. Tell me
              what you&apos;re working with and I&apos;ll give you an honest
              view of where AI can help.
            </p>

            <div className="space-y-5">
              <a
                href="mailto:obarrass@outlook.com"
                className="flex items-center gap-4 group"
              >
                <span className="w-10 h-10 rounded-full bg-[#111111]/6 flex items-center justify-center shrink-0 group-hover:bg-[#B8922A]/10 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#B8922A]">
                    <path
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-[#111111]/60 group-hover:text-[#B8922A] text-sm transition-colors">
                  obarrass@outlook.com
                </span>
              </a>

              <a
                href="tel:+64225482473"
                className="flex items-center gap-4 group"
              >
                <span className="w-10 h-10 rounded-full bg-[#111111]/6 flex items-center justify-center shrink-0 group-hover:bg-[#B8922A]/10 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#B8922A]">
                    <path
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-[#111111]/60 group-hover:text-[#B8922A] text-sm transition-colors">
                  022 548 2473
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-[#111111]/6 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#B8922A]">
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
                <span className="text-[#111111]/60 text-sm">
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
    <footer className="bg-[#111111] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-[#B8922A] font-bold tracking-widest uppercase text-sm">
          BARRASS AI
        </p>
        <p className="text-[#F5F0E8]/25 text-xs">
          © {new Date().getFullYear()} Barrass AI · Queenstown, New Zealand
        </p>
        <div className="flex gap-6 text-[#F5F0E8]/30 text-xs">
          {[
            ["Services", "#services"],
            ["Work", "#work"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="hover:text-[#F5F0E8]/60 transition-colors"
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
        <Problem />
        <Services />
        <HowItWorks />
        <CurrentWork />
        <VideoTestimonial />
        <About />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
