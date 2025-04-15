'use client'
import { logOut } from "@/app/actions"
import { useUser } from "@/app/context/UserContext"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const { setUser } = useUser()
  const router = useRouter()

  async function handleLogout() {
    await logOut()
    setUser(null)
    router.push('/')
  }

  return (<button onClick={handleLogout}>Log Out</button>)
}