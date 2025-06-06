'use client';

import { useEffect, useState } from 'react';
import { signup } from '../actions';
import Toast from '@/components/Toast';
import useLoading from '../context/LoadingContext';
import { useRouter } from 'next/navigation';
import '@/styles/login.css';
import PrefetchLink from '@/components/PrefetchLink';

export default function SignUpPage() {
  const [message, setMessage] = useState<string | undefined>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('error');
  const { setLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    document.title = 'Toybox | Sign Up';
  }, []);

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await signup(formData).then((res) => {
      if (res == 'Successfully signed up!') {
        setToastType('success');
        router.push('/');
      } else {
        setToastType('error');
      }
      setMessage(res ?? '');
      setLoading(false);
    });

    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  return (
    <main className="signup-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label htmlFor="username">Username:</label>
        <input id="username" name="username" type="text" required />
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button>Sign Up</button>
      </form>
      <p>
        Already have an account?&nbsp;<PrefetchLink href="/login">Log in here!</PrefetchLink>
      </p>
      <Toast message={message} toastType={toastType} />
    </main>
  );
}
