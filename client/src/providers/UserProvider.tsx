import * as React from 'react';

import type { User } from '../types';


type UserContextT = [
  any | null,
  (user: User | null) => void,
]

export const UserContext = React.createContext<UserContextT>([
  null,
  (user: User | null) => {},
]);

export function UserProvider(props: React.PropsWithChildren<{}>): JSX.Element {
  const { children } = props;

  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    async function fetchUser(): Promise<void> {
      const res = await fetch('http://localhost:3001/api/auth/session', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      const response = await res.json();

      if (res.ok) {
        setUser(response.user);
      }
    }

    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
