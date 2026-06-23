# Claude Code Brief — Skeleton Theme Migration Smoke Test

## Context
We're evaluating a move from Dawn to Shopify's official **Skeleton theme** for the Nutty & Nostalgic build. Reason: this is a fully hand-coded custom site, and Dawn's pre-built CSS keeps overriding our own (H1 weight, root font-size scaling, heading overrides), wasting tokens on fixes that don't stick. Skeleton means our stylesheet is the only stylesheet — that whole class of bug disappears.

The ONE risk with Skeleton is that it hands us the cart + variant logic to build ourselves (Dawn gives this for free). So before migrating anything, we run a single smoke test to confirm that logic is buildable cleanly. **Do not migrate the site yet. Do not touch the existing Dawn build — it stays as the fallback.**

## Your task — scope is LOCKED
Build **only** a working product page on a fresh Skeleton base. Nothing else.

**Explicitly out of scope (do NOT do these):**
- No design, styling, fonts, colors, or CSS beyond bare functional layout
- No hero, homepage, header/footer polish
- No porting of existing N&N design work
- Do not wander into visual work to "make it look right" — raw mechanism only

## Steps
1. Run `shopify theme init` to pull the official Skeleton theme into a **new local folder** (do not overwrite the Dawn project).
2. Build `templates/product.json` + the product section with **full variant switching** and **AJAX add-to-cart**.
3. Use Dawn's `main-product.liquid` purely as a **reference** for the cart API calls — do NOT copy it wholesale. Write clean, minimal versions.
4. Push to a **dev theme** (never the live store).

## The smoke test — this is the pass/fail gate
A customer lands on a real N&N jar product and can:
- Switch variants (size / flavor) → **price updates**
- Switch variants → **availability updates**
- Click add-to-cart → **cart count updates with NO full page reload**

This exercises every Shopify-dynamic piece Skeleton makes us wire: `selected_or_first_available_variant`, the variant picker, `/cart/add.js`, the cart-count refresh, and line-item handling.

## Requirements
- **Mobile-first.** Build and test at 375px before anything else. The add-to-cart must work in the thumb zone — that's where it gets used and where janky AJAX state breaks first.
- Tap targets minimum 44px.
- Semantic HTML, clean scalable CSS (functional only at this stage), efficient JS, sections clearly commented.

## Decision rule
- **If** add-to-cart works on mobile and the cart count updates cleanly → the migration is worth it, report back and we proceed to full migration.
- **If** it stumbles on variant switching or AJAX cart → stop, report exactly what broke. We fall back to Dawn having lost ~1 hour.

Report back with the result of the three-point smoke test before doing anything further.
