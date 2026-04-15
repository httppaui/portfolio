# Personal Portfolio Website

A polished, accessible, responsive personal portfolio site built with **vanilla HTML, CSS, and JavaScript**. No frameworks required — fully static and deployable anywhere.

---

## ✨ Features

- **Hero section** with animated gradient blobs and staggered entrance animations
- **About section** with bio and categorized skills grid
- **Projects section** with category filtering (All / Academic / Professional / Design)
- **Certifications section** with badge cards and verification links
- **Contact section** with validated form (name, email, message, consent checkbox)
- Mobile-first responsive design — works down to 320px viewports
- WCAG-compliant contrast, semantic HTML, visible focus indicators, ARIA labels
- Native lazy loading on all below-fold images
- Smooth scroll-triggered fade-in animations via Intersection Observer

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The site will be available at **http://localhost:3000** (or the port shown in your terminal).

---

## 📦 Build for Production

```bash
npm run build
```

The static build artifact will be output to the `dist/` folder. This folder is self-contained and ready to deploy.

---

## 🌐 Deployment

### GitHub Pages

1. Push your repository to GitHub.
2. Run the deploy script:
   ```bash
   npm run deploy
   ```
   This uses `gh-pages` to publish the `dist/` folder to your `gh-pages` branch.
3. In your repository settings → **Pages**, set the source branch to `gh-pages` / `root`.
4. Your site will be live at `https://YOUR_USERNAME.github.io/portfolio/`

> **Note**: If deploying to a subdirectory (not root domain), update the `base` field in `vite.config.js` to match your repo name, e.g. `base: '/portfolio/'`.

### Netlify

**Option A — Drag & Drop**
1. Run `npm run build` to generate the `dist/` folder.
2. Go to [netlify.com](https://netlify.com) → drag and drop the `dist/` folder.

**Option B — Git Integration**
1. Push your repo to GitHub.
2. In Netlify: **Add new site → Import from Git**.
3. Set:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy site**. Netlify will auto-deploy on every push to `main`.

---

## 🐳 Docker (Optional)

If Docker is available on your machine:

```bash
# Build the Docker image
docker build -t portfolio .

# Run the container (serves on http://localhost:8080)
docker run -p 8080:80 portfolio
```

---

## 🗂 Project Structure

```
portfolio/
├── index.html              # Main HTML entry point
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── style.css   # All styles (mobile-first)
│   └── main.js             # Interactions, filtering, validation
├── public/                 # Static assets (favicon, images, etc.)
├── vite.config.js          # Build configuration
├── package.json
├── Dockerfile
└── README.md
```

---

## 🎨 Customization

1. **Name & tagline**: Edit the `<h1>`, `<p class="hero__role">`, and `<p class="hero__tagline">` in `index.html`.
2. **Colors**: Adjust CSS custom properties at the top of `style.css` under `:root`.
3. **Projects**: Add or edit `<article class="project-card" data-category="...">` blocks in the Projects section.
4. **Certifications**: Add or edit `<div class="cert-badge">` blocks in the Certifications section.
5. **Social links**: Update the `href` attributes in the Contact section's `.contact__socials` list.

---

## ♿ Accessibility

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- All images include descriptive `alt` text
- ARIA labels on interactive elements and live regions
- Visible focus indicators on all focusable elements
- Color contrast meets WCAG AA (4.5:1 for normal text)
- Keyboard-navigable project cards
- `aria-live` regions for form errors and filter results

---

## 📄 License

MIT — free to use and adapt for your own portfolio.
