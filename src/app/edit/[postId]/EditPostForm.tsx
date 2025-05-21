'use client';

import { editPost } from '@/app/actions';
import useLoading from '@/app/context/LoadingContext';
import DeletePostButton from '@/components/DeletePostButton';
import Toast from '@/components/Toast';
import { createClientBrowser } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type Post = {
  description: string;
  figures: {
    name: string;
    toylines: {
      name: string;
      brands: {
        name: string;
      };
    };
  };
  rating: number;
};

export default function EditPostForm({ id }: { id: string }) {
  const supabase = createClientBrowser();
  const [message, setMessage] = useState('');
  const [originalPost, setOriginalPost] = useState<Post | null>(null);
  const { setLoading } = useLoading();
  const router = useRouter();

  const fetchPostData = useCallback(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('description, rating, figures(name, toylines(name, brands(name)))')
      .eq('id', id)
      .single();

    if (error) {
      return <p>Failed to fetch post</p>;
    }

    if (data) {
      setOriginalPost(data as unknown as Post);
    }
  }, [id, supabase]);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await editPost(formData).then((res) => {
      setMessage(res ?? '');
      if (res != '') {
        console.log('Submit post error:', message);
      }
      setLoading(false);
      router.push('/profile');
    });

    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  return (
    <>
      {!originalPost && <h3>Loading review...</h3>}
      {originalPost && (
        <>
          <form onSubmit={handleSubmit}>
            <h3>
              {originalPost
                ? `${originalPost.figures.toylines.brands.name} ${originalPost.figures.toylines.name} ${originalPost.figures.name}`
                : 'Loading...'}
            </h3>
            <input type="hidden" name="postId" value={id} />
            <label htmlFor="rating">Rating, out of 10 (optional):</label>
            <input
              type="number"
              name="rating"
              className="rating"
              min="1"
              max="10"
              defaultValue={originalPost.rating ? originalPost.rating : ''}
            />
            <label htmlFor="description">Review:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Optional: write a review or describe its quality"
              defaultValue={originalPost ? originalPost?.description : ''}
            />
            <div className="spacer"></div>
            <button>Submit Edit</button>
            <DeletePostButton id={id} />

            <Toast message={message} />
          </form>
        </>
      )}
    </>
  );
}
