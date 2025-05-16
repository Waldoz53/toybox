import '@/styles/components/footer.css';
import PrefetchLink from './PrefetchLink';

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
      <PrefetchLink href="/blog">
        <p>Blog</p>
      </PrefetchLink>
    </div>
  );
}
