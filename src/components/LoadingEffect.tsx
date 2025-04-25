'use client';

import useLoading from '@/app/context/LoadingContext';

export default function LoadingEffect() {
  const { loading } = useLoading();

  return <>{loading && <span className="loader"></span>}</>;
}
