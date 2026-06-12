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
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── video/hero.mp4
```

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
| 7 | UGC / IG Strip | 🔲 Pending |
| 8 | Email Capture (Rewind Club) | 🔲 Pending |
| 9 | Footer | 🔲 Pending |

> The Master Tapes VHS slider (old Section 6) was removed and is flagged for possible later use — full markup recoverable from commit `2834991`; its CSS/JS remain in place, inert. Brand Mission and Channel Flip markup is also recoverable from git history (commit `53d849f`).

## Design System

- **Colors:** `--cream: #F5E6C8` / `--yellow: #FFC42E` / `--red: #E63B2E` / `--ink: #2A2420` / `--blue: #2E6BE6`
- **Fonts:** Bebas Neue (all headings/UI), Figtree (body copy), VT323 (retro labels)
- **Background:** PNG paper fiber texture (`https://i.ibb.co/5h6S4Fqg/nn-background.png`) applied as `body { background-image }` with `background-blend-mode: darken` and `background-attachment: fixed`. Sections that should show it are set to `background: transparent`. Nav uses the same texture via identical `background-image` + `background-attachment: fixed` for seamless continuity. Toggle off with `class="paper-off"` on `<body>`.

## Section 6 — Homesick

Emotional mission section adapted from the draft Shopify theme: the five jars in a warm 1990s kitchen (ChatGPT-generated scenes), ink copy directly on the clean counter — no gradient overlay, no copy below the image.

- Copy: "HOMESICK FOR A PLACE / THAT DOESN'T EXIST." + subcopy + "TAKE ME BACK" CTA (`btn--primary`)
- **Mobile (default):** 2:3 portrait image (`https://i.ibb.co/FbWv8L3Q/nn-mobile-2.png`), jars upper half, copy overlaid on lower-half counter, centered. H1 locked to exactly 2 lines (`white-space: nowrap` + `<br>`, `clamp(34px, 10.8vw, 62px)`)
- **Tablet 768–1023:** same portrait image cover-cropped (`min(75vh, 860px)`, `object-position: center 60%`)
- **Desktop 1024+:** 16:9 image (`https://i.ibb.co/svxJX3SP/nn-desktop-2.png`), section `clamp(480px, 70vh, 720px)`, copy bottom-left on the clean counter corner, H1 `clamp(48px, 4.6vw, 72px)` (size capped so it stays off the jar labels)
- ⚠️ Both images are low-res preview exports (640/427px wide) — swap URLs for full-res versions before launch

## Nav & Hero details

- Nav right group: search (`/search`), account (`/account/login`, desktop only — mobile menu has an ACCOUNT link instead), cart (`/cart`)
- Cart icon is a custom jar SVG (ridged lid + squat body) matching the feather-style 2.5 stroke of the other icons; red count bubble sits on the lid corner
- Hero review badge above the H1: five ★ in individual `--blue` boxes (25×23px, 17px star) + "EXCELLENT 4.86/5 CUSTOMER REVIEWS" in small cream Bebas. Mobile: stacked (stars over text) and drops the word "EXCELLENT"; desktop: inline row

## Notes

- All product images in The Drops are placeholders — real shots to be swapped in
- Logo: left-aligned on desktop, centered on mobile (`https://i.ibb.co/Z6Y6y2kB/nn-logo-rebrand.png`)
- Hero: VIDEO panel first on mobile (CTA above fold) / side-by-side on desktop (video left, before/after right)
- Hero before/after panel: wipes between discontinued snack shelf → N&N jar shelf, no text
- Pre-order launch phase — H1 reads "PRE-ORDERS / NOW LIVE."
- Convert to Shopify OS 2.0 after all sections are approved
