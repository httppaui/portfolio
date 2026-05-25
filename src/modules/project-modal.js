/* =========================================
   PROJECT-MODAL.JS — Carousel Modal for Projects
   ========================================= */

export function initProjectModal() {

  const modal    = document.getElementById('project-modal');
  if (!modal) return;

  const backdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('project-modal-close');
  const img      = document.getElementById('project-modal-img');
  const titleEl  = document.getElementById('project-modal-title');
  const descEl   = document.getElementById('project-modal-desc');
  const prevBtn  = document.getElementById('pm-prev');
  const nextBtn  = document.getElementById('pm-next');
  const dotsWrap = document.getElementById('pm-dots');

  let images     = [];
  let currentIdx = 0;
  let triggerEl  = null;

  function updateSlide() {
    img.src = images[currentIdx];
    dotsWrap.querySelectorAll('.project-modal__dot').forEach((dot, i) => {
      dot.classList.toggle('project-modal__dot--active', i === currentIdx);
      dot.setAttribute('aria-current', i === currentIdx ? 'true' : 'false');
    });
    prevBtn.hidden = images.length <= 1;
    nextBtn.hidden = images.length <= 1;
  }

  function open(card) {
    triggerEl = card;
    images = JSON.parse(card.dataset.images || '[]');
    if (!images.length) return;

    currentIdx = 0;
    titleEl.textContent = card.querySelector('.project-card__body h3')?.textContent || '';
    descEl.textContent  = card.querySelector('.project-card__body p:not(.project-card__role)')?.textContent || '';
    img.alt = card.querySelector('.project-card__img-wrap img')?.alt || '';

    dotsWrap.innerHTML = '';
    if (images.length > 1) {
      images.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'project-modal__dot' + (i === 0 ? ' project-modal__dot--active' : '');
        dot.setAttribute('aria-label', `Image ${i + 1} of ${images.length}`);
        dot.addEventListener('click', () => { currentIdx = i; updateSlide(); });
        dotsWrap.appendChild(dot);
      });
    }

    updateSlide();
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    document.querySelector('.site-header')?.setAttribute('inert', '');
    document.getElementById('main-content')?.setAttribute('inert', '');
    document.querySelector('.site-footer')?.setAttribute('inert', '');

    closeBtn.focus();
  }

  function close() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    document.querySelector('.site-header')?.removeAttribute('inert');
    document.getElementById('main-content')?.removeAttribute('inert');
    document.querySelector('.site-footer')?.removeAttribute('inert');
    triggerEl?.focus();
  }

  function navigate(dir) {
    currentIdx = (currentIdx + dir + images.length) % images.length;
    updateSlide();
  }

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', (e) => {
    if (modal.hasAttribute('hidden')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  /* ── Focus trap ────────────────────────── */
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(modal.querySelectorAll('button:not([hidden])'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* ── Touch swipe ───────────────────────── */
  let touchStartX = 0;
  modal.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  modal.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* ── Attach to project cards ───────────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => open(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(card);
      }
    });
  });

}
