/* =========================================
   THEME.JS — Dark / Light Mode Toggle
   ========================================= */

export function initTheme() {

  const root      = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const STORAGE_KEY = 'portfolio-theme';

  const saved   = localStorage.getItem(STORAGE_KEY);
  const system  = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initial = saved || system;

  root.setAttribute('data-theme', initial);
  toggleBtn.setAttribute('aria-label', initial === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

  function showToast(message) {
    let toast = document.getElementById('theme-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'theme-toast';
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('toast--visible');
    void toast.offsetWidth;
    toast.classList.add('toast--visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('toast--visible'), 2000);
  }

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
    toggleBtn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    showToast(next === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

}
