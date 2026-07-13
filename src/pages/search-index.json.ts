import { getAllPosts, getPostReadingTime } from '@/lib/posts';
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';

export async function GET() {
  const posts = await getAllPosts();
  const newsEntries = await getCollection('news', ({ data }) => !data.draft);
  const guideEntries = await getCollection('guides');

  const postItems = posts.map((p) => {
    const plainText = (p.body ?? '')
      .replace(/<[^>]*>/g, '')
      .replace(/[#*_`~\[\]()>]/g, '')
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, 5000);

    return {
      type: 'post',
      slug: p.id.replace(/\.(md|mdx)$/, ''),
      title: p.data.title,
      description: p.data.description,
      content: plainText,
      thumbnail: p.data.thumbnail,
      categories: p.data.categories,
      tags: p.data.tags,
      authors: p.data.authors,
      organisations: p.data.organisations ?? [],
      readingTime: getPostReadingTime(p),
      featured: p.data.featured,
      difficulty: p.data.difficulty,
      sources: p.data.sources,
      links: p.data.links,
    };
  });

  const newsItems = newsEntries.map((n) => {
    const plainText = (n.body ?? '')
      .replace(/<[^>]*>/g, '')
      .replace(/[#*_`~\[\]()>]/g, '')
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, 5000);

    const newsFilePath = path.join(process.cwd(), 'src/content/news', n.id);
    let pubDateStr = new Date().toISOString();
    try {
      if (fs.existsSync(newsFilePath)) {
        pubDateStr = fs.statSync(newsFilePath).birthtime.toISOString();
      }
    } catch (e) {
      // Fallback
    }

    return {
      type: 'news',
      slug: n.id.replace(/\.md$/, ''),
      title: n.data.title,
      description: n.data.description,
      content: plainText,
      thumbnail: n.data.thumbnail,
      categories: n.data.category ? [n.data.category] : [],
      tags: n.data.tags,
      authors: n.data.authors,
      organisations: n.data.organisations ?? [],
      readingTime: 3,
      featured: false,
      difficulty: undefined,
      sources: n.data.sources,
      links: n.data.links,
      pubDate: pubDateStr,
    };
  });

  const guideItems = guideEntries.map((g) => {
    const plainText = (g.body ?? '')
      .replace(/<[^>]*>/g, '')
      .replace(/[#*_`~\[\]()>]/g, '')
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, 5000);

    return {
      type: 'guide',
      slug: g.id.replace(/\.md$/, ''),
      title: g.data.title,
      description: g.data.description ?? '',
      content: plainText,
      thumbnail: g.data.heroImage,
      categories: ['Guides'],
      tags: g.data.keywords ? g.data.keywords.split(',').map((k) => k.trim()) : [],
      authors: g.data.authors ?? [],
      organisations: g.data.organisations ?? [],
      readingTime: 10,
      featured: false,
      difficulty: undefined,
    };
  });

  const searchIndex = [...postItems, ...newsItems, ...guideItems];

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
