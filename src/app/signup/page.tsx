'use client';
import { useState } from 'react';
import { signup } from '../actions';
import Toast from '@/components/Toast';
import useLoading from '../context/LoadingContext';
import { useRouter } from 'next/navigation';
import '@/styles/login.css';

export default function SignUpPage() {
  const [message, setMessage] = useState<string | undefined>('');
  const { setLoading } = useLoading();
  const router = useRouter();

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await signup(formData).then((res) => {
      if (res != '') {
        setMessage(res);
      } else {
        router.push('/');
      }
      setLoading(false);
    });

    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label htmlFor="username">Username:</label>
        <input id="username" name="username" type="text" required />
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <div className="spacer"></div>
        <button>Sign Up</button>
      </form>
      <Toast message={message} />
    </div>
  );
}
