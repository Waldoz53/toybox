import '@/styles/blog.css';

export const metadata = {
  title: 'Toybox | Blog',
};

export const revalidate = 300;

export default function Blog() {
  return (
    <main className="blog">
      <h1>Blog</h1>
      <section className="blog-section">
        <h3>Latest updates only</h3>
        <p>May 28, 2025</p>
        <ul>
          <li>
            Log out no longer redirects to the home page, instead it just refreshes the current
            page, then the page handles redirects if not logged in, etc
          </li>
          <li>
            Added a new (basic, unanimated) modal in place of a logout button: Modal displays links
            to /user/[username], /settings and includes the logout button
          </li>
          <li>Slightly reduced font sizes of the likes/comment counter + icons</li>
          <li>CSS/HTML overhaul: use more semantic elements + improve hierarchy of pages</li>
        </ul>
      </section>

      <section className="blog-section">
        <h3>Features (& fixes) in development:</h3>
        <ul>
          <li>Refactor most anchor links so they underline on hover</li>
          <li>
            Tweak Toast message on other pages (currently only the settings page has the new Toast)
          </li>
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
          <li>Follower system MIGHT not work correctly. Still needs testing</li>
          <li>Toggle button on settings page, when &quot;on&quot; looks odd on mobile</li>
        </ul>
      </section>
    </main>
  );
}
