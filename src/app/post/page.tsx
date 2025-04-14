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
    <div className="post-page">
      <h2>Add to your collection</h2>
      <PostPage/>
    </div>
  )
}