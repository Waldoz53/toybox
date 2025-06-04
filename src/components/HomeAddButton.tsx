'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomeAddButton() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/add');
  }, [router]);

  return <button onClick={() => router.push('/add')}>Add to your collection</button>;
}
