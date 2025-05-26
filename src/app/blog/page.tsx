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
        <p>May 26, 2025</p>
        <ul>
          <li>Added caching to certain pages. Pages should be a tiny bit faster</li>
          <li>Tweaked login/signup redirects</li>
          <li>
            Added follower lists! &quot;/user/[username]/followers&quot; displays a simple list of
            the users followers
          </li>
        </ul>
      </section>

      <section className="blog-section">
        <h3>Features (& fixes) in development:</h3>
        <ul>
          <li>New favicon</li>
          <li>Improve item pages</li>
          <li>Improve follower list</li>
          <li>WIP: Follow/unfollow people then...</li>
          <li>WIP: On the home page you can switch between a following/all posts tab</li>
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
