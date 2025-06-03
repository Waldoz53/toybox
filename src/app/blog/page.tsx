import '@/styles/blog.css';

export const metadata = {
  title: 'Toybox | Blog',
};

export const revalidate = 300;

export default function Blog() {
  return (
    <main className="blog">
      <h1>Update Blog</h1>
      <section className="blog-section">
        <h3>Latest updates</h3>
        <p>June 3, 2025</p>
        <ul>
          <li>Some misc. CSS tweaks</li>
          <li>
            Tweaked css of toast component on desktop version of most form pages so it should be
            easier to read and see
          </li>
          <li>
            Added an admin only page (/admin) + admin only tool to manually add figures (sorry
            non-admin LOSERS)
          </li>
        </ul>
      </section>

      <section className="blog-section">
        <h3>Features (& fixes) in development:</h3>
        <ul>
          <li>Padding/spacing pass through</li>
          <li>Improve item pages</li>
          <li>Improve follower list</li>
          <li>Paginate posts (once there are more posts)</li>
          <li>New favicon</li>
          <li>WCAG accessibility</li>
        </ul>
      </section>

      <section className="blog-section">
        <h3>Known issues:</h3>
        <ul>
          <li>Some pages might look a little cramped on mobile</li>
          <li>The toast looks really odd on desktop login/signup pages</li>
        </ul>
      </section>
    </main>
  );
}
