import { defineCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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
    'Local image path must exist in the public folder or be a valid HTTP URL',
});

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
    projectName: z.string().optional(),
  }),
});

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
    website: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    portfolio: z.string().optional(),
    sponsor: z.string().optional(),
    support: z.string().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().regex(/^\+\d+$/).optional(),
  }),
});

const organisations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/organisations' }),
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    avatar: imageSchema,
    authors: z.array(z.string()).default([]),
    bio: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    portfolio: z.string().optional(),
    sponsor: z.string().optional(),
    support: z.string().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().regex(/^\+\d+$/).optional(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    thumbnail: imageSchema,
    heroImage: imageSchema,
    customOgImage: imageSchema,
  }),
});

const tags = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tags' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    thumbnail: imageSchema,
    customOgImage: imageSchema,
  }),
});

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
    pubDate: z.coerce.date(),
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
    projectName: z.string().optional(),
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
