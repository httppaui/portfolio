/* =========================================
   MAIN.JS — Portfolio Site
   ========================================= */

// ─── Year ───────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ─── Sticky header shadow ────────────────
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });

// ─── Mobile nav toggle ───────────────────
const navToggle = document.querySelector('.nav__toggle');
const navLinks  = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ─── Hamburger animation ─────────────────
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
});

// ─── Project filtering ───────────────────
const filterBtns  = document.querySelectorAll('.filter-btn');
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

// ─── Intersection Observer — fade-in on scroll ───
const fadeEls = document.querySelectorAll(
  '.project-card, .cert-badge, .skill-category, .about__text, .contact__info'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach((el, i) => {
  el.style.opacity  = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ${i * 0.04}s ease, transform 0.5s ${i * 0.04}s ease`;
  fadeObserver.observe(el);
});

// ─── Contact form validation ─────────────
const form = document.getElementById('contact-form');

const validators = {
  name: (val) => val.trim() ? '' : 'Please enter your name.',
  email: (val) => {
    if (!val.trim()) return 'Please enter your email address.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? '' : 'Please enter a valid email address.';
  },
  message: (val) => val.trim() ? '' : 'Please enter a message.',
};

function setFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  if (!field || !error) return;

  if (message) {
    field.classList.add('error');
    field.setAttribute('aria-describedby', `${fieldId}-error`);
    field.setAttribute('aria-invalid', 'true');
    error.textContent = message;
  } else {
    field.classList.remove('error');
    field.removeAttribute('aria-describedby');
    field.setAttribute('aria-invalid', 'false');
    error.textContent = '';
  }
}

// Live validation on blur
['name', 'email', 'message'].forEach(id => {
  const field = document.getElementById(id);
  if (!field) return;
  field.addEventListener('blur', () => {
    setFieldError(id, validators[id](field.value));
  });
  field.addEventListener('input', () => {
    if (field.classList.contains('error')) {
      setFieldError(id, validators[id](field.value));
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  // Validate text fields
  ['name', 'email', 'message'].forEach(id => {
    const field = document.getElementById(id);
    const error = validators[id](field.value);
    setFieldError(id, error);
    if (error) valid = false;
  });

  // Validate consent
  const consent = document.getElementById('consent');
  const consentError = document.getElementById('consent-error');
  if (!consent.checked) {
    consentError.textContent = 'You must consent to submit this form.';
    valid = false;
  } else {
    consentError.textContent = '';
  }

  if (!valid) {
    // Focus first errored field
    const firstError = form.querySelector('.error, [aria-invalid="true"]');
    firstError?.focus();
    return;
  }

  // Simulate success
  const successMsg = document.getElementById('form-success');
  form.reset();
  successMsg.hidden = false;
  successMsg.focus();
  setTimeout(() => { successMsg.hidden = true; }, 6000);
});

// ─── Lazy loading polyfill check ─────────
// Native loading="lazy" is used in HTML; this is a safety note only.
// All <img> tags below the fold already have loading="lazy" attributes.

// ─── Keyboard accessible project cards ───
projectCards.forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const link = card.querySelector('.project-card__link');
      link?.click();
    }
  });
});
