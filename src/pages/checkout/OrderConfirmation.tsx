import { useEffect, useRef, useState } from 'react';
import ConfirmationIcon from '../../assets/icons/icon-order-confirmation.svg?react';
import { ButtonLink } from '../../components/Button';
import { useBodyScrollLock, useJQueryToggle } from '../../hooks/useJQuery';
import { formatPrice } from '../../lib/format';
import { asset, routes } from '../../lib/paths';
import type { CartItem } from '../../types';

/** A copy of the cart taken when the order is placed (the cart itself is emptied). */
export type PlacedOrder = {
  items: CartItem[];
  total: number;
  shipping: number;
  vat: number;
  grandTotal: number;
};

export function OrderConfirmation({ order }: { order: PlacedOrder | null }) {
  const [expanded, setExpanded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useJQueryToggle(overlayRef, order !== null, 'fade', 300);
  useBodyScrollLock(order !== null);

  useEffect(() => {
    if (order) titleRef.current?.focus();
  }, [order]);

  const [first, ...others] = order?.items ?? [];
  const visibleItems = expanded ? (order?.items ?? []) : first ? [first] : [];

  return (
    <div ref={overlayRef} className="confirmation-overlay" style={{ display: 'none' }}>
      {order && (
        <div className="confirmation" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
          <ConfirmationIcon className="confirmation__icon" aria-hidden="true" />
          <h3 id="confirmation-title" ref={titleRef} tabIndex={-1} className="heading-3 confirmation__title">
            Thank you
            <br />
            for your order
          </h3>
          <p className="body-text confirmation__text">You will receive an email confirmation shortly.</p>

          <div className="confirmation__order">
            <div className="confirmation__items">
              <ul>
                {visibleItems.map((item) => (
                  <li key={item.slug} className="confirmation__item">
                    <img src={asset(item.image)} alt="" width={50} height={50} />
                    <div>
                      <p className="cart-line__name">{item.shortName}</p>
                      <p className="cart-line__price">{formatPrice(item.price)}</p>
                    </div>
                    <p className="checkout-summary__quantity">x{item.quantity}</p>
                  </li>
                ))}
              </ul>
              {others.length > 0 && (
                <button
                  type="button"
                  className="confirmation__toggle"
                  aria-expanded={expanded}
                  onClick={() => setExpanded((value) => !value)}
                >
                  {expanded ? 'View less' : `and ${others.length} other item(s)`}
                </button>
              )}
            </div>
            <div className="confirmation__total">
              <p>Grand total</p>
              <p className="confirmation__total-value">{formatPrice(order.grandTotal)}</p>
            </div>
          </div>

          <ButtonLink href={routes.home} block>
            Back to home
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
