/* Generates the illustrative SVG imagery in public/img.
   These are drawn stand-ins for photography — swap the paths in
   src/lib/content.ts for real images when they are available. */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = resolve(dirname(fileURLToPath(import.meta.url)), "../public/img");
const w = (name, svg) => {
  writeFileSync(resolve(dir, name), svg.replace(/\n\s+/g, "\n").trim());
  console.log("·", name);
};
const rnd = (seed) => {
  let s = seed;
  return () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
};
const f2 = (n) => Math.round(n * 10) / 10;

const grain = `<filter id="grain" x="0" y="0" width="100%" height="100%">
<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="4"/>
<feColorMatrix type="saturate" values="0"/>
<feComponentTransfer><feFuncA type="linear" slope="0.055"/></feComponentTransfer>
<feBlend in2="SourceGraphic" mode="overlay"/></filter>`;
const soft = (id, dev) => `<filter id="${id}" x="-30%" y="-60%" width="160%" height="260%"><feGaussianBlur stdDeviation="${dev}"/></filter>`;

/* ---------------- 1. offshore platform, blue hour ---------------- */
{
  const r = rnd(7);
  let lights = "";
  for (let i = 0; i < 70; i++) {
    const x = 116 + r() * 140, y = 68 + r() * 68;
    lights += `<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(0.5 + r() * 1.4)}" fill="#ffd9a0" opacity="${(0.3 + r() * 0.65).toFixed(2)}"/>`;
  }
  let legs = "";
  for (let i = 0; i < 6; i++) {
    const x = 124 + i * 26;
    legs += `<path d="M${x} 134 ${x + 5} 176" stroke="#0a1130" stroke-width="3.4" opacity=".92"/>`;
  }
  let derrick = "";
  for (let i = 0; i < 6; i++)
    derrick += `<path d="M${150 + i * 2} ${94 - i * 8} ${168 - i * 2} ${94 - i * 8}" stroke="#131b40" stroke-width="1.3"/>`;
  w(
    "case-energy.svg",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 307 178" width="307" height="178">
<defs>
<linearGradient id="e-sky" x1="0" y1="0" x2=".18" y2="1">
<stop offset="0" stop-color="#131c46"/><stop offset=".34" stop-color="#22305f"/>
<stop offset=".62" stop-color="#42477b"/><stop offset=".82" stop-color="#78627f"/><stop offset="1" stop-color="#a4767a"/></linearGradient>
<linearGradient id="e-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#333a63"/><stop offset=".45" stop-color="#1e2549"/><stop offset="1" stop-color="#10152f"/></linearGradient>
<radialGradient id="e-glow" cx="56%" cy="74%" r="46%"><stop offset="0" stop-color="#ffb15c" stop-opacity=".5"/><stop offset="1" stop-color="#ffb15c" stop-opacity="0"/></radialGradient>
<radialGradient id="e-vig" cx="50%" cy="46%" r="76%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></radialGradient>
${soft("e-blur", 7)}${grain}
</defs>
<g filter="url(#grain)">
<rect width="307" height="178" fill="url(#e-sky)"/>
<g filter="url(#e-blur)" opacity=".5" fill="#8f8ab0">
<ellipse cx="70" cy="46" rx="70" ry="13"/><ellipse cx="215" cy="30" rx="86" ry="11"/><ellipse cx="150" cy="66" rx="110" ry="9"/></g>
<g fill="#e6e9fb" opacity=".5"><circle cx="40" cy="20" r=".9"/><circle cx="92" cy="12" r=".7"/><circle cx="150" cy="18" r=".6"/><circle cx="240" cy="14" r=".8"/><circle cx="283" cy="30" r=".7"/></g>
<rect y="118" width="307" height="60" fill="url(#e-glow)"/>
<rect y="134" width="307" height="44" fill="url(#e-sea)"/>
${legs}
<path d="M116 126h158v9H116z" fill="#101838"/>
<path d="M122 96h146v30H122z" fill="#151d40"/>
<path d="M134 78h32v18h-32zM182 68h32v28h-32zM224 82h30v14h-30z" fill="#18204a"/>
${derrick}
<path d="M159 94V42M159 42l13 7M159 42l-12 7" stroke="#121a3c" stroke-width="2.6" fill="none"/>
<path d="M246 82V50l10 9" stroke="#121a3c" stroke-width="2.6" fill="none"/>
<circle cx="257" cy="46" r="4.4" fill="#ff9a3c" opacity=".9"/>
<circle cx="257" cy="46" r="9" fill="#ff9a3c" opacity=".2"/>
${lights}
<g opacity=".34" fill="#ffca8c">
<rect x="136" y="138" width="2.6" height="30" rx="1.3"/><rect x="166" y="138" width="2" height="35" rx="1"/>
<rect x="196" y="138" width="2.6" height="26" rx="1.3"/><rect x="228" y="138" width="2" height="32" rx="1"/>
<rect x="256" y="138" width="2.6" height="22" rx="1.3"/></g>
<g stroke="#9aa3d0" stroke-width=".6" opacity=".16" fill="none"><path d="M0 146h307M0 156h307M0 166h307M0 174h307"/></g>
<rect width="307" height="178" fill="url(#e-vig)"/>
</g></svg>`,
  );
}

/* ---------------- 2. wind farm ---------------- */
{
  const turbine = (x, y, s, o) =>
    `<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}">
<path d="M0 0v-54" stroke="#fbfdff" stroke-width="2.2"/>
<path d="M0-54 23-67M0-54-21-68M0-54-2-29" stroke="#fbfdff" stroke-width="2" stroke-linecap="round"/>
<circle cx="0" cy="-54" r="2.2" fill="#eef4fb"/></g>`;
  const r = rnd(19);
  let texture = "";
  for (let i = 0; i < 90; i++) {
    const x = r() * 307, y = 118 + r() * 60;
    texture += `<path d="M${f2(x)} ${f2(y)}l${f2(3 + r() * 5)} ${f2(-1 - r() * 2)}" stroke="#2f5c26" stroke-width=".6" opacity="${(0.05 + r() * 0.13).toFixed(2)}"/>`;
  }
  w(
    "case-renewables.svg",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 307 178" width="307" height="178">
<defs>
<linearGradient id="r-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2467bb"/><stop offset=".42" stop-color="#6fa3d8"/><stop offset=".78" stop-color="#b9d3ea"/><stop offset="1" stop-color="#dfeaf3"/></linearGradient>
<linearGradient id="r-h1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb763"/><stop offset="1" stop-color="#4e7c34"/></linearGradient>
<linearGradient id="r-h2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9dc65e"/><stop offset="1" stop-color="#5b9137"/></linearGradient>
<linearGradient id="r-h3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#79a848"/><stop offset="1" stop-color="#3c6b2a"/></linearGradient>
<radialGradient id="r-vig" cx="50%" cy="44%" r="76%"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient>
${soft("r-blur", 9)}${grain}
</defs>
<g filter="url(#grain)">
<rect width="307" height="178" fill="url(#r-sky)"/>
<g filter="url(#r-blur)" fill="#ffffff">
<ellipse cx="58" cy="40" rx="52" ry="12" opacity=".7"/><ellipse cx="88" cy="33" rx="30" ry="9" opacity=".55"/>
<ellipse cx="232" cy="28" rx="58" ry="11" opacity=".62"/><ellipse cx="262" cy="22" rx="32" ry="8" opacity=".5"/>
<ellipse cx="158" cy="60" rx="76" ry="8" opacity=".42"/><ellipse cx="20" cy="72" rx="46" ry="7" opacity=".3"/></g>
${turbine(212, 116, 0.6, 0.72)}${turbine(242, 120, 0.52, 0.6)}${turbine(268, 124, 0.45, 0.48)}${turbine(290, 127, 0.4, 0.4)}
<path d="M0 120c48-27 96-17 150-3s112 8 157-15v76H0z" fill="url(#r-h1)"/>
${turbine(98, 127, 1.02, 1)}${turbine(142, 131, 0.84, 0.95)}${turbine(178, 135, 0.7, 0.88)}
<path d="M0 139c56-23 104-7 158 5s102 5 149-13v47H0z" fill="url(#r-h2)"/>
<path d="M0 157c62-17 112 4 168 10s94-2 139-15v26H0z" fill="url(#r-h3)"/>
${texture}
<g stroke="#ffffff" stroke-width=".6" opacity=".13" fill="none"><path d="M0 131c60-25 110-9 166 3s96 0 141-17"/><path d="M0 149c60-21 112 0 168 8s96-2 139-13"/></g>
<rect width="307" height="178" fill="url(#r-vig)"/>
</g></svg>`,
  );
}

