import { BestGear } from '../components/BestGear';
import { ButtonLink } from '../components/Button';
import { CategoryLinks } from '../components/CategoryLinks';
import { PageStatus } from '../components/PageStatus';
import { ProductName } from '../components/ProductName';
import { ResponsivePicture } from '../components/ResponsivePicture';
import { useProducts } from '../hooks/useProducts';
import { routes } from '../lib/paths';
import type { Category } from '../types';
import './CategoryPage.css';

export function CategoryPage({ category }: { category: Category }) {
  const state = useProducts();

  // Newest first, then the flagship (most expensive) models.
  const products = state.products
    .filter((product) => product.category === category)
    .sort((a, b) => Number(b.new) - Number(a.new) || b.price - a.price);

  return (
    <div className="category-page">
      <div className="category-page__banner">
        <h3 className="heading-2">{category}</h3>
      </div>

      {state.status === 'success' ? (
        <div className="container category-page__products">
          {products.map((product, index) => (
            <article key={product.slug} className={`product-preview${index % 2 === 1 ? ' product-preview--reverse' : ''}`}>
              <ResponsivePicture
                className="product-preview__image rounded-image"
                image={product.categoryImage}
                alt={product.name}
                eager={index === 0}
              />
              <div className="product-preview__content">
                {product.new && <p className="overline">New product</p>}
                <h3 className="heading-2 product-preview__title">
                  <ProductName name={product.name} />
                </h3>
                <p className="body-text product-preview__text">{product.description}</p>
                <ButtonLink href={routes.product(product.slug)}>See product</ButtonLink>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <PageStatus status={state.status} message={state.status === 'error' ? state.error : undefined} />
      )}

      <CategoryLinks className="container category-page__categories" />
      <BestGear />
    </div>
  );
}
