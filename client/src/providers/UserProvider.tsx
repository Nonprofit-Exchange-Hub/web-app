import * as React from 'react';
import { APP_API_BASE_URL } from '../configs';

import type { User } from '../types';

type SetUser = (
  user: User | null,
  shouldFetch?: boolean,
  shouldStartTimer?: boolean,
) => Promise<void>;
type UserContextT = {
  user: User | null;
  setUser: SetUser;
  isLoading: boolean;
};

export const UserContext = React.createContext<UserContextT>({
  user: null,
  setUser: async function (user: User | null, shouldFetch?: boolean, shouldStartTimer?: boolean) {},
  isLoading: false,
});

export function UserProvider(props: React.PropsWithChildren<{}>): JSX.Element {
  const { children } = props;

  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  async function fetchUser(): Promise<User | null> {
    const res = await fetch(`${APP_API_BASE_URL}/auth/session`, {
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

    if (isLoading) setIsLoading(false);

    if (shouldStartTimer && newUser) {
      setTimeout(() => {
        setUserTimeout(null, true, true);
      }, 59 * 60 * 1000);
    }
  }

  React.useEffect(() => {
    setUserTimeout(null, true, true);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser: setUserTimeout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
