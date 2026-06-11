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
| 5 | Before / After | ✅ Done |
| 6 | UGC / IG Strip | 🔲 Pending |
| 7 | Email Capture (Rewind Club) | 🔲 Pending |
| 8 | Footer | 🔲 Pending |

## Design System

- **Colors:** `--cream: #F5E6C8` / `--yellow: #FFC42E` / `--red: #E63B2E` / `--ink: #2A2420` / `--blue: #2E6BE6`
- **Fonts:** Bebas Neue (all headings/UI), Figtree (body copy), VT323 (retro labels)
- **Grain:** SVG feTurbulence fractalNoise, baseFrequency 0.28, opacity 0.11 multiply (body); 0.42 overlay on image panels

## Notes

- All product images in The Drops are placeholders — real shots to be swapped in
- Logo: left-aligned on desktop, centered on mobile
- Hero: VIDEO panel first on mobile (CTA above fold) / side-by-side on desktop (video left, before/after right)
- Hero before/after panel: wipes between discontinued snack shelf → N&N jar shelf, no text
- Brand Mission: `<picture>` element — portrait mobile image, landscape desktop image
- Before/after section (5): 16:9 on mobile, clamped height on desktop, IntersectionObserver triggers wipe
- Pre-order launch phase — H1 reads "PRE-ORDERS / NOW LIVE."
- Convert to Shopify OS 2.0 after all sections are approved
