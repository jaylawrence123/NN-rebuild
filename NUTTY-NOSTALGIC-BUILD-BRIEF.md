# NUTTY & NOSTALGIC — Homepage Build Brief
**For:** Claude Code production build · Shopify theme (Online Store 2.0 sections or custom Liquid theme)
**Date locked:** June 10, 2026
**Status:** Art direction LOCKED. Do not invent new colors, fonts, or visual styles. Every decision below was made deliberately across multiple review rounds — execute, don't redesign.

---

## 1. BRAND IN ONE PARAGRAPH

Nutty & Nostalgic recreates discontinued snacks from the 80s, 90s, and early 2000s as nut butters — including snacks from nostalgic movies/TV (e.g., the Rugrats Reptar Bar). Audience skews male but must read unisex. Established brand equity: ~200k Instagram followers, 4,000+ reviews at 4.86/5, relaunching with a drop model. The brand voice is confident, funny, and specific — never cutesy, never corporate.

**Design thesis:** A 1989 sticker sheet and a 1994 Saturday-morning commercial had a baby, and that baby runs a serious Shopify store. Vintage *print and broadcast* nostalgia (paper grain, faded ink, film grain, VHS UI details) — NOT vaporwave, NOT neon synthwave, NOT clean flat vector.

**Reference sites (the bar):** eatsurreal.co.uk, eatofflimits.com, feastables.com, maevechocolate.com, starface.world. Hero structure: drinkmockly.com.

---

## 2. DESIGN TOKENS (copy verbatim into CSS custom properties)

```css
:root {
  /* Base */
  --cream:        #FFF4E4;  /* page background */
  --cream-card:   #FFFDF7;  /* card surfaces */
  --ink:          #2A2420;  /* all outlines, body headings, borders */

  /* Core accents (site-wide) */
  --red:          #E63B2E;  /* LEAD accent: primary CTAs, sale badges, urgency */
  --blue:         #2E6BE6;  /* co-lead: secondary CTAs, links, info badges */
  --yellow:       #FFC42E;  /* energy: starbursts, highlights, offset shadows */
  --green:        #7BC74D;  /* Nickelodeon DNA: success states, accents */

  /* Supporting */
  --butter:       #C9912E;  /* nut butter drips, warm details */
  --ink-soft:     #5C5248;  /* body text */
  --ink-faint:    #8A6F4D;  /* captions, VT323 labels */

  /* Per-drop only — NEVER in global UI */
  --drop-grape:   #7C5CD6;
  --drop-pink:    #F0619E;
}
```

**Rules:**
- Cream is the only page background. Sections vary via cards, borders, and sticker density — not background color swaps. (Exception: footer may run `--ink` with cream text.)
- Max two accents dominant per section. Red is the only color allowed on the primary "Add to Cart."
- Grape/pink exist ONLY inside a product drop's own card/page theming (e.g., a Reptar drop runs green + grape). They never appear in nav, footer, or global components.
- All colors should appear slightly washed because of the grain overlay (Section 4) — do not pre-desaturate the hex values.

---

## 3. TYPOGRAPHY SYSTEM (locked — no substitutions)

| Slot | Font | Source | Weights | Usage | Rules |
|---|---|---|---|---|---|
| Display | **Titan One** | Google Fonts | 400 | Hero headlines, section titles, drop names | ALL CAPS. 2–6 words max. Never below 32px. Mobile hero ≈ clamp(38px, 10vw, 56px). |
| Subhead | **Lilita One** | Google Fonts | 400 | Product card titles, buttons, eyebrows, nav links | 16–24px. Buttons always Lilita One. |
| Body | **Figtree** | Google Fonts | 400, 700 | Paragraphs, descriptions, forms, legal | 16px min on mobile. Line-height 1.6. Color `--ink-soft`. |
| Accent | **VT323** | Google Fonts | 400 | Prices, drop numbers, badges, marquee text, timestamps | Never for sentences. Min 15px (it runs small). Style: `▶ DROP 001 · REC`. |

