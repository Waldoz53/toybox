import '@/styles/blog.css';

export default function Blog() {
  return (
    <div className="blog">
      <h2>Blog</h2>
      <div className="blog-section">
        <h3>Latest updates only</h3>
        <p>May 7, 2025</p>
        <ul>
          <li>
            Users can now only select from a catered list of action figures, the intended behavior.
          </li>
          <li>Fixed body css padding</li>
        </ul>
      </div>

      <div className="blog-section">
        <h3>Features & fixes in development:</h3>
        <ul>
          <li>Add dates to comments (1m, 1h, 1d, etc)</li>
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
          <li>Always ongoing: reduce usage of network requests</li>
        </ul>
      </div>

      <div className="blog-section">
        <h3>Known issues:</h3>
        <ul>
          {/* <li>Edit page kinda flickers when loading text</li> */}
        </ul>
      </div>
    </div>
  );
}
