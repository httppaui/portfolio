import { defineConfig } from 'vite';

export default defineConfig({
  // Change base to '/your-repo-name/' if deploying to GitHub Pages subdirectory
  // base: '/portfolio/',
  base: '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
  server: {
    port: 3000,
  },
});
