'use client';

import { useState } from 'react';
import { createPost } from '../actions';
import Toast from '@/components/Toast';
import { useRouter } from 'next/navigation';
import useLoading from '../context/LoadingContext';

export default function PostPage() {
  const [message, setMessage] = useState('');
  const { setLoading } = useLoading();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await createPost(formData).then((res) => {
      setMessage(res ?? '');
      if (res !== '') {
        console.log('Submit post error:', message);
      }
      setLoading(false);
    });

    setTimeout(() => {
      setMessage('');
    }, 3000);

    router.push('/profile');
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Figure Name:</label>
      <input id="title" name="title" type="text" required />
      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" placeholder="Quality, features, etc." />
      <div className="spacer"></div>
      <button>Add</button>
      <Toast message={message} />
    </form>
  );
}
