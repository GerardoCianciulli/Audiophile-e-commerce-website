import $ from 'jquery';
import { useEffect, useId, useRef, type RefObject } from 'react';

type ToggleEffect = 'fade' | 'slide';

/**
 * Shows/hides an element with a jQuery animation whenever `open` changes.
 * React decides *whether* something is open; jQuery only animates the DOM node.
 */
export function useJQueryToggle(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  effect: ToggleEffect = 'fade',
  duration = 250,
): void {
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!ref.current) return;
    const $element = $(ref.current).stop(true, true);

    if (isFirstRun.current) {
      isFirstRun.current = false;
      $element.toggle(open);
      return;
    }

    if (effect === 'slide') {
      if (open) $element.slideDown(duration);
      else $element.slideUp(duration);
    } else if (open) {
      $element.fadeIn(duration);
    } else {
      $element.fadeOut(duration);
    }
  }, [ref, open, effect, duration]);
}

/** Stops the page behind an open modal or menu from scrolling. */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    $('body').toggleClass('is-scroll-locked', locked);
    return () => {
      $('body').removeClass('is-scroll-locked');
    };
  }, [locked]);
}

/** Calls `onEscape` when the Escape key is pressed while `active` is true. */
export function useEscapeKey(active: boolean, onEscape: () => void): void {
  const namespace = `keydown.escape${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const callback = useRef(onEscape);

  useEffect(() => {
    callback.current = onEscape;
  });

  useEffect(() => {
    if (!active) return;
    $(document).on(namespace, (event) => {
      if (event.key === 'Escape') callback.current();
    });
    return () => {
      $(document).off(namespace);
    };
  }, [active, namespace]);
}

/** Distance from the top of the viewport to the bottom of the element (never negative). */
export function bottomInViewport(element: HTMLElement | null): number {
  if (!element) return 0;
  const $element = $(element);
  const bottom = ($element.offset()?.top ?? 0) + ($element.outerHeight() ?? 0) - ($(window).scrollTop() ?? 0);
  return Math.max(0, bottom);
}

/** Smoothly scrolls the page so the element is in view, then focuses it. */
export function scrollToAndFocus(element: HTMLElement | null, offset = 120): void {
  if (!element) return;
  const top = ($(element).offset()?.top ?? 0) - offset;
  $('html, body')
    .stop(true)
    .animate({ scrollTop: Math.max(0, top) }, 400, () => element.focus({ preventScroll: true }));
}
