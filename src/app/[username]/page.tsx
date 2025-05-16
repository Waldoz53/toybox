import DeletePostButton from '@/components/DeletePostButton';
import StartEditPostButton from '@/components/StartEditPostButton';
import { createClientServer } from '@/utils/supabase/server';
import '@/styles/profile.css';
import PrefetchLink from '@/components/PrefetchLink';

type Props = {
  params: Promise<{ username: string }>;
};

export default async function UserPage({ params }: Props) {
  const { username } = await params;
  let isValidUsername = false;
  let isOwner = false;
  let errorMessage = '';
  const supabase = await createClientServer();
  const { data: profile, error: error } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('username', username)
    .single();

  if (error || !profile) {
    console.log('Error retrieving profile', error);
    errorMessage = 'Error retrieving profile';
  } else {
    isValidUsername = true;
  }

  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select('*, figures(name)')
    .eq('user_id', profile?.id)
    .order('created_at', { ascending: false });
  if (postsError) {
    console.error('Error fetching posts:', postsError);
    errorMessage = 'Page not found.';
  }

  // check if user is logged in + their user id matches the user id of the page, then enables editing/delete buttons
  const { data } = await supabase.auth.getUser();
  if (data.user?.id === profile?.id) {
    isOwner = true;
  }

  return (
    <div className="collection">
      {isValidUsername ? (
        <>
          <h2>{isOwner ? `Your collection` : `${username}'s collection`}</h2>
          <p className="error">{errorMessage}</p>
          <div className="collection-container">
            {postsData && postsData.length > 0 ? (
              postsData.map((post) => (
                <PrefetchLink
                  href={`/${username}/item/${post.id}`}
                  key={post.id}
                  className="collection-item"
                >
                  <h3>{post.figures.name}</h3>
                  <p className="description">{post.description}</p>
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
          </div>
        </>
      ) : (
        <h2 className="error">{errorMessage}</h2>
      )}
    </div>
  );
}
