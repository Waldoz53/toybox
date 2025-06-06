import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createClientServer } from '@/utils/supabase/server';
import { Nunito_Sans } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';
import SetUserClient from '@/components/SetUserClient';

export const metadata: Metadata = {
  title: 'Toybox',
};

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let username = '';
  let isAdmin = false;
  const supabase = await createClientServer();
  const { data } = await supabase.auth.getUser();
  if (data.user != null) {
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('username, is_admin')
      .eq('id', data.user?.id)
      .single();
    if (userProfile) {
      username = userProfile?.username;
      isAdmin = userProfile?.is_admin;
    }
  }

  return (
    <html lang="en" className={nunito.className}>
      <body>
        <ClientLayout>
          <SetUserClient
            user={
              data.user
                ? { id: data.user?.id, username: username ?? 'Unknown', isAdmin: isAdmin }
                : null
            }
          />
          <Header />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
