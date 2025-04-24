'use client'
import { deletePost } from "@/app/actions"
import useLoading from "@/app/context/LoadingContext"
import { useRouter } from "next/navigation"

export default function DeletePostButton({ id } : { id: string }) {
  const router = useRouter()
  const { setLoading } = useLoading()
  async function handleDelete() {
    setLoading(true)
    await deletePost(id).then(res => {
      console.log(res)
      router.push('/profile')
      setLoading(false)
    })
  }
  return (
    <button className="delete-post" onClick={handleDelete}>Delete</button>
  )
}