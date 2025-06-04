import { createClientBrowser } from '@/utils/supabase/client';

// retrieves all posts, or posts only by followers
export async function fetchHomePosts(feed: 'following' | 'everyone') {
  const supabase = await createClientBrowser();

  const { data: user } = await supabase.auth.getUser();

  if (user.user?.id && feed === 'following') {
    const { data: follows } = await supabase
      .from('follows')
      .select('followed_id')
      .eq('follower_id', user.user.id);

    const followedIds = follows?.map((f) => f.followed_id);
    if (!followedIds || followedIds.length === 0) {
      return [];
    }

    const { data: posts, error } = await supabase
      .from('posts')
      .select(
        'id, created_at, profiles(username), figures(name, toylines(name)), comments(count), likes(count)',
      )
      .in('user_id', followedIds)
      .order('created_at', { ascending: false });

    if (!posts || error) {
      return [];
    }

    return posts;
  } else {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(
        'id, created_at, profiles(username), figures(name, toylines(name)), comments(count), likes(count)',
      )
      .order('created_at', { ascending: false });

    if (!posts || error) {
      return [];
    }

    return posts;
  }
}
