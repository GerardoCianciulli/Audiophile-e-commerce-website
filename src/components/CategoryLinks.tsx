import ArrowIcon from '../assets/icons/icon-arrow-right.svg?react';
import { asset, categories, routes } from '../lib/paths';
import './CategoryLinks.css';

type Props = {
  className?: string;
  /** Called when a link is chosen (closes the mobile menu). */
  onNavigate?: () => void;
};

/** The three "Headphones / Speakers / Earphones — Shop" cards. */
export function CategoryLinks({ className, onNavigate }: Props) {
  return (
    <nav className={['category-links', className].filter(Boolean).join(' ')} aria-label="Product categories">
      <ul className="category-links__list">
        {categories.map((category) => (
          <li key={category}>
            <a className="category-card" href={routes.category(category)} onClick={onNavigate}>
              <img
                className="category-card__image"
                src={asset(`./assets/shared/desktop/image-category-thumbnail-${category}.png`)}
                alt=""
                loading="lazy"
              />
              <h3 className="category-card__title">{category}</h3>
              <span className="category-card__shop">
                Shop <ArrowIcon aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
