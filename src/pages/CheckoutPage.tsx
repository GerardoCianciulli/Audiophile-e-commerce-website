import $ from 'jquery';
import { Form, Formik, useFormikContext } from 'formik';
import { useEffect, useRef, useState } from 'react';
import CashOnDeliveryIcon from '../assets/icons/icon-cash-on-delivery.svg?react';
import { GoBackLink } from '../components/GoBackLink';
import { useCart } from '../context/CartContext';
import { scrollToAndFocus } from '../hooks/useJQuery';
import { routes } from '../lib/paths';
import { RadioOption, TextField } from './checkout/FormFields';
import { OrderConfirmation, type PlacedOrder } from './checkout/OrderConfirmation';
import { OrderSummary } from './checkout/OrderSummary';
import { formatPhone } from './checkout/phone';
import { checkoutSchema, initialCheckoutValues, type CheckoutFormValues } from './checkout/validation';
import './CheckoutPage.css';

/** After a failed submit, scroll (with jQuery) to the first field that has an error and focus it. */
function ScrollToFirstError() {
  const { isSubmitting, submitCount, errors } = useFormikContext<CheckoutFormValues>();
  const wasSubmitting = useRef(false);

  useEffect(() => {
    const finishedSubmitting = wasSubmitting.current && !isSubmitting;
    wasSubmitting.current = isSubmitting;
    if (finishedSubmitting && submitCount > 0 && Object.keys(errors).length > 0) {
      scrollToAndFocus(document.querySelector<HTMLInputElement>('.checkout-form [aria-invalid="true"]'));
    }
  }, [isSubmitting, submitCount, errors]);

  return null;
}

function PaymentDetails() {
  const { values } = useFormikContext<CheckoutFormValues>();

  return (
    <fieldset className="checkout-form__group">
      <legend>
        <h3 className="subtitle">Payment details</h3>
      </legend>
      <div className="checkout-form__grid">
        <div className="checkout-form__payment" role="radiogroup" aria-labelledby="payment-method-label">
          <p id="payment-method-label" className="form-field__label">
            Payment Method
          </p>
          <div className="checkout-form__options">
            <RadioOption value="e-money" label="e-Money" />
            <RadioOption value="cash" label="Cash on Delivery" />
          </div>
        </div>

        {values.paymentMethod === 'e-money' ? (
          <>
            <TextField name="eMoneyNumber" label="e-Money Number" placeholder="238521993" inputMode="numeric" maxLength={9} />
            <TextField name="eMoneyPin" label="e-Money PIN" placeholder="6891" inputMode="numeric" maxLength={4} />
          </>
        ) : (
          <div className="checkout-form__cash">
            <CashOnDeliveryIcon aria-hidden="true" />
            <p className="body-text">
              The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your
              residence. Just make sure your address is correct so that your order will not be cancelled.
            </p>
          </div>
        )}
      </div>
    </fieldset>
  );
}

export function CheckoutPage() {
  const { items, total, shipping, vat, grandTotal, clearCart } = useCart();
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  const placeOrder = () => {
    // Keep a copy of the order for the confirmation, then empty the cart.
    setOrder({ items, total, shipping, vat, grandTotal });
    clearCart();
    $('html, body').stop(true).animate({ scrollTop: 0 }, 300);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <GoBackLink fallbackHref={routes.home} />

        <Formik initialValues={initialCheckoutValues} validationSchema={checkoutSchema} onSubmit={placeOrder}>
          {({ isSubmitting }) => (
            <Form className="checkout-form" noValidate>
              <ScrollToFirstError />

              <div className="checkout-card checkout-form__fields">
                <h3 className="heading-3 checkout-form__title">Checkout</h3>

                <fieldset className="checkout-form__group">
                  <legend>
                    <h3 className="subtitle">Billing details</h3>
                  </legend>
                  <div className="checkout-form__grid">
                    <TextField name="name" label="Name" placeholder="Alexei Ward" autoComplete="name" />
                    <TextField name="email" label="Email Address" placeholder="alexei@mail.com" type="email" autoComplete="email" />
                    <TextField
                      name="phone"
                      label="Phone Number"
                      placeholder="+1 (202) 555-0136"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      format={formatPhone}
                    />
                  </div>
                </fieldset>

                <fieldset className="checkout-form__group">
                  <legend>
                    <h3 className="subtitle">Shipping info</h3>
                  </legend>
                  <div className="checkout-form__grid">
                    <TextField
                      className="form-field--wide"
                      name="address"
                      label="Address"
                      placeholder="1137 Williams Avenue"
                      autoComplete="street-address"
                    />
                    <TextField name="zip" label="ZIP Code" placeholder="10001" autoComplete="postal-code" />
                    <TextField name="city" label="City" placeholder="New York" autoComplete="address-level2" />
                    <TextField name="country" label="Country" placeholder="United States" autoComplete="country-name" />
                  </div>
                </fieldset>

                <PaymentDetails />
              </div>

              <OrderSummary submitting={isSubmitting} placedOrder={order} />
            </Form>
          )}
        </Formik>
      </div>

      <OrderConfirmation order={order} />
    </div>
  );
}
