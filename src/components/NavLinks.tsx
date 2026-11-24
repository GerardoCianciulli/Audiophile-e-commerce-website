import { categories, isCurrentPage, routes } from '../lib/paths';

const links = [
  { label: 'Home', href: routes.home },
  ...categories.map((category) => ({ label: category, href: routes.category(category) })),
];

export function NavLinks({ className }: { className?: string }) {
  return (
    <ul className={['nav-links', className].filter(Boolean).join(' ')}>
      {links.map(({ label, href }) => (
        <li key={href}>
          <a className="nav-links__link" href={href} aria-current={isCurrentPage(href) ? 'page' : undefined}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
