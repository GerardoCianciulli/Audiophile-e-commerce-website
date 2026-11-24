import './QuantityStepper.css';

type Props = {
  value: number;
  onChange: (value: number) => void;
  /** Accessible name for the group, e.g. "XX99 MK II quantity". */
  label: string;
  min?: number;
  max?: number;
  size?: 'default' | 'small';
};

export function QuantityStepper({ value, onChange, label, min = 1, max = 99, size = 'default' }: Props) {
  return (
    <div className={`stepper stepper--${size}`} role="group" aria-label={label}>
      <button
        type="button"
        className="stepper__button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        -
      </button>
      <output className="stepper__value" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className="stepper__button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
