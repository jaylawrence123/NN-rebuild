# Nutty & Nostalgic — Email Program (Omnisend)

Hand-coded HTML email templates for the N&N Omnisend automations. Built in the brand's VHS/kraft/broadcast look, matching the website.

## Why hand-coded HTML

Omnisend's block editor was a rabbit hole, and **imported-HTML Saved Templates do NOT load into automation emails** (the automation editor is the drag-and-drop builder — selecting a code template just shows a blank canvas). The method that works:

1. In an automation email → **Add Elements → HTML Code** (the `</>` element).
2. Paste the file's HTML into the **"HTML" box**, and the `@media` query CSS into the **"Styles" box** (see below).
3. Delete the default blocks; set **Email settings → Background** to match.
4. **Omnisend's preview lies** (fake white frames + scrollbars) — always verify with a real test send to a phone.

### Styles box (paste into EVERY email's Styles box)

```css
@media only screen and (max-width:600px) {
  .container { width:100% !important; }
  .h1 { font-size:32px !important; line-height:0.95 !important; }
  .px { padding-left:22px !important; padding-right:22px !important; }
  .sp-hide { display:none !important; }
  .sp-text { white-space:nowrap !important; }
  .pcard { width:44% !important; max-width:44% !important; margin:6px 2% 14px !important; }
  .tape-y { display:none !important; }
  .atc { font-size:12px !important; }
}
```

## Two templates

- **Template 1 — kraft** (warm / welcome / happy moments). Email background `#E3D7BE`. Kraft texture bg, dark-on-kraft text, swipe-GIF hero, founder polaroid, 6-jar grid.
- **Template 2 — dark TV-static** (urgency / abandoned / "dead channel"). Email background `#2A2420`. Static texture bg, cream/yellow text, red accents, jars with cream borders. Leaner.

Both use one centered responsive container: outer `width:100%` table with the bg image (fills Omnisend's wider content card so no white strip), inner `class="container" width:100% max-width:600px`.

## Files

| File | Automation | Template | Notes |
|------|-----------|----------|-------|
| `nn-welcome-email-master.html` | — | 1 (kraft) | Full-document reference master |
| `nn-welcome-email-1-htmlblock.html` | Welcome No.2 · E1 (1 min) | 1 | "Welcome to the Nutty Fam" — GIF hero, offer, 6 jars |
| `nn-welcome-email-2-htmlblock.html` | Welcome No.2 · E2 (1 day) | 1 | "[name], I'm homesick" — founder story |
| `nn-welcome-email-3-htmlblock.html` | Welcome No.2 · E3 (~4 day) | 1 | "Going, Going... Gone?" — last-chance |
| `nn-abandoned-cart-1-htmlblock.html` | Abandoned Checkout · E1 (1 hr) | 2 (dark) | "Don't Touch That Dial" — signal lost |
| `nn-abandoned-cart-2-htmlblock.html` | Abandoned Checkout · E2 (24 hr) | 2 | "Your Cart's Getting Cold" |
| `nn-abandoned-cart-3-htmlblock.html` | Abandoned Checkout · E3 (48 hr) | 2 | "Going Off Air" — final + WELCOME10 |

> The `nn-abandoned-cart-*` files are the **Abandoned Checkout** sequence (named "cart" for historical reasons).

## Status

- **Welcome series (3 emails) — DONE.** New automation "Welcome No.2"; the old "Welcome (3 Emails)" was turned OFF to avoid double-send.
- **Abandoned Checkout (3 emails) — DONE.** Recovery link tag `[[event.raw.abandoned_checkout_url]]` wired into every button. Timing 1hr / 24hr / 48hr.
- **`WELCOME10`** = a live 10% Shopify discount code, used as the static code across both flows (the auto-unique Discount element can't live in an HTML Code block).
- **Next:** Order Followup (kraft, post-purchase + Judge.me review request), then Abandoned Cart, Customer Reactivation, Product Abandonment.

## Brand rules

- NO rainbow color-bar stripe (reads as a pride flag — rejected).
- No JS/sliders — recreate motion as GIFs (`<img>` only; background GIFs don't animate).
- Use literal Unicode chars (★ ↓ © — ' ⏳), NOT HTML entities — Omnisend's importer corrupts entities.
- Kraft body/footer copy must be near-black `#262220` bold; dark-template copy is cream `#F5E6C8`.
- Bebas font stack with bold fallback (`'Bebas Neue', Impact, 'Arial Narrow', ...`) — web fonts only load in Apple Mail.

Hosted assets (ibb): kraft bg, TV-static, swipe GIF, founder polaroid, the 6 jar PNGs, logo — same links as the website.
