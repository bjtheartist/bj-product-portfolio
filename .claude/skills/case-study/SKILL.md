---
name: case-study
description: Turn a PROJECTS entry from constants.ts into a long-form case study draft for the Kivara Studios site or LinkedIn. Use when Billy says "write the case study for <project>" or wants portfolio proof content. Usage - /case-study <project title>
---

# Case Study Generator

Case studies are Kivara's core proof asset (GTM-PLAYBOOK.md §4). Priority order: Watson & Watson Dental, Chicago Incentive Explorer, Funke Roberts — then others on request.

## Process

1. **Pull the source record** from `constants.ts` PROJECTS: title, problem, tools + reasons, effectiveness metrics, year, category.
2. **Enrich if possible**: if the live site exists, WebFetch it for current copy; check `public/projects/` for imagery; ask Billy for one client quote if none exists (flag it as TODO rather than inventing).
3. **Write the case study** (600–900 words) in this structure:
   - **Title**: client name + one-line outcome (not "Case Study:")
   - **The situation** — who the client is, in human terms; what was broken or missing
   - **What we did** — decisions and why, told as choices ("we chose X because Y"), pulled from the tools[].reason fields
   - **The details** — 2–3 specific craft moments (a design decision, a workflow built, a constraint handled)
   - **Where it landed** — metrics from effectiveness, stated plainly; if pre-launch, say what's live and what's pending honestly
   - **Sidebar facts**: timeline, stack, services rendered, year
4. **Also produce a LinkedIn cut**: 150–200 words, first-person from Billy, one insight the reader can steal, no hashtag spam (2 max), ends with a soft invitation not a CTA.

## Voice

Editorial and concrete. No "delighted to share." No "seamless/robust/cutting-edge." Numbers where they exist, honesty where they don't. Write like the studio site reads: calm, confident, specific.

## Output

Save long-form to `marketing/case-studies/<slug>.md` and the LinkedIn cut to `marketing/case-studies/<slug>-linkedin.md`. Create folders if missing. Never publish anywhere — drafts only, Billy reviews.
