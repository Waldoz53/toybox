import PrefetchLink from '@/components/PrefetchLink';
import '@/styles/followerPage.css';
import { createClientServer } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ username: string }>;
};

type Followers = {
  follower: {
    id: string;
    username: string;
  };
};

export const revalidate = 30;

export default async function FollowersPage({ params }: Props) {
  const supabase = await createClientServer();
  const { username } = await params;

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle();
  if (!profile) return notFound();

  const { data, error } = await supabase
    .from('follows')
    .select('follower:profiles!follower_id(id, username)')
    .eq('followed_id', profile.id);
  // FIX: sanitize?
  const followers = data as unknown as Followers[];

  return (
    <main className="followers">
      <h2>{username}&apos;s followers</h2>
      {!error ? (
        <>
          {followers.map((f) => (
            <PrefetchLink
              href={`/user/${f.follower.username}`}
              key={f.follower.id}
              className="follower"
            >
              {f.follower.username}
            </PrefetchLink>
          ))}
        </>
      ) : (
        <p>Failed to fetch followers</p>
      )}
    </main>
  );
}
