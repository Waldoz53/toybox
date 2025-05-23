'use client';

import { useRouter } from 'next/navigation';
import '@/styles/home.css';
import { useEffect } from 'react';

export default function HomeShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/add');
  }, [router]);

  return (
    <main className="home">
      <button onClick={() => router.push('/add')}>Add to your collection</button>
      <section className="all-posts">
        <h3>Recently Added</h3>
        {children}
      </section>
    </main>
  );
}
