import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { CartItem } from '../types';

const STORAGE_KEY = 'audiophile-cart';
export const SHIPPING_COST = 50;
export const VAT_RATE = 0.2;

type CartAction =
  | { type: 'add'; item: CartItem }
  | { type: 'setQuantity'; slug: string; quantity: number }
  | { type: 'replace'; items: CartItem[] }
  | { type: 'clear' };

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existing = items.find((item) => item.slug === action.item.slug);
      if (!existing) return [...items, action.item];
      return items.map((item) =>
        item.slug === action.item.slug ? { ...item, quantity: item.quantity + action.item.quantity } : item,
      );
    }
    case 'setQuantity':
      return action.quantity <= 0
        ? items.filter((item) => item.slug !== action.slug)
        : items.map((item) => (item.slug === action.slug ? { ...item, quantity: action.quantity } : item));
    case 'replace':
      return action.items;
    case 'clear':
      return [];
  }
}

// Each page is a separate HTML document, so the cart lives in localStorage to survive navigation and refreshes.
function loadCart(): CartItem[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  shipping: number;
  vat: number;
  grandTotal: number;
  addItem: (item: CartItem) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Keep several open tabs in sync.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) dispatch({ type: 'replace', items: loadCart() });
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addItem = useCallback((item: CartItem) => dispatch({ type: 'add', item }), []);
  const setQuantity = useCallback((slug: string, quantity: number) => dispatch({ type: 'setQuantity', slug, quantity }), []);
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo<CartContextValue>(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = items.length > 0 ? SHIPPING_COST : 0;
    return {
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      total,
      shipping,
      // The design shows "VAT (INCLUDED)": 20% of the product total, already part of the price.
      vat: total * VAT_RATE,
      grandTotal: total + shipping,
      addItem,
      setQuantity,
      clearCart,
    };
  }, [items, addItem, setQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside <CartProvider>');
  return context;
}
