// Resizes/compresses a source photo down to a target width and writes it as
// a JPEG, using a headless-browser canvas (same mechanism as extract_ascii.cjs)
// instead of adding an image-processing dependency for a one-off task.
//
// Usage: node resize-photo.cjs <source-image> [target-width] [output-path]
// Example: node resize-photo.cjs public/assets/fher-original.png 480

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const src = process.argv[2];
const targetWidth = parseInt(process.argv[3], 10) || 480;
const out = process.argv[4] || src.replace(/\.[^.]+$/, ".jpg");

if (!src) {
  console.error("Usage: node resize-photo.cjs <source-image> [target-width] [output-path]");
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const srcBuffer = fs.readFileSync(path.resolve(src));
  const srcExt = path.extname(src).slice(1) || "png";
  const srcBase64 = srcBuffer.toString("base64");

  const dataUrl = await page.evaluate(
    async ({ srcBase64, srcExt, targetWidth }) => {
      const img = new Image();
      img.src = `data:image/${srcExt};base64,${srcBase64}`;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      const scale = targetWidth / img.naturalWidth;
      const targetHeight = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      return canvas.toDataURL("image/jpeg", 0.85);
    },
    { srcBase64, srcExt, targetWidth }
  );

  const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
  const outPath = path.resolve(out);
  fs.writeFileSync(outPath, Buffer.from(base64Data, "base64"));
  console.log("written:", outPath, (fs.statSync(outPath).size / 1024).toFixed(0), "KB");

  await browser.close();
})();
