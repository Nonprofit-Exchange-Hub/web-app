import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../providers';
import routes from '../../routes';

const PrivateRoute = ({ children }) => {
  const [user] = useContext(UserContext);
  console.log(user);
  return user ? children : <Redirect to={routes.Login.path} />;
};

export default PrivateRoute;
