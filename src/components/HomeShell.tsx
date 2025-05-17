'use client';

import useLoading from '@/app/context/LoadingContext';
import { useRouter } from 'next/navigation';
import '@/styles/home.css';

export default function HomeShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setLoading } = useLoading();

  function goToPost() {
    setLoading(true);
    router.push('/add');
    setLoading(false);
  }

  return (
    <div className="home">
      <button onClick={goToPost}>Add to your collection</button>
      <div className="all-posts">
        <h3>Recently Added</h3>
        {children}
      </div>
    </div>
  );
}
