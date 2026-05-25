/* =========================================
   TYPEWRITER.JS — Rotating Hero Tagline
   ========================================= */

export function initTypewriter() {

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const el = document.getElementById('hero-tagline');
  if (!el) return;

  const phrases = [
    'Design. Build. Support.',
    'UI that feels effortless.',
    'Apps that ship as MVPs.',
    'Cloud-ready foundations.',
  ];

  let phraseIdx = 0;
  let charIdx   = phrases[0].length;
  let isDeleting = false;
  let firstPause = true;

  function tick() {
    const current = phrases[phraseIdx];

    if (firstPause) {
      firstPause = false;
      isDeleting = true;
      setTimeout(tick, 2500);
      return;
    }

    if (isDeleting) {
      charIdx--;
      el.textContent = current.substring(0, charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 25);
    } else {
      charIdx++;
      el.textContent = current.substring(0, charIdx);
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(tick, 2500);
        return;
      }
      setTimeout(tick, 55);
    }
  }

  setTimeout(tick, 2000);

}
