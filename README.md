# Personal Portfolio Website

A polished, accessible, responsive personal portfolio site built with **vanilla HTML, CSS, and JavaScript**. No frameworks required — fully static and deployable anywhere.

---

## Features

- **Hero section** with animated gradient blobs, staggered entrance animations, and optimized LCP image
- **About section** with bio and categorized skills grid
- **Experience section** with tabbed Professional / Academic timeline
- **Projects section** with category filtering and click-to-open carousel modal
- **Certifications section** with badge cards and verification links
- **Contact section** with social links (GitHub, LinkedIn, Email)
- **Dark / Light mode** with system preference detection and localStorage persistence
- Mobile-first responsive design — works down to 320px viewports
- `prefers-reduced-motion` respected in both CSS animations and JS scroll effects
- Open Graph and Twitter Card meta tags for social sharing
- `<noscript>` fallback so content remains accessible without JavaScript

---

## Accessibility

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Skip-to-content link as the first focusable element
- All images include descriptive `alt` text
- ARIA labels on interactive elements and live regions
- Visible `:focus-visible` indicators on all focusable elements
- Color contrast meets WCAG AA (4.5:1 for normal text)
- Focus traps and `inert` page content behind lightbox and project modals
- Keyboard-navigable project cards, gallery items, and modals (Arrow keys, Escape, Enter/Space)
- `aria-live` regions for filter results
- `prefers-reduced-motion: reduce` disables all animations and transitions

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/httppaui/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The site will be available at **http://localhost:3000** (or the next available port).

---

## Build for Production

```bash
npm run build
```

The output goes to the `dist/` folder — self-contained and ready to deploy.

---

## Deployment

This site is deployed via **[Vercel](https://vercel.com)** on the free Hobby plan.

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New → Project** and import the `portfolio` repository.
4. Confirm the build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

Every push to `main` triggers an automatic redeployment.

---

## Docker (Optional)

```bash
# Build the image
docker build -t portfolio .

# Run the container (serves on http://localhost:8080)
docker run -p 8080:80 portfolio
```

The Dockerfile uses a multi-stage build (Node → nginx) with gzip compression.

---

## Project Structure

```
portfolio/
├── index.html                    # Main HTML entry point
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css         # All styles (design tokens, dark mode, responsive)
│   │   ├── images/               # Local logos, photos, project screenshots
│   │   ├── gallery/              # Gallery section images
│   │   └── docs/                 # Certificate PDFs
│   ├── modules/
│   │   ├── nav.js                # Header, sticky scroll, mobile nav
│   │   ├── theme.js              # Dark / light mode toggle
│   │   ├── projects.js           # Project category filtering
│   │   ├── project-modal.js      # Carousel modal for project details
│   │   ├── animations.js         # Scroll fade-in (CSS class driven)
│   │   ├── experience.js         # Experience tab switching
│   │   └── gallery.js            # Gallery lightbox, filters, focus trap
│   └── main.js                   # Entry point — imports all modules
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

---

## Customization

1. **Name & tagline** — Edit `<h1>`, `.hero__role`, and `.hero__tagline` in `index.html`.
2. **Colors** — Adjust CSS custom properties under `:root` and `[data-theme="dark"]` in `style.css`.
3. **Projects** — Add `<article class="project-card">` blocks with a `data-images` JSON array for carousel photos.
4. **Certifications** — Add `<div class="cert-badge">` blocks in the Certifications section.
5. **Social links** — Update the `href` attributes in `.contact__socials`.
6. **Site URL** — Update `SITE_URL` in `src/config/site-url.js` and OG meta tags if your live domain differs from GitHub Pages.
7. **Images** — Run `npm run optimize-images` after adding new PNG screenshots in `tobc/`, `cafelog/`, or `one-pagers/`.

---

## License

MIT — free to use and adapt for your own portfolio.
