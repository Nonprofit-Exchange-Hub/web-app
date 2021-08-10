import * as React from 'react';


type UserContextT = [
  any | null,
  (user: any) => void,
]

export const UserContext = React.createContext<UserContextT>([
  null,
  (user: any) => {},
])

export function UserProvider(props: React.PropsWithChildren<{}>): JSX.Element {
  const { children } = props;

  // TODO make a user type
  const [user, setUser] = React.useState<any | null>(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
