import { redirect } from "next/navigation"
import { createClientServer } from "@/utils/supabase/server"
import PostPage from "./PostPage"

export default async function Post() {
  const supabase = await createClientServer()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data) {
    redirect('/login')
  }
  return (
    <div>
      <h2>Create a post</h2>
      <PostPage/>
    </div>
  )
}