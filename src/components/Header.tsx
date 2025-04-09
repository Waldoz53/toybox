import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import LogoutButton from "@/components/LogoutButton"

export default async function Header() {
  const supabase = await createClient()
  let username = ''

  const {data, error} = await supabase.auth.getUser()
  if (error || !data?.user) {
    console.log(error)
  }

  if (data) {
    const {data: userProfile, error: profileError} = await supabase.from('profiles').select('*').eq('id', data.user?.id).single()
    if (profileError) {
      console.log(error)
    }
    username = userProfile?.username
  }

  return (
    <div>
      <Link href="/"><h1>Header Component!</h1></Link>
      {username ? (
        <>
          <p>Logged in as {username}</p>
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