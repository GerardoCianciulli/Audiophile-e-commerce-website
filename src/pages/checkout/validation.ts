import { object, string, type InferType } from 'yup';
import { PHONE_PATTERN } from './phone';

const REQUIRED = "Can't be empty";
const WRONG_FORMAT = 'Wrong format';

/** 2 to 4 words made of letters (accents, apostrophes, dots and hyphens allowed). */
const NAME_PATTERN = /^[\p{L}'’.-]+(?:\s+[\p{L}'’.-]+){1,3}$/u;
/** name@domain.suffix — e.g. alexei@mail.com, anna@studio.co.uk, luca@posta.it */
const EMAIL_PATTERN = /^[^\s@]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const PLACE_PATTERN = /^[\p{L}][\p{L}\s.'’-]*$/u;
const ZIP_PATTERN = /^[A-Za-z0-9][A-Za-z0-9 -]{1,9}$/;

export type PaymentMethod = 'e-money' | 'cash';

export const checkoutSchema = object({
  name: string().trim().required(REQUIRED).matches(NAME_PATTERN, 'Use 2–4 words'),
  email: string().trim().required(REQUIRED).matches(EMAIL_PATTERN, WRONG_FORMAT),
  phone: string().trim().required(REQUIRED).matches(PHONE_PATTERN, WRONG_FORMAT),
  address: string().trim().required(REQUIRED),
  zip: string().trim().required(REQUIRED).matches(ZIP_PATTERN, WRONG_FORMAT),
  city: string().trim().required(REQUIRED).matches(PLACE_PATTERN, WRONG_FORMAT),
  country: string().trim().required(REQUIRED).matches(PLACE_PATTERN, WRONG_FORMAT),
  paymentMethod: string<PaymentMethod>().oneOf(['e-money', 'cash']).required(REQUIRED),
  // The e-Money fields only exist (and are only required) when e-Money is the payment method.
  eMoneyNumber: string().when('paymentMethod', {
    is: 'e-money',
    then: (schema) => schema.trim().required(REQUIRED).matches(/^\d{9}$/, 'Must be 9 digits'),
    otherwise: (schema) => schema.strip(),
  }),
  eMoneyPin: string().when('paymentMethod', {
    is: 'e-money',
    then: (schema) => schema.trim().required(REQUIRED).matches(/^\d{4}$/, 'Must be 4 digits'),
    otherwise: (schema) => schema.strip(),
  }),
});

export type CheckoutValues = InferType<typeof checkoutSchema>;

export const initialCheckoutValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  zip: '',
  city: '',
  country: '',
  paymentMethod: 'e-money' as PaymentMethod,
  eMoneyNumber: '',
  eMoneyPin: '',
};

export type CheckoutFormValues = typeof initialCheckoutValues;
