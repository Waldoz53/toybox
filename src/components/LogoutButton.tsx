'use client'
import { logOut } from "@/app/actions"

export default function LogoutButton() {
  return (<button onClick={logOut}>Log Out</button>)
}