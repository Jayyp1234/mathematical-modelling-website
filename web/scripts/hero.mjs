// Generates public/img/hero-visual.svg — wireframe dune surface + extruded MM mark.
// Geometry traced from the source render; see scripts/README.md.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../public/img/hero-visual.svg");

const W = 528, H = 304;
const NU = 92, NV = 60;
const g = (x, s) => Math.exp(-(x * x) / (s * s));

function height(u, v) {
  return (
    1.30 * g(u - 0.30, 0.20) * g(v - 0.20, 0.55) +   // dominant crest
    0.70 * g(u - 0.05, 0.18) * g(v - 0.32, 0.60) +
    1.55 * g(u - 1.03, 0.24) * g(v - 0.40, 0.55) +   // right swell
    0.50 * g(u - 0.72, 0.12) * g(v + 0.04, 0.28) -
    0.34 * g(u - 0.60, 0.18) * g(v - 0.46, 0.38) -   // trough between
    0.18 * g(u - 0.18, 0.22) * g(v - 0.9, 0.45) +
    0.075 * Math.sin(u * 9.5 + v * 2.4) * g(v - 0.45, 1.0) +
    0.045 * Math.sin(v * 9 - u * 3.5)
  );
}

const camH = 0.72, camD = 2.30, pitch = 0.185, f = 545;
const cx = W * 0.46, cy = H * 0.60;
const spanX = 5.2, spanZ = 4.4;

function project(u, v) {
  const dx = (u - 0.5) * spanX;
  const dz = (0.5 - v) * spanZ + camD;
  const dy = height(u, v) - camH;
  const yc = dy * Math.cos(pitch) + dz * Math.sin(pitch);
  const zc = -dy * Math.sin(pitch) + dz * Math.cos(pitch);
  return [cx + (f * dx) / zc, cy - (f * yc) / zc];
}

const P = [];
for (let i = 0; i < NU; i++) {
  P[i] = [];
  for (let j = 0; j < NV; j++) P[i][j] = project(i / (NU - 1), j / (NV - 1));
}

const r1 = (n) => Math.round(n * 10) / 10;
const poly = (pts) => "M" + pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join("L");

let uLines = "", vLines = "";
for (let i = 0; i < NU; i++) uLines += poly(P[i]) + " ";
for (let j = 0; j < NV; j++) vLines += poly(P.map((c) => c[j])) + " ";

let dots = "";
for (let i = 1; i < NU; i += 2) {
  for (let j = 1; j < NV; j += 1) {
    const [x, y] = P[i][j];
    if (x < -8 || x > W + 8 || y < -8 || y > H + 8) continue;
    const v = j / (NV - 1);
    if (j % 2 === 0 && v < 0.55) continue;
    dots += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${(0.45 + 0.7 * v).toFixed(2)}" opacity="${(0.1 + 0.72 * Math.pow(v, 1.6)).toFixed(2)}"/>`;
  }
}

/* ---- extruded mark: centrelines traced from the source render ---- */
const BW = 18.5, EX = 5.2, EY = -2.6;
const beams = ["M290 67L170 231", "M320 105L219 242", "M273 245L346 152L421 264"];
const shadow = beams.map((d) => `<path d="${d}" transform="translate(${EX} ${EY})"/>`).join("");
const faces = beams.map((d, i) => `<path d="${d}" stroke="url(#beam${i})"/>`).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="Three-dimensional rendering of the Mathematical Modelling mark standing on a wireframe data surface">
<defs>
<linearGradient id="beam0" x1="170" y1="231" x2="290" y2="67" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1a2f79"/><stop offset=".3" stop-color="#22409f"/><stop offset=".7" stop-color="#2650c8"/><stop offset="1" stop-color="#1d3f9c"/></linearGradient>
<linearGradient id="beam1" x1="219" y1="242" x2="320" y2="105" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#182a6e"/><stop offset=".35" stop-color="#213c96"/><stop offset=".78" stop-color="#2549bd"/><stop offset="1" stop-color="#1b3890"/></linearGradient>
<linearGradient id="beam2" x1="273" y1="250" x2="421" y2="258" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1f3684"/><stop offset=".42" stop-color="#243774"/><stop offset="1" stop-color="#1c2d66"/></linearGradient>
<linearGradient id="deep" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#16234f"/><stop offset="1" stop-color="#0d1738"/></linearGradient>
<linearGradient id="washL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".14" stop-color="#fff" stop-opacity=".62"/><stop offset=".34" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="washT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".16" stop-color="#fff" stop-opacity="0"/><stop offset=".9" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".7"/></linearGradient>
<radialGradient id="contact" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#1b2f6d" stop-opacity=".26"/><stop offset="1" stop-color="#1b2f6d" stop-opacity="0"/></radialGradient>
<clipPath id="frame"><rect width="${W}" height="${H}"/></clipPath>
</defs>
<g clip-path="url(#frame)">
<g stroke="#8ea3dd" stroke-width=".28" opacity=".68"><path d="${uLines.trim()}"/><path d="${vLines.trim()}"/></g>
<g fill="#3159d6">${dots}</g>
<rect width="${W}" height="${H}" fill="url(#washT)"/>
<rect width="${W}" height="${H}" fill="url(#washL)"/>
<g><ellipse cx="182" cy="235" rx="30" ry="6" fill="url(#contact)"/><ellipse cx="230" cy="246" rx="27" ry="5.5" fill="url(#contact)"/><ellipse cx="286" cy="250" rx="27" ry="5.5" fill="url(#contact)"/><ellipse cx="406" cy="268" rx="30" ry="6" fill="url(#contact)"/></g>
<g stroke-width="${BW}" stroke-linecap="round" stroke-linejoin="round">
<g stroke="url(#deep)">${shadow}</g>
${faces}
</g>
</g>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, svg);
console.log("wrote", OUT, (svg.length / 1024).toFixed(1) + "kb");
