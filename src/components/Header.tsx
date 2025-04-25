'use client';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import LoadingEffect from './LoadingEffect';
import { Bebas_Neue } from 'next/font/google';
import useUser from '@/app/context/UserContext';

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
      <Link href="/" className="title">
        <h1 className={bebas.className}>Toybox</h1>
      </Link>
      <LoadingEffect />
      <div className="spacer"></div>
      {username ? (
        <>
          <Link href={`/${username}`}>
            <p>{username}</p>
          </Link>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
}
