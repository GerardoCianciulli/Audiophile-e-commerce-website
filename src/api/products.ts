import type { Product } from '../types';

/**
 * In development the products are served by JSON-Server (`npm run server`, see VITE_API_URL in
 * .env.development). GitHub Pages has no API, so production reads the same file as static JSON.
 */
const API_URL: string | undefined = import.meta.env.VITE_API_URL;
const STATIC_URL = `${import.meta.env.BASE_URL}data.json`;

let cache: Promise<Product[]> | null = null;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request to ${url} failed with status ${response.status}`);
  return (await response.json()) as T;
}

async function loadProducts(): Promise<Product[]> {
  if (API_URL) {
    try {
      return await fetchJson<Product[]>(`${API_URL}/products`);
    } catch {
      // JSON-Server isn't running: fall back to the static file so `npm run dev` still works.
    }
  }
  const data = await fetchJson<{ products: Product[] }>(STATIC_URL);
  return data.products;
}

/** All products, fetched once per page load. */
export function fetchProducts(): Promise<Product[]> {
  cache ??= loadProducts().catch((error: unknown) => {
    cache = null;
    throw error;
  });
  return cache;
}
