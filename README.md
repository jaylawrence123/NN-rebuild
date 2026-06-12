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
| 1 | Nav | ✅ Done |
| 2 | Hero | ✅ Done |
| 3 | The Drops | ✅ Done |
| 4 | Brand Mission | ✅ Done |
| 5 | Before / After (Channel Flip) | ✅ Done |
| 6 | The Master Tapes (VHS slider) | ⚠️ Built — needs rework |
| 7 | UGC / IG Strip | 🔲 Pending |
| 8 | Email Capture (Rewind Club) | 🔲 Pending |
| 9 | Footer | 🔲 Pending |

## Design System

- **Colors:** `--cream: #F5E6C8` / `--yellow: #FFC42E` / `--red: #E63B2E` / `--ink: #2A2420` / `--blue: #2E6BE6`
- **Fonts:** Bebas Neue (all headings/UI), Figtree (body copy), VT323 (retro labels)
- **Background:** PNG paper fiber texture (`https://i.ibb.co/5h6S4Fqg/nn-background.png`) applied as `body { background-image }` with `background-blend-mode: darken` and `background-attachment: fixed`. Sections that should show it are set to `background: transparent`. Nav uses the same texture via identical `background-image` + `background-attachment: fixed` for seamless continuity. Toggle off with `class="paper-off"` on `<body>`.

## Section 6 — The Master Tapes (⚠️ Needs Rework)

VHS before/after comparison slider. Current implementation:
- CRT TV bezel (4:3, 10px ink border, 18px/8px radius)
- Layer A (OG product): degraded filter + scanlines + grain + jitter animation
- Layer B (jar): clean cream bg, clipped by `--wipe` CSS variable
- Draggable handle (pointer events → rAF → clip-path)
- 5 VHS tape spine buttons switching between product pairs
- Channel-change static noise on switch
- IntersectionObserver nudge on first scroll into view

**Flagged for redesign** — Jay is not happy with it. Redesign in next session.

Product pairs (ibb.co URLs):
- TAPE 01 · PB MAX: `https://i.ibb.co/8DkNjHpy/pb-max.png` → `https://i.ibb.co/nqC0h1NL/pb-max-d-transparent.png`
- TAPE 02 · PB CRISPS: `https://i.ibb.co/Q3Gm6vxV/pb-crisps.png` → `https://i.ibb.co/nqRbWfKd/90s-crisps-transparent.png`
- TAPE 03 · TURTLE PIES: `https://i.ibb.co/zVqWPZ44/turtle-pies.png` → `https://i.ibb.co/1YTLY8gd/cowabunga-pies-transparent.png`
- TAPE 04 · BUTTERFINGER BBs: `https://i.ibb.co/4LZ8TbB/butterfinger-bbs.png` → `https://i.ibb.co/jk3cJV3z/nuttyfinger-bbs-transparent.png`
- TAPE 05 · KUDOS: `https://i.ibb.co/fYH6qqR7/kudos-bar.png` → `https://i.ibb.co/XkGvC1N4/granola-bar-transparent.png`

## Notes

- All product images in The Drops are placeholders — real shots to be swapped in
- Logo: left-aligned on desktop, centered on mobile (`https://i.ibb.co/Z6Y6y2kB/nn-logo-rebrand.png`)
- Hero: VIDEO panel first on mobile (CTA above fold) / side-by-side on desktop (video left, before/after right)
- Hero before/after panel: wipes between discontinued snack shelf → N&N jar shelf, no text
- Brand Mission: `<picture>` element — portrait mobile image, landscape desktop image
- Before/after section (5): 16:9 on mobile, clamped height on desktop, IntersectionObserver triggers wipe
- Pre-order launch phase — H1 reads "PRE-ORDERS / NOW LIVE."
- Convert to Shopify OS 2.0 after all sections are approved
