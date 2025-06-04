import PrefetchLink from '@/components/PrefetchLink';
import { createClientServer } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import '@/styles/admin.css';

export const metadata = {
  title: 'Toybox | Admin Access',
};

export default async function AdminPage() {
  const supabase = await createClientServer();
  const { data: user } = await supabase.auth.getUser();

  if (!user.user?.id) {
    return notFound();
  }

  const { data: isAdmin } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.user?.id)
    .maybeSingle();

  if (isAdmin?.is_admin == false) {
    return notFound();
  }

  return (
    <main className="admin">
      <h1>Admin Page</h1>
      <p>WIP: Add Brand</p>
      <p>WIP: Add Toyline (requires existing Brand)</p>
      <PrefetchLink href="/admin/add-figure">
        Add Figure (requires existing Brand + Toyline)
      </PrefetchLink>
    </main>
  );
}
