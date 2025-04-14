'use client'
import { deletePost } from "@/app/actions"
import { useRouter } from "next/navigation"

export default function DeletePostButton({ id } : { id: string }) {
  const router = useRouter()
  async function handleDelete() {
    deletePost(id)
    router.refresh()
  }
  return (
    <button className="delete-post" onClick={handleDelete}>Delete</button>
  )
}