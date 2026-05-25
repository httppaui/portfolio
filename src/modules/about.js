/* =========================================
   ABOUT.JS — Read more toggle
   ========================================= */

export function initAbout() {
  const btn = document.getElementById('about-read-more');
  const more = document.getElementById('about-bio-more');
  if (btn && more) {
    btn.addEventListener('click', () => {
      const expanded = more.hidden;
      more.hidden = !expanded;
      btn.setAttribute('aria-expanded', String(expanded));
      btn.textContent = expanded ? 'Read less' : 'Read more';
    });
  }

  const skillsGrid = document.getElementById('skills-grid');
  const skillsBtn  = document.getElementById('skills-toggle');
  if (skillsGrid && skillsBtn) {
    skillsBtn.addEventListener('click', () => {
      const expanded = skillsGrid.classList.toggle('is-expanded');
      skillsBtn.setAttribute('aria-expanded', String(expanded));
      skillsBtn.textContent = expanded ? 'Show fewer skills' : 'View more skills';
    });
  }
}
