'use client';
import { likePost, unlikePost } from '@/app/actions';
import useLoading from '@/app/context/LoadingContext';
import { createClientBrowser } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Like = {
  count: number;
  userLiked: boolean;
  postId: string;
};

type Props = Like;

export default function LikesButton({ count, userLiked, postId }: Props) {
  const router = useRouter();
  const supabase = createClientBrowser();
  const { setLoading } = useLoading();
  const [countState, setCountState] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setCountState(count);
    setLiked(userLiked);
  }, [postId, userLiked, count]);

  async function handleToggleLike() {
    const { data: user } = await supabase.auth.getUser();
    if (user.user != null) {
      setLoading(true);
      if (liked) {
        // handles unliking a post
        unlikePost(postId, user.user.id).then((res) => {
          setLiked(false);
          setCountState(countState - 1);
          setLoading(false);
          console.log(res);
        });
      } else {
        // handles liking a post
        likePost(postId, user.user.id).then((res) => {
          setLiked(true);
          setCountState(countState + 1);
          setLoading(false);
          console.log(res);
        });
      }
    } else {
      router.push('/login');
    }
  }

  return (
    <div className="likes">
      <button className={`likes-button ${liked ? 'liked' : ''}`} onClick={handleToggleLike}>
        {liked ? 'Liked' : 'Like'}
      </button>
      <p>{countState > 0 ? (countState == 1 ? '1 like' : `${countState} likes`) : 'No likes'}</p>
    </div>
  );
}
