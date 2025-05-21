'use client';

import { getTimeAgo } from '@/utils/getTimeAgo';
import '@/styles/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import PrefetchLink from '@/components/PrefetchLink';

type Posts = {
  id: string;
  created_at: string;
  profiles: { username: string };
  figures: {
    name: string;
    toylines: { name: string };
  };
  likes: { count: number }[];
  comments: { count: number }[];
};

export default function Home({ posts }: { posts: Posts[] }) {
  return (
    <>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <PrefetchLink
              href={`/user/${post.profiles?.username}/item/${post.id}`}
              key={post.id}
              className="post"
            >
              <p>
                {post.profiles?.username} added{' '}
                <strong>
                  {post.figures.toylines.name} {post.figures.name}
                </strong>
              </p>
              <span className="icons">
                {post.likes[0].count ?? 0}&nbsp;
                <FontAwesomeIcon icon={faHeart} />
              </span>
              <span className="icons">
                {post.comments[0].count ?? 0}&nbsp;
                <FontAwesomeIcon icon={faComment} />
              </span>
              <span>{getTimeAgo(post.created_at)}</span>
            </PrefetchLink>
          ))}
        </>
      ) : (
        <p>No recently added items</p>
      )}
    </>
  );
}
