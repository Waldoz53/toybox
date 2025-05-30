'use client';

import { followUser, unfollowUser } from '@/app/actions';
import { createClientBrowser } from '@/utils/supabase/client';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import PrefetchLink from './PrefetchLink';

export default function FollowComponent({
  isFollowing,
  userId,
  followCount,
  isOwner,
  username,
}: {
  isFollowing: boolean;
  userId: string;
  followCount: number | null;
  isOwner: boolean;
  username: string;
}) {
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState<number | null>(0);
  const [isFriend, setIsFriend] = useState(false);
  const supabase = createClientBrowser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setFollowing(isFollowing);
    setCount(followCount);

    async function checkFollowing() {
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user && userId !== userData.user.id) {
        const { data: followData } = await supabase
          .from('follows')
          .select('follower_id, followed_id')
          .eq('follower_id', userId);

        followData?.forEach((follower) => {
          if (userData.user.id === follower.followed_id) {
            setIsFriend(true);
          }
        });
      }
      setLoading(false);
    }
    checkFollowing();
  }, [isFollowing, followCount, supabase, userId]);

  async function toggleFollow() {
    const { data: user } = await supabase.auth.getUser();
    if (user.user != null) {
      if (!following) {
        setFollowing(true);
        if (count != null) {
          setCount(count + 1);
        }
        followUser(user.user.id, userId).then((res) => {
          console.log(res);
        });
      } else {
        setFollowing(false);
        if (count != null) {
          setCount(count - 1);
        }
        unfollowUser(user.user.id, userId).then((res) => {
          console.log(res);
        });
      }
    } else {
      router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`);
    }
  }

  return (
    <>
      {!loading ? (
        <>
          {!isOwner && (
            <button className={following ? 'following' : ''} onClick={toggleFollow}>
              {following ? 'Following' : 'Follow'}
            </button>
          )}
          {isFriend && <p>Follows you |</p>}
          <PrefetchLink href={`/user/${username}/followers`}>
            <p>
              {count ?? 0}&nbsp;{count == 1 ? 'follower' : 'followers'}
            </p>
          </PrefetchLink>
        </>
      ) : (
        <span className="loader-transition"></span>
      )}
    </>
  );
}
