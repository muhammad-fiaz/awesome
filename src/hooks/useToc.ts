import { useEffect, useState } from 'react';
import { flattenToc } from '@/lib/toc';
import type { TocItem } from '@/types';

export function useToc(toc: TocItem[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const flat = flattenToc(toc);
    if (flat.length === 0) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const headingElements = flat
            .map((item) => document.getElementById(item.slug))
            .filter((el): el is HTMLElement => el !== null);

          if (headingElements.length === 0) {
            ticking = false;
            return;
          }

          const threshold = 120; // 120px offset from viewport top (covers header navbar)
          let currentActiveId = '';

          // If we are close to the top of the page, highlight the first item
          if (window.scrollY < 100) {
            currentActiveId = headingElements[0].id;
          } else {
            for (const el of headingElements) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= threshold) {
                currentActiveId = el.id;
              } else {
                break;
              }
            }
          }

          // Fallback to first heading if none matched
          if (!currentActiveId && headingElements.length > 0) {
            currentActiveId = headingElements[0].id;
          }

          setActiveId(currentActiveId);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Run once on mount / page transitions
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toc]);

  return activeId;
}
