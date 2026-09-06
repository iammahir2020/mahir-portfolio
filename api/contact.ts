import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_URLS_IN_MESSAGE = 3;
const MIN_SUBMIT_MS = 2000; // reject submissions faster than this (likely bots)
const MAX_BODY_BYTES = 8 * 1024;
const MAX_UA_LENGTH = 200;

// Per-IP rate limit. Serverless instances are recycled and requests can land on
// different instances, so this is a best-effort speed bump rather than a hard
// guarantee — enough to stop a single client hammering the endpoint in a loop.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateLimitHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitHits.set(ip, recent);

  // Opportunistically drop stale buckets so the map cannot grow without bound.
  if (rateLimitHits.size > 500) {
    for (const [key, hits] of rateLimitHits) {
      if (hits.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) rateLimitHits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

function normalizeOrigin(value: string): string {
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}

// Origins allowed to submit the form. ALLOWED_ORIGINS (comma-separated) is the
// source of truth in production; the Vercel-provided deployment URLs and
// localhost are added so preview deploys and `vercel dev` keep working.
function getAllowedOrigins(): string[] {
  const configured = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((entry) => normalizeOrigin(entry.trim()))
    .filter(Boolean);

  const deployment = [process.env.VERCEL_PROJECT_PRODUCTION_URL, process.env.VERCEL_URL]
    .filter((host): host is string => Boolean(host))
    .map((host) => `https://${host}`);

  const local =
    process.env.VERCEL_ENV === "production"
      ? []
      : ["http://localhost:5173", "http://localhost:5183", "http://127.0.0.1:5173", "http://127.0.0.1:5183"];

  return [...new Set([...configured, ...deployment, ...local])];
}

function isAllowedOrigin(req: VercelRequest): boolean {
  // Browsers always attach Origin to a POST, so a request without one is not a
  // form submission from the site — reject rather than assume same-origin.
  const origin = headerString(req.headers.origin) ?? "";
  const referer = headerString(req.headers.referer) ?? "";
  const candidate = normalizeOrigin(origin) || normalizeOrigin(referer);
  if (!candidate) return false;
  return getAllowedOrigins().includes(candidate);
}

function getClientIp(req: VercelRequest): string {
  const forwarded = headerString(req.headers["x-forwarded-for"]);
  return forwarded?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
}

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
    userAgent: userAgent ? userAgent.slice(0, MAX_UA_LENGTH) : "Unknown",
    language: language || "Unknown",
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  // Only this site may submit the form. Without this the endpoint is a public
  // mail relay any page (or curl) could use to flood the inbox.
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const contentType = headerString(req.headers["content-type"]) ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return res.status(415).json({ error: "Unsupported content type." });
  }

  const contentLength = Number(headerString(req.headers["content-length"]) ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return res.status(413).json({ error: "Payload too large." });
  }

  if (isRateLimited(getClientIp(req))) {
    res.setHeader("Retry-After", String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)));
    return res.status(429).json({ error: "Too many messages. Please try again later." });
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
