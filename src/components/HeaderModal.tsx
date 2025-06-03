import LogoutButton from './LogoutButton';
import PrefetchLink from './PrefetchLink';

type Props = {
  username: string;
  isAdmin: boolean;
};

export default function HeaderModal({ username, isAdmin }: Props) {
  return (
    <div className="header-modal">
      <PrefetchLink href="/add">Add</PrefetchLink>
      <PrefetchLink href={`/user/${username}`}>Profile</PrefetchLink>
      <PrefetchLink href="/settings">Settings</PrefetchLink>
      {isAdmin && <PrefetchLink href="/admin">Admin</PrefetchLink>}
      <LogoutButton />
    </div>
  );
}
