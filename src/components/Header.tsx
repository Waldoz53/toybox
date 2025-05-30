'use client';

import LoadingEffect from './LoadingEffect';
import { Bebas_Neue } from 'next/font/google';
import useUser from '@/app/context/UserContext';
import '@/styles/components/header.css';
import PrefetchLink from './PrefetchLink';
import { usePathname } from 'next/navigation';
import HeaderModal from './HeaderModal';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export default function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  let path = '/';
  if (!pathname.includes('login') || !pathname.includes('signup')) {
    path = pathname;
  }
  return (
    <header className="header">
      <PrefetchLink href="/" className="title">
        <h1 className={bebas.className} title="Home">
          Toybox
        </h1>
      </PrefetchLink>
      <LoadingEffect />
      <div className="spacer"></div>
      {user?.username ? (
        <div className="header-logged-in">
          <p>{user?.username}</p>
          <HeaderModal username={user?.username} />
        </div>
      ) : (
        <>
          <PrefetchLink
            href={
              path == '/signup' || path == '/login'
                ? '/login'
                : `/login?redirectTo=${encodeURIComponent(path)}`
            }
          >
            <p title="Go to the login page">Login</p>
          </PrefetchLink>
          <PrefetchLink href="/signup">
            <p title="Sign up for an account">Sign Up</p>
          </PrefetchLink>
        </>
      )}
    </header>
  );
}
