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
| 4 | How It Works | 🔲 Pending |
| 5 | Feature Drop Spotlight | 🔲 Pending |
| 6 | UGC / IG Strip | 🔲 Pending |
| 7 | Email Capture (Rewind Club) | 🔲 Pending |
| 8 | Footer | 🔲 Pending |

## Notes

- All product images are placeholders — real shots to be swapped in
- Logo: centered in nav, hamburger left, cart right
- Pre-order launch phase — H1 reads "PRE-ORDERS / NOW LIVE."
- Convert to Shopify OS 2.0 after all sections are approved
