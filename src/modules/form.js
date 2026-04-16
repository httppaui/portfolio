/* =========================================
   FORM.JS — Contact Form Validation
   ========================================= */

export function initForm() {

  const form = document.getElementById('contact-form');
  if (!form) return; // guard: form not on page

  // ─── Validators ──────────────────────────
  const validators = {
    name: (val) => val.trim() ? '' : 'Please enter your name.',
    email: (val) => {
      if (!val.trim()) return 'Please enter your email address.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? '' : 'Please enter a valid email address.';
    },
    message: (val) => val.trim() ? '' : 'Please enter a message.',
  };

  // ─── Field error helper ───────────────────
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

  // ─── Live validation on blur ──────────────
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

  // ─── Submit ───────────────────────────────
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
    const consent      = document.getElementById('consent');
    const consentError = document.getElementById('consent-error');
    if (!consent.checked) {
      consentError.textContent = 'You must consent to submit this form.';
      valid = false;
    } else {
      consentError.textContent = '';
    }

    if (!valid) {
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

}