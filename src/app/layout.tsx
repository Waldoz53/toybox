import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { createClientServer } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Toybox",
  description: "test",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClientServer()
  const { data } = await supabase.auth.getUser()
  let username = ''
  if (data) {
    const { data: userProfile } = await supabase.from('profiles').select('*').eq('id', data.user?.id).single()
    username = userProfile?.username
  }

  return (
    <html lang="en">
      <body>
        <Header username={username}/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
