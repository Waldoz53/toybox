import { createClientServer } from '@/utils/supabase/server';
import EditPostForm from '@/app/edit/[postId]/EditPostForm';
import { redirect } from 'next/navigation';
import '@/styles/login.css';
import '@/styles/post.css';

type Props = {
  params: Promise<{ postId: string }>;
};

export const metadata = {
  title: 'Toybox | Editing an item review',
};

export const revalidate = 300;

export default async function EditPostPage({ params }: Props) {
  const disabled = false;
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

  if (disabled) {
    return (
      <div className="edit-page">
        <h3>Editing is disabled for now. Please try again later.</h3>
      </div>
    );
  }

  return (
    <main className="edit-page">
      <h1>Editing review</h1>
      {validUser ? <EditPostForm id={postId} /> : <p>You are not allowed here!</p>}
    </main>
  );
}
