# Nutty & Nostalgic — Homepage Rebuild

Static HTML/CSS/JS mock of the Nutty & Nostalgic homepage. Built section by section for client review before converting to Shopify OS 2.0 Liquid sections.

## Local Dev

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`

## Stack

- Vanilla HTML / CSS / JS — no frameworks
- Google Fonts: Bebas Neue, Figtree, VT323
- Static assets in `assets/` — will map to Shopify CDN on conversion

## Structure

```
NN-Rebuild/
├── index.html            # homepage
├── shop.html             # Shop the Drop collection page (all 5 flavors)
├── product.html              # PB Max'd product page
├── product-crisps.html       # 90's Crisps product page
├── product-cowabunga.html    # Cowabunga Pies product page
├── product-nuttyfinger.html  # NuttyFinger BBs product page
├── product-lunchbox.html     # Lunch Box Granola product page
├── about.html                # About page (founder + the archive)
├── assets/
│   ├── css/styles.css    # homepage + shop + shared
│   ├── css/pdp.css       # product-page-only styles
│   ├── js/main.js        # all JS
│   ├── img/nn-reviews-tv.png
│   └── video/hero.mp4
```

## Pages & links
- Nav "SHOP THE DROP" + all shop CTAs → `shop.html` (was `/collections/all`). Product breadcrumb: HOME / THE DROPS (shop.html) / flavor.
- **shop.html**: mobile-only before/after wipe banner (reuses hero `hero-ba-wipe`, hidden ≥768px — too stretched wide) → "SHOP THE DROP" header → `.shop-grid` (1 col mobile / 2 col 600px / 3 col 1024px) of the 5 flavor wrapper cards + a gray "NEXT DROP / COMING SOON ?" card.
- **All 5 flavor pages built + fully cross-linked:** product.html = PB Max'd (#E63B2E, cream), product-crisps.html = 90's Crisps (#2E6BE6, cream), product-cowabunga.html = Cowabunga Pies (#7BC74D, ink), product-nuttyfinger.html = NuttyFinger BBs (#1F2A63, cream), product-lunchbox.html = Lunch Box Granola (#FFC42E, ink). Pattern `product-<slug>.html`. Each PDP's switcher leads with its own flavor; every switcher swatch + Collect-All-5 card + homepage/shop card resolves to a real page (only the PB Max'd swatch points to product.html, correctly).
  - Flavor-text rule: cream (#F5E6C8) on dark bands (red/blue/navy), ink (#2A2420) on light bands (green/yellow).
  - Origin stories (all researched/verified): PB Max'd = Mars PB Max (1989, ~$50M/yr, killed reportedly over Mars family disliking PB); 90's Crisps = Planters P.B. Crisps (1992 giant-peanut graham cookie, killed 1995); Cowabunga Pies = Hostess TMNT Pudding Pies (1991 movie tie-in, green-glazed vanilla puddin', gone same year); NuttyFinger BBs = Nestlé Butterfinger BB's (1992, Bart Simpson ads, killed 2006, most-missed '90s snack in 2021 poll); Lunch Box Granola = Mars Kudos bar (1986 candy-as-granola, "Kudos I'm yours", discontinued 2017).
- THE ORIGINAL section ends with a "GET IT WHILE IT'S BACK" CTA (cream button, hard shadow) that smooth-scrolls to `#buy` (the quantity stepper lives there) — NOT a second add-to-cart. Replaced the old DISCONTINUED stamp.

## Sections

| # | Section | Status |
|---|---------|--------|
| 0 | Announcement Bar | ✅ Done |
| 1 | Nav (search / account / jar cart) | ✅ Done |
| 2 | Hero (incl. review badge) | ✅ Done |
| 3 | The Drops | ✅ Done |
| 4 | Brand Mission | ❌ Removed from homepage |
| 5 | Before / After (Channel Flip) | ❌ Removed from homepage |
| 6 | Homesick (kitchen scene) | ✅ Done — pending full-res images |
| 7 | Reviews | ✅ Done — placeholder photos/quotes |
| 8 | Email Capture | ✅ Done |
| 9 | Footer (channel-surf TV) | ✅ Done |

