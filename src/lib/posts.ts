import { type CollectionEntry, getCollection } from 'astro:content';
import { calculateReadingTime } from './readingTime';

export type Post = CollectionEntry<'posts'>;
export type Author = CollectionEntry<'authors'>;
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
  const [posts, categories, tags, authors] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllTags(),
    getAllAuthors(),
  ]);
  return {
    posts: posts.length,
    categories: categories.length,
    tags: tags.length,
    authors: authors.length,
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
