'use client';

import { useState, useEffect } from 'react';
import '@/styles/components/toast.css';

type ToastProps = {
  message: string | undefined;
};

export default function Toast({ message }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [message]);

  return <div className={`toast ${show ? 'show' : ''}`}>{message}</div>;
}
