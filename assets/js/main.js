/* =====================================================
   NUTTY & NOSTALGIC — main.js
   ===================================================== */

(function () {
  'use strict';

  /* ---- Mobile nav ---- */
  const toggle   = document.getElementById('nav-toggle');
  const close    = document.getElementById('nav-close');
  const nav      = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('nav-backdrop');
  let scrollY    = 0;

  function openNav() {
    scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    nav.classList.add('is-open');
    nav.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('is-visible');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    close.focus();
  }

  function closeNav() {
    nav.classList.remove('is-open');
    nav.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('is-visible');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    window.scrollTo(0, scrollY);
    toggle.focus();
  }

  toggle.addEventListener('click', openNav);
  close.addEventListener('click', closeNav);
  backdrop.addEventListener('click', closeNav);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) closeNav();
  });

  /* ---- Channel flip: start animation on scroll into view ---- */
  const flipSection = document.querySelector('.channel-flip');
  if (flipSection) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.25 }).observe(flipSection);
  }

  /* ---- TV section: OG → jar wipe when product reaches viewport center ---- */
  const tvSection = document.querySelector('.tv-section');
  if (tvSection) {
    const tvPairs = Array.from(tvSection.querySelectorAll('.tv-pair'));
    let tvRafId = null;

    function checkTvCenter() {
      const cx = window.innerWidth / 2;
      tvPairs.forEach(function (pair) {
        const r = pair.getBoundingClientRect();
        const pairCx = r.left + r.width / 2;
        if (Math.abs(pairCx - cx) < r.width * 0.35) {
          pair.classList.add('is-transforming');
        } else if (r.right < 0) {
          pair.classList.remove('is-transforming');
        }
      });
      tvRafId = requestAnimationFrame(checkTvCenter);
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!tvRafId) tvRafId = requestAnimationFrame(checkTvCenter);
          } else {
            if (tvRafId) { cancelAnimationFrame(tvRafId); tvRafId = null; }
          }
        });
      }, { threshold: 0 }).observe(tvSection);
    }
  }

  /* ---- Master Tapes: VHS comparison slider ---- */
  (function () {
    var screen   = document.getElementById('tape-screen');
    if (!screen) return;

    var ogLayer  = document.getElementById('tape-og');
    var ogImg    = document.getElementById('tape-og-img');
    var jarImg   = document.getElementById('tape-jar-img');
    var grip     = document.getElementById('tape-grip');
    var staticEl = document.getElementById('tape-static');
    var range    = document.getElementById('tape-range');
    var buttons  = Array.from(document.querySelectorAll('.tape-btn'));

    var TAPES = [
      { og: 'https://i.ibb.co/8DkNjHpy/pb-max.png',        jar: 'https://i.ibb.co/nqC0h1NL/pb-max-d-transparent.png',        bg: '#f0d8ca' },
      { og: 'https://i.ibb.co/Q3Gm6vxV/pb-crisps.png',      jar: 'https://i.ibb.co/nqRbWfKd/90s-crisps-transparent.png',      bg: '#d5ddf0' },
      { og: 'https://i.ibb.co/zVqWPZ44/turtle-pies.png',     jar: 'https://i.ibb.co/1YTLY8gd/cowabunga-pies-transparent.png',  bg: '#d0e8d5' },
      { og: 'https://i.ibb.co/4LZ8TbB/butterfinger-bbs.png', jar: 'https://i.ibb.co/jk3cJV3z/nuttyfinger-bbs-transparent.png', bg: '#eeddcc' },
      { og: 'https://i.ibb.co/fYH6qqR7/kudos-bar.png',       jar: 'https://i.ibb.co/XkGvC1N4/granola-bar-transparent.png',     bg: '#f0e8c5' }
    ];

    var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var currentTape = 0;
    var wipe = 35;
    var dragging = false;
    var rafId = null;
    var pendingWipe = null;

    function setWipe(pct) {
      wipe = Math.min(98, Math.max(2, pct));
      screen.style.setProperty('--wipe', wipe + '%');
      range.value = wipe;
    }

    function scheduleWipe(clientX) {
      var rect = screen.getBoundingClientRect();
      pendingWipe = ((clientX - rect.left) / rect.width) * 100;
      if (!rafId) rafId = requestAnimationFrame(flushWipe);
    }

    function flushWipe() {
      rafId = null;
      if (pendingWipe !== null) { setWipe(pendingWipe); pendingWipe = null; }
    }

    screen.addEventListener('pointerdown', function (e) {
      dragging = true;
      screen.setPointerCapture(e.pointerId);
      scheduleWipe(e.clientX);
    });

    screen.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      scheduleWipe(e.clientX);
    });

    screen.addEventListener('pointerup',     function () { dragging = false; });
    screen.addEventListener('pointercancel', function () { dragging = false; });

    range.addEventListener('input', function () {
      setWipe(parseFloat(range.value));
    });

    range.addEventListener('focus', function () { grip.classList.add('has-focus'); });
    range.addEventListener('blur',  function () { grip.classList.remove('has-focus'); });

    function animateTo(target, ms) {
      var start = wipe;
      var t0 = performance.now();
      function step(now) {
        var t = Math.min(1, (now - t0) / ms);
        setWipe(start + (target - start) * (1 - Math.pow(1 - t, 2)));
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    function loadTape(i) {
      var tape = TAPES[i];
      ogImg.src  = tape.og;
      jarImg.src = tape.jar;
      screen.style.setProperty('--tape-og-bg', tape.bg);
    }

    function switchTape(i) {
      if (i === currentTape) return;
      currentTape = i;
      buttons.forEach(function (btn, idx) {
        btn.classList.toggle('is-active', idx === i);
        btn.setAttribute('aria-pressed', idx === i ? 'true' : 'false');
      });

      if (rm) {
        ogLayer.style.transition = 'opacity .12s';
        ogLayer.style.opacity = '0';
        setTimeout(function () {
          loadTape(i);
          ogLayer.style.opacity = '1';
        }, 80);
        return;
      }

      staticEl.classList.add('is-active');
      setTimeout(function () { loadTape(i); }, 90);
      setTimeout(function () { staticEl.classList.remove('is-active'); }, 190);
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchTape(parseInt(btn.dataset.tape, 10));
      });
    });

    /* Preload all images after first paint */
    window.addEventListener('load', function () {
      TAPES.forEach(function (t) {
        [t.og, t.jar].forEach(function (src) {
          var img = new Image();
          img.src = src;
        });
      });
    });

    /* Nudge affordance on first scroll into view */
    var nudged = false;
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !nudged) {
        nudged = true;
        if (!rm) {
          setTimeout(function () {
            animateTo(45, 450);
            setTimeout(function () { animateTo(35, 450); }, 450);
          }, 500);
        }
      }
    }, { threshold: 0.4 }).observe(screen);
  }());

  /* ---- Reduced-motion: pause video when it exists ---- */
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyMotion(mq) {
    document.querySelectorAll('video[autoplay]').forEach(function (v) {
      mq.matches ? v.pause() : v.play().catch(function () {});
    });
  }

  motionQuery.addEventListener('change', applyMotion);
  applyMotion(motionQuery);

})();

