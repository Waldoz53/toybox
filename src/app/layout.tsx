import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { createClientServer } from "@/utils/supabase/server";
import { Nunito_Sans } from "next/font/google"

export const metadata: Metadata = {
  title: "Toybox",
  description: "Keep a record of your action figure collection",
};

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap'
})

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
    <html lang="en" className={nunito.className}>
      <body>
        <Header username={username}/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
