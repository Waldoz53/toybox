export function getTimeAgo(date: string | Date): string {
  const now = new Date();
  const created = new Date(date);
  const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${minutes}m ago`;
  if (diff < 86400) return `${hours}h ago`;

  return `${days}d ago`;
}
