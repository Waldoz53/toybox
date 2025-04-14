'use client'
import { useRouter } from "next/navigation"

export default function StartEditPostButton({ id } : { id: string }) {
  const router = useRouter()
  async function startEdit() {
    router.push(`/edit/${id}`)
  }
  return (
    <button className="start-edit" onClick={startEdit}>Edit</button>
  )
}