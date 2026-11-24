import { ResponsivePicture } from './ResponsivePicture';
import './BestGear.css';

const image = {
  desktop: './assets/shared/desktop/image-best-gear.jpg',
  tablet: './assets/shared/tablet/image-best-gear.jpg',
  mobile: './assets/shared/mobile/image-best-gear.jpg',
};

export function BestGear() {
  return (
    <section className="best-gear container" aria-labelledby="best-gear-title">
      <ResponsivePicture className="best-gear__image rounded-image" image={image} alt="A man wearing headphones in front of a tiled wall" />
      <div className="best-gear__content">
        <h2 id="best-gear-title" className="heading-2">
          Bringing you the <span className="text-accent">best</span> audio gear
        </h2>
        <p className="body-text">
          Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones,
          speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to
          browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who
          make Audiophile the best place to buy your portable audio equipment.
        </p>
      </div>
    </section>
  );
}
