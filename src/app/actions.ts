'use server';

import { createClientServer } from '@/utils/supabase/server';
import { isValidEmail } from '@/utils/validation';

// Log in
export async function login(formData: FormData) {
  const supabase = await createClientServer();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error.message);
    return error.message;
  }

  return '';
}

// Sign up
export async function signup(formData: FormData) {
  const supabase = await createClientServer();

  const userData = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // check username validity
  const userExists = await usernameAlreadyExists(userData.username);
  if (userExists) return 'Username is unavailable';

  // check email validity
  const emailValid = isValidEmail(userData.email);
  if (!emailValid) return 'Email is an invalid format';

  const { data, error } = await supabase.auth.signUp(userData);

  if (error || !data.user) {
    console.log(error?.message);
    return error?.message;
  } else {
    await supabase.from('profiles').insert([
      {
        id: data.user.id,
        username: userData.username,
      },
    ]);
  }

  return '';
}

// Log out
export async function logOut() {
  const supabase = await createClientServer();
  await supabase.auth.signOut();
}

// Creates a post
export async function createPost(formData: FormData) {
  const supabase = await createClientServer();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    return error?.message;
  }
  const postData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
  };
  const { error: postsError } = await supabase.from('posts').insert([
    {
      user_id: data.user.id,
      title: postData.title,
      description: postData.description,
    },
  ]);
  if (postsError) {
    return postsError.message;
  }

  return '';
}

// Deletes a post
export async function deletePost(postId: string) {
  const supabase = await createClientServer();
  const { data } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
    .eq('user_id', data.user?.id);
  if (error || !data) {
    return;
  } else {
  }
}

// Edits a post
export async function editPost(formData: FormData) {
  const supabase = await createClientServer();
  const { data, error } = await supabase.auth.getUser();

  if (!data || error) {
    return error?.message;
  }

  const postData = {
    id: formData.get('id') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
  };

  const { error: postsError } = await supabase
    .from('posts')
    .update({ title: postData.title, description: postData.description })
    .eq('id', postData.id)
    .eq('user_id', data.user?.id);
  if (postsError) {
    return postsError.message;
  } else return '';
}

// like a post
export async function likePost(postId: string, userId: string) {
  const supabase = await createClientServer();
  const { error } = await supabase.from('likes').insert([{ user_id: userId, post_id: postId }]);

  if (error) {
    return error.message;
  } else return 'liked successfully!';
}

// unlike a post
export async function unlikePost(postId: string, userId: string) {
  const supabase = await createClientServer();
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)
    .eq('post_id', postId);

  if (error) {
    return error.message;
  } else return 'unliked successfully!';
}

// comment on a post
export async function commentOnPost(formData: FormData) {
  const supabase = await createClientServer();
  const commentData = {
    postId: formData.get('postId') as string,
    comment: formData.get('comment') as string,
    commentAuthorId: formData.get('commentAuthorId') as string,
    commentAuthor: formData.get('commentAuthor') as string,
  };

  const { error } = await supabase.from('comments').insert([
    {
      post_id: commentData.postId,
      user_id: commentData.commentAuthorId,
      comment_author: commentData.commentAuthor,
      comment: commentData.comment,
    },
  ]);

  if (error) {
    return error.message;
  } else return '';
}

// delete a comment (on a post)
export async function deleteComment(commentId: string) {
  const supabase = await createClientServer();
  const { error } = await supabase.from('comments').delete().eq('id', commentId);

  if (error) {
    return error.message;
  } else return '';
}

// checks username for uniqueness (only 1 username available at a time)
export async function usernameAlreadyExists(username: string) {
  const supabase = await createClientServer();
  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle();
  if (data || error) {
    return true;
  } else {
    return false;
  }
}
