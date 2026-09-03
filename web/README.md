# Mathematical Modelling — landing page

A pixel-faithful Next.js build of the `LANDING PAGE.png` design.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** — design tokens live in `src/app/globals.css` under `@theme`
- **next/font** — Inter Tight (display) + Inter (body)
- No other runtime dependencies.

## How the design was matched

Every measurement was taken off the source PNG (864 px wide) and scaled by
**5/3** to a 1440 px design frame. That puts the page container at
`max-width: 1440px` with `64px` side padding → a **1312 px** content column,
and reproduces the design's total page height (3035 px) to within ~5 px.

Key values, all in the 1440 frame:

| Token | Value |
| --- | --- |
| Header height | 136 px |
| H1 | 68 / 73 px, `-0.032em` |
| Section H2 | 30 / 40 px (research heading is 26 px in the design) |
| Hero body | 17 / 32 px |
| Section body | 13.5 / 26 px (15 px below `lg` for legibility) |
| Eyebrow | 13 px, `0.12em`, uppercase |
| Deep blue (buttons, CTA band) | `#02257c` |
| Accent blue (links, tags) | `#0b3bcb` |
| Footer navy | `#00153b` |
| Surface / card border | `#f7f8fb` / `#eceff6` |

## Pages

| Route | Source |
| --- | --- |
| `/` | `src/app/page.tsx` — the landing page, matched to the design |
| `/learn/youtube` | `src/app/learn/youtube/page.tsx` — the full video library |
| `/learn/research` | `src/app/learn/research/page.tsx` — the publication index |
| `/learn/blog` | `src/app/learn/blog/page.tsx` — the post index |
| `/about` | `src/app/about/page.tsx` — includes the `#how-we-work` section the home hero links to |
| `/contact` | `src/app/contact/page.tsx` + `src/app/api/contact/route.ts` |
| `/services` | `src/app/services/page.tsx` — one anchored section per service |

Header nav highlights the active route via `usePathname()`; `/learn/*` lights up
the **Learn** item. `/learn` itself has no page — the dropdown parent — so
`next.config.ts` redirects it to `/learn/youtube`. That redirect is deliberately
temporary (307) rather than permanent: browsers cache a 308 hard, and a real
Learn hub page there later is plausible.

## Layout

```
src/
  app/            layout.tsx (metadata, fonts), page.tsx, globals.css
                  learn/youtube/page.tsx, learn/research/page.tsx
  components/     one file per section of the page
    ui/           logo, icon set, section intro
  lib/content.ts  all copy, nav, and card data
scripts/
  hero.mjs        generates public/img/hero-visual.svg
  images.mjs      generates the illustrative SVG imagery
```

Re-run either generator with `node scripts/hero.mjs` / `node scripts/images.mjs`.

## Brand assets

`scripts/brand.mjs` derives everything from the three source files in the
repository root — `MM_LOGO_TRANSPARENT.png`, `MM_LOGO.png` and `faviico.png`:

| Output | Used by |
| --- | --- |
| `public/brand/mark.png` / `mark-white.png` | header, footer, CTA band |
| `public/brand/logo.png` | `Organization` structured data |
| `public/brand/og.png` | Open Graph / Twitter card |
| `src/app/icon.png`, `src/app/apple-icon.png` | favicon, iOS home screen |
| `public/brand/icon-{192,512,maskable-512}.png` | web app manifest |

The mark is cropped straight out of the artwork, and the white version is the
same pixels repainted through their alpha channel — nothing is redrawn. The app
icons are recomposed from that mark on the navy sampled out of `faviico.png`,
because the source file paints its rounded-square corners white, which shows as
white notches in dark browser chrome. Note
that the design screenshot's header used a *lighter-stroke* variant of the mark
than the supplied logo file; the site now uses the real file, so the mark reads
slightly heavier than the mockup.

Re-run with `node scripts/brand.mjs` if the source artwork changes.

## Services

There are no per-service detail pages. Each service is a section on
`/services` with its own `id`, and `serviceUrl()` in `src/lib/content.ts` is the
single source for those anchors — the home page cards, the footer column and the
`Service` structured data all resolve through it. Point them at real detail
pages by changing that one function.

The `lede` and `covers` fields on each service are editorial: they describe what
the discipline involves, and make no claim about past projects, clients or
results. Rewrite freely.

## Contact form

The form posts JSON to `/api/contact`. Delivery is provider-agnostic: set
**`CONTACT_WEBHOOK_URL`** to anything that accepts a JSON POST — Formspree, a
Zapier/Make hook, an internal service, a transactional mail API. See
`.env.example`.

Until that variable is set the route answers **503** and the form tells the
visitor the mailbox is not connected yet, with a `mailto:` link. It never
reports success for a message it did not deliver.

