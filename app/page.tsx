import Image from "next/image";
import ContactForm from "./components/ContactForm";
import { SceneScreen, WalkthroughButton } from "./components/SceneScreen";

const CALENDLY = "https://calendly.com/oliver-barrassai/30min";

/* Each product is a scene in its own colours. `indexHue` is the same hue
   darkened enough to read as text on the light lobby background. */
interface Product {
  id: string;
  name: string;
  what: string;
  state: string;
  indexHue: string;
  colors: { bg: string; fg: string; dim: string; hue: string; onHue: string };
  build: string;
  result: string;
  facts: [string, string][];
  link?: { href: string; label: string };
  ad?: string;
  poster?: string;
  walkthrough?: string;
  walkthroughPoster?: string;
  still?: string;
  pendingNote?: string;
}

const products: Product[] = [
  {
    id: "mockmonkey",
    name: "MockMonkey",
    what: "Bulk product mockups from a seller's own Photoshop files",
    state: "Waitlist open",
    indexHue: "#b06f00",
    colors: { bg: "#191714", fg: "#f6f1e7", dim: "#a59d8e", hue: "#f2a516", onHue: "#191714" },
    build:
      "A batch render pipeline that places every design inside the smart objects of a seller's own Photoshop mockups, so the curve, shadow and shine of the original survive.",
    result:
      "Etsy and print-on-demand sellers drop in their designs, pick their mockups and get every combination back as sorted ZIPs. Fifty designs on twenty mockups is a thousand listing photos from one click. A built-in shop lets creators sell their mockup files to other sellers.",
    facts: [
      ["My part", "Product design, build, launch site and films"],
      ["Integrates with", "Dynamic Mockups, Stripe, Resend, Photoshop PSD files"],
      ["Made with", "The Etsy Accelerator community"],
    ],
    link: { href: "https://mockmonkey.app", label: "Visit mockmonkey.app" },
    ad: "/reel/mockmonkey-ad.mp4",
    poster: "/reel/mockmonkey-ad.jpg",
    walkthrough: "/reel/mockmonkey-walkthrough.mp4",
    walkthroughPoster: "/reel/mockmonkey-walkthrough.jpg",
  },
  {
    id: "title-wave",
    name: "Title Wave",
    what: "Etsy titles and tags written from a product photo",
    state: "Live, taking subscriptions",
    indexHue: "#1668d6",
    colors: { bg: "#061024", fg: "#eaf2ff", dim: "#8fa3c4", hue: "#4fa8ff", onHue: "#061024" },
    build:
      "Vision and language models read a product photo, fill in the listing details and write a title built from what buyers search for, with all 13 tags, ten products at a time.",
    result:
      "A seller goes from a photo to a listing they can paste straight into Etsy. Subscriptions, monthly limits and free access for community members all run on the same billing system.",
    facts: [
      ["My part", "Product design, build, billing"],
      ["Integrates with", "Stripe, Google sign-in"],
      ["Made with", "The Etsy Accelerator community"],
    ],
    link: { href: "https://titlewaveseo.com", label: "Visit titlewaveseo.com" },
    ad: "/reel/titlewave-ad.mp4",
    poster: "/reel/titlewave-ad.jpg",
  },
  {
    id: "shorts",
    name: "Shorts engine",
    what: "Raw clips edited into finished YouTube Shorts",
    state: "In build, waitlist open",
    indexHue: "#5b3fe0",
    colors: { bg: "#0d1333", fg: "#f1eeff", dim: "#9a9bc6", hue: "#8b6cff", onHue: "#0d1333" },
    build:
      "An editing engine that finds the story in a raw clip, reframes it to vertical, writes and times the captions, designs the sound and checks its own work before it exports.",
    result:
      "Built with a YouTube Shorts creator for faceless channels. The creator approves the story plan before anything renders, then asks for changes in plain language.",
    facts: [
      ["My part", "Web app, accounts, payments, infrastructure"],
      ["Integrates with", "Stripe, fal, Modal, Fly.io, Cloudflare R2, AI agents"],
    ],
    link: { href: "https://shorts-app-web.vercel.app", label: "See the preview site" },
    still: "/reel/shorts-still.jpg",
  },
  {
    id: "zaminka",
    name: "Zaminka",
    what: "The platform a working dog motel runs on",
    state: "Live since October 2026",
    indexHue: "#d9560b",
    colors: { bg: "#000000", fg: "#ffffff", dim: "#a3a3a3", hue: "#ff7a1a", onHue: "#000000" },
    build:
      "A boarding and daycare management platform designed around how one family-run dog motel works, deployed to the client's own accounts so they own it outright.",
    result:
      "It replaced the kennel's previous booking software and has run the business day to day since October 2026. The owners deal directly with the person who built it.",
    facts: [
      ["My part", "Scoping, design, build, handover"],
      ["Integrates with", "Resend, Stripe, Cloudflare"],
      ["Also built", "The motel's public website"],
      ["Client", "Zaminka Dog Motels, Ōtaki, New Zealand"],
    ],
    link: { href: "https://zaminkadogmotels.co.nz", label: "Visit zaminkadogmotels.co.nz" },
    still: "/reel/zaminka-still.jpg",
  },
];

