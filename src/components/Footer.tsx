import Link from 'next/link';

export default function Footer() {
  return (
    <div className="footer">
      <p>
        Issues? Feature requests? Contact me{' '}
        <a href="https://bsky.app/profile/waleed-webdev.bsky.social" target="_blank">
          here.
        </a>
      </p>
      |
      <Link href="/blog">
        <p>Blog</p>
      </Link>
    </div>
  );
}
