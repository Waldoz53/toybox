'use server'

import { redirect } from 'next/navigation'

import { createClientServer } from '@/utils/supabase/server'

// Log in
export async function login(formData: FormData) {
  const supabase = await createClientServer()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error.message)
    return error.message
  }

  return ""
}


// Sign up
export async function signup(formData: FormData) {
  const supabase = await createClientServer()

  const userData = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data, error } = await supabase.auth.signUp(userData)

  if (error || !data.user) {
    console.log(error?.message)
    return error?.message
  } else {
    await supabase.from('profiles').insert([
      {
        id: data.user.id,
        username: userData.username,
      }
    ])
  }

  return ""
}

// Log out
export async function logOut() {
  const supabase = await createClientServer()
  await supabase.auth.signOut()
}

// Creates a post
export async function createPost(formData: FormData) {
  const supabase = await createClientServer()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data) {
    return error?.message
  }
  const postData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string
  }
  const { error: postsError } = await supabase.from('posts').insert([
    {
      user_id: data.user.id,
      title: postData.title,
      description: postData.description
    }
  ])
  if (postsError) {
    return postsError.message
  }

  return ""
}

// Deletes a post
export async function deletePost(postId: string) {
  const supabase = await createClientServer()
  const { data } = await supabase.auth.getUser()
  const { error } = await supabase.from('posts').delete().eq('id', postId).eq('user_id', data.user?.id)
  if (error || !data) {
    return
  } else {
  }
}

// Edits a post
export async function editPost(formData: FormData) {
  const supabase = await createClientServer()
  const { data, error } = await supabase.auth.getUser()

  if (!data || error) {
    return error?.message
  }

  const postData = {
    id: formData.get('id') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string
  }

  const { error: postsError } = await supabase.from('posts').update({ title: postData.title, description: postData.description }).eq('id', postData.id).eq('user_id', data.user?.id)
  if (postsError) {
    return postsError.message
  }
  
  redirect('/profile')
}

// like + unlike on a post
export async function likePost(postId: string, userId: string) {
  const supabase = await createClientServer()
  const { error } = await supabase.from('likes').insert([{ user_id: userId, post_id: postId }])

  if (error) {
    return error.message
  } else return 'liked successfully!'
}
export async function unlikePost(postId: string, userId: string) {
  const supabase = await createClientServer()
  const { error } = await supabase.from('likes').delete().eq('user_id', userId).eq('post_id', postId)

  if (error) {
    return error.message
  } else return 'unliked successfully!'
}