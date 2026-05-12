/* =========================================
   GALLERY.JS — Lightbox, Filter & Focus Trap
   ========================================= */

export function initGallery() {

  const grid       = document.getElementById('gallery-grid');
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightbox-img');
  const lbLabel    = document.getElementById('lightbox-label');
  const lbTag      = document.getElementById('lightbox-tag');
  const lbClose    = document.getElementById('lightbox-close');
  const lbBackdrop = document.getElementById('lightbox-backdrop');
  const lbPrev     = document.getElementById('lightbox-prev');
  const lbNext     = document.getElementById('lightbox-next');
  const filterBtns = document.querySelectorAll('.gallery__filter-btn');

  if (!grid || !lightbox) return;

  let items        = [];
  let visible      = [];
  let currentIndex = 0;
  let triggerEl    = null;

  function refreshItems() {
    items   = Array.from(grid.querySelectorAll('.gallery__item'));
    visible = items.filter(el => !el.classList.contains('gallery__item--hidden'));
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('gallery__filter-btn--active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('gallery__filter-btn--active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('gallery__item--hidden', !match);
      });

      refreshItems();
    });
  });

  function setPageInert(inert) {
    ['site-header', 'main-content', 'site-footer'].forEach(sel => {
      const el = sel === 'main-content'
        ? document.getElementById(sel)
        : document.querySelector(`.${sel}`);
      if (!el) return;
      inert ? el.setAttribute('inert', '') : el.removeAttribute('inert');
    });
  }

  function openLightbox(item) {
    triggerEl = item;
    const img   = item.querySelector('.gallery__img');
    const label = item.querySelector('.gallery__overlay-label');
    const tag   = item.querySelector('.gallery__overlay-tag');

    lbImg.src           = img.src;
    lbImg.alt           = img.alt;
    lbLabel.textContent = label ? label.textContent : '';
    lbTag.textContent   = tag   ? tag.textContent   : '';

    currentIndex = visible.indexOf(item);
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    setPageInert(true);
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
    setPageInert(false);
    triggerEl?.focus();
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + visible.length) % visible.length;
    openLightbox(visible[currentIndex]);
  }

  grid.addEventListener('click', e => {
    const item = e.target.closest('.gallery__item');
    if (item) openLightbox(item);
  });

  grid.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const item = e.target.closest('.gallery__item');
      if (item) { e.preventDefault(); openLightbox(item); }
    }
  });

  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => navigate(-1));
  lbNext.addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', e => {
    if (lightbox.hasAttribute('hidden')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  /* ── Focus trap ────────────────────────── */
  lightbox.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(lightbox.querySelectorAll('button'));
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
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  }, { passive: true });

  refreshItems();

}
