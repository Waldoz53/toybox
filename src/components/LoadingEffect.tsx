'use client';

import useLoading from '@/app/context/LoadingContext';
import '@/styles/components/loader.css';

export default function LoadingEffect() {
  const { loading } = useLoading();

  return <>{loading && <span className="loader"></span>}</>;
}
