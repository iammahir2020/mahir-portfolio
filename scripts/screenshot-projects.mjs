import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

// Override with SCREENSHOT_OUT / SCREENSHOT_BASE_URL when needed.
const OUT = process.env.SCREENSHOT_OUT ?? "screenshots";
const BASE_URL = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:5173/";

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
await page.goto(BASE_URL, { waitUntil: "networkidle" });

const contact = page.locator("#contact");
await contact.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await contact.screenshot({ path: `${OUT}/contact-optional-email.png` });

// Submit with name+message only, no email, should pass client validation
await page.getByPlaceholder(/^Your name/).fill("Jane Doe");
await page.locator("#contact textarea").fill("Hello, this is a message with no email attached.");
await page.locator("#contact button[type=submit]").click();
await page.waitForTimeout(300);
await contact.screenshot({ path: `${OUT}/contact-no-email-validation.png` });

await browser.close();
console.log(`done — screenshots written to ${OUT}`);
