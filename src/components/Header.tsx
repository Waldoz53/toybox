import Link from "next/link"
import LogoutButton from "@/components/LogoutButton"
import { Bebas_Neue } from "next/font/google"

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

type HeaderProps = {
  username: string
}

export default async function Header({ username }: HeaderProps) {
  
  return (
    <div className="header">
      <Link href="/" className="title"><h1 className={bebas.className}>Toybox</h1></Link>
      <div className="spacer"></div>
      {username ? (
        <>
          <Link href={`/${username}`}><p>{username}</p></Link>
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