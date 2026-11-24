# Frontend Mentor - Audiophile e-commerce website

![Design preview for the Audiophile e-commerce website coding challenge](./preview.jpg)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

My challenge was to build out this multi-page e-commerce website and get it looking as close to the Figma design as possible, at desktop, tablet and mobile sizes. The site has a home page, three category pages (headphones, speakers and earphones), six product pages and a checkout page. Product data comes from a `data.json` file, read with JSON-Server in development.

Your users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add/Remove products from the cart
- Edit product quantities in the cart
- Fill in all fields in the checkout
- Receive form validations if fields are missed or incorrect during checkout
- See correct checkout totals depending on the products in the cart
  - Shipping always adds $50 to the order
  - VAT is calculated as 20% of the product total, excluding shipping
- See an order confirmation modal after checking out with an order summary
- Keep track of what's in the cart, even after refreshing the browser

### Links

- Live Site URL: [github pages](https://GerardoCianciulli.github.io/Audiophile-e-commerce-website/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid
- Flexbox
- Desktop-first workflow
- Media queries
- `rem` units
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (multi-page app)
- [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) for SVG icons
- Fetch API
- [JSON-Server](https://github.com/typicode/json-server)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [jQuery](https://jquery.com/)
- `localStorage`
- [gh-pages](https://github.com/tschaub/gh-pages)

### What I learned

**A real multi-page site with Vite.** Every page is its own HTML file (`index.html`, `headphones.html`, `product-zx9-speaker.html`, `checkout.html`…), so the site works on GitHub Pages without any router tricks. Vite builds each page as an entry point, and each page tells React what to render through `data-*` attributes:

```ts
// vite.config.ts
build: {
  rollupOptions: {
    input: Object.fromEntries(pages.map((page) => [page, resolve(import.meta.dirname, `${page}.html`)])),
  },
},
```

```html
<!-- product-zx9-speaker.html -->
<div id="root" data-page="product" data-slug="zx9-speaker"></div>
```

Because every navigation is a full page load, the cart is kept in `localStorage` through a `useReducer` context.

**Conditional validation with Formik and Yup.** Only one payment method can be selected, and the e-Money fields are only required when e-Money is chosen. Yup's `when()` handles that, so the Formik form stays simple:

```ts
eMoneyNumber: string().when('paymentMethod', {
  is: 'e-money',
  then: (schema) => schema.trim().required("Can't be empty").matches(/^\d{9}$/, 'Must be 9 digits'),
  otherwise: (schema) => schema.strip(),
}),
```

**Auto-formatting a phone number while typing.** The last 10 digits are always the area code and number, so the country code grows from 1 to 3 digits as more digits are typed (`12025550136` → `+1 (202) 555-0136`, `442071234567` → `+44 (207) 123-4567`):

```ts
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 13);
  if (digits.length === 0) return raw.trim().startsWith('+') ? '+' : '';

  const countryCodeLength = Math.min(3, Math.max(1, digits.length - 10));
  const rest = digits.slice(countryCodeLength);
  let formatted = `+${digits.slice(0, countryCodeLength)}`;
  if (rest.slice(0, 3)) formatted += ` (${rest.slice(0, 3)}`;
  if (rest.slice(3, 6)) formatted += `) ${rest.slice(3, 6)}`;
  if (rest.slice(6, 10)) formatted += `-${rest.slice(6, 10)}`;
  return formatted;
}
```

**Using jQuery alongside React.** React owns the state (is the cart open?), and jQuery only animates the DOM node, inside a small hook. jQuery also locks page scrolling behind modals, closes them with the Escape key, and smoothly scrolls to the first invalid checkout field:

```ts
export function useJQueryToggle(ref: RefObject<HTMLElement | null>, open: boolean, effect: 'fade' | 'slide' = 'fade') {
  useEffect(() => {
    if (!ref.current) return;
    const $element = $(ref.current).stop(true, true);
    if (effect === 'slide') open ? $element.slideDown(250) : $element.slideUp(250);
    else open ? $element.fadeIn(250) : $element.fadeOut(250);
  }, [ref, open, effect]);
}
```

**Passing SVG components as props.** With vite-plugin-svgr each icon is a React component, so a button can take any icon as a prop:

```tsx
type CommonProps = {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export function Button({ icon: Icon, children, ...rest }: ButtonProps) {
  return (
    <button {...rest}>
      {children}
      {Icon && <Icon aria-hidden="true" />}
    </button>
  );
}
```

## Author

- Portfolio - [Gerardo Cianciulli](https://www.behance.net/gerardo-cianciulli)
- Frontend Mentor - [Gerardo Cianciulli](https://www.frontendmentor.io/profile/GerardoCianciulli)
- Linkedin - [Gerardo Cianciulli](https://www.linkedin.com/in/gerardo-cianciulli/)
