import '@/styles/blog.css';

export const metadata = {
  title: 'Toybox | Blog',
};

export const revalidate = 300;

export default function Blog() {
  return (
    <main className="blog">
      <h2>Blog</h2>
      <section className="blog-section">
        <h3>Latest updates only</h3>
        <p>May 28, 2025</p>
        <ul>
          <li>Added functionality to the /settings page!</li>
          <li>WIP: Still not accessible from any link or button yet</li>
        </ul>
      </section>

      <section className="blog-section">
        <h3>Features (& fixes) in development:</h3>
        <ul>
          <li>New favicon</li>
          <li>
            Tweak Toast message on other pages (currently only the settings page has the new Toast)
          </li>
          <li>Improve item pages</li>
          <li>Improve follower list</li>
          <li>Refactor front page so that the following tab is default</li>
          <li>Paginate posts (once there are more posts)</li>
          <li>WIP: Follow/unfollow people then...</li>
          <li>WIP: Profile setting to limit who can comment on your posts</li>
          {/* Dev Access Only: */}
          {/* <li>Long term/scaling goal: Sanitize data from some network requests</li> */}
          {/* <li>ONGOING: improve server logging messages</li> */}
          {/* <li>ONGOING: reduce usage of network requests</li> */}
        </ul>
      </section>

      {/* <section className="blog-section">
        <h3>Known issues:</h3>
        <ul>
        </ul>
      </section> */}
    </main>
  );
}
