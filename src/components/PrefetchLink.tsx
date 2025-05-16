'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function PrefetchLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          router.prefetch(href);
          observer.disconnect();
        }
      });
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [href, router]);

  return (
    <Link href={href} ref={ref} className={className}>
      {children}
    </Link>
  );
}
