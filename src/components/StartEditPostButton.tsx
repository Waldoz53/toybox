'use client';
import useLoading from '@/app/context/LoadingContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StartEditPostButton({ id }: { id: string }) {
  const router = useRouter();
  const { setLoading } = useLoading();

  useEffect(() => {
    router.prefetch(`/edit/${id}`);
  }, [router, id]);

  async function startEdit() {
    setLoading(true);
    router.push(`/edit/${id}`);
    setLoading(false);
  }

  return (
    <button
      className="start-edit"
      onClick={(e) => {
        e.stopPropagation();
        startEdit();
      }}
    >
      Edit Review
    </button>
  );
}
