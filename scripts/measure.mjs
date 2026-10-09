import fs from "fs";
import path from "path";
import { chromium } from "playwright-core";

async function main() {
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1290, height: 1200 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();
  const url = process.env.URL || "http://localhost:3000";
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const measurements = await page.evaluate(() => {
    const data = [];

    const queryInfo = (selector, name) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        name,
        selector,
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        color: style.color,
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
      };
    };

    // Hero elements
    data.push(queryInfo("header", "Navbar"));
    data.push(queryInfo("#home h1", "Hero H1"));
    data.push(queryInfo("#home p", "Hero Subtitle"));
    data.push(queryInfo("#home a[href='#contact']", "Hero Primary CTA"));
    data.push(queryInfo("#home img", "Hero House Image"));

    // About elements
    data.push(queryInfo("#about h2", "About H2"));
    data.push(queryInfo("#about p", "About Lead Paragraph"));
    data.push(queryInfo("#about .aspect-\\[1106\\/576\\], #about img", "About Slider Image"));

    // Solutions elements
    data.push(queryInfo("#solutions h2", "Solutions H2"));
    data.push(queryInfo("#solutions .grid", "Solutions 3x2 Grid"));

    // How It Works elements
    data.push(queryInfo("#how-it-works h2", "How It Works H2"));
    data.push(queryInfo("#how-it-works .bg-\\[\\#F2F2F2\\]", "How It Works Right Panel"));

    // Projects elements
    data.push(queryInfo("#projects h2", "Projects H2"));

    // Benefits elements
    data.push(queryInfo("#benefits h2", "Benefits H2"));

    // Testimonials
    data.push(queryInfo("#testimonials h2", "Testimonials H2"));

    // FAQ
    data.push(queryInfo("#faq h2", "FAQ H2"));

    // Footer
    data.push(queryInfo("#contact h2", "CTA Footer H2"));

    return data.filter(Boolean);
  });

  await browser.close();

  console.log("\n=================== DOM MEASUREMENTS ===================");
  console.table(measurements);

  fs.mkdirSync(path.join(process.cwd(), "qa"), { recursive: true });
  fs.writeFileSync(
    path.join(process.cwd(), "qa", "measurements.json"),
    JSON.stringify(measurements, null, 2)
  );
}

main().catch(console.error);
