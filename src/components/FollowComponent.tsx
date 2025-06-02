import FollowComponentClient from './FollowComponentClient';
import { createClientServer } from '@/utils/supabase/server';

export default async function FollowComponent({
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
  const supabase = await createClientServer();
  let isFriend = false;

  const { data: userData } = await supabase.auth.getUser();
  if (userData.user && userId !== userData.user.id) {
    const { data: followData } = await supabase
      .from('follows')
      .select('follower_id, followed_id')
      .eq('follower_id', userId);

    followData?.forEach((follower) => {
      if (userData.user.id === follower.followed_id) {
        isFriend = true;
      }
    });
  }

  return (
    <>
      <FollowComponentClient
        isOwner={isOwner}
        isFriend={isFriend}
        isFollowing={isFollowing}
        followerCount={followCount}
        userId={userId}
        username={username}
      />
    </>
  );
}
