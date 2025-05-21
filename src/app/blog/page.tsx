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
          <li>Refactored routes of page /[username] to /user/[username]</li>
          <li>Replaced text in delete comment button with a little trashcan icon</li>
          <li>Added a new 404 page!</li>
          <li>
            Improved logged out to logged in redirection on the /add page and when liking an item
            review when logged out
          </li>
        </ul>
      </section>

      <section className="blog-section">
        <h3>Features (& fixes) in development:</h3>
        <ul>
          <li>Follow/unfollow people then...</li>
          <li>On the home page you can switch between a following/all posts tab</li>
          <li>Profile setting to limit who can comment on your posts</li>
          <li>New favicon</li>
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
