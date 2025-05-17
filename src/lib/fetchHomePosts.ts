import { createClientServer } from '@/utils/supabase/server';

export async function fetchHomePosts() {
  const supabase = await createClientServer();
  const { data, error } = await supabase
    .from('posts')
    .select(
      'id, created_at, profiles(username), figures(name, toylines(name)), comments(count), likes(count)',
    )
    .order('created_at', { ascending: false })
    .limit(25);

  if (error) {
    console.log('Error fetching posts:', error.message);
    return [];
  }

  return data;
}
