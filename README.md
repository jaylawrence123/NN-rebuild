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
├── contact.html              # Contact page (call/text, request a revival, message form, FAQ)
├── get-notified.html         # Get Notified (20 per-flavor "notify me" cards → Kbite)
├── reviews.html              # Reviews page (scoreboard + Judge.me All Reviews container)
├── assets/
│   ├── css/styles.css    # homepage + shop + shared
│   ├── css/pdp.css       # product-page-only styles
│   ├── css/about.css     # about-page-only styles
│   ├── css/contact.css   # contact-page-only styles
│   ├── css/get-notified.css
│   ├── css/reviews.css
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
| 2 | Hero (incl. review badge) | ✅ Done — square video + 90s grain/glitch |
| 3 | Pre-Order Drop | ✅ Done |
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
- The walnut TV (`.ugc__screen`) plays `hero-main.mp4` with the same 90s grain + faded grade as the hero (grain only, no glitch); REC/▶PLAY overlays sit above the grain
- Note: a 90s time-capsule clip (`assets/video/rewind.mp4` + poster) is parked/unused — tried as a standalone CRT section and in this TV, both rejected

## Section 8 — Email Capture

- Full-bleed `--blue` section (logo blue), NO eyebrow label ("Rewind Club" branding rejected — internal class names only)
- "FIRST DIBS" (cream) / "ON EVERY DROP." (yellow) + one-line sub + email input (cream 2.5px border, yellow on focus) + red GET IN button
- Stacked mobile / inline row desktop. Static form — wires to Klaviyo/Shopify Email at conversion

## Section 9 — Footer (simplified guide + dead-channel static)

Channel-surfing was REMOVED June 13 2026 (Jay: "get rid of the channel arrows"). Footer is now the clean guide.

- Thin brand-color SMPTE bar strip at top (`.footer-bars`) → `.site-footer__guide`: splat logo + 3 link columns (SHOP / INFO / FOLLOW) + centered `.site-footer__signoff` ("END OF BROADCAST" + ◀◀ REWIND) → legal line
- **Dead-channel TV static**: `.site-footer::before` = crisp black/white dot snow (thresholded fractalNoise via feComponentTransfer discrete 0/1), screen-blend, gentle 0.55s shimmer. `::after` = occasional signal-tear glitch every ~11s. Inset CRT vignette. Reduced-motion disables.
- **Static intensity (June 14 2026):** bumped ~2× (was barely visible on mobile). The visible level is driven by the shared `tv-snow` keyframe in `styles.css` (now ~0.26–0.34, was ~0.13–0.17) — ONE dial that controls the static on footer + mobile nav + About Archive + Contact Revival. Per-element `opacity` (the reduced-motion fallback) raised to 0.28 on each.
- REWIND fast-scrolls to top (~0.9s rAF ease) under a half-opacity full-screen static flicker
- Footer logo is the green-splat wordmark (`https://i.ibb.co/4nXdcpcZ/nn-logo-footer.png`) — footer ONLY, nav keeps the standard logo
- DEAD CSS to sweep next cleanup: `.tv-screen`, `.tv-channel*`, `.tv-osd`, `.tv-controls`, `.tv-btn`, `.tv-static`, `.tv-biglink`, `.offair-bars` (channel-surf system, markup removed)

## Mobile nav (matches the footer)
The slide-in mobile menu (`.mobile-nav`, mobile-only — never opens on desktop) mirrors the footer: ink bg + dead-channel TV-snow `::before` (same dot-noise, shared `tv-snow` shimmer) + inset CRT vignette. Header at top = the big green-splat footer logo (`nn-logo-footer.png`, `width: min(210px, 74%)`, centered) with the close X absolute top-right. Header bar still uses the standard wordmark logo.

