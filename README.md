# Mathematical Modelling — website

Marketing site for Mathematical Modelling, built from the approved
`LANDING PAGE.png` design.

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

The application lives in [`web/`](web/) — see [`web/README.md`](web/README.md)
for the design measurements, brand asset pipeline, SEO setup and the list of
what still needs real content.

## Repository layout

| Path | What it is |
| --- | --- |
| `web/` | the Next.js application |
| `LANDING PAGE.png` | the approved design the home page is matched against |
| `MM_LOGO.png`, `MM_LOGO_TRANSPARENT.png`, `faviico.png` | source brand artwork; `web/scripts/brand.mjs` derives every icon, logo and social image from these |

## Before launch

- Replace the placeholder contact details in `web/src/lib/content.ts`.
- Set `CONTACT_WEBHOOK_URL` so the contact form delivers (see `web/.env.example`).
- Confirm `siteUrl` in `web/src/lib/content.ts` is the real domain.
- Have the privacy policy and terms reviewed by a lawyer.
- Fill in `team` and `openRoles` in `web/src/lib/content.ts`.
