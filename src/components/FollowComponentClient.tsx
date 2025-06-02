'use client';

import { followUser, unfollowUser } from '@/app/actions';
import { createClientBrowser } from '@/utils/supabase/client';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import PrefetchLink from './PrefetchLink';

type Props = {
  isOwner: boolean;
  isFriend: boolean;
  isFollowing: boolean;
  followerCount: number | null;
  userId: string;
  username: string;
};

export default function FollowComponentClient({
  isOwner,
  isFriend,
  isFollowing,
  followerCount,
  userId,
  username,
}: Props) {
  const [following, setFollowing] = useState(isFollowing);
  const [count, setCount] = useState(followerCount ?? 0);
  const supabase = createClientBrowser();
  const router = useRouter();
  const pathname = usePathname();

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
      {!isOwner && (
        <button className={following ? 'following' : ''} onClick={toggleFollow}>
          {following ? 'Following' : isFriend ? 'Follow back' : 'Follow'}
        </button>
      )}
      {isFriend && <p>Follows you | </p>}
      <PrefetchLink href={`/user/${username}/followers`}>
        <p>
          {count ?? 0}&nbsp;{count == 1 ? 'follower' : 'followers'}
        </p>
      </PrefetchLink>
    </>
  );
}
