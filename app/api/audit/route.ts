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
    ]);

    const [emailResult, leadResult] = results;
    if (emailResult.status === "rejected") {
      console.error("[audit] email send failed:", emailResult.reason);
    } else if (emailResult.value.error) {
      console.error("[audit] email send failed:", emailResult.value.error);
    }
    if (leadResult.status === "rejected") {
      console.error("[audit] Barrass OS insert failed:", leadResult.reason);
    }
  });

  return Response.json({ reportHtml });
}
