import CommentForm from '@/components/CommentForm';
import DeleteCommentButton from '@/components/DeleteCommentButton';
import DeletePostButton from '@/components/DeletePostButton';
import LikesButton from '@/components/LikesButton';
import StartEditPostButton from '@/components/StartEditPostButton';
import { createClientServer } from '@/utils/supabase/server';
import '@/styles/userItemPage.css';
import { getTimeAgo } from '@/utils/getTimeAgo';
import PrefetchLink from '@/components/PrefetchLink';
import ItemRating from '@/components/ItemRating';

type Props = {
  params: Promise<{ username: string; itemId: string }>;
};

type Item = {
  id: string;
  figures: {
    slug: string;
    name: string;
    toylines: {
      slug: string;
      name: string;
      brands: {
        name: string;
      };
    };
  };
  description: string;
  created_at: string;
  user_id: string;
  profiles: { username: string };
  rating: number;
};

type Comment = {
  id: string;
  comment: string;
  post_id: string;
  user_id: string;
  created_at: string;
  profiles: { username: string };
  error: Error | null;
};

export const revalidate = 300;

export default async function UserItem({ params }: Props) {
  const { itemId } = await params;
  const supabase = await createClientServer();
  let authorAuth = false;
  let realCount;
  let userLiked = false;
  let commentCount = 0;
  let isFriend = false;

  // find valid post, if available
  const { data, error } = await supabase
    .from('posts')
    .select(
      'id, figure_id, description, created_at, user_id, rating, profiles(username), figures(name, slug, toylines(name, slug, brands(name)))',
    )
    .eq('id', itemId)
    .single();
  // FIX: sanity check here
  const item = data as unknown as Item;

  if (!data || error) {
    return (
      <div className="item-page">
        <div className="main">
          <h3>Page not found.</h3>
        </div>
      </div>
    );
  }

  // check for likes count
  const { data: count } = await supabase.from('likes').select('id').eq('post_id', item.id);
  if (count) {
    realCount = count?.length ?? 0;
  } else {
    realCount = 0;
  }

  // check user auth
  const { data: userData } = await supabase.auth.getUser();
  // if logged in user id = post author id, enable the edit/delete buttons
  if (userData.user?.id === data?.user_id) {
    authorAuth = true;
  }
  // checks if logged in user has liked this post
  const { data: like } = await supabase
    .from('likes')
    .select('*')
    .eq('user_id', userData.user?.id)
    .eq('post_id', itemId)
    .maybeSingle();
  if (like) {
    userLiked = true;
  }

  // fetches comments on a post
  const { data: comments, error: commentsError } = (await supabase
    .from('comments')
    .select('*, profiles(username)')
    .eq('post_id', itemId)
    .order('created_at', { ascending: true })) as { data: Comment[]; error: Error | null };
  if (!commentsError) {
    commentCount = comments.length;
  }

  // checks if a user and the post author follow each other
  if (userData.user && item.user_id !== userData.user.id) {
    const { data: followData } = await supabase
      .from('follows')
      .select('follower_id, followed_id')
      .eq('follower_id', item.user_id);

    if (followData) {
      for (let i = 0; i < followData.length; i++) {
        if (userData.user.id === followData[i].followed_id) {
          isFriend = true;
          break;
        }
      }
    }
  }

  // checks user comment settings
  const { data: commentSetting } = await supabase
    .from('settings')
    .select('following_only_comment')
    .eq('user_id', item.user_id)
    .maybeSingle();
  if (commentSetting) {
    if (commentSetting.following_only_comment == false) {
      isFriend = true;
    }
  }

  return (
    <main className="user-item-page">
      <section className="user-item-page-main">
        <PrefetchLink href={`/item/${item.figures.toylines.slug}/${item.figures.slug}`}>
          <h3>
            {item.figures.toylines.brands.name} {item.figures.toylines.name} {item.figures.name}
          </h3>
        </PrefetchLink>
        {item.rating && <ItemRating rating={item.rating} />}
        <p className="description">{item.description}</p>
        <p className="author-date">
          Added by{' '}
          <PrefetchLink href={`/user/${item.profiles.username}`}>
            {item.profiles.username}
          </PrefetchLink>{' '}
          on{' '}
          {new Date(item.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <LikesButton
          count={realCount}
          userLiked={userLiked}
          postId={itemId}
          commentCount={commentCount}
        />
        {authorAuth && (
          <div className="buttons-container">
            <StartEditPostButton id={itemId} />
            <DeletePostButton id={itemId} />
          </div>
        )}
      </section>
      <section className="item-comments">
        {commentCount > 0
          ? comments?.map((comment) => (
              <div className="comment" key={comment.id}>
                <PrefetchLink href={`/user/${comment.profiles.username}`}>
                  <p className="author">{comment.profiles.username}</p>
                </PrefetchLink>
                <div className="comment-container">
                  <p>{comment.comment}</p>
                  <div className="spacer"></div>
                  <p className="comment-created-at">{getTimeAgo(comment.created_at)}</p>
                  {comment.user_id == userData.user?.id && (
                    <DeleteCommentButton commentId={comment.id} />
                  )}
                </div>
              </div>
            ))
          : 'No comments yet'}
        {userData.user?.id ? (
          <>
            {isFriend || userData.user.id == item.user_id ? (
              <CommentForm postId={itemId} />
            ) : (
              <div className="follower-message">
                <p>This user limits who can comment on their review</p>
              </div>
            )}
          </>
        ) : (
          <div className="follower-message">
            <PrefetchLink href={`/login?redirectTo=/user/${item.profiles.username}/item/${itemId}`}>
              <p>Log in to comment on this review</p>
            </PrefetchLink>
          </div>
        )}
      </section>
    </main>
  );
}

export async function generateMetadata({ params }: Props) {
  const { username, itemId } = await params;
  const supabase = await createClientServer();
  const { data, error } = await supabase
    .from('posts')
    .select('id, figures(name)')
    .eq('id', itemId)
    .maybeSingle();
  const item = data as unknown as Item;

  const title = `Toybox | ${username}'s ${item?.figures.name}`;

  if (data || !error) {
    return { title };
  } else return;
}
