import DeletePostButton from '@/components/DeletePostButton';
import StartEditPostButton from '@/components/StartEditPostButton';
import { createClientServer } from '@/utils/supabase/server';
import '@/styles/profile.css';
import PrefetchLink from '@/components/PrefetchLink';
import ItemRating from '@/components/ItemRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import FollowComponent from '@/components/FollowComponent';

type Props = {
  params: Promise<{ username: string }>;
};

export const revalidate = 30;

export default async function UserPage({ params }: Props) {
  const { username } = await params;
  let isValidUsername = false;
  let isOwner = false;
  let errorMessage = '';
  let isFollowing = false;
  const supabase = await createClientServer();

  const { data: profile, error: error } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('username', username)
    .single();

  if (!profile) {
    return (
      <div className="collection">
        <h2 className="error">User {username} not found.</h2>
      </div>
    );
  } else if (error) {
    console.log('Error retrieving profile', error);
    errorMessage = 'Error retrieving profile';
  } else {
    isValidUsername = true;
  }

  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select('*, figures(name, toylines(name, brands(name))), comments(count), likes(count)')
    .eq('user_id', profile?.id)
    .order('created_at', { ascending: false });
  if (!postsData) {
    return (
      <div className="collection">
        <h2 className="error">User {username} has no items.</h2>
      </div>
    );
  } else if (postsError) {
    console.error('Error fetching posts:', postsError);
    errorMessage = 'Error fetching page.';
  }

  // checks user follower count
  const { count: followCount } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('followed_id', profile?.id);

  // check if user is logged in + their user id matches the user id of the page, then enables editing/delete buttons
  const { data } = await supabase.auth.getUser();
  if (data.user?.id === profile?.id) {
    isOwner = true;
  }

  //checks if logged in user is following this user
  const { data: followData } = await supabase
    .from('follows')
    .select('*')
    .eq('follower_id', data.user?.id)
    .eq('followed_id', profile?.id)
    .maybeSingle();
  if (followData != null) {
    isFollowing = true;
  }

  return (
    <main className="collection">
      {isValidUsername ? (
        <>
          <h2>{isOwner ? `Your collection` : `${username}'s collection`}</h2>
          {errorMessage && <p className="error">{errorMessage}</p>}

          <section className="follower-container">
            <FollowComponent
              isOwner={isOwner}
              isFollowing={isFollowing}
              userId={profile?.id}
              followCount={followCount}
              username={username}
            />
          </section>

          <section className="collection-container">
            {postsData && postsData.length > 0 ? (
              postsData.map((post) => (
                <PrefetchLink
                  href={`/user/${username}/item/${post.id}`}
                  key={post.id}
                  className="collection-item"
                >
                  <h3>
                    {post.figures.toylines.brands.name} {post.figures.toylines.name}{' '}
                    {post.figures.name}
                  </h3>
                  {post.rating && <ItemRating rating={post.rating} />}
                  <p className="description">{post.description}</p>
                  <div className="icon-container">
                    {post.likes[0].count ?? 0}&nbsp;
                    <FontAwesomeIcon icon={faHeart} />
                    &nbsp;{post.comments[0].count ?? 0}&nbsp;
                    <FontAwesomeIcon icon={faComment} />
                  </div>
                  <p className="date">
                    Added on{' '}
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  {isOwner ? (
                    <>
                      <StartEditPostButton id={post.id} />
                      <DeletePostButton id={post.id} />
                    </>
                  ) : (
                    ''
                  )}
                </PrefetchLink>
              ))
            ) : (
              <p>No items in {isOwner ? `your` : `${username}'s`} collection.</p>
            )}
          </section>
        </>
      ) : (
        <h2 className="error">{errorMessage}</h2>
      )}
    </main>
  );
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params;

  const title = `Toybox | ${username}'s collection`;

  return { title };
}
