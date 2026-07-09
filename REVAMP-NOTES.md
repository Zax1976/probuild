# Pro Build Digital — Revamp Notes

Status log for the bot-first Nightshift homepage revamp. Canonical copy of these notes;
the copy in the design handoff folder (`design_handoff_nightshift_homepage/`) is historical.

## Status (July 2026)

- Homepage rebuilt in the Nightshift direction (deep navy + brass, Newsreader/Hanken
  Grotesk/Archivo) per the design handoff README. Build passing.
- Product renamed **Build Bot** (was "Built-In Bot") site-wide per owner instruction.
- Pay-If-Satisfied guarantee removed site-wide (pages, blog posts, chat greetings).
- Location copy fixed site-wide: only line used is "Setup is remote, so we work with small
  businesses anywhere in the U.S."
- n8n chat embed removed from the homepage only (static mockup + demo CTA supersede it).
  Other pages keep their chat widget, GA, cookie consent, and Formspree as they were.
- Homepage schema markup kept; address reduced to country only.
- Services, About, and Contact restyled to Nightshift (same layout/nav/footer as the
  homepage). Services now leads with The Build Bot; the what's-included / perfect-for
  content and /services#<id> anchors are unchanged. Blog and 404 still use the old light
  theme (follow-up).
- "Need a website?" nav link and footer "Websites & invoicing" scroll to /#websites until
  the subdomain exists (TODO comments in place).

## Drafted without a spec (needs owner sign-off)

`docs/PROBUILD-SITE-PORT-PROMPT.md` was referenced in the port request but does not exist
in the repo, so two sections were drafted from the revamp brief and existing site facts:

- [ ] **Cottages Concierge proof section.** Copy grounded in the SMS consent page: it's a
      Build Bot for short-term rental owners that answers guests, captures booking
      inquiries, and texts the owner. Confirm the description and whether to name or link
      the product's own site.
- [ ] **Websites section.** Kept small per the brief (websites and invoicing are secondary).
      Confirm the copy.
- [ ] **The three "How it works" steps.** Drafted by design (1. Book a demo → 2. We build
      and train it → 3. It goes live). Review the wording.

## Needs the owner (Zack)

- [ ] **Final price.** No price is published anywhere and there is no Stripe/payment wiring.
      The demo CTA carries a `TODO(owner): final price goes here when set` comment.
- [ ] **Wire the live Build Bot.** The hero shows a static chat mockup marked with
      `TODO(owner): replace this static mockup with the live Build Bot embed`. Until then
      "Book a demo" is the fallback.
- [ ] **Subdomain URL.** "Need a website?" (nav) and "Websites & invoicing →" (footer +
      websites section) point at `#` with `TODO(owner)` comments until the subdomain exists.
- [ ] **Example bot names.** "Sarah at Ridgeline Roofing", "Mo at Lakeside Plumbing",
      "Bella at Main St. Salon" are invented examples (labeled as such on the page).
      Replace with real customer bots as they launch.
- [ ] **Transparent logo.** `public/images/logo.png` has a solid cream background. The
      header/footer now use a text-only stacked wordmark; the PNG stays as favicon only.
      A transparent PNG/SVG is still wanted.
- [ ] **Phone / area code.** (614) 403-8014 is shown; confirm it's the right number.
- [ ] **Real photos and testimonials.** None are used on the new homepage. Send real
      quotes (name + business) if a testimonials section is wanted.
- [x] **Services page restyle.** Done: /services is now the Nightshift Build Bot detail
      page (bot first, agency services below). Moving agency services to the future
      subdomain page remains open.
- [x] **Blog + 404 restyle.** Done — Nightshift is now the SITE-WIDE default (dark body
      in global.css; the old light theme, PageLayout, and the old Header/Footer are
      deleted). Blog index, all five posts (Newsreader serif long-form prose), 404, and
      the three legal pages all use the shared Nightshift nav/footer. Every built route
      verified at 375px + 1280px (body color, no horizontal overflow, shared chrome);
      all 203 internal links resolve; GA consent-default, Formspree, article schema,
      and the n8n widget all intact.

## Decisions applied

- Direction: Nightshift (navy #0E1B2E + brass #C8A55C), serif editorial voice, chat window
  as the hero object. Chosen by the owner from three explored directions.
- Product name: **Build Bot**. Each customer names and brands their own bot; called out as
  a selling point ("Yours, not ours" section).
- No Northeast Ohio / Ashtabula / Columbus copy anywhere (terms-of-service governing-law
  clause kept, it's legal text, not marketing).
- Voice: plain, confident, no jargon, no AI-tell phrases.
- **Demo CTA (deviation from the handoff, owner-reported bug):** the handoff specified a
  mailto link, but mailto silently fails on machines with no default mail app. The demo
  section's Book-a-demo button now goes to /contact?service=chatbot (form preselects The
  Build Bot); the prefilled mailto stays as a secondary "Or email ..." link, phone kept.