**Loading discipline (non-negotiable):**
- 5 font files total. Subset to Latin. `font-display: swap`.
- Preload Titan One + Figtree 400 (they're above the fold). Lilita One and VT323 load normally.
- No additional families ever. If a need seems unmet, use weight/size/case within these four.

**Component recipe (product card):** Lilita One title → Figtree description → VT323 price → Lilita One button. VT323 eyebrow above title in accent color.

---

## 4. TEXTURE SYSTEM (the thing that makes it not look AI-generated)

The entire site must feel like a slightly faded 1989 print job. Three layers:

### 4a. Paper grain overlay (site-wide)
- ONE small tiling grain texture (PNG or SVG noise, ≤10KB, ~200×200px tile) applied as a `body::after` fixed-position overlay at **4–7% opacity**, `pointer-events: none`, `mix-blend-mode: multiply`.
- Do NOT bake grain into individual images. Do NOT use animated noise. Do NOT use full-viewport canvas noise (kills mobile scroll performance).
- Test: turn the overlay off — the site should suddenly look "too clean." Turn it on — paper.

### 4b. Sticker assets (provided by Jay)
- 10 PNG stickers, scratch-and-sniff print style, transparent backgrounds (Jay crops + background-removes in Canva). Includes: jar mascot, VHS character, boombox, NEW! burst, lightning bolt, squiggle arrow, sparkles, retro TV, cassette, dripping spoon.
- **Sizing discipline (mandatory):**
  - LARGE (up to ~280px): jar mascot, VHS character only.
  - MEDIUM (~120–180px): TV, boombox, NEW! burst.
  - SMALL (~48–100px): cassette, bolt, arrow, sparkles, spoon.
- Stickers are scatter/accent elements around photography and type — never the hero content, never more than 3 per viewport on mobile.
- Slight random rotation (-8° to 8°) on placement. Subtle CSS hover wiggle on desktop only; static on mobile.
- Serve as WebP with PNG fallback, explicit width/height attributes (CLS), `loading="lazy"` below the fold.

### 4c. Film grain video (hero)
- Hero loop is a MUTED, AUTOPLAYING, LOOPING `<video>` — never a GIF.
- Grain is baked into the export at 10–15% fine grain; warm 90s color grade (warm temp, slightly lifted blacks, touch desaturated). NO scanlines, NO VHS glitch effects, NO timestamp overlays — grain + grade only.
- Specs: ~6s seamless loop, no audio track, two renditions via `<source media>`: 720px-wide for mobile (≤1MB), 1080px for desktop (≤1.5MB). H.264 baseline + WebM. `poster` attribute set to first frame (this is the LCP image — preload it).
- `playsinline muted autoplay loop` attributes; pause via JS when `prefers-reduced-motion: reduce`.

---

## 5. LOGO USAGE

Two lockups (vector rebuilds of approved concepts — Jay supplies SVG):
1. **Splat lockup** (stacked wordmark on green Nickelodeon splat): social, packaging moments, footer, hero if space allows.
2. **Single-line wordmark**: site header. Header height 60–64px; logo ≈ 40px tall inside it.

The "max chaos" lettering variant (sparkles/bolt mixed in) is a GRAPHIC, not a logo — usable as hero-adjacent art or merch, never in nav.

Favicon/avatar: jar mascot head, not the wordmark.

---

## 6. PAGE ARCHITECTURE — HOMEPAGE (mobile-first, in order)

Design at 375px first. Every section must work at 375px before desktop is considered.

### 0. Announcement bar
- `--ink` background, cream VT323 text, e.g. `▶ FREE SHIPPING OVER $50 · NEW DROPS MONTHLY`. Optionally a slow marquee. 32px tall.

### 1. HERO — Mockly split structure (the signature)
Mobile (stacked):
- **Top panel (~45vh):** cream/illustrated backdrop. Horizontal CSS marquee of jar cut-out photos (transparent PNGs, Jay supplies) translating slowly left; jars sized so they bleed ~15% past the panel's bottom edge, overlapping the seam into the panel below. Marquee = CSS `transform: translateX` keyframes on a duplicated track; `animation-play-state: paused` under `prefers-reduced-motion`. Jar images: explicit dimensions, preloaded (above-fold).
- **Bottom panel (~55vh):** headline + texture-loop video + CTA.
  - Eyebrow (VT323, `--red`): `▶ NOW RE-AIRING · EST. 2013`
  - H1 (Titan One): `SNACKS THEY DISCONTINUED.` (ink) / `WE DIDN'T.` (blue) — final copy may be tuned but keep the two-line contrast structure.
  - Video loop (Section 4c) with 2px ink border, slight rotation (-1°), rounded corners 14px.
  - Primary CTA (Lilita One, red bg, cream text, 2px ink border): `SHOP THE DROPS`. Min height 52px.
- Desktop: panels go side-by-side 50/50; marquee runs vertically OR stays horizontal across the top half — builder's call, test both.
- HERO RULES: headline + CTA are HTML text, never baked into imagery. LCP target <2.5s on simulated 4G. One sticker max in the hero (sparkles near headline).

### 2. SOCIAL PROOF STRIP
- One line, VT323 or Figtree 700: `★ 4.86 FROM 4,000+ REVIEWS · 200K+ ON IG`. Ink on cream, dashed ink top/bottom borders (1.5px dashed reads as print). No carousel.

### 3. THE DROPS (product grid — the conversion core)
- Eyebrow (VT323): `▶ CURRENTLY RE-AIRING`; Title (Titan One): `THE DROPS`.
- Mobile: 1-col cards full-width OR 2-col at ≥420px. Desktop: 3–4 col.
- Card spec (from approved mock): `--cream-card` bg, 2px ink border, 14px radius, VT323 eyebrow (`▶ DROP 00X · REC`) in the drop's accent color, Lilita One title, 1-line Figtree description, VT323 price, Lilita One "ADD TO CART" button in drop accent with 2px ink border.
- Per-drop accent theming happens HERE: each product's eyebrow + button use its drop palette (Reptar = green/grape, etc.). Card structure never changes.
- Sold-out state: ink button, cream text, `NOTIFY ME` → email capture (Omnisend list tag per product).
- Buttons: min 44×44px tap targets, real `<button>`/`<a>` elements.

### 4. HOW IT WORKS / WHY IT HITS DIFFERENT (brand story, short)
- 3 steps max, horizontal scroll-snap row on mobile. Each step: one SMALL sticker + Lilita One title + 1–2 Figtree sentences. E.g., `WE FIND THE TAPE` → `WE REMASTER IT` → `YOU PRESS PLAY`. VHS metaphor language throughout.

### 5. THE REPTAR-CLASS FEATURE (single drop spotlight)
- Full-width feature for the current hero drop. This section MAY use the drop's own palette as section accents (the one exception to global-accent rules). Big product photo, Titan One name, story copy (the nostalgia hook — what show/era it's from), CTA.

