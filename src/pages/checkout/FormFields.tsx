import { Field, useField } from 'formik';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import type { CheckoutFormValues, PaymentMethod } from './validation';

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  name: keyof CheckoutFormValues;
  label: string;
  /** Lets a field transform the value as it is typed (used to auto-format the phone number). */
  format?: (value: string) => string;
};

export function TextField({ name, label, format, className, ...inputProps }: TextFieldProps) {
  const [field, meta, helpers] = useField<string>(name);
  const hasError = Boolean(meta.touched && meta.error);
  const id = `checkout-${name}`;
  const errorId = `${id}-error`;

  const onChange = format
    ? (event: ChangeEvent<HTMLInputElement>) => void helpers.setValue(format(event.target.value))
    : field.onChange;

  return (
    <div className={['form-field', hasError && 'form-field--error', className].filter(Boolean).join(' ')}>
      <div className="form-field__labels">
        <label className="form-field__label" htmlFor={id}>
          {label}
        </label>
        {hasError && (
          <span id={errorId} className="form-field__error">
            {meta.error}
          </span>
        )}
      </div>
      <input
        id={id}
        className="form-field__input"
        {...inputProps}
        {...field}
        onChange={onChange}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
      />
    </div>
  );
}

type RadioOptionProps = {
  value: PaymentMethod;
  label: string;
};

/** One payment method. All options share name="paymentMethod", so only one can be selected. */
export function RadioOption({ value, label }: RadioOptionProps) {
  return (
    <label className="radio-option">
      <Field className="radio-option__input" type="radio" name="paymentMethod" value={value} />
      <span className="radio-option__control" aria-hidden="true" />
      {label}
    </label>
  );
}
