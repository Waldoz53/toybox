import HomePostList from '@/components/HomePostList';
import { Suspense } from 'react';
import { fetchHomePosts } from '@/lib/fetchHomePosts';
import HomeShell from '@/components/HomeShell';

// forces nextjs to cache this page for 15 seconds
export const revalidate = 15;

export default async function HomePage() {
  const data = await fetchHomePosts();

  // converts data shape in case the data is a slightly different shape
  const posts = (data ?? []).map((post) => ({
    id: post.id,
    created_at: post.created_at,
    profiles: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles,
    figures: Array.isArray(post.figures)
      ? {
          name: post.figures[0]?.name ?? '[noname]',
          toylines: Array.isArray(post.figures[0]?.toylines)
            ? post.figures[0].toylines[0]
            : (post.figures[0]?.toylines ?? { name: '[noname]' }),
        }
      : post.figures,
    likes: post.likes ?? [],
    comments: post.comments ?? [],
  }));

  return (
    <HomeShell>
      <Suspense fallback={<p>Loading posts...</p>}>
        <HomePostList posts={posts} />
      </Suspense>
    </HomeShell>
  );
}
