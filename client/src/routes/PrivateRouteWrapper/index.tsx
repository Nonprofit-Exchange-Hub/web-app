import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../providers';
import routes from '../routes';

type Props = {
  roles: string[];
  children: JSX.Element;
};

const PrivateRoute = ({ roles, children }: Props) => {
  const [user] = useContext(UserContext);
  // use cookies
  // insert user.roles.includes(roles) check
  return user ? children : <Redirect to={routes.Login.path} />;
};

export default PrivateRoute;
