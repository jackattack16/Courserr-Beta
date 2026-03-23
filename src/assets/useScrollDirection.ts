import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_THRESHOLD = 10;

export default function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setScrollDirection('up');
    setIsScrolled(false);
  }, [pathname]);

  useEffect(() => {
    let lastScrollY = 0;
    let rafId: number;
    let currentTarget: EventTarget | null = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;

        const main = document.querySelector('main') as HTMLElement | null;
        const flexContainer = document.querySelector('.flex-container') as HTMLElement | null;

        let currentScrollY = 0;
        if (main && main.scrollHeight > main.clientHeight) {
          currentScrollY = main.scrollTop;
        } else if (flexContainer) {
          currentScrollY = flexContainer.scrollTop;
        } else {
          currentScrollY = window.scrollY;
        }

        const diff = currentScrollY - lastScrollY;

        setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

        if (Math.abs(diff) > SCROLL_THRESHOLD) {
          setScrollDirection(diff > 0 ? 'down' : 'up');
        }
        lastScrollY = currentScrollY;
      });
    };

    const attachTo = (target: EventTarget) => {
      if (currentTarget === target) return;
      detach();
      currentTarget = target;
      target.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions);
    };

    const detach = () => {
      if (currentTarget) {
        currentTarget.removeEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions);
        currentTarget = null;
      }
    };

    const resolveScrollTarget = (): EventTarget => {
      const main = document.querySelector('main') as HTMLElement | null;
      if (main && main.scrollHeight > main.clientHeight) return main;

      const flexContainer = document.querySelector('.flex-container') as HTMLElement | null;
      if (flexContainer) return flexContainer;

      return window;
    };

    attachTo(resolveScrollTarget());

    let debounceTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const target = resolveScrollTarget();
        attachTo(target);
      }, 100);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(debounceTimer);
      observer.disconnect();
      detach();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return { scrollDirection, isScrolled };
}
