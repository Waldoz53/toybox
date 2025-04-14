'use client'

import { createPost } from "../actions"

export default function PostPage() {
  return (
    <form>
      <label htmlFor="title">Figure Name:</label>
      <input id="title" name="title" type="text" required />
      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" required placeholder="Quality, features, etc."/>
      <div className="spacer"></div>
      <button formAction={createPost}>Add</button>
    </form>
  )
}