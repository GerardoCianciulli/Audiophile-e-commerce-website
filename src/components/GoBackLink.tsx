import type { MouseEvent } from 'react';
import './GoBackLink.css';

/** Goes back in history when the visitor came from this site, otherwise follows `fallbackHref`. */
export function GoBackLink({ fallbackHref }: { fallbackHref: string }) {
  const goBack = (event: MouseEvent<HTMLAnchorElement>) => {
    const cameFromThisSite = document.referrer !== '' && new URL(document.referrer).origin === window.location.origin;
    if (cameFromThisSite && window.history.length > 1) {
      event.preventDefault();
      window.history.back();
    }
  };

  return (
    <a className="go-back" href={fallbackHref} onClick={goBack}>
      Go back
    </a>
  );
}