The route validates server-side (required fields, email shape, length caps) and
carries a honeypot field; the client mirrors the errors inline with
`aria-invalid` and `aria-describedby`. Field-level errors come back as 422 and
are rendered against the right inputs.

## SEO

- Canonical origin lives in one place: `siteUrl` in `src/lib/content.ts`.
- Per-page `title`, `description`, `canonical` and Open Graph / Twitter cards.
- `app/sitemap.ts`, `app/robots.ts` (with explicit LLM-crawler rules) and
  `app/manifest.ts` are generated routes.
- JSON-LD in `src/lib/seo.ts`: `Organization` + `WebSite` site-wide, then
  `Service` / `VideoObject` / `ScholarlyArticle` / `BreadcrumbList` per page.
  Each page only marks up what it actually renders — the home page describes its
  one featured video and three papers, not the full lists.
- `VideoObject` carries real `uploadDate` and view counts read from YouTube, so
  the markup is eligible for video rich results.
- `preconnect` to `i.ytimg.com`, and the header logo is marked `priority`.

## Artwork

Two things in the design are assets that could not be reproduced literally:

1. **Hero visual** — the source is a 3-D render of the mark on a wireframe
   surface. `scripts/hero.mjs` rebuilds it as a self-contained SVG: a
   perspective-projected dune mesh plus the three extruded beams, with the
   beam centre lines traced off the original render.
2. **Photography and client logos** — the case-study and blog images are drawn
   SVG stand-ins in `public/img`. Swap the `image` paths in
   `src/lib/content.ts` for real photography when it is available. The client
   strip renders the company names as styled wordmarks rather than their
   trademarked logos; drop real SVGs into `public/img` and render them in
   `src/components/logo-strip.tsx` if you have licensed copies.

## Real content

`videos` and `papers` in `src/lib/content.ts` are the author's actual work, not
placeholders. The landing page features `videos[0]` and `papers.slice(0, 3)`;
`/learn/youtube` lists all twelve videos and `/learn/research` all nine papers.

Paper links point at the publisher (Springer, SAGE, Elsevier, OnePetro, AMS).
The card chip shows year + short source, and the icon is a download arrow only
where the target really is a PDF — the design's placeholder said "PDF" for
everything. Titles are clamped to four lines on the home page so the cards keep
the design's proportions; the full title stays in the markup.

The Learn section uses **real YouTube stills**, served from `i.ytimg.com`
(allow-listed in `next.config.ts`). `videos` in `src/lib/content.ts` holds the
full upload list newest-first; the landing page features `videos[0]`. Two
entries carry a `thumb: "mq"` flag because YouTube has no 1280x720 still for
them, and `flightSim5` carries `zoom: 1.2` because that video is letterboxed at
source — without it the card shows black bars.

The logo mark itself is vector-traced from `MM_LOGO_TRANSPARENT.png` and the
site header lockup — see `src/components/ui/logo.tsx`.

## Notes

- The footer copyright year is hard-coded to `2024` to match the design; change it
  in `src/components/site-footer.tsx` when the site goes live.
- **The blog has no articles yet.** `posts` in `src/lib/content.ts` carries the
  three titles and dates from the design, and `/learn/blog` lists them, but
  `/learn/blog/[slug]` is not built — there is no copy to render. Add a `body`
  to the `Post` type (or wire up MDX) and the route can follow. For the same
  reason the blog index emits a `Blog` node but no `BlogPosting` entries:
  pointing structured data at URLs that 404 is worse than omitting it.
- **The About page copy is editorial placeholder.** The four `howWeWork` steps
  and the section headings in `src/app/about/page.tsx` are written to be
  rewritten in the client's own voice. Deliberately absent: any claim about
  team, founding date, history or credentials that isn't evidenced elsewhere on
  the site. The only hard numbers on the page are the design's four stats and
  counts derived from the real `papers` and `videos` arrays.
- **The contact details are the design's placeholders.** `contact` in
  `src/lib/content.ts` still carries `+234 800 123 4567` and
  `info@mathematicalmodelling.com` from the mockup. Wrong details on a contact
  page are worse than no page — replace them before launch.
- The form asks for personal data but `/privacy` does not exist yet, so the page
  states the commitment inline instead of linking to a missing policy.
- `/case-studies/*`, `/industries/*`, `/about/team`, `/careers`, `/privacy`
  and `/terms` are linked but not built yet.
- The LinkedIn and Medium icons in the footer still point at those sites' home
  pages — swap in the real profiles in `src/components/site-footer.tsx`.
- Video view counts in `src/lib/content.ts` are a snapshot taken 2026-09-03;
  upload dates are exact, so the displayed dates never go stale.
- `siteUrl` is set to `https://mathematicalmodelling.com` — confirm the real
  domain before launch, since sitemap, canonicals and Open Graph all derive
  from it.
- Motion is limited to hover transitions and respects
  `prefers-reduced-motion`.
