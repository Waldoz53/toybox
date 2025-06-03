import { createClientServer } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import '@/styles/admin.css';
import PrefetchLink from '@/components/PrefetchLink';
import AdminAddFigure from './AdminAddFigure';

export const metadata = {
  title: 'Toybox | Admin Access | Add Figure',
};

export default async function AddFigureAdmin() {
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
      <h1>Admin - Add Figure</h1>

      <PrefetchLink href="/admin">Return to Admin Page</PrefetchLink>

      <details>
        <summary>Help</summary>
        <p>
          An admin can add figures here, by Brand + Toyline, one by one. All brands and toylines
          available are listed.
        </p>
        <p>
          <i>
            The toy name will be automatically converted to a URL slug, so please stick with a
            naming convention that works well!
          </i>
        </p>
        <p>e.g., Cheetor (Deluxe) becomes &quot;cheetor-deluxe&quot;</p>
        <p>
          Watch out for slugs or figure names that may be similar! There are multiple deluxe
          Cheetors in Beast Wars, so there may be an error or another issue if names overlap!
        </p>
        <p>
          As a result, figure names should be organized with the name, THEN the subline/toy size
          (Fuzors, Transmetals, etc), instead of Cheetor, its Cheetor (Deluxe), Cheetor (Transmetals
          Deluxe), Cheetor (Transmetals 2 Deluxe)
        </p>
      </details>

      <AdminAddFigure />
    </main>
  );
}
