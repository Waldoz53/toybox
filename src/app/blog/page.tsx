import '@/styles/blog.css';

export const metadata = {
  title: 'Toybox | Blog',
};

export default function Blog() {
  return (
    <main className="blog">
      <h2>Blog</h2>
      <section className="blog-section">
        <h3>Latest updates only</h3>
        <p>May 23, 2025</p>
        <ul>
          <li>Some more tweaks to login redirection</li>
          <li>Slight tweaks to the individual item page</li>
          <li>Added titles to most pages</li>
          <li>Starting development of follower system!</li>
        </ul>
      </section>

      <section className="blog-section">
        <h3>Features (& fixes) in development:</h3>
        <ul>
          <li>New favicon</li>
          <li>Improve item pages</li>
          <li>Follow/unfollow people then...</li>
          <li>On the home page you can switch between a following/all posts tab</li>
          <li>Profile setting to limit who can comment on your posts</li>
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
