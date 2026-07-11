import { getAllPosts, getPostReadingTime } from '@/lib/posts';

export async function GET() {
  const posts = await getAllPosts();
  const searchIndex = posts.map((p) => {
    const plainText = (p.body ?? '')
      .replace(/<[^>]*>/g, '')
      .replace(/[#*_`~\[\]()>]/g, '')
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, 5000);

    return {
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
    };
  });

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
