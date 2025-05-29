import '@/styles/settingsPage.css';
import { createClientServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SettingsForm from './SettingsForm';
import LogoutButton from '@/components/LogoutButton';

export default async function SettingsPage() {
  const supabase = await createClientServer();
  const { data: user } = await supabase.auth.getUser();

  // redirects user to log in if not logged in
  if (!user.user?.id) redirect(`/login?redirectTo=${encodeURIComponent('/settings')}`);

  // checks username
  const { data: username } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.user?.id)
    .maybeSingle();

  return (
    <main className="settings">
      <h2>Profile Settings</h2>
      <p>Logged in as {username?.username}. Not you?</p>
      <LogoutButton />
      <SettingsForm />
    </main>
  );
}
