export type { AuthorFrontmatter } from './author';
export type { CategoryFrontmatter } from './category';
export type { LegalFrontmatter } from './legal';
export type { PostFrontmatter, PostLinks } from './post';
export type { TagFrontmatter } from './tag';

// Resolved content types (after Astro collection resolution)
export interface TocItem {
  depth: number;
  slug: string;
  text: string;
  children?: TocItem[];
}

export interface PostMeta {
  slug: string;
  readingTime: number;
  publishedAt: string; // ISO date derived from git/file
  wordCount: number;
}