> The Master Tapes VHS slider (old Section 6) was removed and is flagged for possible later use — full markup recoverable from commit `2834991`; its CSS/JS remain in place, inert. Brand Mission and Channel Flip markup is also recoverable from git history (commit `53d849f`).

## Design System

- **Colors:** `--cream: #F5E6C8` / `--yellow: #FFC42E` / `--red: #E63B2E` / `--ink: #2A2420` / `--blue: #2E6BE6`
- **Fonts:** Bebas Neue (all headings/UI), Figtree (body copy), VT323 (retro labels)
- **Background:** crinkled cream **wax candy-wrapper** texture (`https://i.ibb.co/W4Mz606Q/nn-rebuild-background.png`) on `body` + `.site-header`, blended `darken` over `--cream`, `background-attachment: fixed`, `600px 600px` tile. A translucent cream wash is layered in via `linear-gradient(rgba(245,230,200,0.42)...)` with `background-blend-mode: normal, darken` to calm the crinkle for text readability (one number to tune). Toggle off with `class="paper-off"`.
- **Theme:** a late-night 1990s analog broadcast — VHS static, channel-surfing, color bars — selling nostalgia by reviving cancelled snacks. The wax wrapper is the "physical world"; the TV/static elements (footer, reviews TV, hero video, REC dots) are what's "on screen."

## Product cards (The Drops + PDP) — CSS flavor wrappers

No per-flavor images. Each card is a CSS "swatch of that flavor's wax wrapper": `background-color: var(--flavor)` + the wax texture on `background-blend-mode: multiply` + 3px ink keyline + hard offset shadow. Jar PNG sits on top, straight, with a hard flash shadow; clean lift on hover. **A new flavor = its jar PNG + one hex on the card** (`style="--flavor:#E63B2E"`). Flavor colors: PB Max'd `#E63B2E`, Cowabunga `#7BC74D`, 90's Crisps `#2E6BE6`, NuttyFinger BBs `#1F2A63` (navy, from its label), Lunch Box `#FFC42E`; sold-out `#8A867E`.
- ⚠️ `multiply` darkens — navy may read deep, yellow/green may need `soft-light` per-flavor if muddy.
- The old ChatGPT-generated sticker PNGs (`assets/img/cards/`) are deleted; this replaced them.
- Rejected along the way: comic-book sunburst rays ("cheap"), chunky cream sticker border ("too much sticker"), torn-open wrapper (clip-path tear — "no way").

## Section 6 — Homesick

Emotional mission section adapted from the draft Shopify theme: the five jars in a warm 1990s kitchen (ChatGPT-generated scenes), ink copy directly on the clean counter — no gradient overlay, no copy below the image.

- Copy: "HOMESICK FOR A PLACE / THAT DOESN'T EXIST." + subcopy + "TAKE ME BACK" CTA (`btn--primary`)
- **Mobile (default):** 2:3 portrait image (`https://i.ibb.co/FbWv8L3Q/nn-mobile-2.png`), jars upper half, copy overlaid on lower-half counter, centered. H1 locked to exactly 2 lines (`white-space: nowrap` + `<br>`, `clamp(34px, 10.8vw, 62px)`)
- **Tablet 768–1023:** same portrait image cover-cropped (`min(75vh, 860px)`, `object-position: center 60%`)
- **Desktop 1024+:** 16:9 image (`https://i.ibb.co/svxJX3SP/nn-desktop-2.png`), section `clamp(480px, 70vh, 720px)`, copy bottom-left on the clean counter corner, H1 `clamp(48px, 4.6vw, 72px)` (size capped so it stays off the jar labels)
- ⚠️ Both images are low-res preview exports (640/427px wide) — swap URLs for full-res versions before launch

## Section 7 — Reviews

- Header: compact star rating eyebrow (5 small blue-boxed ★ + "4.86/5 CUSTOMER REVIEWS") above H1 "4,000+ PEOPLE FEEL LIKE KIDS AGAIN."
- Cards: photo (square, top) / 5 boxed stars / Figtree quote / Bebas name + red VT323 "VERIFIED BUYER"
- Mobile: swipeable scroll-snap row (hidden scrollbar); Desktop 1024+: 3×2 grid
- All photos, quotes, and names are placeholders — feeds from a review app (Judge.me/Loox/Okendo) at conversion
- NO auto-scroll marquee (reviews must be readable), NO IG/UGC framing — this is a review section

