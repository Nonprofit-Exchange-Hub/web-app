import { useContext, useEffect } from 'react';
import { ModalContext } from '../providers';

/**
 * This component is navigational. It just serves as a mechanism
 * To open the login modal on route navigation
 * @returns no content
 */
const Login = () => {
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    modalContext.openModal('SignIn');
  }, []);

  return <span></span>;
};

export default Login;
