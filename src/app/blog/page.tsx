import '@/styles/blog.css';

export default function Blog() {
  return (
    <main className="blog">
      <h2>Blog</h2>
      <section className="blog-section">
        <h3>Latest updates only</h3>
        <p>May 21, 2025</p>
        <ul>
          <li>Added the ability to edit ratings in item reviews</li>
          <li>Added the visible ratings component to certain pages</li>
          <li>Refactored some divs into header, footer, main, section, etc instead</li>
        </ul>
      </section>

      <section className="blog-section">
        <h3>Features (& fixes) in development:</h3>
        <ul>
          <li>Rewrite routes of page /[username] to /user/[username]</li>
          <li>Custom 404 page</li>
          <li>More error clarification</li>
          <li>Turn delete buttons into icons for less chunky looking elements</li>
          <li>Follow/unfollow people then...</li>
          <li>On the home page you can switch between a following/all posts tab</li>
          <li>Profile setting to limit who can comment on your posts</li>
          <li>New favicon</li>
          <li>
            Add title=&quot;explanation&quot; hover text for possibly unclear actions or elements
          </li>
          <li>Rewrite some title=explanation hover text (username link in header)</li>
          <li>Change titles depending on the content being viewed</li>
          <li>Likely redesign how the site looks</li>
          <li>Sanitize data from some network requests</li>
          <li>Pagination of front page posts</li>
          <li>Experimental: Colour scheme</li>
          <li>ONGOING: improve server logging messages</li>
          <li>ONGOING: reduce usage of network requests</li>
        </ul>
      </section>

      <section className="blog-section">
        <h3>Known issues:</h3>
        <ul></ul>
      </section>
    </main>
  );
}
