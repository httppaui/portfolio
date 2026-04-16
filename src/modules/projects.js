/* =========================================
   PROJECTS.JS — Filtering & Keyboard Cards
   ========================================= */

export function initProjects() {

  // ─── Project filtering ───────────────────
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.getElementById('projects-grid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.removeAttribute('aria-current');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'true');

      // Show/hide cards
      let visibleCount = 0;
      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) visibleCount++;
      });

      // Announce to screen readers
      projectsGrid.setAttribute('aria-label',
        `Projects list — ${visibleCount} project${visibleCount !== 1 ? 's' : ''} shown`
      );
    });
  });

  // ─── Keyboard accessible project cards ───
  projectCards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const link = card.querySelector('.project-card__link');
        link?.click();
      }
    });
  });

}