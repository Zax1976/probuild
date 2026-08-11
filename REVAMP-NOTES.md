# Pro Build Digital — Revamp Notes

Status log for the BuildBot-first Nightshift site. The copy in
`design_handoff_nightshift_homepage/` is historical.

## Status (July 12, 2026)

- Nightshift remains the site-wide design: deep navy, brass, cream, Newsreader,
  Hanken Grotesk, and Archivo.
- The working product name is **BuildBot** throughout the Astro source. Name clearance is
  still required before a larger brand investment because an established software project
  already uses Buildbot.
- The homepage no longer claims that BuildBot books appointments or knows business
  availability. The sample conversation collects details without making a promise.
- A visible answer-rules section explains that BuildBot does not invent prices,
  availability, or unapproved commitments.
- The founding offer is published: setup is free, then $99/month after approval. No
  contract; cancel anytime. The offer is limited to the first 10 founding customers, and
  the $99 rate stays locked while an account remains active.
- No Stripe checkout or self-service signup is present. The primary CTA remains
  **Book a demo**.
- Cottages Concierge is presented as a separate Pro Build Digital product and links to
  `https://cottagesconcierge.com/`.
- `/services` now contains professional services only: websites, automation, and digital
  invoicing. The old `/services#ai-chatbots` anchor lands on a BuildBot cross-link.
- The demo route `/contact?service=chatbot` preselects BuildBot, asks what customers ask
  most often, and changes the submit label to **Request a demo**.
- Homepage schema now uses Organization, SoftwareApplication, Offer, and FAQPage data that
  matches visible copy.
- The static BuildBot mockup remains on the homepage. Other content pages still load the
  existing n8n chat widget.

## Verified

- `npm run build` passes: 14 static pages generated.
- Homepage screenshots checked at 375px and 1280px.
- Home, Services, Contact, About, and Blog return 200 at both widths with no horizontal
  overflow.
- The 13 internal routes reachable through site navigation return successfully.
- The BuildBot demo query preselects the correct service and updates the form copy.

## Needs the owner

- [ ] **Name clearance.** Decide whether to keep BuildBot after a proper trademark and
      search-conflict review.
- [ ] **Founding offer scope.** Put the internal limits in the customer agreement: one
      business, one bot, included content sources, revision rounds, reasonable usage,
      support boundaries, and treatment of major integrations.
- [ ] **QR kit format.** Decide whether the included kit is download-only or whether
      physical materials ship after approval and subscription activation.
- [ ] **First pilot.** Replace the invented bot names with a real customer, screenshot,
      lead-notification example, and approved quote as soon as possible.
- [ ] **Wire the live product.** Replace the static homepage chat mockup when BuildBot is
      ready for public use.
- [ ] **Anti-AI-slop skill.** Add the skill's `SKILL.md` to this repo or register it with
      Codex so its exact rules can be applied during future copy work.
- [ ] **Transparent logo and social image.** Add a transparent SVG wordmark and a real
      `/images/og-default.png`; the current default social image path has no file.
- [ ] **Founder photo.** Move the current Imgur-hosted photograph into local assets.
- [ ] **Phone number.** Confirm that (614) 403-8014 remains the public sales number.
- [ ] **Legal copy.** Have the privacy policy and terms reviewed for BuildBot before paid
      customer onboarding. They currently focus primarily on Cottages Concierge.

## Decisions applied

- Pro Build Digital is the company. BuildBot is the flagship product. Cottages Concierge
  is a separate product. Websites, automation, integrations, and invoicing are secondary
  professional services.
- BuildBot is for service businesses nationwide, not only contractors or Ohio businesses.
- Customers approve their BuildBot before billing begins. "You don't pay until you're
  happy" is not an open-ended post-launch refund promise.
- Copy stays plain and factual. Avoid stock software language and claims the product cannot
  demonstrate.
