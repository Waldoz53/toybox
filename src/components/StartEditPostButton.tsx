'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StartEditPostButton({ id }: { id: string }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/edit/${id}`);
  }, [router, id]);

  async function startEdit() {
    router.push(`/edit/${id}`);
  }

  return (
    <button
      className="start-edit"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault()
        startEdit();
      }}
    >
      Edit Review
    </button>
  );
}
