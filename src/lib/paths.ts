import type { Category } from '../types';

const BASE = import.meta.env.BASE_URL;

/** Resolves a public asset path (e.g. "./assets/cart/x.jpg") against the site base path. */
export const asset = (path: string): string => `${BASE}${path.replace(/^\.?\//, '')}`;

/** Every page is its own HTML file, so links are plain URLs relative to the base path. */
export const routes = {
  home: `${BASE}index.html`,
  checkout: `${BASE}checkout.html`,
  category: (category: Category) => `${BASE}${category}.html`,
  // The YX1 earphones page keeps the starter file name "product-earphones.html".
  product: (slug: string) => `${BASE}${slug === 'yx1-earphones' ? 'product-earphones' : `product-${slug}`}.html`,
};

export const categories: Category[] = ['headphones', 'speakers', 'earphones'];

/** Whether a link points at the page being viewed (used for aria-current on nav links). */
export const isCurrentPage = (href: string): boolean => {
  const current = window.location.pathname.replace(/\/$/, '/index.html');
  return current.endsWith(href.replace(BASE, '/'));
};
