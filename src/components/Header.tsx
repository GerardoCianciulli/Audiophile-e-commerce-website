import $ from 'jquery';
import { useCallback, useEffect, useRef, useState } from 'react';
import CartIcon from '../assets/icons/icon-cart.svg?react';
import HamburgerIcon from '../assets/icons/icon-hamburger.svg?react';
import Logo from '../assets/icons/logo.svg?react';
import { useCart } from '../context/CartContext';
import { bottomInViewport, useBodyScrollLock, useEscapeKey, useJQueryToggle } from '../hooks/useJQuery';
import { routes } from '../lib/paths';
import { CartModal } from './CartModal';
import { CategoryLinks } from './CategoryLinks';
import { NavLinks } from './NavLinks';
import './Header.css';

type Panel = 'menu' | 'cart' | null;

/** Other components open the cart with `$(document).trigger(OPEN_CART_EVENT)`. */
export const OPEN_CART_EVENT = 'audiophile:open-cart';

export function Header({ overlay = false }: { overlay?: boolean }) {
  const { items } = useCart();
  const [panel, setPanel] = useState<Panel>(null);
  const [offset, setOffset] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const cartToggleRef = useRef<HTMLButtonElement>(null);

  const open = useCallback((next: Exclude<Panel, null>) => {
    // Panels sit just under the header, wherever it currently is in the viewport.
    setOffset(bottomInViewport(headerRef.current));
    setPanel(next);
  }, []);
  const close = useCallback(() => setPanel(null), []);
  const toggle = (next: Exclude<Panel, null>) => (panel === next ? close() : open(next));

  useJQueryToggle(overlayRef, panel !== null, 'fade');
  useJQueryToggle(menuRef, panel === 'menu', 'slide');
  useBodyScrollLock(panel !== null);
  useEscapeKey(panel !== null, close);

  useEffect(() => {
    $(document).on(OPEN_CART_EVENT, () => open('cart'));
    return () => {
      $(document).off(OPEN_CART_EVENT);
    };
  }, [open]);

  // The menu only exists below the desktop breakpoint.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)');
    const onChange = () => desktop.matches && setPanel((current) => (current === 'menu' ? null : current));
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  const closeCart = useCallback(() => {
    close();
    cartToggleRef.current?.focus();
  }, [close]);

  return (
    <header ref={headerRef} className={`site-header${overlay ? ' site-header--overlay' : ''}`}>
      <div className="container site-header__bar">
        <button
          type="button"
          className="site-header__menu-toggle"
          aria-label={panel === 'menu' ? 'Close menu' : 'Open menu'}
          aria-expanded={panel === 'menu'}
          aria-controls="site-menu"
          onClick={() => toggle('menu')}
        >
          <HamburgerIcon aria-hidden="true" />
        </button>

        <h1 className="site-header__logo">
          <a href={routes.home}>
            <Logo aria-hidden="true" />
            <span className="visually-hidden">Audiophile</span>
          </a>
        </h1>

        <nav className="site-header__nav" aria-label="Main">
          <NavLinks />
        </nav>

        <button
          ref={cartToggleRef}
          type="button"
          className="site-header__cart-toggle"
          aria-label={`Cart, ${items.length} ${items.length === 1 ? 'product' : 'products'}`}
          aria-expanded={panel === 'cart'}
          aria-controls="cart-modal"
          onClick={() => toggle('cart')}
        >
          <CartIcon aria-hidden="true" />
        </button>
      </div>

      <div ref={overlayRef} className="site-overlay" style={{ top: `${offset / 16}rem`, display: 'none' }} onClick={close} aria-hidden="true" />

      <div ref={menuRef} id="site-menu" className="site-menu" style={{ top: `${offset / 16}rem`, display: 'none' }}>
        <CategoryLinks className="container" onNavigate={close} />
      </div>

      <CartModal open={panel === 'cart'} top={offset} onClose={closeCart} />
    </header>
  );
}
