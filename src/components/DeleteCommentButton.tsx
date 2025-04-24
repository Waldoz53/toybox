'use client'

import { deleteComment } from "@/app/actions"
import useLoading from "@/app/context/LoadingContext"
import { useRouter } from "next/navigation"

type Comment = {
  commentId: string
}

type Props = Comment

export default function DeleteCommentButton({ commentId }: Props) {
  const router = useRouter()
  const { setLoading } = useLoading()

  async function handleDeleteComment() {
    setLoading(true)
    await deleteComment(commentId).then(res => {
      if (res !== "") {
        console.log(res)
      }
      router.refresh()
      setLoading(false)
    })
  }

  return <button onClick={handleDeleteComment}>Delete</button>
}