/* =========================================
   THEME.JS — Dark / Light Mode Toggle
   ========================================= */

export function initTheme() {

  const root        = document.documentElement;
  const toggleBtn   = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'portfolio-theme';

  // ─── Load saved preference or system default ───
  const saved  = localStorage.getItem(STORAGE_KEY);
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initial = saved || system;

  root.setAttribute('data-theme', initial);

  // ─── Toggle on button click ───────────────
  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
    toggleBtn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });

  // ─── Respect system preference changes ────
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

}