---
name: site-diagnostic
description: Generate a Free Site Diagnostic for a prospect's website — the Kivara Studios lead magnet. Use when Billy provides a business URL and wants the honest teardown that gets sent to prospects within a working day. Usage - /site-diagnostic <url> [business name]
---

# Free Site Diagnostic Generator

The diagnostic is Kivara's top-of-funnel engine (see marketing/GTM-PLAYBOOK.md §3). It must be genuinely useful on its own — no pitch, no fluff — so the prospect trusts us whether or not they buy.

## Process

1. **Fetch the site** (WebFetch the URL, plus /about and /services or /contact if linked). If the site is JS-heavy, use Playwright to load and screenshot it at desktop (1280px) and mobile (375px) widths.
2. **Audit across five lenses**, scoring each Weak / Fair / Strong:
   - **First impression** — does a stranger know what they do, who it's for, and why to trust them within 5 seconds?
   - **Path to action** — is there one obvious next step (book/call/quote)? How many clicks/taps to reach it? Does it work on mobile?
   - **Trust signals** — reviews, years in business, credentials, real photos vs stock, current copyright year.
   - **Speed & mobile** — perceived load, layout on 375px, tap-target sizing, legibility.
   - **Findability** — page title, meta description, local signals (city, service area), Google Business consistency.
3. **Write the diagnostic** as markdown:
   - 2-sentence opening: one genuine strength first, then the single biggest opportunity. Never open with a flaw.
   - The five lenses, each with: score, what we saw (specific — quote their copy, name the button), and one concrete fix.
   - "If you only fix three things" — ranked shortlist with expected impact.
   - Close with one line: what a Kivara rebuild timeline would look like for a site like theirs (name the tier from constants.ts SERVICE_TIERS that fits — no hard sell).

## Voice rules (non-negotiable)

Follows Billy's outreach voice: plain sentences, no em dashes, no hype adjectives, no assumptions about their business internals. Specific over general. Kind but honest — if the site is good, say so and find real refinements.

## Output

Save to `marketing/diagnostics/<domain>-diagnostic-<YYYY-MM-DD>.md`. Create the folder if missing. Report the path and a 3-line summary Billy can paste into an email. `marketing/` is a standalone private repo (bjtheartist/kivara-gtm) — commit and push it after saving the diagnostic.
