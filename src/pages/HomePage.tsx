import PatternCircles from '../assets/icons/pattern-circles.svg?react';
import { BestGear } from '../components/BestGear';
import { ButtonLink } from '../components/Button';
import { CategoryLinks } from '../components/CategoryLinks';
import { ResponsivePicture } from '../components/ResponsivePicture';
import { routes } from '../lib/paths';
import './HomePage.css';

const homeImage = (name: string, extension = 'jpg') => ({
  desktop: `./assets/home/desktop/${name}.${extension}`,
  tablet: `./assets/home/tablet/${name}.${extension}`,
  mobile: `./assets/home/mobile/${name}.${extension}`,
});

const heroImage = {
  desktop: './assets/home/desktop/image-hero.jpg',
  tablet: './assets/home/tablet/image-header.jpg',
  mobile: './assets/home/mobile/image-header.jpg',
};

export function HomePage() {
  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <ResponsivePicture className="hero__image" image={heroImage} alt="" eager />
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="overline hero__overline">New product</p>
            <h3 id="hero-title" className="heading-1 hero__title">
              XX99 Mark II Headphones
            </h3>
            <p className="hero__text">
              Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
            </p>
            <ButtonLink href={routes.product('xx99-mark-two-headphones')}>See product</ButtonLink>
          </div>
        </div>
      </section>

      <CategoryLinks className="container home__categories" />

      <section className="container home__featured" aria-label="Featured products">
        <article className="feature-zx9">
          <PatternCircles className="feature-zx9__pattern" aria-hidden="true" />
          <ResponsivePicture className="feature-zx9__image" image={homeImage('image-speaker-zx9', 'png')} alt="ZX9 speaker" />
          <div className="feature-zx9__content">
            <h3 className="heading-1 feature-zx9__title">
              ZX9
              <br />
              Speaker
            </h3>
            <p className="feature-zx9__text">
              Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
            </p>
            <ButtonLink variant="dark" href={routes.product('zx9-speaker')}>
              See product
            </ButtonLink>
          </div>
        </article>

        <article className="feature-zx7">
          <ResponsivePicture className="feature-zx7__image" image={homeImage('image-speaker-zx7')} alt="ZX7 speaker on a side table" />
          <div className="feature-zx7__content">
            <h3 className="heading-4">ZX7 Speaker</h3>
            <ButtonLink variant="secondary" href={routes.product('zx7-speaker')}>
              See product
            </ButtonLink>
          </div>
        </article>

        <article className="feature-yx1">
          <ResponsivePicture className="feature-yx1__image rounded-image" image={homeImage('image-earphones-yx1')} alt="YX1 earphones in their open charging case" />
          <div className="feature-yx1__content">
            <h3 className="heading-4">YX1 Earphones</h3>
            <ButtonLink variant="secondary" href={routes.product('yx1-earphones')}>
              See product
            </ButtonLink>
          </div>
        </article>
      </section>

      <BestGear />
    </div>
  );
}
