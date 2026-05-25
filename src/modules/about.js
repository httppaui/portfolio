/* =========================================
   ABOUT.JS — Read more toggle
   ========================================= */

export function initAbout() {
  const btn = document.getElementById('about-read-more');
  const more = document.getElementById('about-bio-more');
  if (!btn || !more) return;

  btn.addEventListener('click', () => {
    const expanded = more.hidden;
    more.hidden = !expanded;
    btn.setAttribute('aria-expanded', String(expanded));
    btn.textContent = expanded ? 'Read less' : 'Read more';
  });
}
