import { redirect } from 'next/navigation';
import { createClientServer } from '@/utils/supabase/server';
import AddPage from './AddPage';
import '@/styles/login.css';
import '@/styles/post.css';

export default async function Post() {
  const supabase = await createClientServer();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    redirect('/login');
  }
  return (
    <main className="post-page">
      <h2>Add to your collection</h2>
      <AddPage />
    </main>
  );
}
