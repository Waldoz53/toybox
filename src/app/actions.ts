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
  } else {
    console.log('a user successfully logged in.');
  }

  return 'Logged in!';
}

// Sign up
export async function signup(formData: FormData) {
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

  const supabase = await createClientServer();
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
    console.log('a user has signed up');
  }

  return 'Successfully signed up!';
}

// Log out
export async function logOut() {
  const supabase = await createClientServer();
  await supabase.auth.signOut();
  console.log('a user has signed out');
}

// adds an item
export async function addItem(formData: FormData) {
  const supabase = await createClientServer();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    return error?.message;
  }
  const postData = {
    figure: formData.get('figure') as string,
    description: formData.get('description') as string,
    rating: formData.get('rating') as string,
  };
  const { error: postsError } = await supabase.from('posts').insert([
    {
      user_id: data.user.id,
      figure_id: postData.figure,
      description: postData.description,
      rating: parseInt(postData.rating),
    },
  ]);
  if (postsError) {
    console.log(postsError.message);
    return postsError.message;
  } else {
    console.log('user added an item');
  }

  return 'Item successfully added!';
}

// Deletes an item
export async function deletePost(postId: string) {
  const supabase = await createClientServer();
  const { data } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
    .eq('user_id', data.user?.id);
  if (error || !data) {
    console.log('failed to delete an item');
    return;
  } else {
    console.log('successfully deleted an item');
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
    id: formData.get('postId') as string,
    description: formData.get('description') as string,
    rating: formData.get('rating') as string,
  };

  const { error: postsError } = await supabase
    .from('posts')
    .update({ description: postData.description, rating: parseInt(postData.rating) })
    .eq('id', postData.id)
    .eq('user_id', data.user?.id);
  if (postsError) {
    console.log(postsError.message);
    return postsError.message;
  } else {
    console.log('user edited a post');
    return 'Successfully edited!';
  }
}

// like a post
export async function likePost(postId: string, userId: string) {
  if (userId != undefined || userId != null) {
    const supabase = await createClientServer();
    const { error } = await supabase.from('likes').insert([{ user_id: userId, post_id: postId }]);

    if (error) {
      console.log(error.message);
      return error.message;
    } else {
      console.log('user liked successfully');
      return 'liked successfully!';
    }
  } else return 'like failed';
}

// unlike a post
export async function unlikePost(postId: string, userId: string) {
  if (userId != undefined || userId != null) {
    const supabase = await createClientServer();
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', postId);

    if (error) {
      console.log(error.message);
      return error.message;
    } else {
      console.log('user unliked successfully');
      return 'unliked successfully!';
    }
  } else return 'unlike failed';
}

// comment on a post
export async function commentOnPost(formData: FormData) {
  const supabase = await createClientServer();
  const commentData = {
    postId: formData.get('postId') as string,
    comment: formData.get('comment') as string,
    commentAuthorId: formData.get('commentAuthorId') as string,
  };

  const { error } = await supabase.from('comments').insert([
    {
      post_id: commentData.postId,
      user_id: commentData.commentAuthorId,
      comment: commentData.comment,
    },
  ]);

  if (error) {
    console.log(error.message);
    return error.message;
  } else {
    console.log('user commented on a post');
    return '';
  }
}

// delete a comment (on a post)
export async function deleteComment(commentId: string) {
  const supabase = await createClientServer();
  const { error } = await supabase.from('comments').delete().eq('id', commentId);

  if (error) {
    console.log(error.message);
    return error.message;
  } else {
    console.log('user deleted a comment successfully');
    return '';
  }
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
    console.log('username was checked and it exists');
    return true;
  } else {
    console.log('username was checked and it doesnt exist yet');
    return false;
  }
}

export async function followUser(loggedInId: string, id: string) {
  const supabase = await createClientServer();

  const { error } = await supabase.from('follows').insert({
    follower_id: loggedInId,
    followed_id: id,
  });

  if (error) {
    return error.message;
  } else return 'user followed successfully!';
}

export async function unfollowUser(loggedInId: string, id: string) {
  const supabase = await createClientServer();

  const { error } = await supabase.from('follows').delete().match({
    follower_id: loggedInId,
    followed_id: id,
  });

  if (error) {
    return error.message;
  } else return 'user unfollowed successfully!';
}

export async function saveUserSettings(formData: FormData) {
  const supabase = await createClientServer();

  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const allowCommentsRaw = formData.get('allowComments');
  const allowComments = allowCommentsRaw === 'on' ? true : false;

  const { data: user } = await supabase.auth.getUser();
  if (user.user?.id) {
    const { error } = await supabase
      .from('settings')
      .update({ following_only_comment: allowComments })
      .eq('user_id', user.user?.id);
    if (error) {
      return error.message;
    }
  } else {
    return 'You must be logged in to change user settings';
  }

  if (user.user?.id && newPassword === confirmPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      return `Password update error: ${error.message}`;
    }
  }

  return 'Settings changed successfully!';
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function adminAddFigure(formData: FormData) {
  const supabase = await createClientServer();

  const toylineId = formData.get('toylines') as string;
  const name = formData.get('figureName') as string;
  const slug = formData.get('figureSlug') as string;

  const { error } = await supabase.from('figures').insert([
    {
      name: name,
      toyline_id: toylineId,
      slug: slugify(slug),
    },
  ]);

  if (error) {
    return error.message;
  } else {
    return 'Successfully added an item!';
  }
}

// server scripts to update db
// empty
