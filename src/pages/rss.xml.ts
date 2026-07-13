import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { BASE_PATH, SITE_CONFIG } from '@/config/site';
import { getAllPosts } from '@/lib/posts';
import fs from 'node:fs';
import path from 'node:path';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();
  const newsEntries = await getCollection('news', ({ data }) => !data.draft);

  const postItems = posts.map((post) => {
    const postFilePath = path.join(process.cwd(), 'src/content/posts', post.id);
    let pubDate = new Date();
    try {
      if (fs.existsSync(postFilePath)) {
        pubDate = fs.statSync(postFilePath).birthtime;
      }
    } catch (e) {
      // Fallback
    }

    return {
      title: post.data.title,
      description: post.data.description,
      link: `${BASE_PATH}/post/${post.id.replace(/\.(md|mdx)$/, '')}/`,
      pubDate,
      categories: [...post.data.categories, ...post.data.tags],
    };
  });

  const newsItems = newsEntries.map((news) => {
    const newsFilePath = path.join(process.cwd(), 'src/content/news', news.id);
    let pubDate = new Date();
    try {
      if (fs.existsSync(newsFilePath)) {
        pubDate = fs.statSync(newsFilePath).birthtime;
      }
    } catch (e) {
      // Fallback
    }

    return {
      title: news.data.title,
      description: news.data.description,
      link: `${BASE_PATH}/news/${news.id.replace(/\.md$/, '')}/`,
      pubDate,
      categories: [news.data.category ?? 'News', ...news.data.tags],
    };
  });

  const combinedItems = [...postItems, ...newsItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );

  return rss({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    site: context.site ?? SITE_CONFIG.url,
    items: combinedItems,
    customData: '<language>en-us</language>',
  });
}
