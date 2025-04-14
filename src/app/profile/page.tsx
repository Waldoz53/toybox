import { createClientServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfileRedirectPage() {
  const supabase = await createClientServer()
  const { data, error } = await supabase.auth.getUser()

  if (!data.user || error) {
    redirect('/login')
  }

  const { data: profile } = await supabase.from('profiles').select('username').eq('id', data.user.id).single()

  if (!profile?.username) {
    redirect("/")
  }

  redirect(`/${profile?.username}`)
}