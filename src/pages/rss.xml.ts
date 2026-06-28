import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { BASE_PATH, SITE_CONFIG } from '@/config/site';
import { getAllPosts } from '@/lib/posts';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();

  return rss({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    site: context.site ?? SITE_CONFIG.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `${BASE_PATH}/post/${post.id.replace(/\.(md|mdx)$/, '')}/`,
      pubDate: new Date(),
      categories: [...post.data.categories, ...post.data.tags],
    })),
    customData: '<language>en-us</language>',
  });
}
