'use client';

import { useState, useEffect } from 'react';
import '@/styles/components/toast.css';

type ToastProps = {
  message: string | undefined;
  toastType: 'success' | 'error';
};

export default function Toast({ message, toastType }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [message]);

  return (
    <div className={`toast ${show ? 'show' : ''} ${toastType === 'success' && 'success'}`}>
      {message}
    </div>
  );
}
