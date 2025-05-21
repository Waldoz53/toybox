'use client';
import { likePost, unlikePost } from '@/app/actions';
import { createClientBrowser } from '@/utils/supabase/client';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Like = {
  count: number;
  userLiked: boolean;
  postId: string;
  commentCount: number;
};

type Props = Like;

export default function LikesButton({ count, userLiked, postId, commentCount }: Props) {
  const router = useRouter();
  const supabase = createClientBrowser();
  const [countState, setCountState] = useState(0);
  const [liked, setLiked] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setCountState(count);
    setLiked(userLiked);
  }, [postId, userLiked, count]);

  async function handleToggleLike() {
    const { data: user } = await supabase.auth.getUser();
    if (user.user != null) {
      if (liked) {
        // handles unliking a post
        setLiked(false);
        setCountState(countState - 1);
        unlikePost(postId, user.user.id).then((res) => {
          console.log(res);
        });
      } else {
        // handles liking a post
        setLiked(true);
        setCountState(countState + 1);
        likePost(postId, user.user.id).then((res) => {
          console.log(res);
        });
      }
    } else {
      router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`);
    }
  }

  return (
    <div className="likes">
      <button className={`likes-button ${liked ? 'liked' : ''}`} onClick={handleToggleLike}>
        {liked ? 'Liked' : 'Like'}
      </button>
      <p>
        {countState ?? 0}&nbsp;
        <FontAwesomeIcon icon={faHeart} />
      </p>
      <p>
        {commentCount ?? 0}&nbsp;
        <FontAwesomeIcon icon={faComment} />
      </p>
    </div>
  );
}