/* =====================================================
   PRODUCT PAGE — bundle selector, gallery, sticky ATC
   ===================================================== */
(function () {
  'use strict';

  var buy = document.querySelector('.pdp-buy');
  if (!buy) return;

  /* Gallery slideshow */
  var track = document.getElementById('pdp-track');
  if (track) {
    var slides = track.children.length;
    var dots = Array.from(document.querySelectorAll('.pdp-dot'));
    var index = 0;

    function go(i) {
      index = (i + slides) % slides;
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      dots.forEach(function (d, n) { d.classList.toggle('is-active', n === index); });
    }

    var prev = document.getElementById('pdp-prev');
    var next = document.getElementById('pdp-next');
    if (prev) prev.addEventListener('click', function () { go(index - 1); });
    if (next) next.addEventListener('click', function () { go(index + 1); });
    dots.forEach(function (d, n) { d.addEventListener('click', function () { go(n); }); });

    /* Touch swipe */
    var x0 = null;
    track.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* Quantity stepper */
  var qtyVal = document.getElementById('qty-val');
  var qtyMinus = document.getElementById('qty-minus');
  var qtyPlus = document.getElementById('qty-plus');
  if (qtyVal && qtyMinus && qtyPlus) {
    var qty = 1;
    function setQty(n) { qty = Math.max(1, Math.min(99, n)); qtyVal.textContent = qty; }
    qtyMinus.addEventListener('click', function () { setQty(qty - 1); });
    qtyPlus.addEventListener('click', function () { setQty(qty + 1); });
  }

  /* Before / after comparison slider */
  var ba = document.getElementById('ba');
  if (ba) {
    var baRange = document.getElementById('ba-range');
    var baDrag = false, baRaf = null, baPending = null;

    function baSet(pct) {
      pct = Math.max(2, Math.min(98, pct));
      ba.style.setProperty('--split', pct + '%');
      /* Each word fades in as its side is dragged open past center */
      ba.style.setProperty('--orig-op', Math.max(0, Math.min(1, (pct - 50) / 38)));
      ba.style.setProperty('--remade-op', Math.max(0, Math.min(1, (50 - pct) / 38)));
      if (baRange) baRange.value = pct;
    }
    function baFromX(clientX) {
      var r = ba.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * 100;
    }
    function baFlush() { baRaf = null; if (baPending !== null) { baSet(baPending); baPending = null; } }
    function baSched(clientX) { baPending = baFromX(clientX); if (!baRaf) baRaf = requestAnimationFrame(baFlush); }

    ba.addEventListener('pointerdown', function (e) { baDrag = true; ba.setPointerCapture(e.pointerId); baSched(e.clientX); });
    ba.addEventListener('pointermove', function (e) { if (baDrag) baSched(e.clientX); });
    ba.addEventListener('pointerup', function () { baDrag = false; });
    ba.addEventListener('pointercancel', function () { baDrag = false; });
    if (baRange) baRange.addEventListener('input', function () { baSet(parseFloat(baRange.value)); });
  }

  /* Sticky mobile ATC — show after the buy box scrolls out */
  var sticky = document.getElementById('pdp-sticky');
  var atc = document.querySelector('.pdp-atc');
  if (sticky && atc) {
    new IntersectionObserver(function (entries) {
      sticky.classList.toggle('is-visible', !entries[0].isIntersecting);
      sticky.setAttribute('aria-hidden', entries[0].isIntersecting ? 'true' : 'false');
    }, { rootMargin: '-80px 0px 0px 0px' }).observe(atc);
  }
})();

/* =====================================================
   ABOUT: Cancelled → Revived flip cards (tap on touch)
   ===================================================== */
(function () {
  'use strict';
  var cards = document.querySelectorAll('.revive-card');
  if (!cards.length) return;
  cards.forEach(function (card) {
    card.addEventListener('click', function () { card.classList.toggle('is-flipped'); });
    var back = card.querySelector('.revive-card__back');
    if (back) back.addEventListener('click', function (e) { e.stopPropagation(); });
  });
})();

/* =====================================================
   FOOTER: REWIND — fast scroll to top with static flicker
   ===================================================== */
(function () {
  'use strict';

  var btn = document.getElementById('footer-rewind');
  if (!btn) return;

  var staticEl = document.getElementById('rewind-static');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rewinding = false;

  btn.addEventListener('click', function () {
    if (rm) { window.scrollTo(0, 0); return; }
    if (rewinding) return;
    rewinding = true;

    staticEl.classList.add('is-active');

    var from = window.scrollY;
    var ms = Math.min(900, 350 + from * 0.12);
    var t0 = performance.now();

    function step(now) {
      var p = Math.min(1, (now - t0) / ms);
      var eased = 1 - Math.pow(1 - p, 3);
      window.scrollTo(0, from * (1 - eased));
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(function () {
          staticEl.classList.remove('is-active');
          rewinding = false;
        }, 120);
      }
    }
    requestAnimationFrame(step);
  });
})();

