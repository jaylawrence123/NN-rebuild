# Claude Code Brief — N&N Pre-Launch Audit (Sequential)

## Context
Nutty & Nostalgic Shopify store on a custom Skeleton theme, launching very soon. Two flavors (90s Crisps, Cowabunga Pies) drop TOMORROW with ~225 and ~159 back-in-stock subscribers waiting via the Kbite app. Checkout has already been manually tested end-to-end (add to cart → checkout → order confirmation email received) and works. This audit covers everything else.

## How to run this — READ FIRST
**Run ONE audit at a time. Stop after each. Report findings with explicit PASS / FAIL / NEEDS-FIX status and wait for my go-ahead before starting the next audit.** Do not batch them. Do not fix anything until I approve the fix after seeing the report. No silent changes.

For each audit, report: what you checked, what passed, what failed (with file + line), and the specific fix you recommend. Numbers where numbers exist (don't say "fast" — give the metric).

---

## AUDIT 1 — Tomorrow's restock event (HIGHEST PRIORITY)
This is the highest-stakes flow. Inventory flips 0 → in-stock tomorrow and Kbite blasts ~384 people at one product page.
- Confirm the Kbite "Notify Me" button renders correctly on a currently OUT-OF-STOCK product on the live custom theme (not Dawn — our Skeleton build).
- Confirm the variant IDs Kbite captured match the real product variant IDs, so alerts fire for the correct product. Products are single-variant ("Default Title") — confirm Kbite is bound to that default variant correctly.
- Confirm the inventory 0 → positive change will actually trigger Kbite (verify the app's trigger is live on these products).
- Assess whether the product page (PDP) can handle a concurrent traffic spike (~384 people hitting one PDP in a short window). Flag any render-blocking JS, slow add-to-cart, or anything that degrades under load.
**STOP. Report. Wait.**

## AUDIT 2 — Code audit (custom theme integrity)
Hand-built Skeleton theme — no Shopify team backstopping the Liquid.
- Scan for unclosed/malformed Liquid tags that render fine on populated pages but break on edge cases (empty cart, out-of-stock variant, single-variant vs multi-variant product).
- Find hardcoded values that should be Liquid objects (prices, product handles, shop name baked in as text).
- Check for render-blocking JS in `<head>`.
- Report console errors (red) on homepage and PDP load.
- Flag unused/dead CSS or JS shipping to the client — especially leftover Dawn-reference code from the migration.
**STOP. Report. Wait.**

## AUDIT 3 — Variant-switching path (future-proofing)
Catalog is currently all single-variant ("Default Title"), so the variant-switching logic from the Skeleton smoke test was never exercised against a real multi-option product.
- Create or use a test product with 2+ variants (e.g. 8oz / 16oz).
- Confirm price updates on variant switch, availability updates on variant switch, and add-to-cart adds the CORRECT variant.
- This is NOT a tomorrow blocker — it's to confirm the code path works before our first real multi-size SKU launches. Report whether it holds or needs work, then delete the test product.
**STOP. Report. Wait.**

## AUDIT 4 — Empty & error states
- Empty cart page renders cleanly (no throw).
- Search with zero results renders cleanly.
- Sold-out product page loads AND shows the Kbite "Notify Me" button correctly.
- A real, styled 404 page exists (not the raw default).
**STOP. Report. Wait.**

## AUDIT 5 — Performance / Core Web Vitals
- Run Lighthouse (mobile profile, throttled 4G) on homepage AND a product page.
- Targets: LCP < 2.5s, CLS < 0.1. Report actual scores.
- We ship four font families (Titan One, Lilita One, VT323, Figtree) — flag font-swap CLS and any LCP hit from hero images or font loading.
**STOP. Report. Wait.**

## AUDIT 6 — Accessibility
- Color contrast on every text-on-color combo against WCAG AA. SPECIFICALLY check cream (#FFF4E4) and butter yellow (#FFC42E) backgrounds with text — these likely fail.
- Keyboard navigation through the full checkout.
- Visible focus states on interactive elements.
- All product images have meaningful alt text.
**STOP. Report. Wait.**

## AUDIT 7 — SEO / meta / indexing readiness
- Title tag + meta description on every page type.
- Open Graph tags present so links unfurl on social (we've had an OG-tag-commented-out leak before — check it's live).
- `Product` schema JSON-LD on PDPs (price + availability).
- Favicon present.
- **CRITICAL pre-launch:** confirm `robots.txt` isn't blocking the store and the storefront password page is OFF before going live.
**STOP. Report. Wait.**

## AUDIT 8 — Analytics & cross-browser
- Confirm GA4 and the Shopify pixel are firing live BEFORE launch (or tomorrow's traffic is invisible).
- Test the PDP + checkout on real iOS Safari (not just Chrome devtools) — Safari breaks custom JS carts in ways Chrome doesn't.
**STOP. Report. Final summary.**

---

## Out of scope for you (I handle these myself)
- Placing real test orders / payment provider setup — never automate credentials or payment config.
- Flipping inventory live for the actual drop.

Start with Audit 1 only. Report back before touching Audit 2.
