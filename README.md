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

This site is deployed via **[Vercel](https://vercel.com)** on the free Hobby plan.

### Steps

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New → Project** and import your `portfolio` repository.
4. Confirm the build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your site will be live in ~1 minute.

Your live site will be available at:
```
https://portfolio-YOUR_USERNAME.vercel.app
```

### Auto-Deploy
Every push to the `main` branch automatically triggers a new deployment on Vercel — no manual steps needed.

```bash
git add .
git commit -m "your update"
git push origin main
# ✅ Vercel picks it up automatically
```

### Environment Variables
If you add API keys (e.g. for a contact form), add them in Vercel:
1. Go to your project on Vercel → **Settings → Environment Variables**
2. Add your key (e.g. `VITE_EMAIL_KEY`)
3. Access it in code via `import.meta.env.VITE_EMAIL_KEY`

> Never hardcode API keys directly in your source files.

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
├── index.html                   # Main HTML entry point
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── style.css        # All styles (mobile-first)
│   ├── modules/                 # Feature modules
│   │   ├── nav.js               # Header, sticky scroll, mobile nav
│   │   ├── projects.js          # Project filtering & keyboard nav
│   │   ├── animations.js        # Scroll fade-in animations
│   │   ├── form.js              # Contact form validation
│   │   ├── experience.js        # Experience tabs
│   │   └── gallery.js           # Lightbox, filters, lazy load
│   └── main.js                  # Entry point — imports all modules
├── public/                      # Static assets (favicon, images, etc.)
├── vite.config.js               # Build configuration
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
