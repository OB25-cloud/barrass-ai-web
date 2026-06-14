"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const business = formData.get("business")?.toString().trim() ?? "";
  const industry = formData.get("industry")?.toString().trim() ?? "";
  const challenge = formData.get("challenge")?.toString().trim() ?? "";
  const lookingFor = formData.get("looking_for")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const context = formData.get("context")?.toString().trim() ?? "";

  if (!name || !email) {
    return { status: "error", message: "Please provide your name and email." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 0;font-weight:bold;width:160px;vertical-align:top;color:#555">${label}</td><td style="padding:6px 0;color:#111">${value || "—"}</td></tr>`;

  try {
    await resend.emails.send({
      from: "Barrass AI Website <onboarding@resend.dev>",
      to: "obarrass@outlook.com",
      replyTo: email,
      subject: `New enquiry — ${name}${business ? `, ${business}` : ""}${industry ? ` (${industry})` : ""}`,
      text: [
        `Name: ${name}`,
        `Business: ${business || "—"}`,
        `Industry: ${industry || "—"}`,
        `Biggest challenge: ${challenge || "—"}`,
        `Looking for: ${lookingFor || "—"}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        context ? `\nAdditional context:\n${context}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;color:#111">
          <h2 style="color:#B8922A;margin-bottom:24px">New Enquiry — Barrass AI</h2>
          <table style="width:100%;border-collapse:collapse">
            ${row("Name", name)}
            ${row("Business", business)}
            ${row("Industry", industry)}
            ${row("Biggest challenge", challenge)}
            ${row("Looking for", lookingFor)}
            ${row("Email", `<a href="mailto:${email}" style="color:#B8922A">${email}</a>`)}
            ${row("Phone", phone)}
          </table>
          ${
            context
              ? `<h3 style="margin-top:24px;color:#111">Additional context</h3>
                 <p style="white-space:pre-wrap;background:#f5f0e8;padding:16px;border-radius:6px;color:#444;line-height:1.6">${context}</p>`
              : ""
          }
        </div>
      `,
    });

    return {
      status: "success",
      message: "Thanks! I'll be in touch within one business day.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Something went wrong. Please email obarrass@outlook.com directly.",
    };
  }
}
