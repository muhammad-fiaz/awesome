import { type CollectionEntry, getCollection } from 'astro:content';
import { calculateReadingTime } from './readingTime';

export type Post = CollectionEntry<'posts'>;
export type Author = CollectionEntry<'authors'>;
export type Organisation = CollectionEntry<'organisations'>;
export type Category = CollectionEntry<'categories'>;
export type Tag = CollectionEntry<'tags'>;

/** Get all published (non-draft) posts */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts;
}

/** Get featured posts */
export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.data.featured);
}

/** Get posts by category slug */
export async function getPostsByCategory(
  categorySlug: string,
): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.data.categories.includes(categorySlug));
}

/** Get posts by tag slug */
export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.data.tags.includes(tagSlug));
}

/** Get posts by author slug */
export async function getPostsByAuthor(authorSlug: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.data.authors.includes(authorSlug));
}

/** Get posts by organisation slug */
export async function getPostsByOrganisation(orgSlug: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.data.organisations?.includes(orgSlug));
}

/** Get post reading time from body */
export function getPostReadingTime(post: Post): number {
  return calculateReadingTime(post.body ?? '');
}

/** Get all authors */
export async function getAllAuthors(): Promise<Author[]> {
  return getCollection('authors');
}

/** Get authors by slugs */
export async function getAuthorsBySlugs(slugs: string[]): Promise<Author[]> {
  const allAuthors = await getAllAuthors();
  return allAuthors.filter((a) => slugs.includes(a.id.replace(/\.md$/, '')));
}

/** Get all organisations */
export async function getAllOrganisations(): Promise<Organisation[]> {
  return getCollection('organisations');
}

/** Get organisations by slugs */
export async function getOrganisationsBySlugs(slugs: string[]): Promise<Organisation[]> {
  const allOrgs = await getAllOrganisations();
  return allOrgs.filter((o) => slugs.includes(o.id.replace(/\.md$/, '')));
}

/** Get all categories */
export async function getAllCategories(): Promise<Category[]> {
  return getCollection('categories');
}

/** Get all tags */
export async function getAllTags(): Promise<Tag[]> {
  return getCollection('tags');
}

/** Get related posts based on shared categories/tags */
export async function getRelatedPosts(post: Post, limit = 4): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts
    .filter((p) => p.id !== post.id)
    .filter((p) => {
      const sharedCategories = p.data.categories.some((c) =>
        post.data.categories.includes(c),
      );
      const sharedTags = p.data.tags.some((t) => post.data.tags.includes(t));
      return sharedCategories || sharedTags;
    })
    .slice(0, limit);
}

/** Get post stats */
export async function getPostStats() {
  const [posts, categories, tags, authors, organisations] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllTags(),
    getAllAuthors(),
    getAllOrganisations(),
  ]);
  return {
    posts: posts.length,
    categories: categories.length,
    tags: tags.length,
    authors: authors.length,
    organisations: organisations.length,
  };
}

export async function getRecommendationPosts(
  post: Post,
  limit = 4,
): Promise<Post[]> {
  const allPosts = await getAllPosts();
  const others = allPosts.filter((p) => p.id !== post.id);

  // First try: posts from different categories
  const differentCategory = others.filter(
    (p) => !p.data.categories.some((c) => post.data.categories.includes(c)),
  );

  if (differentCategory.length >= limit) {
    return differentCategory.slice(0, limit);
  }

  // Fallback: any other posts not yet shown
  return others.slice(0, limit);
}

/** Get organisations linked to a specific author */
export async function getOrganisationsForAuthor(authorSlug: string): Promise<Organisation[]> {
  const allOrgs = await getAllOrganisations();
  const allAuthors = await getAllAuthors();
  const authorObj = allAuthors.find((a) => a.id.replace(/\.md$/, '') === authorSlug);
  if (!authorObj) return [];

  const linkedOrgSlugs = new Set<string>();
  
  if (authorObj.data.organisation) {
    linkedOrgSlugs.add(authorObj.data.organisation);
  }
  
  if (authorObj.data.organisations && Array.isArray(authorObj.data.organisations)) {
    for (const org of authorObj.data.organisations) {
      linkedOrgSlugs.add(org);
    }
  }

  for (const org of allOrgs) {
    const orgSlug = org.id.replace(/\.md$/, '');
    if (org.data.authors && Array.isArray(org.data.authors)) {
      if (org.data.authors.includes(authorSlug)) {
        linkedOrgSlugs.add(orgSlug);
      }
    }
  }

  return allOrgs.filter((o) => linkedOrgSlugs.has(o.id.replace(/\.md$/, '')));
}

/** Get authors linked to a specific organisation */
export async function getAuthorsForOrganisation(orgSlug: string): Promise<Author[]> {
  const allAuthors = await getAllAuthors();
  const allOrgs = await getAllOrganisations();
  const orgObj = allOrgs.find((o) => o.id.replace(/\.md$/, '') === orgSlug);
  if (!orgObj) return [];

  const linkedAuthorSlugs = new Set<string>();

  if (orgObj.data.authors && Array.isArray(orgObj.data.authors)) {
    for (const author of orgObj.data.authors) {
      linkedAuthorSlugs.add(author);
    }
  }

  for (const author of allAuthors) {
    const authorSlug = author.id.replace(/\.md$/, '');
    if (author.data.organisation === orgSlug) {
      linkedAuthorSlugs.add(authorSlug);
    }
    if (author.data.organisations && Array.isArray(author.data.organisations)) {
      if (author.data.organisations.includes(orgSlug)) {
        linkedAuthorSlugs.add(authorSlug);
      }
    }
  }

  return allAuthors.filter((a) => linkedAuthorSlugs.has(a.id.replace(/\.md$/, '')));
}

import fs from 'node:fs';
import path from 'node:path';

export function getFileTimestamps(filePath: string) {
  let datePublished = new Date();
  let dateModified = new Date();
  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      datePublished = stats.birthtime;
      dateModified = stats.mtime;
    }
  } catch (e) {
    // Fallback
  }
  return { datePublished, dateModified };
}

export interface NewsEntryWithDates {
  id: string;
  data: CollectionEntry<'news'>['data'] & {
    datePublished: Date;
    dateModified: Date;
  };
  body?: string;
}

export async function getAllNews(): Promise<NewsEntryWithDates[]> {
  const newsEntries = await getCollection('news', ({ data }) => !data.draft);
  return newsEntries.map((n) => {
    const filePath = path.join(process.cwd(), 'src/content/news', n.id);
    const { datePublished, dateModified } = getFileTimestamps(filePath);
    return {
      id: n.id,
      data: {
        ...n.data,
        datePublished,
        dateModified,
      },
      body: n.body,
    };
  });
}

export interface PostWithDates {
  id: string;
  data: CollectionEntry<'posts'>['data'] & {
    datePublished: Date;
    dateModified: Date;
  };
  body?: string;
}

export async function getAllPostsWithDates(): Promise<PostWithDates[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((p) => {
    const filePath = path.join(process.cwd(), 'src/content/posts', p.id);
    const { datePublished, dateModified } = getFileTimestamps(filePath);
    return {
      id: p.id,
      data: {
        ...p.data,
        datePublished,
        dateModified,
      },
      body: p.body,
    };
  });
}

