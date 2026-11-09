// Rasterizes public/favicon.svg at the sizes needed for apple-touch-icon and
// the web app manifest, using a headless-browser canvas (same mechanism as
// extract_ascii.cjs/resize-photo.cjs) instead of adding an image-processing
// dependency for a one-off task.
//
// Usage: node generate_icons.cjs

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const SVG_PATH = path.resolve(__dirname, "public/favicon.svg");
const TARGETS = [
  { name: "apple-touch-icon.png", size: 180 },
  { name: "logo192.png", size: 192 },
  { name: "logo512.png", size: 512 },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const svgBase64 = fs.readFileSync(SVG_PATH).toString("base64");

  for (const { name, size } of TARGETS) {
    const dataUrl = await page.evaluate(
      async ({ svgBase64, size }) => {
        const img = new Image();
        img.src = `data:image/svg+xml;base64,${svgBase64}`;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, size, size);
        return canvas.toDataURL("image/png");
      },
      { svgBase64, size }
    );

    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
    const outPath = path.resolve(__dirname, "public", name);
    fs.writeFileSync(outPath, Buffer.from(base64Data, "base64"));
    console.log("written:", outPath, (fs.statSync(outPath).size / 1024).toFixed(1), "KB");
  }

  await browser.close();
})();
