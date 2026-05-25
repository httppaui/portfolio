/* =========================================
   CERTS.JS — Show all credentials toggle
   ========================================= */

export function initCerts() {
  const grid = document.getElementById('certs-grid');
  const btn  = document.getElementById('certs-toggle');
  if (!grid || !btn) return;

  btn.addEventListener('click', () => {
    const expanded = grid.classList.toggle('is-expanded');
    btn.setAttribute('aria-expanded', String(expanded));
    btn.textContent = expanded ? 'Show fewer credentials' : 'View all credentials';
  });
}
