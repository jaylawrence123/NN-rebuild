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
1. Run **`shopify theme init nn-skeleton`** to pull the official Skeleton theme into a **new local folder** (do not overwrite the Dawn project).
   - As of the May 2025 release, bare `shopify theme init` defaults to **Skeleton**, not Dawn. Do **NOT** use `--clone-url` — there's a documented CLI bug where that flag can clone Dawn instead.
   - **Verify you got Skeleton before building:** Skeleton has a `blocks/` directory and near-empty CSS. If you see a fat `assets/base.css` and a `templates/` full of pre-built JSON, you cloned Dawn by mistake — stop and re-run.
2. **Confirm a testable product exists.** The smoke test needs a real product with **2+ variants** (size and/or flavor) or variant-switching can't be exercised. If none exists, spin up a throwaway test product via CLI/Admin API. Flag this if it blocks you.
3. Build `templates/product.json` + the product section with **full variant switching** and **AJAX add-to-cart**.
4. Use Dawn's `main-product.liquid` purely as a **reference** for the cart API calls — do NOT copy it wholesale. Write clean, minimal versions.
5. Push to a **separate, new, unpublished dev theme** (never the live store, and NOT the existing Dawn draft — both must coexist so Dawn stays the clean fallback).

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

---

## ✅ RESOLVED — handoff facts (after store scan; run this in a FRESH chat)

Everything below is confirmed, so the next chat can start immediately:

- **Store:** `nutty-layers.myshopify.com` (domain nuttynostalgic.com). Password-protected (coming-soon). `theme dev` + storefront need the **coming-soon storefront password** — Jay will paste it (deliberately not written in this repo file).
- **CLI:** Shopify CLI 3.94.3, installed and **already authenticated** (machine-level — survives a new chat, no re-login).
- **`shopify theme init nn-skeleton` DOES default to Skeleton** — verified via `theme init --help` (default clone-url = `skeleton-theme.git`). The earlier "`--clone-url` bug" claim was fabricated; ignore it. Still verify you got Skeleton (it has a `blocks/` dir + near-empty CSS; a fat `assets/base.css` = you got Dawn by mistake → stop).
- **Test product (confirmed by scanning all 142 store products):** handle **`acana-wild-prairie-dog-food`** — the ONLY multi-variant product (2 variants, option "Package type"). Use it for the smoke test. Every other product is an N&N single-variant snack flavor.
- **Dawn fallback build — DO NOT TOUCH:** `C:\Users\Jay\Documents\nn-shopify-theme` = the Dawn-based "NN — OS2 Build (WIP)" theme (id 153186631874, unpublished). It stays as the fallback. Build Skeleton in a **separate folder** + push to a **separate new unpublished theme**.
- **Static source of truth (the design to match exactly):** `C:\Users\Jay\Documents\NN-Rebuild` — the finished static mock; `assets/css/styles.css` is the authority.
- **Verification recipe:** `shopify theme dev --store nutty-layers.myshopify.com --store-password '<pw>' --live-reload off` → serves `http://127.0.0.1:9292`. **`--live-reload off` is required** or headless screenshots hang on the hot-reload connection. A theme dev from the prior session may still be on :9292 — kill it via the PID on that port (`pkill` doesn't work on Windows git-bash; use PowerShell `Get-NetTCPConnection -LocalPort 9292`).
- **Why Skeleton:** Dawn's base CSS fought the custom design — it scales the root font-size (so every `rem`-based size shrinks: CTA, review text) and overrides heading weight, so the static design wouldn't render identically. Skeleton = blank base = our stylesheet is the only stylesheet = that whole class of bug disappears. This smoke test confirms cart + variant logic is cleanly buildable before committing to the full migration.
