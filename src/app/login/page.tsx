'use client';

import { useState } from 'react';
import { login } from '../actions';
import Toast from '@/components/Toast';
import useLoading from '../context/LoadingContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [message, setMessage] = useState('');
  const { setLoading } = useLoading();
  const router = useRouter();

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
    }, 5000);
    router.push('/');
  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <div className="spacer"></div>
        <button>Log in</button>
      </form>
      <Toast message={message} />
    </div>
  );
}
