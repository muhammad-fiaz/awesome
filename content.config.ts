import { defineCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Image validation (local path must exist in /public, or valid HTTP URL)
const imageRefiner = (val: string | undefined) => {
  if (!val) return true;
  if (val.startsWith('http://') || val.startsWith('https://')) return true;
  if (val.startsWith('/')) {
    const fullPath = path.join(process.cwd(), 'public', val);
    return fs.existsSync(fullPath);
  }
  return false;
};

const imageSchema = z.string().optional().refine(imageRefiner, {
  message:
    'Image path must be a valid HTTP(S) URL or a local path that exists in the /public folder.',
});

// URL validation (must be valid http/https URL format)
const urlSchema = z
  .string()
  .url({ message: 'Must be a valid URL starting with http:// or https://' })
  .optional();

// Posts collection
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string().optional(),
    authors: z.array(z.string()).default([]),
    organisations: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    thumbnail: imageSchema,
    heroImage: imageSchema,
    customOgImage: imageSchema,
    references: z.array(z.string()).default([]),
    links: z
      .object({
        website: urlSchema,
        github: urlSchema,
        documentation: urlSchema,
        demo: urlSchema,
        npm: urlSchema,
        crate: urlSchema,
        youtube: urlSchema,
        discord: urlSchema,
      })
      .optional(),
    license: z.string().optional(),
    language: z.string().default('English'),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
    sources: z.array(z.object({ name: z.string(), url: z.string().optional() })).default([]),
  }),
});

// Authors collection
const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    avatar: imageSchema,
    organisation: z.string().optional(),
    organisations: z.array(z.string()).default([]),
    bio: z.string().optional(),
    location: z.string().optional(),
    website: urlSchema,
    github: urlSchema,
    twitter: urlSchema,
    linkedin: urlSchema,
    portfolio: urlSchema,
    sponsor: urlSchema,
    support: urlSchema,
  }),
});

// Organisations collection
const organisations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/organisations' }),
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    avatar: imageSchema,
    authors: z.array(z.string()).default([]),
    bio: z.string().optional(),
    location: z.string().optional(),
    website: urlSchema,
    github: urlSchema,
    twitter: urlSchema,
    linkedin: urlSchema,
    portfolio: urlSchema,
  }),
});

// Categories collection
const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    thumbnail: imageSchema,
    heroImage: imageSchema,
    customOgImage: imageSchema,
    featured: z.boolean().default(false),
  }),
});

// Tags collection
const tags = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tags' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    thumbnail: imageSchema,
    customOgImage: imageSchema,
  }),
});

// Legal collection
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    heroImage: imageSchema,
    authors: z.array(z.string()).default([]),
    organisations: z.array(z.string()).default([]),
    datePublished: z.string().optional(),
    dateModified: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date().optional(),
    summary: z.string().optional(),
    authors: z.array(z.string()).default([]),
    organisations: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    thumbnail: imageSchema,
    heroImage: imageSchema,
    customOgImage: imageSchema,
    references: z.array(z.string()).default([]),
    links: z
      .object({
        website: z.string().optional(),
        github: z.string().optional(),
        documentation: z.string().optional(),
        demo: z.string().optional(),
        npm: z.string().optional(),
        crate: z.string().optional(),
        youtube: z.string().optional(),
        discord: z.string().optional(),
        downloadUrl: z.string().optional(),
      })
      .optional(),
    license: z.string().optional(),
    language: z.string().default('English'),
    difficulty: z
      .enum(['beginner', 'intermediate', 'advanced', 'expert'])
      .optional(),
    sources: z.array(z.object({ name: z.string(), url: z.string().optional() })).default([]),
  }),
});

export const collections = {
  posts,
  authors,
  organisations,
  categories,
  tags,
  legal,
  guides,
  news,
};
