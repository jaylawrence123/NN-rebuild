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
   FOOTER: CHANNEL SURF — CH up/down flips the footer
   between full-color channel screens with static bursts
   ===================================================== */
(function () {
  'use strict';

  var screen = document.getElementById('tv-screen');
  if (!screen) return;

  var osd      = document.getElementById('tv-osd');
  var staticEl = document.getElementById('tv-static');
  var upBtn    = document.getElementById('ch-up');
  var downBtn  = document.getElementById('ch-down');
  var channels = Array.from(screen.querySelectorAll('.tv-channel'));
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Surf order: 01 SHOP → 02 INFO → 03 FOLLOW → 04 GUIDE → 90 OFF AIR */
  var ORDER  = ['1', '2', '3', '4', '90'];
  var LABELS = {
    '1':  'CH 01 · SHOP',
    '2':  'CH 02 · INFO',
    '3':  'CH 03 · FOLLOW',
    '4':  'CH 04 · GUIDE',
    '90': 'CH 90 · OFF AIR'
  };

  var current = '4';
  var switching = false;

  function show(ch) {
    channels.forEach(function (el) {
      var on = el.dataset.ch === ch;
      el.classList.toggle('is-on', on);
      if (on) { el.removeAttribute('hidden'); } else { el.setAttribute('hidden', ''); }
    });
    screen.dataset.ch = ch;
    osd.textContent = LABELS[ch];
    current = ch;
  }

  function surf(dir) {
    if (switching) return;
    var i = (ORDER.indexOf(current) + dir + ORDER.length) % ORDER.length;
    var next = ORDER[i];

    if (rm) { show(next); return; }

    switching = true;
    staticEl.classList.add('is-active');
    setTimeout(function () { show(next); }, 110);
    setTimeout(function () {
      staticEl.classList.remove('is-active');
      switching = false;
    }, 240);
  }

  upBtn.addEventListener('click', function () { surf(1); });
  downBtn.addEventListener('click', function () { surf(-1); });
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
