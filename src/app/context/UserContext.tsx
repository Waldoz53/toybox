'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  username: string;
  isAdmin: boolean;
} | null;

const UserContext = createContext<{ user: User; setUser: (user: User) => void }>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export default function useUser() {
  return useContext(UserContext);
}
