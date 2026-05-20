# Kivara Studios Portfolio

Portfolio and project inquiry site for **Kivara Studios**, the digital strategy studio led by Billy Ndizeye.

## Status

The current active experience is the editorial/neobrutalist Kivara site:

- Full-bleed Chicago hero
- Kivara positioning and studio note
- Selected project portfolio with case-study modals
- Project inquiry form with Vercel/Resend support and local mail fallback
- Kivara SEO, social, robots, sitemap, and web app metadata

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS via CDN
- GSAP
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
