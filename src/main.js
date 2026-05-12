/* =========================================
   MAIN.JS — Entry Point
   ========================================= */

import { initNav }          from './modules/nav.js';
import { initProjects }     from './modules/projects.js';
import { initProjectModal } from './modules/project-modal.js';
import { initAnimations }   from './modules/animations.js';
import { initExperience }   from './modules/experience.js';
import { initGallery }      from './modules/gallery.js';
import { initTheme }        from './modules/theme.js';

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

initTheme();
initNav();
initProjects();
initProjectModal();
initAnimations();
initExperience();
initGallery();
