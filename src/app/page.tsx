import '@/styles/home.css';
import HomeAddButton from '@/components/HomeAddButton';
import { createClientServer } from '@/utils/supabase/server';
import HomeFeed from '@/components/HomeFeed';

// forces nextjs to cache this page for 15 seconds
export const revalidate = 15;

export default async function HomePage() {
  let loggedIn = false;
  const supabase = await createClientServer();
  const { data: user } = await supabase.auth.getUser();

  if (user.user?.id) {
    loggedIn = true;
  }

  return (
    <main className="home">
      <HomeAddButton />

      <HomeFeed loggedIn={loggedIn} />
    </main>
  );
}