## Section 8 — Email Capture

- Full-bleed `--blue` section (logo blue), NO eyebrow label ("Rewind Club" branding rejected — internal class names only)
- "FIRST DIBS" (cream) / "ON EVERY DROP." (yellow) + one-line sub + email input (cream 2.5px border, yellow on focus) + red GET IN button
- Stacked mobile / inline row desktop. Static form — wires to Klaviyo/Shopify Email at conversion

## Section 9 — Footer (simplified guide + dead-channel static)

Channel-surfing was REMOVED June 13 2026 (Jay: "get rid of the channel arrows"). Footer is now the clean guide.

- Thin brand-color SMPTE bar strip at top (`.footer-bars`) → `.site-footer__guide`: splat logo + 3 link columns (SHOP / INFO / FOLLOW) + centered `.site-footer__signoff` ("END OF BROADCAST" + ◀◀ REWIND) → legal line
- **Dead-channel TV static**: `.site-footer::before` = crisp black/white dot snow (thresholded fractalNoise via feComponentTransfer discrete 0/1), screen-blend, ~0.15 opacity, gentle 0.55s shimmer. `::after` = occasional signal-tear glitch every ~11s. Inset CRT vignette. Reduced-motion disables.
- REWIND fast-scrolls to top (~0.9s rAF ease) under a half-opacity full-screen static flicker
- Footer logo is the green-splat wordmark (`https://i.ibb.co/4nXdcpcZ/nn-logo-footer.png`) — footer ONLY, nav keeps the standard logo
- DEAD CSS to sweep next cleanup: `.tv-screen`, `.tv-channel*`, `.tv-osd`, `.tv-controls`, `.tv-btn`, `.tv-static`, `.tv-biglink`, `.offair-bars` (channel-surf system, markup removed)

## Mobile nav (matches the footer)
The slide-in mobile menu (`.mobile-nav`, mobile-only — never opens on desktop) mirrors the footer: ink bg + dead-channel TV-snow `::before` (same dot-noise, 0.13 opacity, gentle shimmer) + inset CRT vignette. Header at top = the big green-splat footer logo (`nn-logo-footer.png`, `width: min(210px, 74%)`, centered) with the close X absolute top-right. Header bar still uses the standard wordmark logo.

