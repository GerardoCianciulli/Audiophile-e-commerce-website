import $ from 'jquery';
import { useEffect, useState, type MouseEvent } from 'react';
import { BestGear } from '../components/BestGear';
import { Button, ButtonLink } from '../components/Button';
import { CategoryLinks } from '../components/CategoryLinks';
import { GoBackLink } from '../components/GoBackLink';
import { OPEN_CART_EVENT } from '../components/Header';
import { PageStatus } from '../components/PageStatus';
import { ProductName } from '../components/ProductName';
import { QuantityStepper } from '../components/QuantityStepper';
import { ResponsivePicture } from '../components/ResponsivePicture';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import { formatPrice, shortProductName } from '../lib/format';
import { routes } from '../lib/paths';
import type { Product } from '../types';
import './ProductPage.css';

export function ProductPage({ slug }: { slug: string }) {
  const state = useProducts();
  const product = state.products.find((item) => item.slug === slug);

  useEffect(() => {
    if (product) document.title = `${product.name} | Audiophile`;
  }, [product]);

  return (
    <div className="product-page">
      {state.status === 'success' && product ? (
        <ProductDetails product={product} />
      ) : (
        <PageStatus
          status={state.status === 'success' ? 'not-found' : state.status}
          message={state.status === 'error' ? state.error : undefined}
        />
      )}
      <CategoryLinks className="container product-page__categories" />
      <BestGear />
    </div>
  );
}

function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const addToCart = (event: MouseEvent<HTMLButtonElement>) => {
    addItem({
      slug: product.slug,
      shortName: shortProductName(product.name),
      price: product.price,
      quantity,
      image: `./assets/cart/image-${product.slug}.jpg`,
    });
    setQuantity(1);
    event.currentTarget.blur();
    // Show what was added: the header listens for this jQuery event and opens the cart.
    $(document).trigger(OPEN_CART_EVENT);
  };

  return (
    <div className="container">
      <GoBackLink fallbackHref={routes.category(product.category)} />

      <article className="product-detail" aria-labelledby="product-title">
        <ResponsivePicture className="product-detail__image rounded-image" image={product.image} alt={product.name} eager />
        <div className="product-detail__content">
          {product.new && <p className="overline product-detail__overline">New product</p>}
          <h3 id="product-title" className="heading-2 product-detail__title">
            <ProductName name={product.name} />
          </h3>
          <p className="body-text product-detail__description">{product.description}</p>
          <p className="heading-6 product-detail__price">{formatPrice(product.price)}</p>
          <div className="product-detail__actions">
            <QuantityStepper value={quantity} onChange={setQuantity} label={`${product.name} quantity`} />
            <Button onClick={addToCart}>Add to cart</Button>
          </div>
        </div>
      </article>

      <section className="product-info" aria-label="Product information">
        <div className="product-info__features">
          <h3 className="heading-3">Features</h3>
          <div className="body-text product-info__text">
            {product.features.split(/\n\s*\n/).map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="product-info__box">
          <h3 className="heading-3">In the box</h3>
          <ul className="product-info__list">
            {product.includes.map(({ quantity: count, item }) => (
              <li key={item}>
                <span className="product-info__count">{count}x</span>
                <span className="body-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="product-gallery" aria-label={`${product.name} gallery`}>
        <ResponsivePicture className="product-gallery__first rounded-image" image={product.gallery.first} alt={`${product.name} in use`} />
        <ResponsivePicture className="product-gallery__second rounded-image" image={product.gallery.second} alt={`${product.name} detail`} />
        <ResponsivePicture className="product-gallery__third rounded-image" image={product.gallery.third} alt={`${product.name} close-up`} />
      </section>

      <section className="related" aria-labelledby="related-title">
        <h3 id="related-title" className="heading-3 related__title">
          You may also like
        </h3>
        <ul className="related__list">
          {product.others.map((other) => (
            <li key={other.slug} className="related__item">
              <ResponsivePicture className="related__image rounded-image" image={other.image} alt={other.name} />
              <h3 className="heading-5 related__name">{other.name}</h3>
              <ButtonLink href={routes.product(other.slug)}>See product</ButtonLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
