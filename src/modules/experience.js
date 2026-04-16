/* =========================================
   EXPERIENCE.JS — Tabbed Experience Section
   ========================================= */

export function initExperience() {

  const expTabs = document.querySelectorAll('.exp-tab');
  if (!expTabs.length) return; // guard: section not on page

  expTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      expTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('.experience__panel').forEach(panel => {
        panel.classList.add('hidden');
      });
      document.getElementById(`tab-${tab.dataset.tab}`).classList.remove('hidden');
    });
  });

}