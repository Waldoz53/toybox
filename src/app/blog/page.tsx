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
        <h3>Latest update</h3>
        <p>June 2, 2025</p>
        <ul>
          <li>
            Follower Component: reworked so that its a server component, and doesn&apos;t have to
            have a loading animation
          </li>
          <li>Added a hover style to the header modal</li>
          <li>Settings page is now a proper server page!</li>
          <li>Refactored some of client/server pages/components to be more efficient</li>
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
        </ul>
      </section>
    </main>
  );
}
