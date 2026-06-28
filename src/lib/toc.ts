import type { TocItem } from '@/types';

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

/**
 * Convert flat headings array from Astro into a nested tree
 */
export function buildToc(headings: Heading[]): TocItem[] {
  const toc: TocItem[] = [];
  const stack: TocItem[] = [];

  for (const h of headings) {
    const item: TocItem = {
      depth: h.depth,
      slug: h.slug,
      text: h.text,
      children: [],
    };

    while (stack.length > 0 && stack[stack.length - 1].depth >= h.depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      toc.push(item);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.children) parent.children = [];
      parent.children.push(item);
    }

    stack.push(item);
  }

  return toc;
}

/**
 * Flatten nested TOC for scroll-spy
 */
export function flattenToc(toc: TocItem[]): TocItem[] {
  const flat: TocItem[] = [];
  for (const item of toc) {
    flat.push(item);
    if (item.children?.length) {
      flat.push(...flattenToc(item.children));
    }
  }
  return flat;
}
