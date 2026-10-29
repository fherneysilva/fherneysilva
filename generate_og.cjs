// Generates public/assets/og-image.png (1200x630), the preview card shown when the
// site link is shared (Open Graph / Twitter Card). Run: node generate_og.cjs
const { chromium } = require('playwright');
const path = require('path');
const { pathToFileURL } = require('url');

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=NTR&family=Libre+Baskerville:ital@1&display=swap" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #16161a; color: #f5f3ee; overflow: hidden;
         font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif; position: relative; }
  .glow { position: absolute; right: -60px; top: 50%; width: 640px; height: 640px; transform: translateY(-50%);
          background: radial-gradient(circle, rgba(232,163,77,0.10), transparent 65%); }
  canvas { position: absolute; right: 40px; top: 50%; transform: translateY(-50%); }
  .text { position: absolute; left: 80px; top: 50%; transform: translateY(-50%); width: 720px; }
  .hi { font-family: monospace; color: #e8a34d; font-size: 30px; margin-bottom: 4px; }
  .name { font-family: "NTR", sans-serif; color: #e8a34d; font-size: 88px; line-height: 1; font-weight: bold; }
  .tag { font-family: "Libre Baskerville", serif; font-style: italic; color: #e8a34d; font-size: 28px; margin-top: 14px; }
  .role { color: #e5e3de; font-size: 27px; font-weight: 600; margin-top: 40px; }
  .stack { color: #9b9aa3; font-size: 24px; margin-top: 12px; }
  .url { position: absolute; left: 80px; bottom: 48px; font-family: monospace; color: #9b9aa3; font-size: 22px; }
  .url b { color: #ffd166; font-weight: normal; }
  .bar { position: absolute; left: 0; top: 0; bottom: 0; width: 8px; background: #e8a34d; }
</style></head><body>
  <div class="bar"></div>
  <div class="glow"></div>
  <canvas id="c" width="460" height="560"></canvas>
  <div class="text">
    <div class="hi">hi, i'm</div>
    <div class="name">Fherney Silva</div>
    <div class="tag">Construyendo tecnología que escala.</div>
    <div class="role">Technical Lead · Software Engineer · CEO de Siscodex</div>
    <div class="stack">AWS Cloud Architecture · AI Solutions</div>
  </div>
  <div class="url">→ <b>www.fherneysilva.com</b></div>
</body></html>`;

(async () => {
  // asciiData.js is an ES module, so it has to be loaded with a dynamic import
  const { asciiData } = await import(pathToFileURL(path.join(__dirname, 'src/assets/asciiData.js')).href);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: 'networkidle' });

  // Draws the same ASCII portrait the site shows, at a static frame
  await page.evaluate(async (points) => {
    await document.fonts.ready;
    const ctx = document.getElementById('c').getContext('2d');
    ctx.scale(1.2, 1.2);
    ctx.font = '7px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const p of points) {
      ctx.fillStyle = `rgba(232, 163, 77, ${Math.min(1, p.alpha * 1.15)})`;
      ctx.fillText(p.char, p.x + 8, p.y + 20);
    }
  }, asciiData['460']);

  await page.screenshot({ path: path.join(__dirname, 'public/assets/og-image.png') });
  await browser.close();
  console.log('Saved public/assets/og-image.png');
})();
