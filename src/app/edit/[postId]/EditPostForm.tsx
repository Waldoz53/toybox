'use client';

import { editPost } from '@/app/actions';
import useLoading from '@/app/context/LoadingContext';
import Toast from '@/components/Toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditPostForm({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  const [message, setMessage] = useState('');
  const { setLoading } = useLoading();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await editPost(formData).then((res) => {
      setMessage(res ?? '');
      if (res !== '') {
        console.log('Submit post error:', message);
      }
      setLoading(false);
      router.push('/profile')
    });

    setTimeout(() => {
      setMessage('');
    }, 5000);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <label htmlFor="title">Figure Name:</label>
      <input id="title" name="title" type="text" required defaultValue={title} />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        defaultValue={description}
        placeholder="Quality, features, etc."
      />
      <div className="spacer"></div>
      <button>Submit Edit</button>
      <Toast message={message} />
    </form>
  );
}
