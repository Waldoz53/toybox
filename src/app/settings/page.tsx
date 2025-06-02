import '@/styles/settingsPage.css';
import { createClientServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SettingsForm from './SettingsForm';
import LogoutButton from '@/components/LogoutButton';

export const metadata = {
  title: 'Toybox | Profile Settings',
};

export const revalidate = 60;

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

  const { data: settings } = await supabase
    .from('settings')
    .select('following_only_comment')
    .eq('user_id', user.user?.id)
    .maybeSingle();

  return (
    <main className="settings">
      <h1>Profile Settings</h1>
      <p>Logged in as {username?.username}. Not you?</p>
      <LogoutButton />
      <SettingsForm initialAllowComments={settings?.following_only_comment ?? false} />
    </main>
  );
}
