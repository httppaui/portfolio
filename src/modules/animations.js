/* =========================================
   ANIMATIONS.JS — Scroll Fade-In
   ========================================= */

export function initAnimations() {

  // ─── Intersection Observer — fade-in on scroll ───
  const fadeEls = document.querySelectorAll(
    '.project-card, .cert-badge, .skill-category, .about__text, .contact__info'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ${i * 0.04}s ease, transform 0.5s ${i * 0.04}s ease`;
    fadeObserver.observe(el);
  });

}