'use client';

import { useEffect, useState } from 'react';
import { login } from '../actions';
import Toast from '@/components/Toast';
import useLoading from '../context/LoadingContext';
import { useRouter, useSearchParams } from 'next/navigation';
import '@/styles/login.css';
import PrefetchLink from '@/components/PrefetchLink';

export default function LoginPage() {
  const [message, setMessage] = useState('');
  const { setLoading } = useLoading();
  const router = useRouter();
  const searchParams = useSearchParams();
  let path = searchParams.get('redirectTo') || '/';

  useEffect(() => {
    document.title = 'Toybox | Log In';
  }, []);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await login(formData).then((res) => {
      setMessage(res ?? '');
      if (message !== '') {
        console.log('Login message:', message);
      }
      setLoading(false);
    });

    setTimeout(() => {
      setMessage('');
    }, 3000);
    if (path?.startsWith('/login') || path?.startsWith('/signup')) {
      path = '/';
    }
    if (path) {
      router.replace(`${path}`);
    } else {
      router.push('/');
    }
  }

  return (
    <main className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button>Log in</button>
      </form>
      <p>
        Don&apos;t have an account?&nbsp;<PrefetchLink href="/signup">Sign up!</PrefetchLink>
      </p>
      <Toast message={message} toastType="error" />
    </main>
  );
}
