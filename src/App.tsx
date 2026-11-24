import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CartProvider } from './context/CartContext';
import { CategoryPage } from './pages/CategoryPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import type { PageConfig } from './types';

function Page({ config }: { config: PageConfig }) {
  switch (config.page) {
    case 'home':
      return <HomePage />;
    case 'category':
      return <CategoryPage category={config.category} />;
    case 'product':
      return <ProductPage slug={config.slug} />;
    case 'checkout':
      return <CheckoutPage />;
  }
}

export function App({ config }: { config: PageConfig }) {
  return (
    <CartProvider>
      <Header overlay={config.page === 'home'} />
      <main id="main">
        <Page config={config} />
      </main>
      <Footer />
    </CartProvider>
  );
}
