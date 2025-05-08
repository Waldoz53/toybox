import '@/styles/blog.css';

export default function Blog() {
  return (
    <div className="blog">
      <h2>Blog</h2>
      <div className="blog-section">
        <h3>Latest updates only</h3>
        <p>May 8, 2025</p>
        <ul>
          <li>Experimental color scheme!</li>
          <li>
            Comments now have a little text on them that shows how long ago the comment was made
          </li>
          <li>Some other misc. CSS and JS changes</li>
          <li>Server actions only: added some limited server logging</li>
        </ul>
      </div>

      <div className="blog-section">
        <h3>Features & fixes in development:</h3>
        <ul>
          <li>ONGOING: improve server logging messages</li>
          <li>Custom 404 page</li>
          <li>More error clarification</li>
          <li>Turn delete buttons into icons for less chunky looking elements</li>
          <li>Optionally rating on a scale of 1-10 to your posts</li>
          <li>Show likes + comments icons on home page posts</li>
          <li>Follow/unfollow people then...</li>
          <li>On the home page you can switch between a following/all posts tab</li>
          <li>Profile setting to limit who can comment on your posts</li>
          <li>Pick a colour scheme (and add dark mode)</li>
          <li>New favicon</li>
          <li>Change titles depending on the content being viewed</li>
          <li>Likely redesign how the site looks</li>
          <li>ONGOING: reduce usage of network requests</li>
        </ul>
      </div>

      <div className="blog-section">
        <h3>Known issues:</h3>
        <ul>
          <li>With the new colour scheme some pages/elements might not look correct</li>
        </ul>
      </div>
    </div>
  );
}