## About page (`about.html`, `about.css`)
Built A+C hybrid after rejecting a generic centered-type version (research: authentic founder story = #1 DTC trust driver). ABOUT nav link wired sitewide.
- **Founder intro:** Jay's photo (`assets/img/jay-about.jpg`, local) — SQUARE crop (`object-position 50% 40%`), ink frame + hard shadow, VHS-camcorder treatment (drifting tracking band, animated grain overlay, subtle handheld jitter, blinking REC; NO hard scanlines per rule). Paired with headline "I'M JAY. I BRING BACK THE SNACKS THEY KILLED." ("SNACKS THEY KILLED" in logo BLUE w/ red+yellow chromatic aberration) + first-person story (drafted from Jay's label copy — PLACEHOLDER, swap for his real voice).
- **THE ARCHIVE:** ink band with footer/dropdown dead-channel static behind the cards. 5 case-file flip cards: front = OG snack + "KILLED [year]" (real years: PB Max 1994, Turtle Pies 1991, PB Crisps 1995, Butterfinger BB's 2006, Kudos 2017), flips on hover/tap to the jar + "REVIVED 2026", links to product. Native CSS 3D flip + tap-toggle JS.
- **CTA:** "YOUR CHILDHOOD'S BACK IN STOCK." → Shop / Get Notified.

## Contact page (`contact.html`, `contact.css`)
CONTACT nav link wired sitewide (`contact.html`, replacing the old `/pages/contact` placeholder on all pages). Structure top→bottom:
- **Call/text hero — "TALK TO A REAL HUMAN":** big bold tap-to-call/text number **954·275·6577** (`tel:`/`sms:` links) in a cream card + CALL / TEXT buttons + email fallback (`jay@nuttynostalgic.com`). Go right to the source.
- **REQUEST A REVIVAL (the hook):** dark "case file" band with dead-channel static (Archive/footer motif). Nominate a discontinued snack → why it mattered → email. Turns the page into a vote on what's made next; ties to The Archive.
- **Answering-machine contact form:** charcoal "device" with blinking red light + green VT323 "1 NEW MESSAGE" readout — "LEAVE A MESSAGE AFTER THE TONE." Fields: name, email, optional order #, message.
- **FAQ:** native `<details>` accordions (shipping, allergens, order help, flavor suggestions, wholesale/press).
- **Follow:** Instagram + TikTok buttons, both `@nuttynostalgic`.
- **Shopify map:** custom look, native plumbing — both forms use Shopify `contact[...]` field names (`contact[name]`/`[email]`/`[body]`/`[Order number]`, revival uses `contact[Snack to revive]`/`[Why it mattered]` + a hidden `contact[Form type]`), so they drop into `{% form 'contact' %}` at conversion (no app). Mock actions are `#` placeholders.
- Contact-page footer has the real IG/TikTok URLs; the other 7 pages' footer FOLLOW links are still `#` placeholders (propagate before launch).

## Get Notified page (`get-notified.html`, `get-notified.css`)
Per-flavor "notify me when it drops" page powered by **Kbite: Back in Stock** at conversion. "GET ON THE LIST." header → grid of **20 placeholder "COMING SOON" cards** (wrapper-style, cycling brand colors, `NN·01`–`NN·20` tag, big "?", NOTIFY ME button). Each button has a `data-notify="flavor-0X"` hook; at conversion swap name/color/jar per flavor and wire the button to Kbite (popup trigger, or link to that product's coming-soon page where Kbite's form lives). Jay sends the real 20 flavors later.

## Reviews page (`reviews.html`, `reviews.css`)
Container for the **Judge.me All Reviews Widget**. Branded **scoreboard panel** (giant 4.86 + blue-boxed stars + 3,800+ count + WRITE A REVIEW + hi-fi-meter rating breakdown bars), filter chips, and a 1/2/3-col grid of branded review cards (stars/date/quote/flavor-jar/name/verified), closing CTA "TASTED ONE? TELL THE WORLD." H1 "DON'T TAKE OUR WORD FOR IT." At conversion: replace the `.rv-list` placeholder cards with `<div class="jdgm-all-reviews-widget">` (comment marks the spot) and restyle Judge.me's output via the CSS overrides. CSS-restyle only — full custom card HTML would need the Judge.me API (skipped).

All nav/footer links now resolve to real `.html` pages — no remaining `/pages/...` placeholders.

## Cart drawer (`.cart-*` in styles.css + main.js) — on all 11 pages
Slide-in-from-right cart (basket icon opens it; markup sits after each page's mobile-nav). Conversion stack from the top-Shopify playbook:
- **Free-shipping progress bar** (toward $65) with a **celebration** when crossed — bar turns green + shimmers, message flips to "★ FREE SHIPPING UNLOCKED ★", gold stars pop.
- **Line items** (flavor-tinted jar tile, qty stepper, line price, remove), **"COMPLETE THE SET" one-tap upsell row**, and a **sticky footer** (pre-order note, live subtotal, CHECKOUT, Shop Pay/PayPal/G Pay express buttons, secure/money-back trust line).
- All **live JS**: steppers, upsell add, and remove recompute line prices, subtotal, the count badge, and the progress bar in real time. Demo seeds 2 items @ $14.99. Maps to a Shopify cart-drawer section (AJAX cart API) at conversion.

## Coming-soon / email-capture page (`coming-soon.html`, `coming-soon.css`)
Standalone pre-launch teaser for the **live Shopify store's password page**, built in the site's VHS/broadcast look so it ties into the future site. Self-contained CSS (ports to a Shopify password template). Signal-in static intro → jar marquees top+bottom (ink + dead-channel static band, glitch) → floating splat logo → **"PRE-ORDERS ARE / DROPPING SOON."** → before/after wipe in a CRT panel → **email field + GET NOTIFIED** (the hero CTA, with a success state).
- **Email:** collected via **Omnisend** (connected to the store). At Shopify, the demo form becomes the native `{% form 'customer' %}` which auto-syncs to Omnisend; build on a **duplicated** theme's password template, never the live one.
- **Chatbot launcher = a retro beeper/pager** (`assets/img/nn-pager-icon.png`) floating bottom-right with blinking pixel dots on its green screen; click expands into a **green-LCD "pager terminal" chat modal** (charcoal body, cream bezel, VT323, bot=green/user=amber, quick-chips + red send). Currently a prototype skin with canned replies — Jay's Cloudflare bot drops in later.

## Next (planned)
- **Port the coming-soon page** into the live Shopify store's password template (native form + Omnisend), and wire the real chatbot into the pager modal.
- Optional: branded 404 (dead-channel) + Shipping/Returns & FAQ page.

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
- **Cart icon = basket image** (`assets/img/nn-cart-basket.png`, local — cream basket + red jar + yellow lid) replacing the old jar SVG; `.header-cart__icon` 34px mobile / 56px desktop
- **Hero video panel is square (1:1) on mobile AND desktop.** Plays `assets/video/hero-main.mp4` (720×720, local). 90s treatment: faded grade + animated **film grain** (`.hero__video-bg::after` — high-contrast B/W noise, `opacity:0.5`, `mix-blend-mode:overlay`; mid-gray noise would be invisible under overlay) + **VHS glitch** (`hero-glitch` jolt/skew/chromatic flash on the video + `.hero__video-bg::before` tracking-band sweep, ~6.5s). All reduced-motion-safe.
- **Proof ticker (red marquee):** 3 phrases — "FREE SHIPPING ON ORDERS $65 OR MORE / PRE-ORDER NOW / 3,800+ 5-STAR REVIEWS" — split by a yellow ▶ (`.proof-ticker__sep`). Faster (13s loop) with a VHS tracking shudder on the bar (`ticker-tracking`) + chromatic brand-color text ghost.

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
