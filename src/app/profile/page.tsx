'use client'

import { createClientBrowser } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClientBrowser()
    async function redirectToUsername() {
      const { data, error } = await supabase.auth.getUser()
      if (!data.user || error) {
        router.push('/login')
      }
      const { data: profile } = await supabase.from('profiles').select('username').eq('id', data.user?.id).single()
      if (profile?.username) {
        router.push(`/${profile.username}`)
      } else {
        router.push('/login')
      }
    }

    redirectToUsername()
  }, [router])

  return <span className="loader-transition"></span>
}