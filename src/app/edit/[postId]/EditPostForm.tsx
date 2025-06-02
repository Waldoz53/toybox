'use client';

import { editPost } from '@/app/actions';
import useLoading from '@/app/context/LoadingContext';
import DeletePostButton from '@/components/DeletePostButton';
import Toast from '@/components/Toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Post = {
  id: string;
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
  profiles: {
    username: string;
  };
};

export default function EditPostForm({ postData }: { postData: Post }) {
  const [message, setMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('error');
  const [originalPost] = useState<Post>(postData);
  const { setLoading } = useLoading();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await editPost(formData).then((res) => {
      setMessage(res ?? '');
      if (message == 'Successfully edited!') {
        setToastType('success');
      } else {
        console.log('Submit post error:', message);
      }
      setLoading(false);
      router.push(
        `/user/${encodeURIComponent(originalPost.profiles.username)}/item/${encodeURIComponent(originalPost.id)}`,
      );
    });

    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>
          {originalPost
            ? `${originalPost.figures.toylines.brands.name} ${originalPost.figures.toylines.name} ${originalPost.figures.name}`
            : 'Loading...'}
        </h2>
        <input type="hidden" name="postId" value={postData.id} />
        <label htmlFor="rating">Rating, out of 10 (optional):</label>
        <input
          type="number"
          name="rating"
          className="rating"
          min="1"
          max="10"
          defaultValue={originalPost?.rating ? originalPost.rating : ''}
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
        <DeletePostButton id={postData.id} />

        <Toast message={message} toastType={toastType} />
      </form>
    </>
  );
}
