'use client'

import { editPost } from "@/app/actions"


export default function EditPostForm({ id, title, description }: { id: string, title: string, description: string }) {

  return (
    <form>
      <input type="hidden" name="id" value={id} />
      <label htmlFor="title">Title:</label>
      <input id="title" name="title" type="text" required defaultValue={title}/>
      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" required defaultValue={description}/>
      <button formAction={editPost}>Edit Post</button>
    </form>
  )
}