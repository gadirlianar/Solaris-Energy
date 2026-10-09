import fs from "fs";
import path from "path";
import { chromium } from "playwright-core";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import ssimModule from "ssim.js";

const ssim = ssimModule.ssim || ssimModule.default?.ssim || ssimModule.default || ssimModule;

const SECTIONS = [
  { id: "hero", selector: "#home", refFile: "02-hero.png" },
  { id: "about", selector: "#about", refFile: "09-about.png" },
  { id: "solutions", selector: "#solutions", refFile: "06-solutions.png" },
  { id: "how-it-works", selector: "#how-it-works", refFile: "01-how-it-works.png" },
  { id: "projects", selector: "#projects", refFile: "07-projects.png" },
  { id: "benefits", selector: "#benefits", refFile: "08-benefits.png" },
  { id: "testimonials", selector: "#testimonials", refFile: "03-testimonials.png" },
  { id: "faq", selector: "#faq", refFile: "05-faq.png" },
  { id: "cta-footer", selector: "#contact", refFile: "04-cta-footer.png" },
];

function resizePNG(srcPng, targetWidth, targetHeight) {
  const dst = new PNG({ width: targetWidth, height: targetHeight });
  for (let y = 0; y < targetHeight; y++) {
    for (let x = 0; x < targetWidth; x++) {
      const srcX = Math.min(Math.floor((x / targetWidth) * srcPng.width), srcPng.width - 1);
      const srcY = Math.min(Math.floor((y / targetHeight) * srcPng.height), srcPng.height - 1);
      const srcIdx = (srcY * srcPng.width + srcX) * 4;
      const dstIdx = (y * targetWidth + x) * 4;
      dst.data[dstIdx] = srcPng.data[srcIdx];
      dst.data[dstIdx + 1] = srcPng.data[srcIdx + 1];
      dst.data[dstIdx + 2] = srcPng.data[srcIdx + 2];
      dst.data[dstIdx + 3] = srcPng.data[srcIdx + 3];
    }
  }
  return dst;
}

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
  const baseUrl = process.env.URL || "http://localhost:3000";
  const url = baseUrl.includes("?") ? `${baseUrl}&freeze=true` : `${baseUrl}?freeze=true`;
  console.log(`Connecting to ${url}...`);
  await page.goto(url, { waitUntil: "networkidle" });

  // Wait 3 seconds so reveals and timers stabilize
  await page.waitForTimeout(3000);

  const results = [];

  for (const sec of SECTIONS) {
    const secDir = path.join(process.cwd(), "qa", sec.id);
    fs.mkdirSync(secDir, { recursive: true });

    const element = await page.$(sec.selector);
    if (!element) {
      console.warn(`Selector not found: ${sec.selector}`);
      continue;
    }

    let builtBuffer;
    if (sec.id === "hero") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      builtBuffer = await page.screenshot({ clip: { x: 0, y: 0, width: 1290, height: 1056 } });
    } else {
      // Scroll to element to ensure visibility
      await element.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      builtBuffer = await element.screenshot();
    }

    const builtPng = PNG.sync.read(builtBuffer);
    fs.writeFileSync(path.join(secDir, "built.png"), builtBuffer);

    // Read reference file
    const refPath = path.join(process.cwd(), "reference", sec.refFile);
    if (!fs.existsSync(refPath)) {
      console.warn(`Reference file missing: ${refPath}`);
      continue;
    }
    const rawRefPng = PNG.sync.read(fs.readFileSync(refPath));

    // Normalize reference to built dimensions for comparison
    const targetW = builtPng.width;
    const targetH = builtPng.height;
    const refPng = resizePNG(rawRefPng, targetW, targetH);
    fs.writeFileSync(path.join(secDir, "reference.png"), PNG.sync.write(refPng));

    // 1. Side by side image
    const sideBySide = new PNG({ width: targetW * 2 + 10, height: targetH });
    for (let y = 0; y < targetH; y++) {
      for (let x = 0; x < sideBySide.width; x++) {
        const dstIdx = (y * sideBySide.width + x) * 4;
        if (x < targetW) {
          const srcIdx = (y * targetW + x) * 4;
          sideBySide.data[dstIdx] = refPng.data[srcIdx];
          sideBySide.data[dstIdx + 1] = refPng.data[srcIdx + 1];
          sideBySide.data[dstIdx + 2] = refPng.data[srcIdx + 2];
          sideBySide.data[dstIdx + 3] = refPng.data[srcIdx + 3];
        } else if (x >= targetW + 10) {
          const bx = x - (targetW + 10);
          const srcIdx = (y * targetW + bx) * 4;
          sideBySide.data[dstIdx] = builtPng.data[srcIdx];
          sideBySide.data[dstIdx + 1] = builtPng.data[srcIdx + 1];
          sideBySide.data[dstIdx + 2] = builtPng.data[srcIdx + 2];
          sideBySide.data[dstIdx + 3] = builtPng.data[srcIdx + 3];
        } else {
          // divider gray
          sideBySide.data[dstIdx] = 200;
          sideBySide.data[dstIdx + 1] = 200;
          sideBySide.data[dstIdx + 2] = 200;
          sideBySide.data[dstIdx + 3] = 255;
        }
      }
    }
    fs.writeFileSync(path.join(secDir, "side-by-side.png"), PNG.sync.write(sideBySide));

    // 2. Overlay 50% image
    const overlay = new PNG({ width: targetW, height: targetH });
    for (let i = 0; i < targetW * targetH * 4; i += 4) {
      overlay.data[i] = Math.round(refPng.data[i] * 0.5 + builtPng.data[i] * 0.5);
      overlay.data[i + 1] = Math.round(refPng.data[i + 1] * 0.5 + builtPng.data[i + 1] * 0.5);
      overlay.data[i + 2] = Math.round(refPng.data[i + 2] * 0.5 + builtPng.data[i + 2] * 0.5);
      overlay.data[i + 3] = 255;
    }
    fs.writeFileSync(path.join(secDir, "overlay-50.png"), PNG.sync.write(overlay));

    // 3. Diff image (Pixelmatch heatmap)
    const diff = new PNG({ width: targetW, height: targetH });
    const numDiffPixels = pixelmatch(
      refPng.data,
      builtPng.data,
      diff.data,
      targetW,
      targetH,
      { threshold: 0.1 }
    );
    fs.writeFileSync(path.join(secDir, "diff.png"), PNG.sync.write(diff));

    const totalPixels = targetW * targetH;
    const mismatchPercent = ((numDiffPixels / totalPixels) * 100).toFixed(2);

    // 4. SSIM calculation
    let ssimScore = 0;
    try {
      const ssimResult = ssim(
        { data: refPng.data, width: targetW, height: targetH },
        { data: builtPng.data, width: targetW, height: targetH }
      );
      ssimScore = (ssimResult.mssim || ssimResult).toFixed(4);
    } catch {
      ssimScore = "N/A";
    }

    results.push({
      section: sec.id,
      dimensions: `${targetW}x${targetH}`,
      mismatchPercent: `${mismatchPercent}%`,
      diffPixels: numDiffPixels,
      ssim: ssimScore,
    });
  }

  await browser.close();

  console.log("\n=================== QA COMPARISON SCORE TABLE ===================");
  console.table(results);
  fs.writeFileSync(
    path.join(process.cwd(), "qa", "scores.json"),
    JSON.stringify(results, null, 2)
  );
}

main().catch(console.error);
