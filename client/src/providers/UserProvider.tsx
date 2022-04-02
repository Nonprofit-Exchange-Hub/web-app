import * as React from 'react';

import type { User } from '../types';

type SetUser = (
  user: User | null,
  shouldFetch?: boolean,
  shouldStartTimer?: boolean,
) => Promise<void>;

type UserContextT = [User | null, SetUser, boolean];

export const UserContext = React.createContext<UserContextT>([
  null,
  async function (user: User | null, shouldFetch?: boolean, shouldStartTimer?: boolean) {},
  true,
]);

export function UserProvider(props: React.PropsWithChildren<{}>): JSX.Element {
  const { children } = props;

  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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

  async function setUserTimeout(
    user: User | null,
    shouldFetch = false,
    shouldStartTimer = false,
  ): Promise<void> {
    let newUser: User | null = user;
    if (shouldFetch) {
      setIsLoading(true);
      newUser = await fetchUser();
    }
    setUser(newUser);
    setIsLoading(false);

    if (shouldStartTimer && newUser) {
      setTimeout(() => {
        setUserTimeout(null, true, true);
      }, 59 * 60 * 1000);
    }
  }

  React.useEffect(() => {
    setUserTimeout(null, true, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserContext.Provider value={[user, setUserTimeout, isLoading]}>
      {children}
    </UserContext.Provider>
  );
}
