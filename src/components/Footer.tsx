import FacebookIcon from '../assets/icons/icon-facebook.svg?react';
import InstagramIcon from '../assets/icons/icon-instagram.svg?react';
import TwitterIcon from '../assets/icons/icon-twitter.svg?react';
import Logo from '../assets/icons/logo.svg?react';
import { routes } from '../lib/paths';
import { NavLinks } from './NavLinks';
import './Footer.css';

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com', Icon: FacebookIcon },
  { label: 'Twitter', href: 'https://twitter.com', Icon: TwitterIcon },
  { label: 'Instagram', href: 'https://www.instagram.com', Icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <a className="site-footer__logo" href={routes.home} aria-label="Audiophile home">
          <Logo aria-hidden="true" />
        </a>

        <nav className="site-footer__nav" aria-label="Footer">
          <NavLinks />
        </nav>

        <p className="site-footer__about">
          Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound
          specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo
          facility - we’re open 7 days a week.
        </p>

        <p className="site-footer__copyright">Copyright 2021. All Rights Reserved</p>

        <ul className="site-footer__social">
          {socialLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
