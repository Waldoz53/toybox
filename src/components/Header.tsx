'use client';

import LogoutButton from '@/components/LogoutButton';
import LoadingEffect from './LoadingEffect';
import { Bebas_Neue } from 'next/font/google';
import useUser from '@/app/context/UserContext';
import '@/styles/components/header.css';
import PrefetchLink from './PrefetchLink';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export default function Header() {
  let username = '';
  const { user } = useUser();
  if (user) {
    username = user.username;
  }

  return (
    <div className="header">
      <PrefetchLink href="/" className="title">
        <h1 className={bebas.className} title="Home">
          Toybox
        </h1>
      </PrefetchLink>
      <LoadingEffect />
      <div className="spacer"></div>
      {username ? (
        <>
          <PrefetchLink href={`/${username}`}>
            <p title="View your user page">{username}</p>
          </PrefetchLink>
          <LogoutButton />
        </>
      ) : (
        <>
          <PrefetchLink href="/login">Login</PrefetchLink>
          <PrefetchLink href="/signup">Sign Up</PrefetchLink>
        </>
      )}
    </div>
  );
}
