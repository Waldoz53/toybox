import CommentForm from '@/components/CommentForm';
import DeleteCommentButton from '@/components/DeleteCommentButton';
import DeletePostButton from '@/components/DeletePostButton';
import LikesButton from '@/components/LikesButton';
import StartEditPostButton from '@/components/StartEditPostButton';
import { createClientServer } from '@/utils/supabase/server';
import Link from 'next/link';
import '@/styles/itemPage.css';

type Props = {
  params: Promise<{ username: string; itemId: string }>;
};

type Item = {
  id: string;
  figures: { name: string };
  description: string;
  created_at: string;
  user_id: string;
  profiles: { username: string };
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

export default async function UserItem({ params }: Props) {
  const { itemId } = await params;
  const supabase = await createClientServer();
  let authorAuth = false;
  let realCount;
  let userLiked = false;
  let commentCount = 0;

  // find valid post, if available
  const { data, error } = await supabase
    .from('posts')
    .select('id, figure_id, description, created_at, user_id, profiles(username), figures(name)')
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

  return (
    <div className="item-page">
      <div className="main">
        <h3>{item.figures.name}</h3>
        <p className="description">{item.description}</p>
        <p className="author-date">
          Added by <Link href={`/${item.profiles.username}`}>{item.profiles.username}</Link> on{' '}
          {new Date(item.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <LikesButton count={realCount} userLiked={userLiked} postId={itemId} />
        {authorAuth && (
          <div className="buttons-container">
            <StartEditPostButton id={itemId} />
            <DeletePostButton id={itemId} />
          </div>
        )}
      </div>
      <div className="item-comments">
        {commentCount > 0
          ? comments?.map((comment) => (
              <div className="comment" key={comment.id}>
                <p className="author">{comment.profiles.username}:</p>
                <div className="comment-container">
                  <p>{comment.comment}</p>
                  {comment.user_id == userData.user?.id && (
                    <DeleteCommentButton commentId={comment.id} />
                  )}
                </div>
              </div>
            ))
          : 'No comments yet'}
        {userData.user?.id && <CommentForm postId={itemId} />}
      </div>
    </div>
  );
}