## About page (`about.html`, `about.css`)
Built A+C hybrid after rejecting a generic centered-type version (research: authentic founder story = #1 DTC trust driver). ABOUT nav link wired sitewide.
- **Founder intro:** Jay's photo (`assets/img/jay-about.jpg`, local) — SQUARE crop (`object-position 50% 40%`), ink frame + hard shadow, VHS-camcorder treatment (drifting tracking band, animated grain overlay, subtle handheld jitter, blinking REC; NO hard scanlines per rule). Paired with headline "I'M JAY. I BRING BACK THE SNACKS THEY KILLED." ("SNACKS THEY KILLED" in logo BLUE w/ red+yellow chromatic aberration) + first-person story (drafted from Jay's label copy — PLACEHOLDER, swap for his real voice).
- **THE ARCHIVE:** ink band with footer/dropdown dead-channel static behind the cards. 5 case-file flip cards: front = OG snack + "KILLED [year]" (real years: PB Max 1994, Turtle Pies 1991, PB Crisps 1995, Butterfinger BB's 2006, Kudos 2017), flips on hover/tap to the jar + "REVIVED 2026", links to product. Native CSS 3D flip + tap-toggle JS.
- **CTA:** "YOUR CHILDHOOD'S BACK IN STOCK." → Shop / Get Notified.

## WHAT'S INSIDE — accordion (all 5 PDPs)
Ingredients / Allergens / Nutrition Facts are native `<details>`/`<summary>` accordions (no JS, accessible; `+`→`−` toggle). Single centered column (`.pdp-inside` max-width 760px, the old 2-col grid removed). Maps cleanly to Shopify (Dawn uses the same `<details>` pattern) — drawer content → metafields (ingredients/allergens rich text, nutrition = image), wrapper stays static.
- **PB Max'd has REAL data**: full ingredient list (cased to Title Case from a mixed paste; content unchanged), allergens "Contains: Milk, Wheat, Peanuts, Soy" + facility note, and the real Nutrition Facts label IMAGE (`assets/img/nutrition/pb-max.png`, framed, local).
- Other 4 flavors: accordion placeholders ("Nutrition label coming soon") until Jay sends each flavor's ingredients/allergens/label image. Nutrition is now an IMAGE per flavor (the old CSS Nutrition-Facts panel is deprecated; `.pdp-nutrition*` CSS now unused → sweep later).
- Made in USA badge (`assets/img/made-in-usa.png`, local) sits below the FREE SHIPPING line in the buy box on all 5 PDPs.

## OG snack images — local
The before/after "original snack" images are LOCAL in `assets/img/og/` (pb-max, pb-crisps, turtle-pies, butterfinger-bbs, kudos-bar) — pulled off ibb after it flaked on load. Before-image alt text fixed per flavor (was a clone leftover "The original PB Max candy bar" on every page).

## Nav & Hero details

- Nav right group: search (`/search`), account (`/account/login`, desktop only — mobile menu has an ACCOUNT link instead), cart (`/cart`)
- Cart icon is a custom jar SVG (ridged lid + squat body) matching the feather-style 2.5 stroke of the other icons; red count bubble sits on the lid corner
- Hero review badge above the H1: five ★ in individual `--blue` boxes (25×23px, 17px star) + "EXCELLENT 4.86/5 CUSTOMER REVIEWS" in small cream Bebas. Mobile: stacked (stars over text) and drops the word "EXCELLENT"; desktop: inline row

## Product page (`product.html`) — prototyped on PB Max'd

One OS 2.0 template; everything flavor-specific comes from each product's data/metafields at conversion. `--flavor` / `--flavor-text` set inline on `<main class="pdp">` drives all flavor color.

- **Buy zone:** slideshow gallery (no thumbnail row; arrows + dots + swipe; first slide = the flavor wrapper) → flavor name → star rating → 3 ingredient bullets (▶ play-triangle markers) → **flavor-color guarantee chip** "LOVE IT OR YOUR MONEY BACK" (compact one line on mobile) → price + IN STOCK + quantity stepper → flavor switcher (all 5 swatches) → red ADD TO CART → 3 trust icons (Secure / 30-Day Returns / Trusted, with dividers) + truck-led FREE SHIPPING line. **Bundles removed for now** (undecided). Sticky mobile ATC on scroll.
- **THE ORIGINAL:** raised "ticket" header (notched stub) + **before/after drag slider** — original snack (cream side) ↔ jar (flavor side); words ("ORIGINAL"/"REMADE") fade in only as you drag into each side; clean color split at rest. Real PB Max origin story (1989, ~$50M/yr, killed reportedly over the Mars family disliking peanut butter — verified/hedged).
- **WHAT'S INSIDE:** ingredients + allergens blocks + full retro Nutrition Facts panel — all `—` placeholders (no invented numbers; Jay supplies real label data). Badges are factual label descriptors only (READY-TO-EAT / 16 OZ JAR / NOSTALGIC DESSERT) — NO health claims.
- **Reviews:** Judge.me at conversion (badge in buy box + review widget), restyled to brand. **COLLECT ALL 5:** mini flavor-wrapper cross-sell cards.

### Shopify conversion map
Reviews = Judge.me widgets (connected). Everything else = product data / metafields: flavor_color, bullets, ingredients, allergens, nutrition_*, original_story, original_image; gallery = product.media; flavor switcher = the "All Drops" collection. Guarantee/trust/shipping are static in the template.

## Notes

- Desktop Drops card name = 1.875rem, price = 1.625rem (mobile stays small)
- All product images in The Drops are placeholders — real shots to be swapped in
- Logo: left-aligned on desktop, centered on mobile (`https://i.ibb.co/Z6Y6y2kB/nn-logo-rebrand.png`)
- Hero: VIDEO panel first on mobile (CTA above fold) / side-by-side on desktop (video left, before/after right)
- Hero before/after panel: wipes between discontinued snack shelf → N&N jar shelf, no text
- Pre-order launch phase — H1 reads "PRE-ORDERS / NOW LIVE."
- Convert to Shopify OS 2.0 after all sections are approved