/* =====================================================
   CART DRAWER — open/close, qty, live subtotal,
   free-shipping bar + celebration, one-tap upsell
   ===================================================== */
(function () {
  var drawer = document.getElementById('cart-drawer');
  if (!drawer) return;

  var backdrop = document.getElementById('cart-backdrop');
  var closeBtn = document.getElementById('cart-close');
  var itemsWrap = document.getElementById('cart-items');
  var shipEl = document.getElementById('cart-ship');
  var shipMsg = document.getElementById('cart-ship-msg');
  var shipFill = document.getElementById('cart-ship-fill');
  var subtotalEl = document.getElementById('cart-subtotal');
  var drawerCount = document.getElementById('cart-drawer-count');
  var navCount = document.getElementById('cart-count');
  var threshold = parseFloat(shipEl.getAttribute('data-threshold')) || 65;
  var LOWEST_JAR = 14.99; // cheapest eligible jar — drives the "add N more jars" math + the one-away nudge
  if (shipMsg) shipMsg.setAttribute('aria-live', 'polite');
  var wasUnlocked = false;

  function money(n) { return '$' + n.toFixed(2); }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // On-brand confetti: SMPTE color chips + play triangles + stars burst from the bar
  function spawnConfetti() {
    if (reduceMotion) return;
    var colors = ['#F5E6C8', '#FFC42E', '#2E6BE6', '#7BC74D', '#E63B2E', '#ffffff', '#54c8d6'];
    var layer = document.createElement('div');
    layer.className = 'cart-confetti';
    layer.style.top = (shipEl.offsetTop + shipEl.offsetHeight / 2) + 'px'; // bar center, in the drawer
    for (var i = 0; i < 24; i++) {
      var bit = document.createElement('span');
      var t = Math.random();
      var kind = t < 0.62 ? 'chip' : (t < 0.82 ? 'tri' : 'star');
      bit.className = 'cart-confetti__bit cart-confetti__bit--' + kind;
      if (kind === 'chip') {
        bit.style.background = colors[i % colors.length];
      } else {
        bit.textContent = kind === 'tri' ? '▶' : '★';
        bit.style.color = (i % 2) ? '#FFC42E' : '#E63B2E';
      }
      bit.style.setProperty('--dx', ((Math.random() * 2 - 1) * 155).toFixed(0) + 'px');
      bit.style.setProperty('--spin', ((Math.random() * 2 - 1) * 540).toFixed(0) + 'deg');
      bit.style.animationDelay = (Math.random() * 0.09).toFixed(3) + 's';
      layer.appendChild(bit);
    }
    shipEl.parentNode.appendChild(layer); // the cart drawer (positioned) — no viewport math
    setTimeout(function () { layer.remove(); }, 1700);
  }

  function recalc() {
    var subtotal = 0, count = 0;
    itemsWrap.querySelectorAll('.cart-item').forEach(function (item) {
      var price = parseFloat(item.getAttribute('data-price')) || 0;
      var qty = parseInt(item.getAttribute('data-qty'), 10) || 0;
      subtotal += price * qty;
      count += qty;
      var line = item.querySelector('.cart-item__price');
      if (line) line.textContent = money(price * qty);
      var nEl = item.querySelector('.cart-qty__n');
      if (nEl) nEl.textContent = qty;
    });

    if (subtotalEl) subtotalEl.textContent = money(subtotal);
    if (drawerCount) drawerCount.textContent = count;
    if (navCount) navCount.textContent = count;

    // hide the free-ship bar entirely when the cart is empty
    shipEl.style.display = count ? '' : 'none';

    var pct = Math.min(100, (subtotal / threshold) * 100);
    shipFill.style.width = pct + '%';

    var unlocked = subtotal >= threshold;
    if (unlocked) {
      shipMsg.innerHTML = '★ FREE SHIPPING UNLOCKED ★';
      if (!wasUnlocked) {
        // retrigger the celebration animation + burst confetti
        shipEl.classList.remove('is-unlocked');
        void shipEl.offsetWidth;
        shipEl.classList.add('is-unlocked');
        spawnConfetti();
      }
    } else {
      var left = threshold - subtotal;
      var jars = Math.ceil(left / LOWEST_JAR);
      shipMsg.innerHTML = "You're <strong>" + money(left) + "</strong> away &mdash; add " + jars + " more jar" + (jars === 1 ? "" : "s") + " for FREE shipping";
      shipEl.classList.remove('is-unlocked');
    }

    // #7 — when adding one jar would land free shipping, light up a "Complete the Set" jar
    var oneAway = count > 0 && !unlocked && (threshold - subtotal) <= LOWEST_JAR;
    var nudgeCard = drawer.querySelector('.cart-add');
    var upsellTitle = drawer.querySelector('.cart-upsell__title');
    if (nudgeCard) nudgeCard.classList.toggle('is-ship-nudge', oneAway);
    if (upsellTitle) upsellTitle.textContent = oneAway ? 'ONE JAR FROM FREE SHIPPING' : 'COMPLETE THE SET';

    wasUnlocked = unlocked;
  }

  function openCart() {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open from any cart icon in the header
  document.querySelectorAll('.header-cart').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); openCart(); });
  });
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (backdrop) backdrop.addEventListener('click', closeCart);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeCart();
  });

  // Qty steppers + remove (event delegation)
  itemsWrap.addEventListener('click', function (e) {
    var stepBtn = e.target.closest('.cart-qty__btn');
    if (stepBtn) {
      var item = stepBtn.closest('.cart-item');
      var qty = (parseInt(item.getAttribute('data-qty'), 10) || 0) + parseInt(stepBtn.getAttribute('data-step'), 10);
      if (qty <= 0) { item.remove(); } else { item.setAttribute('data-qty', qty); }
      recalc();
      return;
    }
    var rm = e.target.closest('.cart-item__remove');
    if (rm) { rm.closest('.cart-item').remove(); recalc(); }
  });

  // One-tap upsell add
  document.querySelectorAll('.cart-add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-name');
      var existing = Array.prototype.find.call(
        itemsWrap.querySelectorAll('.cart-item'),
        function (it) { return it.querySelector('.cart-item__name').textContent === name; }
      );
      if (existing) {
        existing.setAttribute('data-qty', (parseInt(existing.getAttribute('data-qty'), 10) || 0) + 1);
      } else {
        var price = btn.getAttribute('data-price');
        var jar = btn.getAttribute('data-jar');
        var flavor = btn.getAttribute('data-flavor');
        var variant = btn.getAttribute('data-variant') || '16 oz jar';
        var el = document.createElement('div');
        el.className = 'cart-item';
        el.setAttribute('data-price', price);
        el.setAttribute('data-qty', '1');
        el.setAttribute('style', '--flavor:' + flavor);
        el.innerHTML =
          '<img class="cart-item__jar" src="' + jar + '" alt="' + name + '" width="120" height="120">' +
          '<div class="cart-item__info">' +
            '<span class="cart-item__name">' + name + '</span>' +
            '<span class="cart-item__variant">' + variant + '</span>' +
            '<div class="cart-qty" role="group" aria-label="Quantity">' +
              '<button type="button" class="cart-qty__btn" data-step="-1" aria-label="Decrease quantity">−</button>' +
              '<span class="cart-qty__n">1</span>' +
              '<button type="button" class="cart-qty__btn" data-step="1" aria-label="Increase quantity">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="cart-item__right">' +
            '<span class="cart-item__price">' + ('$' + parseFloat(price).toFixed(2)) + '</span>' +
            '<button type="button" class="cart-item__remove" aria-label="Remove item">REMOVE</button>' +
          '</div>';
        itemsWrap.appendChild(el);
      }
      recalc();
    });
  });

  recalc();
})();

