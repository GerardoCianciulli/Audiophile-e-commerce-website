// Global tokens/base styles first, so component styles can override them.
import './styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import type { Category, PageConfig } from './types';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element');

/** Each HTML page tells the app what to render through data-* attributes on #root. */
function readPageConfig({ page, category, slug }: DOMStringMap): PageConfig {
  switch (page) {
    case 'category':
      return { page: 'category', category: category as Category };
    case 'product':
      return { page: 'product', slug: slug ?? '' };
    case 'checkout':
      return { page: 'checkout' };
    default:
      return { page: 'home' };
  }
}

createRoot(root).render(
  <StrictMode>
    <App config={readPageConfig(root.dataset)} />
  </StrictMode>,
);
