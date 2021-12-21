import * as React from 'react';

import type { User } from '../types';

type UserContextT = [any | null, (user: User | null) => void];

export const UserContext = React.createContext<UserContextT>([null, (user: User | null) => {}]);

export function UserProvider(props: React.PropsWithChildren<{}>): JSX.Element {
  const { children } = props;

  const [user, setUser] = React.useState<User | null>(null);

  async function fetchUser(): Promise<User | null> {
    const res = await fetch('http://localhost:3001/api/auth/session', {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    const response = await res.json();
    if (res.ok) {
      return response.user;
    }

    return null;
  }

  function setUserTimeout(isInitialCall: boolean): void {
    setTimeout(async () => {
      if (!isInitialCall) {
        const newUser = await fetchUser();
        setUser(newUser);
      }
      setUserTimeout(false);
    }, 59 * 60 * 1000);
  }

  React.useEffect(() => {
    if (!user) {
      (async function (): Promise<void> {
        const newUser = await fetchUser();
        setUser(newUser);
        setUserTimeout(true);
      })();
    } else {
      setUserTimeout(true);
    }
  }, [user]);

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}
