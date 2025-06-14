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
        <p>June 9, 2025</p>
        <ul>
          <li>On individual item pages, fixed how the average is calculated</li>
        </ul>
      </section>

      <section className="blog-section">
        <h3>Features (& fixes) in development:</h3>
        <ul>
          <li>Add images: Profiles</li>
          <li>Add images: Figures</li>
          <li>Padding/spacing pass through</li>
          <li>Improve item pages</li>
          <li>Improve follower list</li>
          <li>Paginate posts (once there are more posts)</li>
          <li>New favicon</li>
          <li>WCAG accessibility</li>
          <li>Ongoing: add more figures/toylines/brands</li>
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
