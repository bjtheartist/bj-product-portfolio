# Kivara Studios Portfolio

Portfolio and project inquiry site for **Kivara Studios**, the digital strategy studio led by Billy Ndizeye.

## Status

The current active experience is the dark cinematic studio site (2026 redesign):

- Preloader with counter and curtain reveal
- Three.js "ember silk" WebGL shader hero with mouse parallax
- Lenis smooth scroll driven by the GSAP ticker
- Scroll-scrubbed manifesto word reveal
- Selected-work index with cursor-following image previews
- Capabilities, inquiry form (Vercel/Resend with mail fallback), and oversized footer wordmark
- Fullscreen GSAP menu overlay on mobile
- Kivara SEO, social, robots, sitemap, and web app metadata

Active components live in `components/studio/` with styles in `styles/studio.css`.
Older neobrutalist/editorial components remain in `components/` but are unused.

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Three.js (WebGL hero shader)
- GSAP + ScrollTrigger
- Lenis smooth scroll
- Clash Display / Satoshi (Fontshare), Fraunces, JetBrains Mono
- Vercel
- Resend for production inquiry emails

## Local Development

```bash
npm install
npm run dev
```

The dev server usually opens at `http://localhost:5173`.

## Verification

```bash
npm run build
```

## Contact Form

Production email delivery uses the Vercel function at `api/submit-form.js`.

Set these environment variables in Vercel:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (optional, defaults to `hello@kivarastudios.dev`)
- `CONTACT_FROM_EMAIL` (optional, defaults to Resend onboarding sender)

When the API is unavailable in local development, the form falls back to a prefilled `mailto:` message so the inquiry flow is still usable.

## Project Data

Portfolio entries live in `constants.ts` under `PROJECTS`. Images are served from `public/projects`.

## Deploy

```bash
npm run build
npx vercel --prod
```

Vercel uses `vercel.json` with `npm run build` and the `dist` output directory.
