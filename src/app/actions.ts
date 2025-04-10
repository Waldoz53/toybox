'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClientServer } from '@/utils/supabase/server'

// Login
export async function login(formData: FormData) {
  const supabase = await createClientServer()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
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
    redirect('/error')
  } else {
    await supabase.from('profiles').insert([
      {
        id: data.user.id,
        username: userData.username,
      }
    ])
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// Log out
export async function logOut() {
  const supabase = await createClientServer()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/')
}

// Create a post
export async function createPost(formData: FormData) {
  const supabase = await createClientServer()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data) {
    return
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
    return
  }
}