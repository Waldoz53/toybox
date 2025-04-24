'use client'
import useLoading from "@/app/context/LoadingContext"
import { useRouter } from "next/navigation"

export default function StartEditPostButton({ id } : { id: string }) {
  const router = useRouter()
  const { setLoading } = useLoading()

  async function startEdit() {
    setLoading(true)
    router.push(`/edit/${id}`)
    setLoading(false)
  }
  return (
    <button className="start-edit" onClick={(e) => {
      e.stopPropagation()
      startEdit()
    }}>Edit</button>
  )
}