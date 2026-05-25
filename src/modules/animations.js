/* =========================================
   ANIMATIONS.JS — Scroll Fade-In & Shimmer
   ========================================= */

export function initAnimations() {

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const fadeEls = document.querySelectorAll(
    '.project-card, .cert-badge, .skill-category, .about__text, .contact__info'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        entry.target.addEventListener('transitionend', () => {
          entry.target.style.transitionDelay = '0s';
        }, { once: true });
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${i * 0.08}s`;
    fadeObserver.observe(el);
  });

  document.querySelectorAll('.shimmer').forEach(wrap => {
    const img = wrap.querySelector('img');
    if (!img) return;
    if (img.complete) {
      wrap.classList.remove('shimmer');
    } else {
      img.addEventListener('load', () => wrap.classList.remove('shimmer'), { once: true });
    }
  });

}
