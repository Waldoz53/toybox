'use client'

import { useEffect } from "react"
import { useUser } from "@/app/context/UserContext"

type User = {
  id: string,
  username: string
}

export default function SetUserClient({ user }: { user?: User | null }) {
  const { setUser } = useUser()

  useEffect(() => {
    if (user) {
      setUser(user)
    }
  }, [user, setUser])

  return null
}