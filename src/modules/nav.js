/* =========================================
   NAV.JS — Header, Sticky Scroll & Mobile Nav
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

}