/* ---- Reviews testimonial reel (broadcast-style cycle) ---- */
(function () {
  var reel = document.getElementById('rev-reel');
  if (!reel) return;
  var slides = Array.prototype.slice.call(reel.querySelectorAll('.ugc__tm'));
  if (slides.length < 2) return;
  var staticEl = document.getElementById('rev-static');
  var chEl = document.getElementById('rev-ch');
  var prev = document.getElementById('rev-prev');
  var next = document.getElementById('rev-next');
  var i = 0;
  var timer;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, idx) { s.classList.toggle('is-active', idx === i); });
    if (chEl) chEl.textContent = 'CH ' + (slides[i].getAttribute('data-ch') || ('0' + (i + 1)));
    if (staticEl && !reduce) {
      staticEl.classList.add('is-cut');
      setTimeout(function () { staticEl.classList.remove('is-cut'); }, 160);
    }
  }
  function go(n) { show(n); restart(); }
  function restart() { clearInterval(timer); timer = setInterval(function () { show(i + 1); }, 5000); }

  if (next) next.addEventListener('click', function () { go(i + 1); });
  if (prev) prev.addEventListener('click', function () { go(i - 1); });
  reel.addEventListener('mouseenter', function () { clearInterval(timer); });
  reel.addEventListener('mouseleave', restart);
  restart();
})();

