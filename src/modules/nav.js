/* =========================================
   NAV.JS — Header, Sticky Scroll, Mobile Nav & Active Link
   ========================================= */

export function initNav() {

  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });

  const navToggle = document.querySelector('.nav__toggle');
  const navLinks  = document.querySelector('.nav__links');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('open');
    }
  });

  /* ── Active nav link highlighting ──────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  if (sections.length && navAnchors.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ── Floating back-to-top with scroll progress ── */
  const backToTop = document.getElementById('back-to-top');
  const progressCircle = document.getElementById('scroll-progress');

  if (backToTop && progressCircle) {
    const circumference = 2 * Math.PI * 20;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      progressCircle.style.strokeDashoffset = circumference * (1 - progress);
      backToTop.hidden = scrollTop < 400;
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

}
