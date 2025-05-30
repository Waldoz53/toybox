import '@/styles/components/footer.css';
import PrefetchLink from './PrefetchLink';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        Contact me{' '}
        <a href="https://bsky.app/profile/waleed-webdev.bsky.social" target="_blank">
          here.
        </a>
      </p>
      |
      <PrefetchLink href="/blog">
        <p>Blog</p>
      </PrefetchLink>
    </footer>
  );
}
