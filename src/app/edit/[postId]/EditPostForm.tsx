'use client'

import { editPost } from "@/app/actions"


export default function EditPostForm({ id, title, description }: { id: string, title: string, description: string }) {

  return (
    <form>
      <input type="hidden" name="id" value={id} />
      <label htmlFor="title">Figure Name:</label>
      <input id="title" name="title" type="text" required defaultValue={title}/>
      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" required defaultValue={description} placeholder="Quality, features, etc."/>
      <div className="spacer"></div>
      <button formAction={editPost}>Edit Item</button>
    </form>
  )
}