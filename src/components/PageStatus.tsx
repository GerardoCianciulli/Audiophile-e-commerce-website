import { routes } from '../lib/paths';
import { ButtonLink } from './Button';

type Props = { status: 'loading' | 'error' | 'not-found'; message?: string };

/** Loading / error / not-found placeholder for pages that depend on product data. */
export function PageStatus({ status, message }: Props) {
  if (status === 'loading') {
    return (
      <div className="container page-status" role="status">
        <p className="body-text">Loading products…</p>
      </div>
    );
  }

  return (
    <div className="container page-status" role="alert">
      <h3 className="heading-4">{status === 'not-found' ? 'Product not found' : 'Something went wrong'}</h3>
      <p className="body-text">{message ?? 'We could not load the products. Please try again later.'}</p>
      <ButtonLink href={routes.home}>Back to home</ButtonLink>
    </div>
  );
}
