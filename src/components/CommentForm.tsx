'use client'

import { commentOnPost } from "@/app/actions"
import useLoading from "@/app/context/LoadingContext"
import useUser from "@/app/context/UserContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Comment = {
  postId: string,
}

type Props = Comment

export default function CommentForm({ postId }: Props) {
  const router = useRouter()
  const user = useUser()
  const { setLoading } = useLoading()
  const [username, setUsername] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    if (user.user?.username && user.user?.id) {
      setUsername(user.user?.username)
      setUserId(user.user?.id)
    }
  }, [username, userId, user.user?.username, user.user?.id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await commentOnPost(formData).then(res => {
      if (res !== "") {
        console.log(res)
      }
      setComment('')
      setLoading(false)
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="postId" value={postId}/>
      <input type="hidden" name="commentAuthorId" value={userId ?? ""}/>
      <input type="hidden" name="commentAuthor" value={username ?? ""}/>
      <textarea name="comment" placeholder="Post a comment..." required onChange={e => setComment(e.target.value)} value={comment}></textarea>
      <button>Post</button>
    </form>
  )
}