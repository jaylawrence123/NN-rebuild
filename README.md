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
├── shop.html             # Shop the Drop collection page (35lb bucket + 6 flavors)
├── product.html              # PB Max'd product page
├── product-crisps.html       # 90's Crisps product page
├── product-cowabunga.html    # Cowabunga Pies product page
├── product-nuttyfinger.html  # NuttyFinger BBs product page
├── product-lunchbox.html     # Lunch Box Granola product page
├── product-the-king.html     # The King PB & Banana Creme (purple #7A3DB8; orig = 2007 Elvis Reese's)
├── product-bucket.html       # 35 lb bucket of 90's Crisps ($399 anchor)
├── about.html                # About page (founder + the archive)
├── contact.html              # Contact page (call/text, request a revival, message form, FAQ)
├── get-notified.html         # Get Notified (58 flavors, 3 channels, search + tabs → Kbite)
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
- **shop.html**: mobile-only before/after wipe banner (reuses hero `hero-ba-wipe`, hidden ≥768px — too stretched wide) → "SHOP THE DROP" header → `.shop-grid` (1 col mobile / 2 col 600px / 3 col 1024px): the 35 lb bucket card FIRST (deep radial blue, `.drop-card--bucket`), then the 6 flavor wrapper cards, then a gray "NEXT DROP / COMING SOON ?" card. Card name/price enlarged (1.75/1.625rem mobile, 2.5/2.125rem desktop).
- **All 5 flavor pages built + fully cross-linked:** product.html = PB Max'd (#E63B2E, cream), product-crisps.html = 90's Crisps (#2E6BE6, cream), product-cowabunga.html = Cowabunga Pies (#7BC74D, ink), product-nuttyfinger.html = NuttyFinger BBs (#1F2A63, cream), product-lunchbox.html = Lunch Box Granola (#FFC42E, ink). Pattern `product-<slug>.html`. Each PDP's switcher leads with its own flavor; every switcher swatch + Collect-All-5 card + homepage/shop card resolves to a real page (only the PB Max'd swatch points to product.html, correctly).
  - Flavor-text rule: cream (#F5E6C8) on dark bands (red/blue/navy), ink (#2A2420) on light bands (green/yellow).
  - Origin stories (all researched/verified): PB Max'd = Mars PB Max (1989, ~$50M/yr, killed reportedly over Mars family disliking PB); 90's Crisps = Planters P.B. Crisps (1992 giant-peanut graham cookie, killed 1995); Cowabunga Pies = Hostess TMNT Pudding Pies (1991 movie tie-in, green-glazed vanilla puddin', gone same year); NuttyFinger BBs = Nestlé Butterfinger BB's (1992, Bart Simpson ads, killed 2006, most-missed '90s snack in 2021 poll); Lunch Box Granola = Mars Kudos bar (1986 candy-as-granola, "Kudos I'm yours", discontinued 2017).
- THE ORIGINAL section ends with a "GET IT WHILE IT'S BACK" CTA (cream button, hard shadow) that smooth-scrolls to `#buy` (the quantity stepper lives there) — NOT a second add-to-cart. Replaced the old DISCONTINUED stamp.

## Sections

| # | Section | Status |
|---|---------|--------|
| 0 | Announcement Bar | ✅ Done |
| 1 | Nav (search / account / jar cart) | ✅ Done |
| 2 | Hero (incl. review badge) | ✅ Done — Jay's own square clip + authentic VHS/camcorder treatment |
| 2b | 35 lb Bucket — price anchor (full-bleed infomercial) | ✅ Done |
| 3 | Pre-Order Drop | ✅ Done |
| 4 | Brand Mission | ❌ Removed from homepage |
| 5 | Before / After (Channel Flip) | ❌ Removed from homepage |
| 6 | Homesick (kitchen scene) | ✅ Done — pending full-res images |
| 7 | Reviews | ✅ Rebuilt — ink+static "broadcast" stage, TV centerpiece + cycling testimonial reel |
| 7b | FAQ (alternating-color accordion + FAQPage schema) | ✅ Done |
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

## Section 7 — Reviews (rebuilt: late-night broadcast)
Dark **ink + dead-channel static** stage (breaks the cream rhythm next to the FAQ). Header in cream: blue-boxed ★ + "4.86/5 · 4,000+ CUSTOMER REVIEWS" + **"8000+ ADULTS GOT TO FEEL LIKE KIDS AGAIN."** (`.ugc__title`). The header is locked to **2 lines** via a hard `<br>` (break after "TO") + `font-size: clamp(36px, 9.5vw, 64px)` so both lines always fit on mobile.
- **The walnut TV (`.ugc__screen`) is the centerpiece**, playing the hero clip `hero-main-v2.mp4` (keeps its own CRT grain/grade). REC + ▶PLAY overlays.
- **Cycling testimonial reel** beside the TV (`.ugc__reel`): now uses **Jay's 4 real reviews**, each with the **flavor jar thumbnail** at the top (`.ugc__tm-jar`, drop-shadow to pop on the dark stage) → blue-boxed ★★★★★ → big cream Bebas quote → `NAME · ✓ VERIFIED BUYER` → `◀◀ CH 0X ▶▶`. CH01 Cowabunga/Michael B. · CH02 90's Crisps/Johnny K. · CH03 NuttyFinger/Jamia · CH04 PB Max'd/Derek M. Quotes are verbatim. Auto-advances 5s with a **VHS static-cut**, pauses on hover; centered.
- ⚠️ **Quote-clip fix:** `.ugc__reelwin` is `display:grid` whose implicit `auto` track sized to **max-content** (the longest quote on one unwrapped line) — long quotes overflowed/clipped on the right on mobile. Fixed with `grid-template-columns: minmax(0, 1fr); width: 100%` so text wraps.
- Real curated testimonials cycle; full review app (Judge.me) lives on reviews.html at conversion. Still review-focused — no IG/UGC framing.
- **Dead CSS (inert, sweep later):** old `.ugc__reviews`/`.rev*` card rules + legacy `.ugc__row`/`.review-card*` — no markup uses them.

## Section 7b — FAQ (homepage)
Alternating-color accordion (`.faq*`) after Reviews, before Email Capture. Native `<details>` cards cycling yellow/blue/red/green (ink/cream text per card), 3px ink border + hard shadow + rotating chevron. 8 questions. **FAQPage JSON-LD schema** included for SEO / AI answer engines.

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
- **Website-by credit (`.site-footer__credit`)** under the legal line on all 13 footer pages: "WEBSITE BY" + the **Designmynt** logo (`i.ibb.co/G4yX68Hj/...`, Jay's studio). Link → `https://designmynt.com/` (confirmed by Jay). Logo on ibb → localize before launch.
- **Footer links (June 17 2026):** SHOP column = SHOP THE DROP + GET NOTIFIED — the redundant **SEARCH** link was removed from all 13 footers (the header search icon covers it; `/search` is a dead Shopify route in the mock). FOLLOW = real IG/TikTok on all 13 pages. INFO keeps ACCOUNT (`/account/login`, live on Shopify).
- **Footer copy enlarged on desktop (June 17):** in the `@media (min-width:768px)` block — column titles 16→19px, links 1.125→1.5rem, END OF BROADCAST 20→25px, REWIND 1.25→1.5rem. Mobile untouched.

## Time Capsule — left-edge REWIND tab + CRT video modal (HOMEPAGE ONLY)
> ⚠️ **PARKED — removed from the homepage June 18 2026.** The left-edge REWIND tab crowded mobile next to the bottom-right hotline launcher. Markup removed from index.html (breadcrumb comment left in place); `.capsule*` CSS + the JS IIFE are inert; the video stays at `assets/video/time-capsule-90s.mp4`. Restore the `.capsule-tab` + `.capsule-modal` markup (from git history pre-`4ed984d`) once the layout allows — e.g. move it so it doesn't fight the hotline.

A click-to-open "rewind to the 90s" video. Deliberately a **modal, not a section** — earlier "REWIND" video *sections* were rejected for lengthening the page; the modal adds zero page length and the video **lazy-loads only on open** (`preload="none"` + `data-src`).
- **Trigger:** `.capsule-tab` — a vertical ink "◀◀ REWIND TO 1990" tab fixed to the LEFT edge (mobile: bottom-left), blinking REC dot. Fades in only after you scroll past the hero (`pageYOffset > 55vh`). Left edge keeps it clear of the sticky ADD TO CART and the future bottom-right chatbot. Broadcast-ink, not red — never competes with the buy CTA.
- **Modal:** `.capsule-modal` → `.capsule-tv` CRT frame: bar with **CH 03** + blinking REC + mute + close; 16:9 `.capsule-tv__screen` holding the `<video>` + overlays; caption **"remember this feeling?"**. Closes on ✕ / backdrop / Esc; pauses video + unlocks scroll on close. Plays with sound (the click is the opt-in) + mute toggle.
- **CRT power-on intro (~1s):** white snap-on flash → dense static snow (`.capsule-tv__static.is-on`) with a bright sync-roll band → picture tunes in (`.is-tuning` on the screen drives the flash). Plus persistent **90s grain** (`.capsule-tv__grain` — high-contrast B/W noise, overlay-blended + jittered, hero-style) + a faded VHS grade on the footage + scanline/vignette (`.capsule-tv__vhs`). All reduced-motion safe.
- **Video:** `assets/video/time-capsule-90s.mp4` (852×480, ~24s, **compressed 16.6MB → 3.56MB**, AAC audio). JS = guarded IIFE at end of `main.js`. The `<video>` has `disablePictureInPicture disableRemotePlayback controlslist="nodownload nofullscreen noremoteplayback" webkit-playsinline` to suppress the mobile PiP/expand buttons that otherwise lingered after the clip ended.
- **Mobile reviews spacing (`@media max-width:767px`):** tightened the stacked gaps on the homepage `.ugc` section (header→TV→reviews) — section padding 3.5/4rem→2.25/2.5rem, `.ugc__hd` margin 2rem→1rem, `.ugc__stage` gap 1.75rem→0.85rem. Desktop untouched.

## Mobile nav (matches the footer)
The slide-in mobile menu (`.mobile-nav`, mobile-only — never opens on desktop) mirrors the footer: ink bg + dead-channel TV-snow `::before` (same dot-noise, shared `tv-snow` shimmer) + inset CRT vignette. Header at top = the big green-splat footer logo (`nn-logo-footer.png`, `width: min(210px, 74%)`, centered) with the close X absolute top-right. Header bar still uses the standard wordmark logo.

## About page (`about.html`, `about.css`)
Built A+C hybrid after rejecting a generic centered-type version (research: authentic founder story = #1 DTC trust driver). ABOUT nav link wired sitewide.
- **Founder intro:** Jay's photo (`assets/img/jay-about.jpg`, local) — SQUARE crop (`object-position 50% 40%`), ink frame + hard shadow, VHS-camcorder treatment (drifting tracking band, animated grain overlay, subtle handheld jitter, blinking REC; NO hard scanlines per rule). Paired with headline "I'M JAY. I BRING BACK THE SNACKS THEY CANCELED." (**"KILLED" → "CANCELED" June 17 2026** — on-theme, snacks cancelled like a TV show; "SNACKS THEY CANCELED" in logo BLUE w/ red+yellow chromatic aberration) + a **rewritten first-person founder story** (Jay-directed June 17 — looser/more human; facts unchanged). ⚠️ The 6 ARCHIVE cards below still read "KILLED [year]" — Jay hasn't decided whether to switch those to CANCELED for consistency.
- **THE ARCHIVE:** ink band with footer/dropdown dead-channel static behind the cards. 6 case-file flip cards: front = OG snack + "KILLED [year]" (real years: PB Max 1994, Turtle Pies 1991, PB Crisps 1995, Butterfinger BB's 2006, Kudos 2017, Elvis Reese's 2007), flips on hover/tap to the jar + "REVIVED 2026", links to product. Native CSS 3D flip + tap-toggle JS. (The King = the 6th, added June 15.)
- **CTA:** "YOUR CHILDHOOD'S BACK IN STOCK." → Shop / Get Notified.

## Contact page (`contact.html`, `contact.css`)
CONTACT nav link wired sitewide (`contact.html`, replacing the old `/pages/contact` placeholder on all pages). Structure top→bottom:
- **Call/text hero — "TALK TO A REAL HUMAN":** big bold tap-to-call/text number **954·275·6577** (`tel:`/`sms:` links) in a cream card + CALL / TEXT buttons + email fallback (`jay@nuttynostalgic.com`). Go right to the source.
- **REQUEST A REVIVAL (the hook):** dark "case file" band with dead-channel static (Archive/footer motif). Nominate a discontinued snack → why it mattered → email. Turns the page into a vote on what's made next; ties to The Archive.
- **Answering-machine contact form:** charcoal "device" with blinking red light + green VT323 "1 NEW MESSAGE" readout — "LEAVE A MESSAGE AFTER THE TONE." Fields: name, email, optional order #, message.
- **FAQ:** native `<details>` accordions — **6 support-focused Qs** (ship, track order, damaged/wrong order, allergy safety, returns/30-day guarantee, wholesale/press). Pressure-tested June 17: dropped the redundant "suggest a flavor" (the page's Request a Revival section owns it), added the two questions a contact page exists for — **order tracking + returns**.
- **Follow:** Instagram + TikTok buttons, both `@nuttynostalgic`.
- **Shopify map:** custom look, native plumbing — both forms use Shopify `contact[...]` field names (`contact[name]`/`[email]`/`[body]`/`[Order number]`, revival uses `contact[Snack to revive]`/`[Why it mattered]` + a hidden `contact[Form type]`), so they drop into `{% form 'contact' %}` at conversion (no app). Mock actions are `#` placeholders.
- All 13 pages' footer FOLLOW links now point to the real IG (`instagram.com/nuttynostalgic`) + TikTok (`tiktok.com/@nuttynostalgic`) URLs.

## Get Notified page (`get-notified.html`, `get-notified.css`)
Out-of-stock flavor catalog powered by **Kbite: Back in Stock** at conversion. "GET ON THE LIST." header + sub "Out of stock flavors — sign up to be notified when they're available." → **search bar** → **3 channel jump-tabs** → **3 category sections, all on the page** (the tabs smooth-scroll to each; they do NOT show/hide).
- **58 flavors, fully populated** across 3 channels: **CH 01 DISCONTINUED SNACKS (21)**, **CH 02 MOVIE & TV (17)**, **CH 03 MISC. NOSTALGIA (20)**. Each section = a broadcast channel header (`CH 0X` chip + title + ink underline) over a `.notify-grid` (2→3→4→5 col).
- **Cards = bare** (no colored swatch/border/box — the homepage `.drop-card` overridden in get-notified.css): transparent slot with a **soft radial spotlight** lifting the jar off the wax bg, **bigger jar (92%)** with a layered drop-shadow (hard sticker-offset + soft contact), lift-on-hover. Each card = jar `<img>` + flavor name + red NOTIFY ME button carrying `data-notify="<product-handle>"` (the slug) for Kbite.
- **Row uniformity (locked):** name font shrunk + reserves ~2 lines, `align-items:flex-start`; the grid stretches every card in a row to equal height and `.drop-card__btn { margin-top:auto }` pins the button to the bottom — so NOTIFY ME always aligns across a row even when a name wraps to 3 lines.
- **Live search** (`#notify-search`, JS in main.js): filters cards by name, hides any channel with zero matches, shows a no-results line. **Jump-tabs** (`.notify-tab` anchors) smooth-scroll to each `#sec-*` (respects the global fixed-header `[id]` scroll-margin; reduced-motion safe).
- All 58 jar images are on **ibb** (transparent PNGs) → localize before launch. Display names + `data-notify` slugs were **reconciled to the canonical Shopify product titles** (June 2026) so they map straight to real products at port time — e.g. ICT → Ice Cream Truck, PB Bites → Peanut Butter Bites, Lunch Lady PB Bar → Lunch Lady Peanut Butter Bar, McNutty's Fried Apple Pie → Fried Apple Pie, Rockford Peach Pie → Peach Pie a la Mode, Lil Hustlers → Little Hustler's (**trademark-safe descriptors kept** — no Samoa/Tagalongs). Page keeps its Title Case styling.
- **CHANNEL-TUNER FX (June 17 2026 — the "wow" pass):** the search + tabs are reimagined as a 90s TV interface (on-theme, not generic). **Search = a mini CRT OSD screen** (dark bg + scanlines, yellow `▶` prompt + blinking block caret, VT323 mono "TUNE IN A FLAVOR…", and a live green **LED readout**: `58 FLAVORS` idle → `N FOUND` typing → red flickering `NO SIGNAL` on zero). **Tabs = lit channel chips** (`CH 0X` pill + name + signal-bars icon; the active chip glows yellow with red pulsing bars, lit by an **IntersectionObserver scroll-spy** as you scroll). Switching a channel fires a **VHS static burst** (`.notify-static`, feTurbulence overlay) + a **corner OSD blip** (`.notify-osd`, `CH 02 · MOVIE & TV`) then smooth-scrolls. All reduced-motion-safe. Scoped to get-notified.html + get-notified.css + the two notify IIFEs in main.js.
- ⚠️ **Generation:** the 58 cards are emitted by a throwaway PowerShell script that splices between the `<!-- Category jump-tabs` marker and `</main>`. It MUST read/write via `[System.IO.File]::ReadAllText/WriteAllText` with `UTF8Encoding($false)` — `Set-Content -Encoding utf8` corrupts the file's existing em-dashes/stars into mojibake.

## Reviews page (`reviews.html`, `reviews.css`)
Container for the **Judge.me All Reviews Widget**. Branded **scoreboard panel** (giant 4.86 + blue-boxed stars + 3,800+ count + WRITE A REVIEW + hi-fi-meter rating breakdown bars), filter chips, and a 1/2/3-col grid of branded review cards (stars/date/quote/flavor-jar/name/verified), closing CTA "TASTED ONE? TELL THE WORLD." H1 "DON'T TAKE OUR WORD FOR IT." **At conversion = OPTION B (chosen June 17 2026):** render reviews in our OWN markup via the **Judge.me API** (not the embed widget), so the page matches this mock exactly (custom cards, flavor-jar thumbs, the VU-meter scoreboard) and stays fully on-brand. ⚠️ **TODO (Jay, ~June 18 2026): pull his real Judge.me reviews + API key** so the build can wire real data. (The embed-widget + CSS-skin approach was the fallback; Jay wants pixel-perfect.) **Jaw-drop redesign BUILT on the mock (June 17) — the A+B combo:** (A) a **"TONIGHT'S RATINGS" broadcast board** that powers on when scrolled into view — the 4.86 counts up from 0, the breakdown bars sweep up like a VU meter (staggered, overshoot bounce), the stars flicker on CRT-style, plus a blinking `● TONIGHT'S RATINGS` OSD tag top-left; (B) review **cards as TV lower-thirds** — each footer is a full-bleed dark chyron (red accent line, jar + cream name + green ✓ VERIFIED · flavor) pinned to the card bottom via `margin-top:auto`, with a blinking REC dot on the date. Reduced-motion-safe (new IIFE in main.js). At port, real Judge.me data flows into this exact design via the API.

All nav/footer links now resolve to real `.html` pages — no remaining `/pages/...` placeholders.

## Cart drawer (`.cart-*` in styles.css + main.js) — on all 11 pages
Slide-in-from-right cart (basket icon opens it; markup sits after each page's mobile-nav). Conversion stack from the top-Shopify playbook:
- **Free-shipping progress bar** (toward $65) with an **infomercial-blowout celebration** when crossed (matches the 35lb-bucket late-night-infomercial vibe): a yellow **starburst** spins/bursts behind the bar, the headline **stamps in** ("★ FREE SHIPPING UNLOCKED ★", red + yellow outline), a **camera-flash + shake**, the bar goes glossy green, and **on-brand confetti** bursts out — SMPTE color-bar chips + ▶ play triangles + ★ stars (`.cart-confetti`, JS-spawned in `main.js`, anchored to the bar's offset inside the drawer; reduced-motion-safe). All CSS gradients/transforms in `.cart-ship*` — no images. (A Nickelodeon-slime version was built and rejected first; the lesson: match THIS brand's broadcast theme, not adjacent-90s, and don't fake organic slime with CSS masks.)
- **Line items** (flavor-tinted jar tile, qty stepper, line price, remove), **"COMPLETE THE SET" one-tap upsell row**, and a **sticky footer** (pre-order note, live subtotal, CHECKOUT, Shop Pay/PayPal/G Pay express buttons, secure/money-back trust line).
  - **Upsell cards (`.cart-add`) = compact image + price ONLY** (names removed) so they don't eat the vertical space the cart items need on mobile when 2+ items are in the cart. 4 cards = the full set not in the demo cart: Cowabunga, NuttyFinger, Lunch Box, **The King** (added). Horizontal-scroll row. The King jar PNG is tighter-cropped (no transparent padding) so it renders bigger at any equal box — fixed by `.cart-add[data-name="THE KING"] img { padding: 7px; box-sizing: border-box; }` (shrinks just the jar, keeps the 44px box so prices stay aligned). Markup is duplicated on all 13 cart pages; edit via .NET UTF-8 script (see [[feedback-ps-utf8-corruption]]).
- All **live JS**: steppers, upsell add, and remove recompute line prices, subtotal, the count badge, and the progress bar in real time. Demo seeds 2 items @ $14.99. Maps to a Shopify cart-drawer section (AJAX cart API) at conversion.

## Nutty Hotline — chatbot launcher + call-in modal (`.nn-hotline*` / `.nn-call*`, all 13 pages)
Fully custom chatbot, late-night **infomercial call-in** concept (loud, on-brand — ties to the 35lb-bucket infomercial motif; the pager stays the coming-soon-page idea).
- **Launcher (bottom-right):** a yellow infomercial **starburst slowly spins** behind a red **vintage handset** that does a periodic **ring-jiggle**, with a flashing `CALL NOW` tag + a red unread dot. Two transparent ibb PNGs (`nn-hotline-handset` / `nn-hotline-burst`) → localize before launch. Reduced-motion disables all motion.
- **Call-in modal:** dark CRT panel + scanlines, blinking `● OPERATORS STANDING BY` header, `CH 90 · THE NUTTY HOTLINE` chyron, connect-flash on open. Bot answers as "the operator" (cream bubbles + green label + typing dots); you get yellow bubbles. Quick-replies `▸ PRESS 1–3 / 0` + a VT323 OSD input + red SEND. Desktop grows from the corner; mobile centers. Esc / backdrop / hang-up close.
- **Prototype:** canned replies grounded in real facts (shipping, allergens→PDP, 30-day guarantee, 954 number/email, Get Notified + Request a Revival). The **real bot wires in via Jay's Cloudflare embed snippet + clientId** (still pending).
- ⚠️ **Gotcha (fixed):** the markup sits after the `main.js` script tag, so the hotline IIFE inits on `DOMContentLoaded` — otherwise the launcher renders but the click does nothing.

## Mobile + cart polish (June 18 2026)
- **Mobile nav:** the dead-channel static now fills the whole slide-in — `.mobile-nav` is `overflow:hidden` and the link list scrolls instead (`.mobile-nav__list` overflow-y:auto), so the static can't scroll away; logo + CTA stay pinned.
- **Cart drawer (mobile):** slimmed "Complete the Set" + tightened the footer so 2–3 line items show (was ~1); `overscroll-behavior:contain` on the drawer/items/upsell-row stops scroll-chaining to the page behind.
- **35lb bucket** added as a 5th "Complete the Set" card (all 13 pages); cart line-item variant is now `data-variant`-driven (bucket reads "35 lb bucket", default "16 oz jar").
- **Free-ship bar:** shows a **jar count** ("add N more jars", gap ÷ $14.99), **hides when empty**, `aria-live` on the label. **One-jar nudge:** the first upsell jar pulses red + the title flips to "ONE JAR FROM FREE SHIPPING". Threshold stays **$65** (`data-threshold`), `LOWEST_JAR` const. *Port: do this in cents, hook real `cart/*.js`, enforce free shipping via a Shopify automatic rate — never in JS.*
- **Tap targets:** qty steppers got a 44px hit area (invisible `::before`, no added row height); REMOVE demoted + separated from the price.
- **Pre-order note** reworded → "Pre-orders ship within two weeks", restyled as a centered yellow badge with a subtle pulse.
- **Hotline call-in modal** recentered + clamped below the fixed header via `--offset` (`top: max(...)`) — never cut off, ✕ always visible; centered on desktop, header-cleared on mobile. Its **height is driven off `window.visualViewport.height`** (`--vvh`, set in JS, with a `dvh`→`vh` fallback) so the input bar never clips behind the mobile toolbar *or* the on-screen keyboard — the standard approach for mobile modals (don't size off `100vh`).

## Coming-soon / email-capture page (`coming-soon.html`, `coming-soon.css`)
Standalone pre-launch teaser for the **live Shopify store's password page**, built in the site's VHS/broadcast look so it ties into the future site. Self-contained CSS (ports to a Shopify password template). Signal-in static intro → floating splat logo → **"PRE-ORDERS ARE / DROPPING SOON."** → before/after wipe in a CRT panel → **email field + GET NOTIFIED** (the hero CTA, with a success state) → IG/TikTok.
- **Layout:** stripped clean — both jar marquees removed. Content is top-aligned and pulled up so the bottom of the screen stays open for the floating chatbot. Mobile-tuned: large logo (`clamp(152px, 38vw, 250px)`), big headline (`clamp(48px, 11.5vw, 104px)`), height-capped CRT panel (`clamp(140px, 22vh, 180px)`) so the whole stack clears the fold; desktop keeps the wide 16:9 panel.
- **Email:** collected via **Omnisend** (connected to the store). At Shopify, the demo form becomes the native `{% form 'customer' %}` which auto-syncs to Omnisend; build on a **duplicated** theme's password template, never the live one.
- **Chatbot (pager) = PARKED for launch.** The retro beeper/pager launcher + green-LCD "pager terminal" chat modal were removed from the page so it can go live. Their markup + JS are gone (recoverable from git); the pager **CSS is left in `coming-soon.css` (inert)** so re-wiring is trivial. To restore: re-add the launcher button + `.pager` modal markup + the pager JS, then wire Jay's Cloudflare bot (needs his embed snippet + clientId). When it existed: mobile popped up centered (`pager-open-center`), desktop grew from the bottom-right launcher (`pager-open`).

## ✅ Coming-soon page is LIVE on Shopify (June 15 2026)
Live and locked at nuttynostalgic.com, collecting emails. **Working file: `shopify-password.liquid`** (root of repo) — a single self-contained Liquid file = the NN VHS coming-soon design + native `{% form 'customer' %}` email capture (syncs to Omnisend via Shopify Customers).
- **How it's deployed:** the live "Nutty & Nostalgic — Arcade" theme injects its own intro animation that *leaked* onto the password page, so we use a **clean Dawn theme** instead. Added Dawn → replaced its `layout/password.liquid` with `shopify-password.liquid` → published Dawn → **Preferences → Password protection ON.** Dawn is clean AND ships a password template, so Shopify uses the custom layout (one file, no extras).
- **Can't preview a Shopify password page anywhere** (editor + thumbnails both show Shopify's default) — only view it via the live storefront in **incognito** (admin login bypasses the lock).
- **Revert:** republish the Arcade theme + password protection OFF.
- **Still to verify:** one live test signup lands in Customers + Omnisend.

## Next (planned)
- **Wire the real chatbot** into the pager modal (needs Cloudflare embed snippet + clientId) — pager currently parked.
- Optional: branded 404 (dead-channel) + Shipping/Returns & FAQ page.

## WHAT'S INSIDE — accordion (all 5 PDPs)
Ingredients / Allergens / Nutrition Facts are native `<details>`/`<summary>` accordions (no JS, accessible; `+`→`−` toggle). Single centered column (`.pdp-inside` max-width 760px, the old 2-col grid removed). Maps cleanly to Shopify (Dawn uses the same `<details>` pattern) — drawer content → metafields (ingredients/allergens rich text, nutrition = image), wrapper stays static.
- **ALL 5 FLAVORS HAVE REAL LABEL DATA** (PB Max'd, 90's Crisps, Cowabunga Pies, Lunch Box Granola, NuttyFinger BBs): verbatim ingredient list, allergen "Contains:" line + facility note, and a real Nutrition Facts label IMAGE per flavor. The **35 lb bucket page shares 90's Crisps' data**.
- **Ingredients are pasted VERBATIM** (Jay's call — they're real concatenated label declarations; never clean/de-dup/reorder). Nutrition labels are **hosted on ibb** (incl. PB Max'd, swapped off the old local file) → localize before launch. Nutrition is an IMAGE per flavor (old CSS Nutrition-Facts panel deprecated; `.pdp-nutrition*` now unused → sweep later).
- Made in USA badge (`assets/img/made-in-usa.png`, local) sits below the FREE SHIPPING line in the buy box on all 5 PDPs.

## PDP flavor bullets (the 3 `▶` feature list)
The short feature bullets under each PDP's star rating (`.pdp-bullets`) are **marketing descriptors, not the verbatim legal ingredient lists** (those live in WHAT'S INSIDE). Rewritten June 16 2026 to read like a flavor's component stack. Some flavors run 2 bullets, some 3:
- **PB Max'd:** Sweet & Creamy Peanut Butter · Crunchy Wholegrain Cookies · Milk Chocolate Candy Coated Frosting
- **90's Crisps:** Sweet Peanut Butter Cream · Crispy Crunchy Cookies
- **Cowabunga Pies:** Vanilla Pudding flavored Cashew Butter · Green Glazed Pie Chips
- **NuttyFinger BBs:** Sweet & Creamy Peanut Butter · Chopped Crispy Peanut Butter Crunch · Milk Chocolate Chips
- **Lunch Box Granola:** Chewy & Crispy Peanut Butter · Milk Chocolate Candy Coated Frosting · Mini CandyGems
- **The King:** Sweet & Creamy Peanut Butter · Banana Mallow Cream · Chocolate Candy Coated Frosting
- ⚠️ **Trademark-safe naming:** never name real brands in the bullets. "Butterfinger" → **Chopped Crispy Peanut Butter Crunch**; "M&M's"/"Minis" → **Mini CandyGems**. Use generic descriptors or N&N's own coined names.

## OG snack images — local
The before/after "original snack" images are LOCAL in `assets/img/og/` (pb-max, pb-crisps, turtle-pies, butterfinger-bbs, kudos-bar) — pulled off ibb after it flaked on load. Before-image alt text fixed per flavor (was a clone leftover "The original PB Max candy bar" on every page).

## Nav & Hero details

- Nav right group: search (`/search`), account (`/account/login`, desktop only — mobile menu has an ACCOUNT link instead), cart (`/cart`)
- Cart icon is a custom jar SVG (ridged lid + squat body) matching the feather-style 2.5 stroke of the other icons; red count bubble sits on the lid corner
- Hero review badge above the H1: five ★ in individual `--blue` boxes (25×23px, 17px star) + "EXCELLENT 4.86/5 CUSTOMER REVIEWS" in small cream Bebas. Mobile: stacked (stars over text) and drops the word "EXCELLENT"; desktop: inline row
- **Cart icon = monoline JAR (inline SVG)** in the nav — a squat nut-butter jar (wide flat screw-lid + label line) drawn in the same feather/2.5-stroke line style as search/account so it inherits ink + stays crisp; `.header-cart__icon` 27px mobile / 31px desktop, red count badge on the corner. Replaced the old illustrated basket PNG (Jay: looked "corny"/generic). The cassette-tape and grocery-basket directions were tried and rejected first. (The old `assets/img/nn-cart-basket.png` has been deleted.)
- **Hero video panel is square (1:1) on mobile AND desktop.** Plays Jay's own graded clip `assets/video/hero-main-v2.mp4` (480×480, local). **Authentic VHS/camcorder treatment** on `.hero__video-bg video`: SVG **chromatic aberration** (`#vhs-chroma`, inline svg in the hero markup — R/B channel split) + soft-focus `blur(0.4px)` + a lifted/punchy grade, plus `hero-vhs-jitter` tape jolt, the `::before` tracking band, the `::after` B/W film grain, and a `.hero__vhs` scanline+vignette overlay. **`isolation: isolate` on `.hero__video-bg` traps every VHS layer over the video only — the headline/REC/CTA stay clean** (hard rule: effects on the footage, never the text). Reviews TV still uses the old `hero-main.mp4`. All reduced-motion-safe.
- **Proof ticker (red marquee):** 3 phrases — "FREE SHIPPING ON ORDERS $65 OR MORE / PRE-ORDER NOW / 3,800+ 5-STAR REVIEWS" — split by a yellow ▶ (`.proof-ticker__sep`). Faster (13s loop) with a VHS tracking shudder on the bar (`ticker-tracking`) + chromatic brand-color text ghost.

## 35 lb Bucket — price anchor (`.bucket` in styles.css, `product-bucket.html`)
Full-bleed **late-night infomercial** section placed **above the Pre-Order Drop grid** (after the proof ticker). A deliberate **$399 price anchor** so the $14.99 jars read cheap, plus a wow piece with free shipping.
- **Mobile = centered** single column: `● LIMITED RUN` → "35 POUNDS OF / 90'S CRISPS." (cream + yellow) → bucket image → one-line copy → `$399` + yellow `▶ FREE SHIPPING` pill → value reframe ("35 of our 1-lb jars — about $125 less...") → red `CLAIM THE BUCKET` (→ `product-bucket.html`) → "30-day money-back guarantee · Secure checkout". `CH90 · LIVE` corner.
- **Desktop (≥860px) = split:** bucket image LEFT, copy RIGHT (CSS-grid placement on the flat markup, so mobile stays centered). `CH90 · LIVE` pinned to the centered-content right edge (`right: max(16px, calc(50% - 540px))`) so it doesn't bleed off the full-bleed edge.
- **Background = deep radial blue** (`radial-gradient(ellipse at 50% 40%, #3470EC, #1F52B8 48%, #143A82)`) for premium "spotlight" infomercial depth + inset CRT vignette + footer-style dot-snow static (`bucket-snow`, ~half footer intensity).
- Bucket image on ibb (`i.ibb.co/qFkkRNv9/...`) — localize before launch.
- **`product-bucket.html`** = the real $399 product page (PDP clone: 35 LB, free-shipping messaging, no flavor switcher, "PREFER THE JARS?" cross-sell to the jar PDPs).

## Product page (`product.html`) — prototyped on PB Max'd

One OS 2.0 template; everything flavor-specific comes from each product's data/metafields at conversion. `--flavor` / `--flavor-text` set inline on `<main class="pdp">` drives all flavor color.

- **Buy zone:** slideshow gallery (no thumbnail row; arrows + dots + swipe; first slide = the flavor wrapper) → flavor name → star rating → 3 ingredient bullets (▶ play-triangle markers) → **flavor-color guarantee chip** "LOVE IT OR YOUR MONEY BACK" (compact one line on mobile) → price + IN STOCK + quantity stepper → **flavor switcher** → red ADD TO CART → 3 trust icons (Secure / 30-Day Returns / Trusted, with dividers) + truck-led FREE SHIPPING line. **Bundles removed for now** (undecided). Sticky mobile ATC on scroll.
  - **Flavor switcher (`.pdp-flavors__row`):** 62px swatch cards, jars fill the card (`.pdp-flavor img` padding 3px — the King is padded to 8px since its PNG is tighter-cropped/no transparent padding). **6 flavor cards + a 7th 35lb-bucket card** (`.pdp-flavor--bucket`, deep-blue radial → product-bucket.html) on all 6 flavor PDPs. Active flavor leads + `is-active`.
- **THE ORIGINAL:** raised "ticket" header (notched stub) + **before/after drag slider** — original snack (cream side) ↔ jar (flavor side); words ("ORIGINAL"/"REMADE") fade in only as you drag into each side; clean color split at rest. Real PB Max origin story (1989, ~$50M/yr, killed reportedly over the Mars family disliking peanut butter — verified/hedged).
- **WHAT'S INSIDE:** ingredients + allergens blocks + full retro Nutrition Facts panel — all `—` placeholders (no invented numbers; Jay supplies real label data). Badges are factual label descriptors only (READY-TO-EAT / 16 OZ JAR / NOSTALGIC DESSERT) — NO health claims.
- **Reviews:** Judge.me at conversion (badge in buy box + review widget), restyled to brand. **COLLECT ALL 6:** mini flavor-wrapper cross-sell cards. `.mini-card__jar` jars sized 94% so they fill the card; The King is overridden to 80% (`.mini-card[href="product-the-king.html"] .mini-card__jar`) since its art is tighter-cropped — so all 6 read the same size.
- **35lb bucket page gallery** reduced to a **single image** (the `--jar` solid-blue bucket); removed the duplicate `--card` slide + the two SCALE/SCOOP placeholders + the now-pointless arrows/dots (slider JS is guarded, so a single slide is safe). ⚠️ The `.pdp-reviews` header reuses the homepage `.ugc__title` / `.ugc__rating-text` (which are **cream** for the homepage's dark stage) — on the PDP's light wax bg they were invisible; fixed with `.pdp-reviews .ugc__title, .pdp-reviews .ugc__rating-text { color: var(--ink); }`.

### Shopify conversion map
Reviews = Judge.me widgets (connected). Everything else = product data / metafields: flavor_color, bullets, ingredients, allergens, nutrition_*, original_story, original_image; gallery = product.media; flavor switcher = the "All Drops" collection. Guarantee/trust/shipping are static in the template.

## Notes

- Desktop Drops card name = 1.875rem, price = 1.625rem (mobile stays small)
- **Drop-card spacing tightened on BOTH mobile + desktop** (`.drops` + `.shop-grid`): name/price/CTA hug the jar — `gap: 0.4rem`, `__link` gap 0.3rem, `__name` top-aligned + `margin-top: 0.15rem`. **CTA alignment:** the name reserves a fixed height so every price + ADD TO CART lines up across a row regardless of name length — **2 lines on mobile** (base, since names like "LUNCH BOX GRANOLA BAR" wrap there), **1 line on desktop** (`min-height: 1.15em` override at ≥1024px, where names fit one line).
- **Shop page:** the gray "NEXT DROP / COMING SOON" placeholder card was removed (grid ends with The King).
- **Product display names reconciled to Shopify (June 2026):** the customer-facing name "THE KING" was changed to **"PB & Banana Creme"** sitewide (drop/mini/revive/sticky cards, cart `data-name`, PDP title/H1/breadcrumb/flavor label) to match the Shopify product title; the jar art, file `product-the-king.html`, image URLs, `--flavor:#7A3DB8`, and the og-story (real 2007 Reese's "The King" edition) are **unchanged**. "NUTTYFINGER BBs" → **"NUTTYFINGER BB'S"** sitewide (display only; filenames untouched).
- All product images in The Drops are placeholders — real shots to be swapped in
- Logo: left-aligned on desktop, centered on mobile (`https://i.ibb.co/Z6Y6y2kB/nn-logo-rebrand.png`)
- Hero: VIDEO panel first on mobile (CTA above fold) / side-by-side on desktop (video left, before/after right)
- Hero before/after panel: wipes between discontinued snack shelf → N&N jar shelf, no text
- Pre-order launch phase — H1 reads "PRE-ORDERS / NOW LIVE."
- Convert to Shopify OS 2.0 after all sections are approved
