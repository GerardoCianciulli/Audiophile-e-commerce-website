import { Button } from '../../components/Button';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/format';
import { asset } from '../../lib/paths';
import type { PlacedOrder } from './OrderConfirmation';

type Props = {
  submitting: boolean;
  /** Once the order is placed, keep showing it behind the confirmation modal. */
  placedOrder: PlacedOrder | null;
};

export function OrderSummary({ submitting, placedOrder }: Props) {
  const cart = useCart();
  const { items, total, shipping, vat, grandTotal } = placedOrder ?? cart;
  const isEmpty = items.length === 0;

  return (
    <aside className="checkout-card checkout-summary" aria-labelledby="summary-title">
      <h3 id="summary-title" className="heading-6">
        Summary
      </h3>

      {isEmpty ? (
        <p className="body-text checkout-summary__empty">Your cart is empty. Add a product to place an order.</p>
      ) : (
        <ul className="checkout-summary__items">
          {items.map((item) => (
            <li key={item.slug} className="cart-line">
              <img className="cart-line__image" src={asset(item.image)} alt="" width={64} height={64} />
              <div className="cart-line__info">
                <p className="cart-line__name">{item.shortName}</p>
                <p className="cart-line__price">{formatPrice(item.price)}</p>
              </div>
              <p className="checkout-summary__quantity">x{item.quantity}</p>
            </li>
          ))}
        </ul>
      )}

      <dl className="checkout-summary__totals">
        <div>
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{formatPrice(shipping)}</dd>
        </div>
        <div>
          <dt>VAT (included)</dt>
          <dd>{formatPrice(vat)}</dd>
        </div>
        <div className="checkout-summary__grand-total">
          <dt>Grand total</dt>
          <dd>{formatPrice(grandTotal)}</dd>
        </div>
      </dl>

      <Button type="submit" block disabled={isEmpty || submitting || placedOrder !== null}>
        Continue &amp; pay
      </Button>
    </aside>
  );
}
