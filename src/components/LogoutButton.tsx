'use client'
import { logOut } from "@/app/actions"
import useLoading from "@/app/context/LoadingContext"
import useUser from "@/app/context/UserContext"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const { setUser } = useUser()
  const { setLoading } = useLoading()
  const router = useRouter()

  async function handleLogout() {
    setLoading(true)
    await logOut().then(res => {
      console.log(res)
      setUser(null)
      router.push('/')
      setLoading(false)
    })
  }

  return (<button onClick={handleLogout}>Log Out</button>)
}