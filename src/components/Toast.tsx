'use client';

import { useState, useEffect } from 'react';
import '@/styles/components/toast.css';

type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [message]);

  return <div className={`toast ${show ? 'show' : ''}`}>{message}</div>;
}
