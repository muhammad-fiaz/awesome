import { useEffect, useState } from 'react';
import { flattenToc } from '@/lib/toc';
import type { TocItem } from '@/types';

export function useToc(toc: TocItem[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const flat = flattenToc(toc);
    if (flat.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-64px 0px -80% 0px',
        threshold: 0,
      },
    );

    for (const item of flat) {
      const el = document.getElementById(item.slug);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [toc]);

  return activeId;
}
