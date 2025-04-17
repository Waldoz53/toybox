import DeletePostButton from "@/components/DeletePostButton"
import StartEditPostButton from "@/components/StartEditPostButton"
import { createClientServer } from "@/utils/supabase/server"
import Link from "next/link"

type Props = {
  params: Promise<{ username: string, itemId: string }>
}

type Item = {
  id: string,
  title: string,
  description: string,
  created_at: string,
  user_id: string,
  profiles: { username: string }
}

export default async function UserItem({ params }: Props) {
  const { itemId } = await params
  const supabase = await createClientServer()
  let authorAuth = false
  
  // find valid post, if available
  const { data, error } = await supabase.from('posts').select('id, title, description, created_at, user_id, profiles(username)').eq('id', itemId).single()
  const item = data as unknown as Item
  
  if (!data || error) {
    return (
      <div className="item-page">
        <div className="main">
          <h3>Page not found.</h3>
        </div>
      </div>
    )
  }

  // check user auth
  const { data: userData } = await supabase.auth.getUser()
  // if logged in user id = post author id, enable the edit/delete buttons
  if (userData.user?.id === data?.user_id) {
    authorAuth = true
  }

  return (
    <div className="item-page">
      <div className="main">
        <h3>{item.title}</h3>
        <p className="description">{item.description}</p>
        <p className="author-date">Added by <Link href={`/${item.profiles.username}`}>{item.profiles.username}</Link> on {new Date(item.created_at).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
      </div>
      {authorAuth && 
        <div className="buttons-container">
          <StartEditPostButton id={itemId}/>
          <DeletePostButton id={itemId}/>
        </div>}
    </div>
  )
}