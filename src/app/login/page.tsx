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
  const [toastType, setToastType] = useState<'success' | 'error'>('error');
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
      if (res == 'Logged in!') {
        setToastType('success');

        if (path?.startsWith('/login') || path?.startsWith('/signup')) {
          path = '/';
        }
        if (path) {
          router.replace(`${path}`);
        } else {
          router.push('/');
        }
      }
      setLoading(false);
    });

    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  return (
    <main className="login-page">
      <h1>Login</h1>
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
      <Toast message={message} toastType={toastType} />
    </main>
  );
}
