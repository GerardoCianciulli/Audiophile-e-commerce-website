import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// GitHub Pages serves the site from https://<user>.github.io/<repository>/,
// so production builds use the repository name as the base path.
const REPOSITORY = 'Audiophile-e-commerce-website';

// Every page of the site is a real HTML file at the project root (Vite multi-page app).
const pages = [
  'index',
  'headphones',
  'speakers',
  'earphones',
  'product-xx59-headphones',
  'product-xx99-mark-one-headphones',
  'product-xx99-mark-two-headphones',
  'product-zx7-speaker',
  'product-zx9-speaker',
  'product-earphones',
  'checkout',
];

// `vite build` and `vite preview` use the GitHub Pages path; `vite` (dev) stays at the root.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? `/${REPOSITORY}/` : '/',
  plugins: [react(), svgr()],
  build: {
    // Keep bundled JS/CSS apart from the design assets copied from public/assets.
    assetsDir: 'static',
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page, resolve(import.meta.dirname, `${page}.html`)])),
    },
  },
}));