/* ---------------- 3. process plant at dusk ---------------- */
{
  const r = rnd(29);
  let lights = "";
  for (let i = 0; i < 110; i++) {
    const x = 8 + r() * 294, y = 74 + r() * 64;
    lights += `<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(0.5 + r() * 1.2)}" fill="#ffd49a" opacity="${(0.28 + r() * 0.62).toFixed(2)}"/>`;
  }
  let stacks = "";
  for (let i = 0; i < 12; i++) {
    const x = 10 + i * 25 + (i % 2) * 4, h = 30 + (i % 4) * 20 + (i % 3) * 8;
    stacks += `<rect x="${x}" y="${136 - h}" width="7.5" height="${h}" fill="#111838"/><rect x="${x - 1.8}" y="${134 - h}" width="11" height="3.5" fill="#161e46"/>`;
  }
  let pipes = "";
  for (let i = 0; i < 4; i++) pipes += `<path d="M8 ${112 + i * 6}h291" stroke="#161d44" stroke-width="1.6"/>`;
  w(
    "case-industry.svg",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 307 178" width="307" height="178">
<defs>
<linearGradient id="i-sky" x1="0" y1="0" x2=".12" y2="1">
<stop offset="0" stop-color="#101a44"/><stop offset=".34" stop-color="#243060"/><stop offset=".64" stop-color="#4b4a7c"/><stop offset=".85" stop-color="#8a6b82"/><stop offset="1" stop-color="#b4808a"/></linearGradient>
<linearGradient id="i-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3159"/><stop offset="1" stop-color="#0e1330"/></linearGradient>
<radialGradient id="i-haze" cx="50%" cy="82%" r="60%"><stop offset="0" stop-color="#ffb066" stop-opacity=".42"/><stop offset="1" stop-color="#ffb066" stop-opacity="0"/></radialGradient>
<radialGradient id="i-vig" cx="50%" cy="46%" r="76%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></radialGradient>
${soft("i-blur", 8)}${grain}
</defs>
<g filter="url(#grain)">
<rect width="307" height="178" fill="url(#i-sky)"/>
<g filter="url(#i-blur)" opacity=".42" fill="#9d9ac0"><ellipse cx="66" cy="36" rx="72" ry="13"/><ellipse cx="234" cy="26" rx="76" ry="10"/></g>
<rect y="92" width="307" height="86" fill="url(#i-haze)"/>
${stacks}
<g fill="#141c40"><rect x="52" y="110" width="40" height="26" rx="2.5"/><rect x="142" y="104" width="50" height="32" rx="2.5"/><rect x="228" y="114" width="44" height="22" rx="2.5"/></g>
${pipes}
<path d="M96 102V56l8 8M206 98V60l-8 8" stroke="#121a3e" stroke-width="2.6" fill="none"/>
<circle cx="100" cy="52" r="4.2" fill="#ff9b3d" opacity=".92"/><circle cx="100" cy="52" r="9" fill="#ff9b3d" opacity=".18"/>
<path d="M0 136h307v10H0z" fill="#0d1230"/>
${lights}
<rect y="146" width="307" height="32" fill="url(#i-water)"/>
<g opacity=".36" fill="#ffc98a">
<rect x="36" y="148" width="2" height="24" rx="1"/><rect x="80" y="148" width="2.6" height="20" rx="1.3"/>
<rect x="126" y="148" width="2" height="26" rx="1"/><rect x="176" y="148" width="2.6" height="18" rx="1.3"/>
<rect x="222" y="148" width="2" height="22" rx="1"/><rect x="268" y="148" width="2.6" height="16" rx="1.3"/></g>
<rect width="307" height="178" fill="url(#i-vig)"/>
</g></svg>`,
  );
}

/* ---------------- 4. video thumbnail: surface plot on a laptop ---------------- */
{
  const NU = 26, NV = 22;
  const P = [];
  for (let i = 0; i < NU; i++) {
    P[i] = [];
    for (let j = 0; j < NV; j++) {
      const u = i / (NU - 1), v = j / (NV - 1);
      const h = Math.sin(u * 5.4 - 1.1) * Math.cos(v * 4.2 - 0.7);
      P[i][j] = [f2(40 + u * 206 - v * 46), f2(86 + v * 54 - h * 33 - u * 3), h];
    }
  }
  const col = (h) => {
    const t = (h + 1) / 2;
    return `rgb(${Math.round(34 + t * 208)},${Math.round(84 + t * 140)},${Math.round(196 - t * 138)})`;
  };
  let quads = "";
  for (let i = 0; i < NU - 1; i++)
    for (let j = 0; j < NV - 1; j++) {
      const a = P[i][j], b = P[i + 1][j], c = P[i + 1][j + 1], d = P[i][j + 1];
      const cl = col((a[2] + b[2] + c[2] + d[2]) / 4);
      quads += `<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}L${c[0]} ${c[1]}L${d[0]} ${d[1]}Z" fill="${cl}" stroke="${cl}" stroke-width=".4"/>`;
    }
  w(
    "video-thumb.svg",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 278 227" width="278" height="227">
<defs>
<linearGradient id="v-room" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="#d5e0ee"/><stop offset=".45" stop-color="#9aaec9"/><stop offset="1" stop-color="#41526b"/></linearGradient>
<linearGradient id="v-screen" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#f7f9fd"/><stop offset="1" stop-color="#ccd6e9"/></linearGradient>
<linearGradient id="v-deck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#414b5c"/><stop offset="1" stop-color="#1a2029"/></linearGradient>
${soft("v-blur", 6)}${grain}
</defs>
<g filter="url(#grain)">
<rect width="278" height="227" fill="url(#v-room)"/>
<g filter="url(#v-blur)" opacity=".55" stroke="#f2f7ff" stroke-width="8" fill="none"><path d="M18 0v227M72 0v227M126 0v227"/></g>
<rect y="176" width="278" height="51" fill="#28303d"/>
<path d="M22 180 52 34h198l34 146z" fill="url(#v-screen)"/>
<path d="M22 180 52 34h198l34 146z" fill="none" stroke="#8e9db3" stroke-width="1.3"/>
<g opacity=".8" stroke="#b3c1d6" stroke-width=".6" fill="none">
<path d="M48 164h198M54 142h188M60 120h176M66 98h164M72 76h152M78 54h140"/>
<path d="M90 34v146M124 34v146M158 34v146M192 34v146M224 34v146"/></g>
<g>${quads}</g>
<path d="M10 180h258l20 22H0z" fill="url(#v-deck)"/>
<rect x="114" y="189" width="50" height="4" rx="2" fill="#525e70"/>
<ellipse cx="140" cy="212" rx="132" ry="8" fill="#000" opacity=".22"/>
</g></svg>`,
  );
}

/* ---------------- 5-7. blog thumbnails ---------------- */
{
  const r = rnd(101);
  let city = "";
  for (let i = 0; i < 30; i++) {
    const x = r() * 105, h = 10 + r() * 36;
    city += `<rect x="${f2(x)}" y="${f2(78 - h)}" width="${f2(3 + r() * 7)}" height="${f2(h)}" fill="#08102b"/>`;
  }
  let sparks = "";
  for (let i = 0; i < 80; i++)
    sparks += `<circle cx="${f2(r() * 105)}" cy="${f2(28 + r() * 48)}" r="${f2(0.4 + r() * 0.9)}" fill="#ffcb8a" opacity="${(0.3 + r() * 0.6).toFixed(2)}"/>`;
  w(
    "post-simulation.svg",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105 78" width="105" height="78">
<defs><linearGradient id="p1" x1="0" y1="0" x2=".2" y2="1"><stop offset="0" stop-color="#0d1940"/><stop offset=".55" stop-color="#20305f"/><stop offset="1" stop-color="#6b4468"/></linearGradient></defs>
<rect width="105" height="78" fill="url(#p1)"/>${city}${sparks}
<rect y="70" width="105" height="8" fill="#060c1f" opacity=".85"/></svg>`,
  );

  const r2 = rnd(53);
  const nodes = Array.from({ length: 30 }, () => [r2() * 105, r2() * 78]);
  let edges = "";
  nodes.forEach((a, i) =>
    nodes.forEach((b, j) => {
      if (j <= i) return;
      const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (d < 27)
        edges += `<path d="M${f2(a[0])} ${f2(a[1])}L${f2(b[0])} ${f2(b[1])}" stroke="#43d6f7" stroke-width=".45" opacity="${(0.55 - d / 66).toFixed(2)}"/>`;
    }),
  );
  const dots = nodes
    .map(([x, y]) => `<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(0.8 + r2() * 1.5)}" fill="#83e9ff" opacity=".92"/>`)
    .join("");
  w(
    "post-dynamics.svg",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105 78" width="105" height="78">
<defs><radialGradient id="p2" cx="42%" cy="46%" r="74%"><stop offset="0" stop-color="#0f3a68"/><stop offset="1" stop-color="#030d26"/></radialGradient></defs>
<rect width="105" height="78" fill="url(#p2)"/><g fill="none">${edges}</g>${dots}</svg>`,
  );

  let waves = "";
  for (let k = 0; k < 15; k++) {
    let d = "";
    for (let x = 0; x <= 105; x += 3) {
      const y = 30 + Math.sin(x / 12 + k * 0.5) * (6 + k * 0.85) + k * 1.6;
      d += `${x === 0 ? "M" : "L"}${x} ${f2(y)}`;
    }
    waves += `<path d="${d}" stroke="#4fa7ff" stroke-width=".75" opacity="${(0.22 + k * 0.048).toFixed(2)}"/>`;
  }
  w(
    "post-uncertainty.svg",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105 78" width="105" height="78">
<defs><linearGradient id="p3" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#06183f"/><stop offset="1" stop-color="#010a1e"/></linearGradient></defs>
<rect width="105" height="78" fill="url(#p3)"/><g fill="none">${waves}</g></svg>`,
  );
}
console.log("images written");