/* Earlier builds. Screenshots are demo data only. None are claimed as live. */
const platforms: { img: string; name: string; what: string }[] = [
  { img: "dealer-fleet", name: "Dealer Fleet", what: "Stock and compliance tracking for a two-site motor group, with plate and VIN scanning" },
  { img: "car-rental-manager", name: "BCR Connect", what: "Operations platform for a car rental business: fleet, rostering, fines and weekly reporting, usable offline" },
  { img: "runsite", name: "Runsite", what: "Scheduling, quotes, invoices and reporting for landscaping and trades" },
  { img: "pet-management", name: "Pawly", what: "Check-ins, van runs, vaccinations and a client portal for dog daycares" },
];
const websites = ["Ange Enoka Hair & Bridal", "Align Within", "Pete's Custom Creations"];

/* The hero: one screen per product, laid out like prints on a table.
   MockMonkey is largest because it is the flagship. Each links to its scene. */
const prints = [
  { id: "mockmonkey", name: "MockMonkey", img: "mm-ready" },
  { id: "shorts", name: "Shorts engine", img: "shorts-dog" },
  { id: "zaminka", name: "Zaminka", img: "zaminka-site" },
  { id: "title-wave", name: "Title Wave", img: "tw-hero" },
];

export default function Home() {
  return (
    <div className="reel">
      <header className="reel-nav">
        <div className="reel-wrap">
          <a href="#top" className="mark">
            Barrass AI
          </a>
          <nav aria-label="Main">
            <a className="plain" href="#work">
              Work
            </a>
            <a className="plain" href="#reviews">
              Reviews
            </a>
            <a className="plain" href="#about">
              About
            </a>
            <a className="call" href={CALENDLY} target="_blank" rel="noopener noreferrer">
              Book a call
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="reel-hero">
          <div className="reel-wrap">
            <div className="pitch">
              <h1 className="display">
                <span>Your idea in.</span>
                <span>Product out.</span>
              </h1>
              <p>
                I&rsquo;m Ollie Barrass. I design, build and launch software products, with founders who have an
                audience and for businesses that have outgrown their tools.
              </p>
              <div className="go">
                <a className="reel-btn solid" href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  Book a call
                </a>
                <a className="reel-btn ghost" href="#work">
                  Watch the work
                </a>
              </div>
            </div>
            <div className="prints">
              {prints.map((p) => (
                <a key={p.id} href={`#${p.id}`} className={`print ${p.id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/reel/wall/${p.img}.jpg`} alt="" width={1200} height={750} />
                  <span>{p.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <div id="work" />
        {products.map((p) => (
          <section
            key={p.id}
            id={p.id}
            className="scene"
            style={
              {
                "--bg": p.colors.bg,
                "--fg": p.colors.fg,
                "--dim": p.colors.dim,
                "--hue": p.colors.hue,
                "--on-hue": p.colors.onHue,
              } as React.CSSProperties
            }
          >
            <div className="reel-wrap">
              <SceneScreen name={p.name} ad={p.ad} poster={p.poster} still={p.still} pendingNote={p.pendingNote} />

              <div className="body">
                <div>
                  <h2 className="display">{p.name}</h2>
                  <p className="status">
                    <i aria-hidden />
                    {p.state}
                  </p>
                </div>
                <div>
                  <p className="build">{p.build}</p>
                  <p className="result">{p.result}</p>
                  <dl>
                    {p.facts.map(([k, v]) => (
                      <div key={k} style={{ display: "contents" }}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  {(p.link || p.walkthrough) && (
                    <div className="actions">
                      {p.link && (
                        <a className="reel-btn hue" href={p.link.href} target="_blank" rel="noopener noreferrer">
                          {p.link.label}
                        </a>
                      )}
                      {p.walkthrough && (
                        <WalkthroughButton name={p.name} src={p.walkthrough} poster={p.walkthroughPoster} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="reel-reviews" id="reviews">
          <div className="reel-wrap">
            <header>
              <h2 className="display">What clients say</h2>
              <p className="score">
                <b>5.0</b> from 4 reviews on Google
              </p>
            </header>
            <div className="grid">
              <blockquote>
                <p className="lead">
                  &ldquo;Oliver is extremely easy to deal with, delivered a great product beyond which we were
                  expecting, and has a fantastic response time for any problem we have. We&rsquo;d have no hesitation
                  recommending this service to anyone.&rdquo;
                </p>
                <cite>
                  <b>Zaminka Dog Motels</b>, boarding and daycare platform
                </cite>
              </blockquote>
              <div className="rest">
                <blockquote>
                  <p>
                    &ldquo;Amazing!! I don&rsquo;t know how I managed keeping track of stock at the dealership before
                    having the app, it&rsquo;s made a huge difference to my workload and after sales back up is timely
                    and reliable if at all needed.&rdquo;
                  </p>
                  <cite>
                    <b>Andy</b>, Dealer Fleet
                  </cite>
                </blockquote>
                <blockquote>
                  <p>
                    &ldquo;He took the time to listen to my ideas, welcomed every change and request, and went above
                    and beyond to ensure the finished result was exactly what I wanted.&rdquo;
                  </p>
                  <cite>
                    <b>Ange Enoka Hair and Bridal</b>, website
                  </cite>
                </blockquote>
                <blockquote>
                  <p>
                    &ldquo;Working with Ollie has been a fantastic experience, with great communication and knowledge,
                    and in my case patient!&rdquo;
                  </p>
                  <cite>
                    <b>Pete&rsquo;s Custom Creations</b>, website
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="reel-earlier">
          <div className="reel-wrap">
            <h2 className="display">More I&rsquo;ve built</h2>
            <div className="tiles">
              {platforms.map((w) => (
                <figure key={w.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/reel/wall/${w.img}.jpg`} alt={`${w.name} screenshot`} width={1200} height={600} loading="lazy" />
                  <figcaption>
                    <b>{w.name}</b>
                    <span>{w.what}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="sites">Websites: {websites.join(", ")}.</p>
          </div>
        </section>
      </main>

      <footer className="reel-close">
        <div className="reel-wrap">
          <section className="reel-about" id="about">
            <div className="photo">
              <Image src="/oliver.jpg" alt="Ollie Barrass" fill sizes="(max-width: 860px) 360px, 40vw" style={{ objectFit: "cover" }} />
            </div>
            <div>
              <h2 className="display">One person, the whole product.</h2>
              <p>
                I spent years in recruitment and business development before I built software, so I start with how
                the business makes money and work back to the code.
              </p>
              <p>
                I build with AI tooling from the first sketch to the launch film. That is why one person can take a
                product from an idea to paying customers in weeks, and why you deal with the person doing the work.
              </p>
              <p>From New Zealand, working remotely.</p>
            </div>
          </section>

          <section className="reel-contact" id="contact">
            <div className="side">
              <h2 className="display">Got a product in mind?</h2>
              <p>
                Book 30 minutes. Tell me what you want built and who it&rsquo;s for, and I&rsquo;ll tell you whether
                I&rsquo;m the right person and what it would take.
              </p>
              <a className="reel-btn solid" href={CALENDLY} target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
              <a className="mail" href="mailto:oliver@barrassai.com">
                oliver@barrassai.com
              </a>
            </div>
            <ContactForm />
          </section>

          <div className="reel-foot">
            <span>© 2026 Barrass AI</span>
            <a href="#top" style={{ color: "inherit" }}>
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
