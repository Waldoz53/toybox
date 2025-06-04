'use client';

import { fetchHomePosts } from '@/lib/fetchHomePosts';
import { useState, useEffect } from 'react';
import PrefetchLink from './PrefetchLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { getTimeAgo } from '@/utils/getTimeAgo';

type Props = {
  loggedIn: boolean;
};

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

export default function HomeFeed({ loggedIn }: Props) {
  const [feedType, setFeedType] = useState<'following' | 'everyone'>('following');
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Posts[] | null>(null);

  useEffect(() => {
    fetchHomePosts(feedType).then((res) => {
      const posts = res as unknown as Posts[];
      setPosts(posts);
      setLoading(false);
    });
  }, [feedType]);

  function switchFeed(feed: 'following' | 'everyone') {
    setLoading(true);
    setFeedType(feed);
    setPosts(null);
    fetchHomePosts(feed).then((res) => {
      const posts = res as unknown as Posts[];
      setPosts(posts);
      setLoading(false);
    });
  }

  return (
    <>
      {!loggedIn && <h3>Recently Added</h3>}
      {loggedIn && (
        <div className="feed-toggle">
          <button
            className={feedType === 'following' ? 'active' : ''}
            onClick={() => switchFeed('following')}
            title="Change feed to view only recent posts by people you follow"
          >
            Following
          </button>
          <button
            className={feedType === 'everyone' ? 'active' : ''}
            onClick={() => switchFeed('everyone')}
            title="Change feed to view all recent posts"
          >
            Everyone
          </button>
        </div>
      )}

      <section className="all-posts">
        {loading && <span className="loader"></span>}
        {posts && posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <PrefetchLink
                href={`/user/${post.profiles?.username}/item/${post.id}`}
                key={post.id}
                className="post"
              >
                <p>
                  {post.profiles?.username}&nbsp;added
                  <strong>
                    &nbsp;{post.figures.toylines.name} {post.figures.name}
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
          <>{!loading && <p>No recent posts.</p>}</>
        )}
      </section>
    </>
  );
}
