import LogoutButton from './LogoutButton';
import PrefetchLink from './PrefetchLink';

type Props = {
  username: string;
};

export default function HeaderModal({ username }: Props) {
  return (
    <div className="header-modal">
      <PrefetchLink href={`/user/${username}`}>Profile</PrefetchLink>
      <PrefetchLink href="/settings">Settings</PrefetchLink>
      <LogoutButton />
    </div>
  );
}
