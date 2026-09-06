/* ─── Free AI audit — shared server-side helpers ─────────────────
   Types, validation, the report system prompt, HTML sanitising,
   the Barrass OS (Supabase) REST helpers and the email shell.
   Server-only: never import from a client component.
──────────────────────────────────────────────────────────────── */

import { BUSINESS_TYPES, TEAM_SIZES, TIME_WASTERS } from "./audit-options";

export type AuditAnswers = {
  name: string;
  email: string;
  businessType: string;
  teamSize: string;
  currentSoftware: string;
  timeWasters: string[];
  biggestFrustration: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validate and normalise the raw request body. */
export function parseAnswers(
  body: unknown
): { ok: true; answers: AuditAnswers } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request." };
  const b = body as Record<string, unknown>;
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

  const name = str(b.name, 80);
  const email = str(b.email, 200);
  const businessType = str(b.businessType, 60);
  const teamSize = str(b.teamSize, 20);
  const currentSoftware = str(b.currentSoftware, 1000);
  const biggestFrustration = str(b.biggestFrustration, 2000);
  const timeWasters = Array.isArray(b.timeWasters)
    ? b.timeWasters
        .filter((t): t is string => typeof t === "string")
        .map((t) => t.trim())
        .filter((t) => (TIME_WASTERS as readonly string[]).includes(t))
    : [];

  if (!name) return { ok: false, error: "Please tell us your first name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (!(BUSINESS_TYPES as readonly string[]).includes(businessType))
    return { ok: false, error: "Please choose a business type." };
  if (!(TEAM_SIZES as readonly string[]).includes(teamSize))
    return { ok: false, error: "Please choose a team size." };
  if (!currentSoftware) return { ok: false, error: "Please tell us what you currently use." };
  if (timeWasters.length < 2)
    return { ok: false, error: "Please pick at least two areas where time is wasted." };
  if (!biggestFrustration) return { ok: false, error: "Please tell us your biggest frustration." };

  return {
    ok: true,
    answers: { name, email, businessType, teamSize, currentSoftware, timeWasters, biggestFrustration },
  };
}

/* ─── Report prompt ──────────────────────────────────────────── */

export const REPORT_SYSTEM_PROMPT = `You are the senior consultant at Barrass AI, a Queenstown-based studio that designs and builds bespoke, AI-powered management platforms for New Zealand businesses. The founder is Oliver Barrass ("Ollie"). Barrass AI builds fixed-price custom software, delivered in weeks, that the client owns outright: scheduling, jobs, quoting and invoicing, compliance, client portals, reporting, automation (SMS/email reminders, follow-ups), AI features where they pay off (AI-written notes, number-plate scanning, plain-English search across business data) and integrations (Xero, payments, mapping, messaging). Recent builds include Pawly (dog daycare operations: check-ins, van-run routing with SMS ETAs, vaccination tracking, AI visit notes, client portal), BCR Connect (vehicle rental fleet compliance, timesheets, rostering, fine tracking, offline field app), Dealer Fleet (dealership stock, compliance alerts, PDI/WoF boards, AI plate scanning) and Runsite (trades and landscaping job scheduling, quote-to-invoice, purchase orders, CRM, AI search).

You write a short, premium, personalised audit report for a business owner who has just answered five questions on barrassai.com. The report is the first thing they see from Barrass AI, so it must feel like a smart consultant sat down with their answers, not a template.

RULES
- Address the person by their first name throughout. Use it naturally, not in every sentence.
- Reference their specific business type, team size, current tools and stated frustration directly and repeatedly. Quote or closely paraphrase their own words where it helps. Never give advice that could apply to any business.
- Be direct and honest, like a smart consultant, not a salesperson. No hype, no filler, no "in today's fast-paced world". Do not flatter. If custom software is only part of the answer, say so.
- Use New Zealand English (organise, licence, programme) and NZ context (Xero, WoF, GST, tradies, NZ$).
- Hours-lost estimates must be plausible for the stated team size and explicitly framed as estimates. Show simple reasoning (e.g. "roughly 20 minutes per job across 15 jobs a week is about 5 hours").
- Length: substantial but scannable. Roughly 550 to 750 words of body copy. Short paragraphs. Use lists only where they genuinely help; no bullet-point soup and no wall of text.

STRUCTURE. Use exactly these five section headings, in this order:
1. Executive Summary: 2 to 3 sentences on their specific situation: what they run, how it is currently held together, and what the audit found.
2. Where You're Losing Time: exactly 3 specific pain points drawn from their selected time-wasters, current tools and frustration. For each: a bold short title, an estimated weekly hours lost figure shown clearly, and 2 to 4 sentences on why it happens in a business like theirs.
3. What's Possible: exactly 3 specific opportunities for their business type, each with a bold short title and a concrete outcome (what changes day to day, what gets faster or stops happening). Tie each back to a pain point.
4. What a Custom Build Would Look Like: a brief, specific description of the system Barrass AI would build for this business. Name the core modules, the automations, any AI features that genuinely earn their place, and which existing tools (e.g. Xero) it would connect to rather than replace. Mention it would be fixed price, delivered in weeks and owned outright. Be concrete, not generic.
5. Next Step: one clear call to action: book a free 30-minute call with Ollie at barrassai.com/contact. One or two sentences on what that call covers. Nothing else.

FORMAT. Output rules are strict. Styling is applied afterwards, so write plain semantic HTML with NO style attributes, NO classes other than the four named below, and NO wrapper div:
- Output ONLY an HTML fragment. No markdown, no code fences, no <!DOCTYPE>, <html>, <head>, <body>, <div>, <style> or <script> tags, no images, no tables, and no commentary before or after.
- Open with: <p class="eyebrow">Free AI audit · [Business type]</p> then <h1>[A specific one-line title for this business]</h1> then <p class="muted">Prepared for [Name] by Barrass AI</p>.
- Each of the five sections starts with <h2>[Section heading]</h2>. Put <hr> immediately before every <h2> except the first.
- Body copy in plain <p> elements. Sub-titles inside sections (pain points, opportunities, modules) as <h3>. For pain points, put the hours figure at the end of the <h3> as <span class="hrs">≈ X hrs/week</span>.
- Use <strong> for light emphasis only. Lists, where used, as <ul><li>.
- The final call to action, as the last element: <a class="cta" href="https://barrassai.com/contact">Book a free 30-minute call with Ollie →</a>`;

export function buildUserPrompt(a: AuditAnswers): string {
  return [
    `First name: ${a.name}`,
    `Business type: ${a.businessType}`,
    `Team size: ${a.teamSize}`,
    `Currently runs the business on: ${a.currentSoftware}`,
    `Where the team wastes the most time: ${a.timeWasters.join("; ")}`,
    `Biggest frustration right now (their words): ${a.biggestFrustration}`,
    "",
    "Write the audit report for this person now, following the structure and format rules exactly.",
  ].join("\n");
}

/* ─── Sanitising the model output ────────────────────────────── */

/** Strip fences, document wrappers and anything executable. User text is echoed into the model output, so treat it as untrusted. */
export function sanitizeReportHtml(raw: string): string {
  let html = raw.trim();

  // Drop markdown fences if the model added them despite instructions.
  html = html.replace(/^```(?:html)?\s*/i, "").replace(/\s*```$/, "");

  // If a full document slipped through, keep only the body contents.
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (body) html = body[1];
  html = html.replace(/<!DOCTYPE[^>]*>/gi, "").replace(/<\/?(html|head)[^>]*>/gi, "");

  // Remove executable or external content.
  html = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?(iframe|object|embed|link|meta|form|input|button)[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["']?)\s*javascript:[^"'>\s]*\2/gi, "$1=$2#$2");

  // Trim any stray prose before the first tag or after the last.
  const first = html.indexOf("<");
  const last = html.lastIndexOf(">");
  if (first > 0) html = html.slice(first);
  if (last >= 0 && last < html.length - 1) html = html.slice(0, last + 1);

  return html.trim();
}

/* ─── Styling the report ─────────────────────────────────────── */

const MONO = "ui-monospace,SFMono-Regular,Menlo,monospace";
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

/** Turn the model's lean semantic HTML into inline-styled HTML that renders
    the same on screen and in email. Keeping styles here (not in the prompt)
    roughly halves the tokens the model has to generate. */
export function applyReportStyles(html: string): string {
  const styled = html
    // Strip any style/class attributes the model added anyway, except our four hooks.
    .replace(/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi, "")
    .replace(/<p\s+class=["']eyebrow["']\s*>/gi, `<p style="font-family:${MONO};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8A8A93;margin:0 0 8px">`)
    .replace(/<p\s+class=["']muted["']\s*>/gi, `<p style="color:#8A8A93;font-size:14px;margin:0 0 24px">`)
    .replace(/<span\s+class=["']hrs["']\s*>/gi, `<span style="display:inline-block;font-family:${MONO};font-size:12.5px;font-weight:500;color:#059669;margin-left:8px;vertical-align:middle">`)
    .replace(/<a\s+class=["']cta["']\s+href=("[^"]*"|'[^']*')\s*>/gi, `<a href=$1 style="display:inline-block;background:#0A0A0A;color:#ffffff;text-decoration:none;font-weight:500;font-size:15px;padding:12px 20px;border-radius:8px;margin-top:6px">`)
    .replace(/\sclass\s*=\s*("[^"]*"|'[^']*')/gi, "")
    .replace(/<h1>/gi, `<h1 style="font-size:26px;font-weight:600;letter-spacing:-0.02em;color:#0A0A0A;margin:0 0 8px;line-height:1.2">`)
    .replace(/<h2>/gi, `<h2 style="font-size:20px;font-weight:600;letter-spacing:-0.01em;color:#0A0A0A;margin:28px 0 12px;line-height:1.3">`)
    .replace(/<h3>/gi, `<h3 style="font-size:16px;font-weight:600;color:#0A0A0A;margin:20px 0 6px;line-height:1.4">`)
    .replace(/<hr\s*\/?>/gi, `<hr style="border:0;border-top:1px solid rgba(0,0,0,0.08);margin:28px 0">`)
    .replace(/<p>/gi, `<p style="color:#52525B;margin:0 0 14px">`)
    .replace(/<ul>/gi, `<ul style="margin:0 0 14px;padding-left:20px;color:#52525B">`)
    .replace(/<ol>/gi, `<ol style="margin:0 0 14px;padding-left:20px;color:#52525B">`)
    .replace(/<li>/gi, `<li style="margin-bottom:6px">`)
    .replace(/<strong>/gi, `<strong style="color:#0A0A0A;font-weight:600">`)
    .replace(/<a\s+href=("[^"]*"|'[^']*')\s*>/gi, `<a href=$1 style="color:#059669">`);

  return `<div style="font-family:${SANS};color:#0A0A0A;line-height:1.6;font-size:16px;max-width:100%;background:#ffffff">\n${styled}\n</div>`;
}

/* ─── Barrass OS (Supabase REST) ─────────────────────────────── */

function supabaseConfig() {
  const url = process.env.BARRASS_OS_SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.BARRASS_OS_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Barrass OS Supabase env vars are not set.");
  return { url, key };
}

export type AuditLeadRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  business_type: string;
  team_size: string;
  current_software: string;
  time_wasters: string[];
  biggest_frustration: string;
  report_html: string;
  followed_up: boolean;
  notes: string | null;
};

export async function insertAuditLead(a: AuditAnswers, reportHtml: string): Promise<void> {
  const { url, key } = supabaseConfig();
  const res = await fetch(`${url}/rest/v1/audit_leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: a.name,
      email: a.email,
      business_type: a.businessType,
      team_size: a.teamSize,
      current_software: a.currentSoftware,
      time_wasters: a.timeWasters,
      biggest_frustration: a.biggestFrustration,
      report_html: reportHtml,
      followed_up: false,
    }),
  });
  if (!res.ok) {
    throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`);
  }
}

export async function listAuditLeads(limit: number): Promise<AuditLeadRow[]> {
  const { url, key } = supabaseConfig();
  const qs = new URLSearchParams({ select: "*", order: "created_at.desc", limit: String(limit) });
  const res = await fetch(`${url}/rest/v1/audit_leads?${qs}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase read failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as AuditLeadRow[];
}

/* ─── Email shell ────────────────────────────────────────────── */

/** Wrap the report in a simple shell with the Barrass AI wordmark at the top. Paper background, ink text, green dot, as on the site. */
export function buildReportEmailHtml(reportHtml: string): string {
  return `
<div style="background:#F7F7F5;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0A0A0A">
  <div style="max-width:640px;margin:0 auto">
    <div style="padding:4px 4px 20px">
      <a href="https://barrassai.com" style="text-decoration:none;color:#0A0A0A">
        <span style="display:inline-block;width:10px;height:10px;border-radius:999px;background:#10B981;vertical-align:middle;margin-right:10px"></span><span style="font-weight:700;font-size:15px;letter-spacing:0.06em;text-transform:uppercase;vertical-align:middle;color:#0A0A0A">Barrass AI</span>
      </a>
    </div>
    <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:32px 28px">
      ${reportHtml}
    </div>
    <p style="color:#8A8A93;font-size:12.5px;line-height:1.6;margin:20px 4px 0">
      Sent by Barrass AI · Queenstown, New Zealand · Reply to this email to reach Oliver directly, or visit <a href="https://barrassai.com" style="color:#8A8A93">barrassai.com</a>.
    </p>
  </div>
</div>`;
}

/** Plain-text fallback for email clients that don't render HTML. */
export function htmlToText(html: string): string {
  return html
    .replace(/<(br|\/p|\/h[1-6]|\/li|hr)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
