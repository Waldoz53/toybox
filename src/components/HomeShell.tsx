'use client';

import { useRouter } from 'next/navigation';
import '@/styles/home.css';
import { useEffect, useState } from 'react';
import useUser from '@/app/context/UserContext';

export default function HomeShell({
  children,
  onFeedTypeChange,
}: {
  children: React.ReactNode;
  onFeedTypeChange: (type: 'everyone' | 'following') => void;
}) {
  const router = useRouter();
  const { user } = useUser();
  const [feedType, setFeedType] = useState<'everyone' | 'following'>('following');

  useEffect(() => {
    router.prefetch('/add');
  }, [router]);

  function switchFeed(type: 'everyone' | 'following') {
    setFeedType(type);
    onFeedTypeChange(type);
  }

  return (
    <main className="home">
      <button onClick={() => router.push('/add')}>Add to your collection</button>

      {user?.id && (
        <div className="feed-toggle">
          <button
            className={feedType === 'following' ? 'active' : ''}
            onClick={() => switchFeed('following')}
            title="Change feed to view only recent posts by people you follow"
          >
            Following
          </button>
          <button
            className={feedType === 'everyone' ? 'active' : ''}
            onClick={() => switchFeed('everyone')}
            title="Change feed to view all recent posts"
          >
            Everyone
          </button>
        </div>
      )}

      {!user?.id && <h3>Recently Added</h3>}

      <section className="all-posts">{children}</section>
    </main>
  );
}
