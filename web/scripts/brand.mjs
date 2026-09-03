/* Derives every brand asset the site needs from the three source files in the
   repository root: MM_LOGO_TRANSPARENT.png, MM_LOGO.png and faviico.png.
   Run with: node scripts/brand.mjs */
import sharp from "sharp";
import fs from "node:fs";
const { mkdirSync } = fs;
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = (n) => resolve(here, "../..", n);
const pub = (n) => resolve(here, "../public", n);
const app = (n) => resolve(here, "../src/app", n);

mkdirSync(pub("brand"), { recursive: true });

const LOGO = src("MM_LOGO_TRANSPARENT.png");
const ICON = src("faviico.png");

/* ---- 1. the mark, tight-cropped out of the full lockup ---- */
const { data, info } = await sharp(LOGO).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const ink = (x, y) => data[(y * W + x) * C + 3] > 24;

// the mark sits above the wordmark; find its box within the top 58% of the file
let minX = W, maxX = 0, minY = H, maxY = 0;
for (let y = 0; y < H * 0.58; y++)
  for (let x = 0; x < W; x++)
    if (ink(x, y)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
const box = { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
console.log("mark box", box, "aspect", (box.width / box.height).toFixed(3));

const markNavy = await sharp(LOGO).extract(box).png().toBuffer();
await sharp(markNavy).resize({ width: 300 }).png({ compressionLevel: 9 }).toFile(pub("brand/mark.png"));

/** Repaint artwork a flat colour, keeping its alpha channel. */
async function recolor(buf, hex) {
  const m = await sharp(buf).metadata();
  const alpha = await sharp(buf).ensureAlpha().extractChannel(3).raw().toBuffer();
  return sharp({ create: { width: m.width, height: m.height, channels: 3, background: hex } })
    .joinChannel(alpha, { raw: { width: m.width, height: m.height, channels: 1 } })
    .png()
    .toBuffer();
}

// white version for the navy footer and CTA band
const markWhite = await recolor(markNavy, "#ffffff");
await sharp(markWhite).resize({ width: 300 }).png({ compressionLevel: 9 }).toFile(pub("brand/mark-white.png"));

/* ---- 2. the full lockup, trimmed ---- */
await sharp(LOGO).trim({ threshold: 1 }).resize({ width: 900 }).png({ compressionLevel: 9 }).toFile(pub("brand/logo.png"));

/* ---- 3. favicons and app icons ----
   faviico.png is the white mark on a navy rounded square, but its corners are
   painted white rather than left transparent, which shows as white notches in
   dark browser chrome. So the icon is recomposed here from the same two
   ingredients: the navy sampled out of faviico.png, and the real mark. */
const ICON_NAVY = await (async () => {
  const { data } = await sharp(ICON).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const meta = await sharp(ICON).metadata();
  const i = (Math.round(meta.height * 0.5) * meta.width + Math.round(meta.width * 0.16)) * 4;
  return "#" + [data[i], data[i + 1], data[i + 2]].map((v) => v.toString(16).padStart(2, "0")).join("");
})();
console.log("icon navy", ICON_NAVY);

/** Navy tile with the white mark centred; `radius` is a fraction of the size. */
async function appIcon(size, radius) {
  const markW = Math.round(size * 0.62);
  const mark = await sharp(markWhite).resize({ width: markW }).png().toBuffer();
  const m = await sharp(mark).metadata();
  const tile = sharp({
    create: { width: size, height: size, channels: 4, background: ICON_NAVY },
  }).composite([
    { input: mark, left: Math.round((size - m.width) / 2), top: Math.round((size - m.height) / 2) },
  ]);
  if (!radius) return tile.png({ compressionLevel: 9 }).toBuffer();
  const r = Math.round(size * radius);
  const maskSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="#fff"/></svg>`,
  );
  return sharp(await tile.png().toBuffer())
    .composite([{ input: maskSvg, blend: "dest-in" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

fs.writeFileSync(app("icon.png"), await appIcon(512, 0.22));
fs.writeFileSync(app("apple-icon.png"), await appIcon(180, 0.22));
fs.writeFileSync(pub("brand/icon-192.png"), await appIcon(192, 0.22));
fs.writeFileSync(pub("brand/icon-512.png"), await appIcon(512, 0.22));
// maskable: full bleed, art kept inside the 80% safe zone the platform may crop to
fs.writeFileSync(pub("brand/icon-maskable-512.png"), await appIcon(512, 0));

/* ---- 4. social sharing card ---- */
const OG_W = 1200, OG_H = 630;
const lockup = await sharp(LOGO).trim({ threshold: 1 }).png().toBuffer();
const lockupWhite = await sharp(await recolor(lockup, "#ffffff"))
  .resize({ width: 372 })
  .png()
  .toBuffer();

const bg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#02205f"/><stop offset=".55" stop-color="#02257c"/><stop offset="1" stop-color="#00153b"/>
      </linearGradient>
    </defs>
    <rect width="${OG_W}" height="${OG_H}" fill="url(#g)"/>
    <g fill="none" stroke="#6f92ff" stroke-width="1.1" opacity=".28">
      <path d="M-40 470C180 400 340 520 540 466s300-150 520-104 300 128 240 108"/>
      <path d="M-40 512C180 446 340 566 540 512s300-146 520-100 300 124 240 104"/>
      <path d="M-40 428C190 350 340 480 560 424s280-166 500-120 320 140 260 118"/>
    </g>
    <text x="600" y="507" fill="#e6ecff" font-family="Inter Tight, Inter, Helvetica, Arial, sans-serif"
          font-size="38" font-weight="700" letter-spacing="-0.8" text-anchor="middle">We model reality. You shape the future.</text>
    <text x="600" y="556" fill="#8fa6e8" font-family="Inter Tight, Inter, Helvetica, Arial, sans-serif"
          font-size="21" font-weight="500" letter-spacing="0.4" text-anchor="middle">Modelling · Simulation · Forecasting · Decision support</text>
  </svg>`,
);

const lw = await sharp(lockupWhite).metadata();
console.log("og lockup", lw.width + "x" + lw.height);
await sharp(bg)
  .composite([{ input: lockupWhite, left: Math.round((OG_W - lw.width) / 2), top: 92 }])
  .png({ compressionLevel: 9 })
  .toFile(pub("brand/og.png"));

console.log("brand assets written");
