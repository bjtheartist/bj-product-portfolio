---
name: gtm-weekly
description: Run the weekly Kivara Studios GTM ops review — pipeline check, outreach prep, content draft, and playbook accountability. Use when Billy says "run the GTM weekly" or on the scheduled Monday routine. Usage - /gtm-weekly
---

# GTM Weekly Ops Review

Implements the weekly cadence from `marketing/GTM-PLAYBOOK.md` §8: pipeline review → 5 outreach touches → 1 content post → 1 testimonial/referral ask. Target output: one brief Billy can act on in 30 minutes.

## Process

1. **Read state**: `marketing/GTM-PLAYBOOK.md` (targets + launch-sequence checklists), `marketing/pipeline.md` if it exists (create a starter template if it doesn't — columns: prospect, segment, stage, last touch, next action, date).
2. **Pipeline review**: list every open prospect with days-since-last-touch. Flag anything stale (>14 days) with a suggested next action per the outreach cadence in §6.
3. **Outreach prep**: propose 5 researched touches for this week. For net-new prospects, pick from the beachhead segment (South Side / Chicago care & health practices, then professional services). For each: business name, URL, one genuine specific observation to open with, and the micro-ask. Voice rules apply — intro-first, no assumptions, never salesy, no em dashes in drafted copy.
4. **Content draft**: one LinkedIn post draft (150–250 words) alternating week-to-week between build-in-public (recent project detail) and useful teardown (anonymized diagnostic insight). Check `marketing/case-studies/` and recent git log for material.
5. **Asks check**: any project recently handed off without a testimonial or referral ask? List them with a one-line ask draft.
6. **Playbook accountability**: which 30/60/90 checkboxes in the playbook moved last week? Which are blocked? Update checkbox state in GTM-PLAYBOOK.md only when Billy confirms completion.

## Output

Write the brief to `marketing/weekly/<YYYY-MM-DD>-gtm-brief.md` (create folder if missing) with sections: Pipeline / This week's 5 touches / Content draft / Asks / Playbook status. Keep the whole brief under 600 words — it's a Monday checklist, not a report. End with the single most important action of the week, named plainly.

## Boundaries

Draft only — never send emails, post content, or contact anyone. Billy reviews and sends everything himself.