/* ---- Get Notified — channel tuner: jump-tabs, scroll-spy, channel-change FX ---- */
(function () {
  var tabsNav = document.querySelector('.notify-tabs');
  if (!tabsNav) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tabs = Array.prototype.slice.call(tabsNav.querySelectorAll('.notify-tab'));
  var osd = document.getElementById('notify-osd');
  var snow = document.getElementById('notify-static');
  var snowTimer, osdTimer;

  function setActive(id) {
    tabs.forEach(function (t) { t.classList.toggle('is-active', t.getAttribute('href') === id); });
  }

  function channelChange(tab) {
    if (reduce) return;
    if (snow) {
      snow.classList.remove('is-on');
      void snow.offsetWidth; // restart the burst
      snow.classList.add('is-on');
      clearTimeout(snowTimer);
      snowTimer = setTimeout(function () { snow.classList.remove('is-on'); }, 320);
    }
    if (osd) {
      var chEl = osd.querySelector('.notify-osd__ch');
      var nameEl = osd.querySelector('.notify-osd__name');
      if (chEl) chEl.textContent = tab.getAttribute('data-ch') || '';
      if (nameEl) nameEl.textContent = tab.getAttribute('data-name') || '';
      osd.classList.remove('is-on');
      void osd.offsetWidth;
      osd.classList.add('is-on');
      clearTimeout(osdTimer);
      osdTimer = setTimeout(function () { osd.classList.remove('is-on'); }, 1650);
    }
  }

  tabsNav.addEventListener('click', function (e) {
    var a = e.target.closest('.notify-tab');
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id.charAt(0) !== '#') return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    setActive(id);
    channelChange(a);
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (history.replaceState) history.replaceState(null, '', id);
  });

  if (tabs[0]) setActive(tabs[0].getAttribute('href'));

  // Scroll-spy: light the channel whose section is in view
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) setActive('#' + en.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    Array.prototype.forEach.call(document.querySelectorAll('.notify-cat'), function (c) { spy.observe(c); });
  }
})();

