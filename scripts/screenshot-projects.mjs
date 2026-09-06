import { chromium } from "playwright";

const OUT = "/tmp/claude-1000/-home-mahir-Repositories-mahir-portfolio/92c8d7bd-0d8e-446e-b4e2-76e81fd71770/scratchpad";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
await page.goto("http://localhost:5183/", { waitUntil: "networkidle" });

const contact = page.locator("#contact");
await contact.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await contact.screenshot({ path: `${OUT}/contact-optional-email.png` });

// Submit with name+message only, no email, should pass client validation
await page.getByPlaceholder("Your name").fill("Jane Doe");
await page.locator("#contact textarea").fill("Hello, this is a message with no email attached.");
await page.locator("#contact button[type=submit]").click();
await page.waitForTimeout(300);
await contact.screenshot({ path: `${OUT}/contact-no-email-validation.png` });

await browser.close();
console.log("done");
