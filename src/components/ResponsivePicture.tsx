import { asset } from '../lib/paths';
import type { ResponsiveImage } from '../types';

type Props = {
  image: ResponsiveImage;
  alt: string;
  className?: string;
  eager?: boolean;
};

/** Serves the desktop / tablet / mobile export of an image for the matching breakpoint. */
export function ResponsivePicture({ image, alt, className, eager = false }: Props) {
  return (
    <picture className={className}>
      <source media="(min-width: 64rem)" srcSet={asset(image.desktop)} />
      <source media="(min-width: 48rem)" srcSet={asset(image.tablet)} />
      <img src={asset(image.mobile)} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </picture>
  );
}
