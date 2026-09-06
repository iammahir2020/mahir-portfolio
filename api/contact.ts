import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_URLS_IN_MESSAGE = 3;
const MIN_SUBMIT_MS = 2000; // reject submissions faster than this (likely bots)

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function countUrls(input: string): number {
  const matches = input.match(/https?:\/\//gi);
  return matches ? matches.length : 0;
}

function headerString(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

// Everything here comes from request headers Vercel's network already attaches
// (or from a built-in browser API like Intl) — no location/permission prompt
// is ever shown to the visitor.
function getRequestContext(req: VercelRequest, clientTimezone: unknown) {
  const city = headerString(req.headers["x-vercel-ip-city"]);
  const region = headerString(req.headers["x-vercel-ip-country-region"]);
  const country = headerString(req.headers["x-vercel-ip-country"]);
  const ipTimezone = headerString(req.headers["x-vercel-ip-timezone"]);
  const userAgent = headerString(req.headers["user-agent"]);
  const language = headerString(req.headers["accept-language"])?.split(",")[0];

  const location = [city, region, country].filter(Boolean).join(", ") || "Unknown (local dev or non-Vercel request)";
  const timezone = (typeof clientTimezone === "string" && clientTimezone) || ipTimezone || "Unknown";

  return {
    location,
    timezone,
    userAgent: userAgent || "Unknown",
    language: language || "Unknown",
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = req.body ?? {};
  const { name, email, message, website, startedAt, timezone } = body as Record<string, unknown>;

  // Honeypot: a hidden field real visitors never fill in.
  if (typeof website === "string" && website.trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  // Timing check: a real human takes more than a couple seconds to fill this out.
  if (typeof startedAt !== "number" || Date.now() - startedAt < MIN_SUBMIT_MS) {
    return res.status(200).json({ ok: true });
  }

  if (typeof message !== "string" || (name !== undefined && typeof name !== "string") || (email !== undefined && typeof email !== "string")) {
    return res.status(400).json({ error: "Invalid submission." });
  }

  const rawName = typeof name === "string" ? name.replace(/[\r\n]/g, "").trim() : "";
  const cleanEmail = typeof email === "string" ? email.replace(/[\r\n]/g, "").trim() : "";
  const cleanMessage = message.trim();

  // Name is optional — only validate length if the visitor actually provided one.
  if (rawName.length > 0 && (rawName.length < 2 || rawName.length > 100)) {
    return res.status(400).json({ error: "Name must be between 2 and 100 characters." });
  }
  const cleanName = rawName || "Anonymous";
  // Email is optional — only validate it if the visitor actually provided one.
  if (cleanEmail.length > 0 && (cleanEmail.length > 254 || !EMAIL_REGEX.test(cleanEmail))) {
    return res.status(400).json({ error: "Please provide a valid email address, or leave it blank." });
  }
  if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
    return res.status(400).json({ error: "Message must be between 10 and 2000 characters." });
  }
  if (countUrls(cleanMessage) > MAX_URLS_IN_MESSAGE) {
    return res.status(400).json({ error: "Message contains too many links." });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const toAddress = process.env.CONTACT_TO_EMAIL || gmailUser;

  if (!gmailUser || !gmailPass) {
    console.error("Contact form: missing GMAIL_USER or GMAIL_APP_PASSWORD env vars");
    return res.status(500).json({ error: "Email service is not configured." });
  }

  const ctx = getRequestContext(req, timezone);
  const fromLine = cleanEmail ? `${cleanName} <${cleanEmail}>` : `${cleanName} (no reply email provided)`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: toAddress,
      ...(cleanEmail ? { replyTo: { name: cleanName, address: cleanEmail } } : {}),
      subject: `New portfolio message from ${cleanName}`,
      text: [
        `From: ${fromLine}`,
        "",
        cleanMessage,
        "",
        "---",
        `Approx. location: ${ctx.location}`,
        `Timezone: ${ctx.timezone}`,
        `Language: ${ctx.language}`,
        `Browser: ${ctx.userAgent}`,
      ].join("\n"),
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #0f172a;">
          <p><strong>From:</strong> ${escapeHtml(cleanName)}${cleanEmail ? ` (${escapeHtml(cleanEmail)})` : " (no reply email provided)"}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(cleanMessage).replace(/\n/g, "<br />")}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">
            Approx. location: ${escapeHtml(ctx.location)}<br />
            Timezone: ${escapeHtml(ctx.timezone)}<br />
            Language: ${escapeHtml(ctx.language)}<br />
            Browser: ${escapeHtml(ctx.userAgent)}
          </p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact form: failed to send email:", err);
    return res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
}
