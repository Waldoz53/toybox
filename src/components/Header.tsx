import Link from "next/link"
import { createClientServer } from "@/utils/supabase/server"
import LogoutButton from "@/components/LogoutButton"

export default async function Header() {
  const supabase = await createClientServer()
  let username = ''

  const { data } = await supabase.auth.getUser()
  // Disabled error messages for now
  // if (error || !data?.user) {
  //   console.log(error)
  // }
  
  if (data) {
    const { data: userProfile } = await supabase.from('profiles').select('*').eq('id', data.user?.id).single()
    // Disabled error messages for now
    // if (profileError) {
    //   console.log(error)
    // }
    username = userProfile?.username
  }

  return (
    <div>
      <Link href="/"><h1>Header Component!</h1></Link>
      {username ? (
        <>
          <p>Logged in as <Link href={`/${username}`}>{username}</Link></p>
          <LogoutButton/>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </div>
  )
}