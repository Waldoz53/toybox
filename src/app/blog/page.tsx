export default function Blog() {
  return (
    <div className="blog">
      <h2>Blog</h2>
      <div className="blog-section">
        <h3>Latest updates only</h3>
        <p>April 17, 2025</p>
        <ul>
          <li>Added new item page routes! You should be able to view the individual pages for posts now</li>
        </ul>
      </div>

      <div className="blog-section">
        <h3>Features in development:</h3>
        <ul>
          <li>Separate dynamic pages for each post</li>
          <li>Likes + Comments on posts</li>
          <li>Optionally rating on a scale of 1-10 to your posts</li>
          <li>Show likes + comments icons on home page posts</li>
          <li>Validate emails, usernames (so that theyre unique), post titles, descriptions, etc so my database doesnt get absolutely fricked</li>
          <li>Follow/unfollow people then...</li>
          <li>On the home page you can switch between a following/all posts tab</li>
          <li>Profile setting to limit who can comment on your posts</li>
          <li>Pick a colour scheme (and add dark mode)</li>
          <li>New favicon</li>
          <li>Change titles depending on the content being viewed</li>
          <li>Make CSS between some sections more consistent</li>
          <li>Likely redesign how the site looks</li>
        </ul>
      </div>

      <div className="blog-section">
        <h3>Known issues:</h3>
        <ul>
          <li>Loading element between certain actions/pages is kinda odd</li>
        </ul>
      </div>
    </div>
  )
}