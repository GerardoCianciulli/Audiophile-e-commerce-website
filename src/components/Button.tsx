import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode, SVGProps } from 'react';

type Variant = 'primary' | 'secondary' | 'dark';

type CommonProps = {
  variant?: Variant;
  block?: boolean;
  /** Optional SVG component (imported with vite-plugin-svgr) rendered after the label. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  children: ReactNode;
};

const classes = (variant: Variant, block: boolean, extra?: string) =>
  ['btn', `btn--${variant}`, block && 'btn--block', extra].filter(Boolean).join(' ');

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = 'primary', block = false, icon: Icon, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={classes(variant, block, className)} {...rest}>
      {children}
      {Icon && <Icon aria-hidden="true" />}
    </button>
  );
}

type ButtonLinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function ButtonLink({ variant = 'primary', block = false, icon: Icon, className, children, ...rest }: ButtonLinkProps) {
  return (
    <a className={classes(variant, block, className)} {...rest}>
      {children}
      {Icon && <Icon aria-hidden="true" />}
    </a>
  );
}
