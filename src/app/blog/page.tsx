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
        </ul>
      </section>

      <section className="blog-section">
        <h3>Features (& fixes) in development:</h3>
        <ul>
          <li>Refactor a lot of client/server pages/components to be more efficient</li>
          <li>Improve item pages</li>
          <li>Improve follower list</li>
          <li>Refactor front page so that the following tab is default</li>
          <li>Paginate posts (once there are more posts)</li>
          <li>New favicon</li>
          <li>WCAG accessibility</li>
          {/* Dev Access Only: */}
          {/* <li>Long term/scaling goal: Sanitize data from some network requests</li> */}
          {/* <li>ONGOING: improve server logging messages</li> */}
          {/* <li>ONGOING: reduce usage of network requests</li> */}
        </ul>
      </section>

      <section className="blog-section">
        <h3>Known issues:</h3>
        <ul>
          <li>Odd flickering text on the home page sometimes</li>
        </ul>
      </section>
    </main>
  );
}
