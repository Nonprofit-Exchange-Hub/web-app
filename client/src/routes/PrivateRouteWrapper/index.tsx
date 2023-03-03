import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../providers';
import routes from '../routes';

type Props = {
  roles: string[];
  children: JSX.Element;
};

const PrivateRoute = ({ roles, children }: Props) => {
  const { user, isLoading } = useContext(UserContext);
  // use cookies
  // insert user.roles.includes(roles) check
  if (isLoading) {
    return <div>LOADING</div>;
  }
  return user ? children : <Redirect to={routes.Login.path} />;
};

const renderPrivateRoute = (roles: string[], Component: () => JSX.Element) => {
  return () => (
    <PrivateRoute roles={roles}>
      <Component />
    </PrivateRoute>
  );
};

export default renderPrivateRoute;
