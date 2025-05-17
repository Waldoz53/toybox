import '@/styles/blog.css';

export default function Blog() {
  return (
    <div className="blog">
      <h2>Blog</h2>
      <div className="blog-section">
        <h3>Latest updates only</h3>
        <p>May 16, 2025</p>
        <ul>
          <li>Experimental massive home page speed improvements</li>
          <li>Added toyline names in front of figure names on the home page</li>
        </ul>
      </div>

      <div className="blog-section">
        <h3>Features & fixes in development:</h3>
        <ul>
          <li>On post page, below the figure name it should show the brand + toyline</li>
          <li>Custom 404 page</li>
          <li>More error clarification</li>
          <li>Turn delete buttons into icons for less chunky looking elements</li>
          <li>Optionally rating on a scale of 1-10 to your posts</li>
          <li>Follow/unfollow people then...</li>
          <li>On the home page you can switch between a following/all posts tab</li>
          <li>Profile setting to limit who can comment on your posts</li>
          <li>Add dark mode</li>
          <li>New favicon</li>
          <li>Change titles depending on the content being viewed</li>
          <li>Likely redesign how the site looks</li>
          <li>Sanitize data from some network requests</li>
          <li>Pagination of front page posts</li>
          <li>Experimental: Colour scheme</li>
          <li>ONGOING: improve server logging messages</li>
          <li>ONGOING: reduce usage of network requests</li>
        </ul>
      </div>

      <div className="blog-section">
        <h3>Known issues:</h3>
        <ul></ul>
      </div>
    </div>
  );
}