### 6. UGC / IG STRIP
- `▶ AS SEEN ON YOUR FYP` (VT323). 4–6 image grid linking to IG. Static images, NOT an embedded IG widget (third-party embeds wreck performance). Lazy-loaded.

### 7. EMAIL/SMS CAPTURE (Omnisend)
- Framed as the club: Titan One `JOIN THE REWIND CLUB`, Figtree one-liner (early access to drops), single email field + Lilita One button. Inline validation, real `<form>` POST to Omnisend. NO popup on page load — popups can come later via Omnisend itself, A/B tested.

### 8. FOOTER
- `--ink` background, cream text. Splat logo, nav columns (Figtree), social links, VT323 bottom line: `© 2026 NUTTY & NOSTALGIC · BE KIND, REWIND`. Sticker: one (cassette or VHS character), low-key placement.

---

## 7. ENGINEERING REQUIREMENTS (pass/fail)

- **Mobile-first CSS.** Base styles = 375px; enhance upward with min-width queries.
- **Core Web Vitals targets:** LCP <2.5s (4G throttled), CLS <0.05, INP <200ms.
- **Images:** WebP + fallback, explicit dimensions everywhere, responsive `srcset` on product photos, lazy-load below fold only.
- **Animation budget:** marquee (CSS transform), sticker hover wiggle (desktop), one scroll-fade on section entry MAX. Everything respects `prefers-reduced-motion`. No scroll-jacking, no parallax libraries, no GSAP unless a specific approved interaction demands it.
- **Tap targets:** ≥44px. **Contrast:** ink-on-cream passes AAA; verify accent-on-cream combos pass AA at their sizes (red/blue on cream pass for large text and Lilita One buttons; never set small Figtree body in yellow or green).
- **Semantic HTML:** real headings hierarchy, `<nav>`, `<main>`, landmarks, alt text on all stickers describing them as decorative where appropriate (`alt=""` + `role="presentation"` for pure decoration).
- **Focus states:** visible ink-colored focus rings on all interactive elements.
- **Shopify:** build as theme sections with schema settings (drop accent color as a per-product metafield or section setting), money formats via Liquid, cart via Shopify AJAX API for add-to-cart without page reload.
- **No third-party JS** except Shopify required + Omnisend snippet. No font CDNs other than Google Fonts. No icon libraries — stickers and inline SVG only.

## 8. COPY VOICE RULES
- Confident, funny, specific. VHS/broadcast vocabulary is the house metaphor: drops "air," sold-out is "off air," restocks are "reruns," email club is "the Rewind Club."
- Never: "elevate," "indulge," "crafted with love," "premium quality," em-dash-heavy AI cadence, exclamation point spam (one per viewport max).
- Buttons say what they do: `SHOP THE DROPS`, `GET NOTIFIED`, `ADD TO CART`.

## 9. ASSET CHECKLIST (Jay supplies before build starts)
- [ ] 10 sticker PNGs, transparent, 2x resolution
- [ ] Logo SVGs: splat lockup + single-line wordmark (vector rebuild)
- [ ] Jar cut-out photos, transparent PNG, min 800px tall (marquee + cards)
- [ ] Hero texture loop: 2 renditions per spec 4c + poster frame
- [ ] Product photography per drop (1 hero + 1 alt minimum each)
- [ ] Grain tile (builder can generate via SVG turbulence if not supplied)
- [ ] Drop list with names, prices, per-drop accent assignments
- [ ] Omnisend form action/API details

## 10. WHAT FAILURE LOOKS LIKE (read before coding)
This project has had multiple failed build attempts. They failed by: defaulting to generic layouts, ignoring the locked direction, clean-flat-vector styling instead of print grain, purple/pink-heavy palettes, and decoration without reasoning. If any output could belong to a generic "fun snack brand template," it has failed. Every section must be checkable against this document. When in doubt, the answer is in this brief — not in your defaults.
