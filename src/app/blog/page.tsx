import '@/styles/blog.css';

export default function Blog() {
  return (
    <main className="blog">
      <h2>Blog</h2>
      <section className="blog-section">
        <h3>Latest updates only</h3>
        <p>May 22, 2025</p>
        <ul>
          <li>
            Items now have their own (barebones) individual pages! Click on an item review, then
            from that page, click on the title of the item, and you&apos;ll get to its unique page!
          </li>
          <li>Individual item pages have an average of all reviews</li>
        </ul>
      </section>

      <section className="blog-section">
        <h3>Features (& fixes) in development:</h3>
        <ul>
          <li>Improve item pages</li>
          <li>Make commenting feel faster</li>
          <li>Follow/unfollow people then...</li>
          <li>On the home page you can switch between a following/all posts tab</li>
          <li>Profile setting to limit who can comment on your posts</li>
          <li>New favicon</li>
          <li>Change titles depending on the content being viewed</li>
          <li>Pagination of front page posts</li>
          {/* <li>Long term/scaling goal: Sanitize data from some network requests</li> */}
          {/* <li>ONGOING: improve server logging messages</li> */}
          {/* <li>ONGOING: reduce usage of network requests</li> */}
        </ul>
      </section>

      <section className="blog-section">
        <h3>Known issues:</h3>
        <ul></ul>
      </section>
    </main>
  );
}
