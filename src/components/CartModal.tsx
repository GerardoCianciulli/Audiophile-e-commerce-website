import { useEffect, useRef, type CSSProperties } from 'react';
import { useCart } from '../context/CartContext';
import { useJQueryToggle } from '../hooks/useJQuery';
import { formatPrice } from '../lib/format';
import { asset, routes } from '../lib/paths';
import { Button, ButtonLink } from './Button';
import { QuantityStepper } from './QuantityStepper';
import './CartModal.css';

type Props = {
  open: boolean;
  /** Distance from the top of the viewport to the bottom of the header. */
  top: number;
  onClose: () => void;
};

export function CartModal({ open, top, onClose }: Props) {
  const { items, total, setQuantity, clearCart } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useJQueryToggle(panelRef, open, 'fade');

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <div
      ref={panelRef}
      id="cart-modal"
      className="cart-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      tabIndex={-1}
      style={{ '--cart-top': `${top / 16}rem`, display: 'none' } as CSSProperties}
    >
      <div className="cart-modal__header">
        <h3 id="cart-modal-title" className="heading-6">
          Cart ({items.length})
        </h3>
        {items.length > 0 && (
          <button type="button" className="cart-modal__remove-all" onClick={clearCart}>
            Remove all
          </button>
        )}
        <button type="button" className="visually-hidden" onClick={onClose}>
          Close cart
        </button>
      </div>

      {items.length === 0 ? (
        <p className="cart-modal__empty body-text">Your cart is empty.</p>
      ) : (
        <ul className="cart-modal__items">
          {items.map((item) => (
            <li key={item.slug} className="cart-line">
              <img className="cart-line__image" src={asset(item.image)} alt="" width={64} height={64} />
              <div className="cart-line__info">
                <p className="cart-line__name">{item.shortName}</p>
                <p className="cart-line__price">{formatPrice(item.price)}</p>
              </div>
              <QuantityStepper
                size="small"
                min={0}
                value={item.quantity}
                label={`${item.shortName} quantity`}
                onChange={(quantity) => setQuantity(item.slug, quantity)}
              />
            </li>
          ))}
        </ul>
      )}

      <p className="cart-modal__total">
        <span className="body-text">Total</span>
        <strong>{formatPrice(total)}</strong>
      </p>

      {items.length > 0 ? (
        <ButtonLink href={routes.checkout} block>
          Checkout
        </ButtonLink>
      ) : (
        <Button block disabled>
          Checkout
        </Button>
      )}
    </div>
  );
}
