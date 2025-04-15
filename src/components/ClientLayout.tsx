'use client'

import { UserProvider } from "@/app/context/UserContext"
import { LoadingProvider } from "@/app/context/LoadingContext"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </LoadingProvider>
  )
}