/* ---- Get Notified — live search (OSD tuner readout + filter, hide empty channels) ---- */
(function () {
  var input = document.getElementById('notify-search');
  if (!input) return;
  var screen = input.closest('.notify-search');
  var cats = Array.prototype.slice.call(document.querySelectorAll('.notify-cat'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.notify-card'));
  var noResults = document.getElementById('notify-noresults');
  var readout = document.getElementById('notify-readout');
  var total = cards.length;

  function setReadout(q, count) {
    if (!readout) return;
    if (!q) { readout.textContent = total + ' FLAVORS'; readout.classList.remove('is-nosignal'); }
    else if (count === 0) { readout.textContent = 'NO SIGNAL'; readout.classList.add('is-nosignal'); }
    else { readout.textContent = count + ' FOUND'; readout.classList.remove('is-nosignal'); }
  }

  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    var count = 0;

    cards.forEach(function (card) {
      var nameEl = card.querySelector('.drop-card__name');
      var name = nameEl ? nameEl.textContent.toLowerCase() : '';
      var match = !q || name.indexOf(q) !== -1;
      card.classList.toggle('is-hidden', !match);
      if (match) count++;
    });

    cats.forEach(function (cat) {
      var hasVisible = cat.querySelector('.notify-card:not(.is-hidden)');
      cat.classList.toggle('is-hidden', !hasVisible);
    });

    if (noResults) noResults.hidden = !(q && count === 0);
    if (screen) screen.classList.toggle('is-typing', q.length > 0);
    setReadout(q, count);
  });

  setReadout('', total);
})();

/* ---- Reviews — ratings-board power-on (VU sweep + count-up + star flicker) ---- */
(function () {
  var panel = document.querySelector('.rv-summary__panel');
  if (!panel) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { panel.classList.remove('is-armed'); return; }

  var avg = document.getElementById('rv-avg');
  if (avg) avg.textContent = '0.00';

  var played = false;
  function play() {
    if (played) return;
    played = true;
    panel.classList.remove('is-armed');
    panel.classList.add('is-on');
    if (!avg) return;
    var target = parseFloat(avg.getAttribute('data-count')) || 0;
    var start = null, dur = 1050;
    function tick(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      avg.textContent = (eased * target).toFixed(2);
      if (p < 1) requestAnimationFrame(tick); else avg.textContent = target.toFixed(2);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { play(); io.disconnect(); } });
    }, { threshold: 0.35 });
    io.observe(panel);
  } else {
    play();
  }
})();

