'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useUser from '@/app/context/UserContext';

export default function ProfileRedirectPage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    async function redirectToUsername() {
      if (user) {
        router.push(`/user/${user.username}`);
      } else {
        router.push('/login');
      }
    }

    redirectToUsername();
  }, [user, router]);

  return <span className="loader-transition"></span>;
}
