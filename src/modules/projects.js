/* =========================================
   PROJECTS.JS — Filtering
   ========================================= */

export function initProjects() {

  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.getElementById('projects-grid');
  const emptyMsg     = document.getElementById('projects-empty');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.removeAttribute('aria-current');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'true');

      let visibleCount = 0;
      projectCards.forEach(card => {
        const categories = (card.dataset.category || '').trim().split(/\s+/);
        const match = filter === 'all' || categories.includes(filter);
        card.classList.toggle('hidden', !match);
        if (match) visibleCount++;
      });

      if (emptyMsg) emptyMsg.hidden = visibleCount > 0;

      if (projectsGrid) {
        projectsGrid.setAttribute('aria-label',
          `Projects list — ${visibleCount} project${visibleCount !== 1 ? 's' : ''} shown`
        );
      }
    });
  });

}
