import Anthropic from "@anthropic-ai/sdk";
import { after } from "next/server";
import { Resend } from "resend";
import {
  applyReportStyles,
  buildReportEmailHtml,
  buildUserPrompt,
  htmlToText,
  insertAuditLead,
  parseAnswers,
  REPORT_SYSTEM_PROMPT,
  sanitizeReportHtml,
} from "@/app/lib/audit";

// Report generation takes ~20–30s; give the function room on Vercel.
export const maxDuration = 120;

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Internal notification to Ollie: the lead's answers, then the full report beneath. */
function buildLeadNotificationHtml(
  a: { name: string; email: string; businessType: string; teamSize: string; currentSoftware: string; timeWasters: string[]; biggestFrustration: string },
  reportHtml: string
): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;font-weight:bold;width:160px;vertical-align:top;color:#555">${label}</td><td style="padding:6px 0;color:#111;white-space:pre-wrap">${value || "—"}</td></tr>`;

  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;color:#111">
      <h2 style="color:#0A0A0A;margin-bottom:20px">New audit lead — ${escapeHtml(a.businessType)} — ${escapeHtml(a.name)}</h2>
      <table style="width:100%;border-collapse:collapse">
        ${row("Name", escapeHtml(a.name))}
        ${row("Email", `<a href="mailto:${escapeHtml(a.email)}" style="color:#059669">${escapeHtml(a.email)}</a>`)}
        ${row("Business type", escapeHtml(a.businessType))}
        ${row("Team size", escapeHtml(a.teamSize))}
        ${row("Current software", escapeHtml(a.currentSoftware))}
        ${row("Time wasters", escapeHtml(a.timeWasters.join(", ")))}
        ${row("Biggest frustration", escapeHtml(a.biggestFrustration))}
      </table>
      <h3 style="margin:28px 0 12px;color:#111">Report sent to the prospect</h3>
      <div style="border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:24px">
        ${reportHtml}
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = parseAnswers(body);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 });
  const answers = parsed.answers;

  // 1. Generate the report (server-side; API key never leaves the server).
  let reportHtml: string;
  try {
    const client = new Anthropic();
    const message = await client.messages
      .stream({
        model: "claude-sonnet-4-6",
        max_tokens: 8000,
        system: REPORT_SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserPrompt(answers) }],
      })
      .finalMessage();

    if (message.stop_reason === "refusal") {
      throw new Error("Report generation was declined.");
    }

    const text = message.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");
    const fragment = sanitizeReportHtml(text);
    if (!fragment || !/<h2/i.test(fragment)) {
      throw new Error("Report came back empty or malformed.");
    }
    reportHtml = applyReportStyles(fragment);
  } catch (err) {
    console.error("[audit] report generation failed:", err);
    return Response.json(
      { error: "We couldn't generate your report just now. Please try again in a moment." },
      { status: 502 }
    );
  }

  // 2. Email the report and save the lead after the response is sent, so
  //    neither blocks the user from seeing their report.
  after(async () => {
    const results = await Promise.allSettled([
      resend.emails.send({
        from: "Barrass AI <contact@barrassai.com>",
        to: answers.email,
        replyTo: "oliver@barrassai.com",
        subject: `Your free AI audit — ${answers.businessType}`,
        html: buildReportEmailHtml(reportHtml),
        text: htmlToText(reportHtml),
      }),
      insertAuditLead(answers, reportHtml),
      resend.emails.send({
        from: "Barrass AI Website <contact@barrassai.com>",
        to: ["oliver@barrassai.com", "hello@barrassai.com"],
        replyTo: answers.email,
        subject: `New audit lead — ${answers.businessType} — ${answers.name}`,
        html: buildLeadNotificationHtml(answers, reportHtml),
        text: [
          `Name: ${answers.name}`,
          `Email: ${answers.email}`,
          `Business type: ${answers.businessType}`,
          `Team size: ${answers.teamSize}`,
          `Current software: ${answers.currentSoftware}`,
          `Time wasters: ${answers.timeWasters.join(", ")}`,
          `Biggest frustration: ${answers.biggestFrustration}`,
          "",
          "Report:",
          htmlToText(reportHtml),
        ].join("\n"),
      }),
    ]);

    const [emailResult, leadResult, notifyResult] = results;
    if (emailResult.status === "rejected") {
      console.error("[audit] email send failed:", emailResult.reason);
    } else if (emailResult.value.error) {
      console.error("[audit] email send failed:", emailResult.value.error);
    }
    if (leadResult.status === "rejected") {
      console.error("[audit] Barrass OS insert failed:", leadResult.reason);
    }
    if (notifyResult.status === "rejected") {
      console.error("[audit] lead notification failed:", notifyResult.reason);
    } else if (notifyResult.value.error) {
      console.error("[audit] lead notification failed:", notifyResult.value.error);
    }
  });

  return Response.json({ reportHtml });
}
