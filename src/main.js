/* =========================================
   MAIN.JS — Entry Point
   ========================================= */

import { initNav }          from './modules/nav.js';
import { initProjects }     from './modules/projects.js';
import { initProjectModal } from './modules/project-modal.js';
import { initAnimations }   from './modules/animations.js';
import { initExperience }   from './modules/experience.js';
import { initTheme }        from './modules/theme.js';
import { initTypewriter }   from './modules/typewriter.js';
import { initAbout }        from './modules/about.js';
import { initCerts }        from './modules/certs.js';

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

requestAnimationFrame(() => document.body.classList.add('is-loaded'));

initTheme();
initNav();
initProjects();
initProjectModal();
initAnimations();
initExperience();
initTypewriter();
initAbout();
initCerts();
