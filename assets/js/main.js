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
