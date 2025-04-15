'use client'

import { useState } from "react"
import { createPost } from "../actions"
import Toast from "@/components/Toast"

export default function PostPage() {
  const [message, setMessage] = useState('')
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = await createPost(formData)
    setMessage(result ?? "")
    console.log("Submit post error:", message)

    setTimeout(() => {
      setMessage('')
    }, 5000)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Figure Name:</label>
      <input id="title" name="title" type="text" required />
      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" placeholder="Quality, features, etc."/>
      <div className="spacer"></div>
      <button>Add</button>
      <Toast message={message}/>
    </form>
  )
}