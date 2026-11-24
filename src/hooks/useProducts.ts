import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import type { Product } from '../types';

type ProductsState =
  | { status: 'loading'; products: Product[] }
  | { status: 'success'; products: Product[] }
  | { status: 'error'; products: Product[]; error: string };

export function useProducts(): ProductsState {
  const [state, setState] = useState<ProductsState>({ status: 'loading', products: [] });

  useEffect(() => {
    let active = true;
    fetchProducts()
      .then((products) => active && setState({ status: 'success', products }))
      .catch((error: unknown) =>
        active && setState({ status: 'error', products: [], error: error instanceof Error ? error.message : String(error) }),
      );
    return () => {
      active = false;
    };
  }, []);

  return state;
}
