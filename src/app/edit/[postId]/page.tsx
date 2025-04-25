import { createClientServer } from '@/utils/supabase/server';
import EditPostForm from '@/app/edit/[postId]/EditPostForm';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ postId: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { postId } = await params;
  const supabase = await createClientServer();
  let validUser = false;

  // redirection function if this post doesnt exist + auth to make sure posts' user_id = user.id
  const { data } = await supabase.auth.getUser();
  if (!data) redirect('/login');

  const { data: postData } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .eq('user_id', data.user?.id)
    .single();
  if (!postData) {
    redirect('/');
  } else {
    validUser = true;
  }

  return (
    <div className="edit-page">
      <h2>Editing a collection item</h2>
      {validUser ? (
        <EditPostForm id={postId} title={postData.title} description={postData.description} />
      ) : (
        <p>You are not allowed here!</p>
      )}
    </div>
  );
}
