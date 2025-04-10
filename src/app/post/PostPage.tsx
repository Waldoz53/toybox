'use client'

import { createPost } from "../actions"

export default function PostPage() {
  return (
    <form>
      <label htmlFor="title">Title:</label>
      <input id="title" name="title" type="text" required />
      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" required />
      <button formAction={createPost}>Post</button>
    </form>
  )
}