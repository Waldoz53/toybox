import Link from "next/link"
import LogoutButton from "@/components/LogoutButton"

type HeaderProps = {
  username: string
}

export default async function Header({ username }: HeaderProps) {
  
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