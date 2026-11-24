export type Category = 'headphones' | 'speakers' | 'earphones';

/** One image exported for each design breakpoint. */
export type ResponsiveImage = {
  mobile: string;
  tablet: string;
  desktop: string;
};

export type IncludedItem = {
  quantity: number;
  item: string;
};

export type RelatedProduct = {
  slug: string;
  name: string;
  image: ResponsiveImage;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  image: ResponsiveImage;
  category: Category;
  categoryImage: ResponsiveImage;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: IncludedItem[];
  gallery: {
    first: ResponsiveImage;
    second: ResponsiveImage;
    third: ResponsiveImage;
  };
  others: RelatedProduct[];
};

export type CartItem = {
  slug: string;
  /** Short name shown in the cart, e.g. "XX99 MK II". */
  shortName: string;
  price: number;
  quantity: number;
  image: string;
};

export type PageConfig =
  | { page: 'home' }
  | { page: 'category'; category: Category }
  | { page: 'product'; slug: string }
  | { page: 'checkout' };