/* ---- Reviews — per-flavor carousels + sticky flavor jump-nav scrollspy ---- */
(function () {
  var nav = document.getElementById('rv-flavornav');
  if (!nav) return;

  // Carousel arrows (desktop). Mobile uses native swipe.
  var carousels = document.querySelectorAll('.rv-carousel');
  Array.prototype.forEach.call(carousels, function (car) {
    var track = car.querySelector('.rv-car__track');
    var prev = car.querySelector('.rv-car__nav--prev');
    var next = car.querySelector('.rv-car__nav--next');
    if (!track || !prev || !next) return;

    function step() {
      var card = track.querySelector('.rv-card');
      return card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
    }
    function update() {
      var max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    }
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  // Scrollspy — light up the chip whose flavor section is in view.
  var chips = Array.prototype.slice.call(nav.querySelectorAll('.rv-fchip'));
  function setActive(id) {
    chips.forEach(function (c) {
      c.classList.toggle('is-active', c.getAttribute('href') === '#' + id);
    });
  }
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    chips.forEach(function (c) {
      var sec = document.querySelector(c.getAttribute('href'));
      if (sec) spy.observe(sec);
    });
  }
  if (chips[0]) chips[0].classList.add('is-active');
})();

/* ---- Reviews — "Read more" modal for clamped cards ---- */
(function () {
  var modal = document.getElementById('rv-modal');
  if (!modal) return;
  var mStars = document.getElementById('rv-modal-stars');
  var mTitle = document.getElementById('rv-modal-title');
  var mQuote = document.getElementById('rv-modal-quote');
  var mJar = document.getElementById('rv-modal-jar');
  var mName = document.getElementById('rv-modal-name');
  var mFlavor = document.getElementById('rv-modal-flavor');
  var lastFocus = null;

  function openModal(card) {
    var stars = card.querySelector('.rv-card__stars');
    var title = card.querySelector('.rv-card__title');
    var quote = card.querySelector('.rv-card__quote');
    var jar = card.querySelector('.rv-card__jar');
    var name = card.querySelector('.rv-card__name');
    var section = card.closest('.rv-flavor');
    var fname = section ? section.querySelector('.rv-flavor__name') : null;

    mStars.innerHTML = stars ? stars.innerHTML : '';
    mTitle.textContent = title ? title.textContent : '';
    mQuote.innerHTML = quote ? quote.innerHTML : '';
    mJar.src = jar ? jar.src : '';
    mName.textContent = name ? name.textContent : '';
    mFlavor.textContent = fname ? fname.textContent : '';

    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('rv-modal-close').focus();
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-rv-close') || e.target.id === 'rv-modal-close') closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  // Add "Read more" only to cards whose body actually overflows the clamp.
  var cards = document.querySelectorAll('.rv-car__track > .rv-card:not(.rv-card--cta)');
  Array.prototype.forEach.call(cards, function (card) {
    var quote = card.querySelector('.rv-card__quote');
    if (!quote) return;
    if (quote.scrollHeight - quote.clientHeight > 2) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'rv-card__more';
      btn.textContent = 'READ MORE ▸';
      quote.insertAdjacentElement('afterend', btn);
      btn.addEventListener('click', function () { openModal(card); });
    }
  });
})();

/* ---- Time Capsule — left-edge REWIND tab + CRT video modal (homepage) ---- */
(function () {
  var tab = document.getElementById('capsule-open');
  var modal = document.getElementById('capsule-modal');
  if (!tab || !modal) return;
  var video = document.getElementById('capsule-video');
  var staticEl = document.getElementById('capsule-static');
  var screenEl = modal.querySelector('.capsule-tv__screen');
  var closeBtn = document.getElementById('capsule-close');
  var muteBtn = document.getElementById('capsule-mute');
  var backdrop = document.getElementById('capsule-backdrop');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal the tab once you've scrolled past the hero
  function onScroll() {
    var show = window.pageYOffset > window.innerHeight * 0.55;
    tab.classList.toggle('is-visible', show);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMuteIcon() { muteBtn.innerHTML = video.muted ? '🔇' : '🔊'; }

  function open() {
    if (!video.src) video.src = video.getAttribute('data-src'); // lazy-load
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    video.currentTime = 0;
    video.muted = false;
    setMuteIcon();
    // CRT power-on: flash → static snow + sync-roll → the picture tunes in
    if (!reduce && staticEl) {
      if (screenEl) screenEl.classList.add('is-tuning');
      staticEl.classList.add('is-on');
      setTimeout(function () {
        staticEl.classList.remove('is-on');
        if (screenEl) screenEl.classList.remove('is-tuning');
      }, 1050);
    }
    var p = video.play();
    if (p && p.catch) p.catch(function () { video.muted = true; setMuteIcon(); video.play(); });
    closeBtn.focus();
  }
  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    video.pause();
    tab.focus();
  }

  tab.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);
  muteBtn.addEventListener('click', function () { video.muted = !video.muted; setMuteIcon(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
  video.addEventListener('ended', close);
})();

/* ---- Nutty Hotline — launcher + call-in modal (canned-reply prototype; real bot wires in via Cloudflare embed) ---- */
(function () {
  function nnHotlineInit() {
  var openBtn = document.getElementById('nn-hotline-open');
  var modal = document.getElementById('nn-call');
  if (!openBtn || !modal) return;
  var backdrop = document.getElementById('nn-call-backdrop');
  var closeBtn = document.getElementById('nn-call-close');
  var log = document.getElementById('nn-call-log');
  var form = document.getElementById('nn-call-form');
  var input = document.getElementById('nn-call-input');
  var quick = document.getElementById('nn-call-quick');
  var greeted = false;

  // True visible viewport height — excludes mobile toolbars AND the on-screen keyboard.
  // Drives the modal's --vvh so the input bar is never clipped (the #1 mobile-modal bug).
  function setVVH() {
    var h = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
    document.documentElement.style.setProperty('--vvh', h + 'px');
  }
  setVVH();
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setVVH);
    window.visualViewport.addEventListener('scroll', setVVH);
  } else {
    window.addEventListener('resize', setVVH);
  }

  // ---- Live bot wiring (Cloudflare Worker) ----
  var WORKER_URL = "https://designmynt-chatbot.jordyn-501.workers.dev/chat";
  var CLIENT_ID = "nutty-nostalgic";
  var GREETING = "You're through to the Nutty Hotline, operators (okay, operator) standing by. What can I get you: shipping, allergens, flavors, or a real human?";
  var CHIP_MSG = {
    shipping: "How does shipping work?",
    allergens: "What are the allergens?",
    flavors: "What flavors do you have?",
    human: "Can I talk to a human?"
  };
  var history = [];   // {role, content} turns sent to the worker for context
  var sending = false;
  var ended = false;

  function scrollDown() { log.scrollTop = log.scrollHeight; }
  function addMsg(who, text, cls) {
    var wrap = document.createElement('div');
    wrap.className = 'nn-msg ' + cls;
    var w = document.createElement('div'); w.className = 'nn-msg__who'; w.textContent = who;
    var b = document.createElement('div'); b.className = 'nn-msg__bubble'; b.textContent = text;
    wrap.appendChild(w); wrap.appendChild(b); log.appendChild(wrap); scrollDown();
  }
  function operatorMsg(text) {
    addMsg('OPERATOR', text, 'nn-msg--op');
    history.push({ role: 'assistant', content: text });
  }
  function showTyping() {
    var t = document.createElement('div');
    t.className = 'nn-msg nn-msg--op nn-typing';
    t.innerHTML = '<div class="nn-msg__who">OPERATOR</div><div class="nn-msg__bubble"><span></span><span></span><span></span></div>';
    log.appendChild(t); scrollDown();
    return t;
  }
  function sendToBot(text) {
    if (sending || ended || !text) return;
    sending = true;
    addMsg('YOU', text, 'nn-msg--me');
    history.push({ role: 'user', content: text });
    var typing = showTyping();
    fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ clientId: CLIENT_ID, message: text, history: history.slice(0, -1) })
    }).then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (typing.parentNode) log.removeChild(typing);
        sending = false;
        var meta = (data && data.meta) || {};
        if (meta.leadCapture) {
          operatorMsg("Best bet is to text or call us at 954-275-6577, or email jay@nuttynostalgic.com — a real human jumps on it, 8 to 8 Eastern.");
        } else {
          operatorMsg((data && data.reply) || "Sorry caller, didn't catch that — try me again?");
        }
        if (meta.sessionEnded) {
          ended = true;
          if (input) { input.disabled = true; input.placeholder = "Call ended — refresh to start over"; }
        }
      })
      .catch(function () {
        if (typing.parentNode) log.removeChild(typing);
        sending = false;
        operatorMsg("Hotline's a little fuzzy right now — text us at 954-275-6577 and a human will jump on it.");
      });
  }
  function openModal() {
    if (backdrop) backdrop.classList.add('is-open');
    modal.classList.add('is-open', 'is-connecting');
    modal.setAttribute('aria-hidden', 'false');
    openBtn.classList.add('is-read');
    setTimeout(function () { modal.classList.remove('is-connecting'); }, 460);
    if (!greeted) {
      greeted = true;
      setTimeout(function () { operatorMsg(GREETING); }, 380);
    }
    if (input && !ended) setTimeout(function () { input.focus(); }, 240);
  }
  function closeModal() {
    if (backdrop) backdrop.classList.remove('is-open');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    openBtn.focus();
  }
  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });
  if (quick) quick.addEventListener('click', function (e) {
    var chip = e.target.closest('.nn-call__chip'); if (!chip) return;
    sendToBot(CHIP_MSG[chip.getAttribute('data-ask')] || chip.textContent.trim());
  });
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var val = input.value.trim(); if (!val) return;
    input.value = '';
    sendToBot(val);
  });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', nnHotlineInit); } else { nnHotlineInit(); }
})();