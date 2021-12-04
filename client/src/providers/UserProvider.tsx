import * as React from 'react';

import type { User } from '../types';


type UserContextT = [
  any | null,
  (user: any) => void,
]

export const UserContext = React.createContext<UserContextT>([
  null,
  (user: any) => {},
]);

export function UserProvider(props: React.PropsWithChildren<{}>): JSX.Element {
  const { children } = props;

  const [user, setUser] = React.useState<User | null>(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
