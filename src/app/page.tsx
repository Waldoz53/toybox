'use client';
import { useRouter } from 'next/navigation';
import useLoading from './context/LoadingContext';
import { useEffect, useState, useCallback } from 'react';
import { createClientBrowser } from '@/utils/supabase/client';
import { getTimeAgo } from '@/utils/getTimeAgo';
import Link from 'next/link';
import '@/styles/home.css';

type Post = {
  id: string;
  created_at: string;
  profiles: { username: string };
  figures: { name: string };
};

export default function Home() {
  const router = useRouter();
  const supabase = createClientBrowser();
  const { setLoading } = useLoading();
  const [loadedPosts, setLoadedPosts] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  function goToPost() {
    setLoading(true);
    router.push('/add');
    setLoading(false);
  }

  const fetchAllPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, figure_id, created_at, profiles(username), figures(name)')
      .order('created_at', { ascending: false })
      .limit(50);
    // FIX: add pagination
    if (error || !data) {
      console.log('Error fetching posts:', error.message);
      return <p>Error fetching posts :(</p>;
    } else {
      // FIX: sanity check here in the future
      setPosts(data as unknown as Post[]);
      setLoadedPosts(true);
    }
  }, [supabase]);

  useEffect(() => {
    if (!loadedPosts) {
      fetchAllPosts();
    }
  }, [loadedPosts, fetchAllPosts]);

  return (
    <div className="home">
      <button onClick={goToPost}>Add to your collection</button>
      <div className="all-posts">
        <h3>Recently Added</h3>
        {posts && posts.length > 0 && (
          <>
            {posts.map((post) => (
              <Link
                href={`/${post.profiles?.username}/item/${post.id}`}
                key={post.id}
                className="post"
              >
                <p>
                  {post.profiles?.username} added <strong>{post.figures.name}</strong>
                </p>
                <span>{getTimeAgo(post.created_at)}</span>
              </Link>
            ))}
          </>
        )}
        {posts.length == 0 && loadedPosts && <p>No recently added items.</p>}
        {posts == undefined && <p>Failed to fetch items.</p>}
        {!loadedPosts && <span className="loader"></span>}
      </div>
    </div>
  );
}
