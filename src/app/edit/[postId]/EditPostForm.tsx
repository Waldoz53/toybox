'use client'

import { editPost } from "@/app/actions"
import Toast from "@/components/Toast"
import { useState } from "react"

export default function EditPostForm({ id, title, description }: { id: string, title: string, description: string }) {
  const [message, setMessage] = useState('')
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = await editPost(formData)
    setMessage(result ?? "")
    console.log("Submit post error:", message)

    const timer = setTimeout(() => {
      setMessage('')
    }, 5000)
  }
  return (
    <form onSubmit={(handleSubmit)}>
      <input type="hidden" name="id" value={id} />
      <label htmlFor="title">Figure Name:</label>
      <input id="title" name="title" type="text" required defaultValue={title}/>
      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" required defaultValue={description} placeholder="Quality, features, etc."/>
      <div className="spacer"></div>
      <button>Submit Edit</button>
      <Toast message={message}/>
    </form>
  )
}