import '@/styles/components/footer.css';
import PrefetchLink from './PrefetchLink';

export default function Footer() {
  return (
    <footer className="footer">
      <PrefetchLink href="/blog">
        <p>Update Blog</p>
      </PrefetchLink>
      |
      <a href="https://bsky.app/profile/waleed-webdev.bsky.social" target="_blank">
        <p>Contact Me</p>
      </a>
    </footer>
  );
}
