import React, { useContext, useEffect, useRef } from 'react';
import { ModalContext } from './../providers/ModalProvider';
import { makeStyles } from 'tss-react/mui';
import type { Theme } from '@mui/material/styles';
import SignIn from './Modals/SignInModal';
import SignUp from './Modals/SignUpModal';

import { ErrorBoundary } from 'react-error-boundary';

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => {
  const xPadding = 6;
  const yPadding = 6;

  return {
    outerShell: {
      borderRadius: 20,
      minWidth: 600,
      minHeight: 600,
      maxWidth: 732 - theme.spacing(xPadding),
      maxHeight: 732 - theme.spacing(yPadding),
    },
    paper: {
      marginTop: theme.spacing(yPadding),
      marginBottom: theme.spacing(yPadding),
      width: '80%',
    },
    content: {
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: {
      fontWeight: 'normal',
      marginTop: 50,
      display: 'flex',
      justifyContent: 'center',
    },
    loginButton: {
      borderRadius: 10,
      fontSize: 17,
      width: 180,
      height: 50,
      textTransform: 'none',
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      fontFamily: 'Poppins',
      fontWeight: 'semi-bold',
      border: 'none',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    buttonContainer: {
      marginBottom: theme.spacing(1),
      width: '65%',
      display: 'flex',
      justifyContent: 'center',
    },
    closeButton: {
      position: 'absolute',
      right: 40,
      top: 28,
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: theme.palette.grey[700],
      },
    },
  };
});

const Modal = () => {
  const modalContext = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { classes } = useStyles();
  const { modal, closeModal } = modalContext;

  useEffect(() => {
    if (!modalContext || !modalContext.modal || !closeModal) return;

    const handleClickOutside = (event: any) => {
      // console.log('event.target', event.target); //uncomment to event.target clicked html
      // console.log('modalRef.current', modalRef.current); //uncomment to modalRef.current reference html aka the Modal itself

      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalContext, closeModal]);

  if (!modalContext || !modalContext.modal) return null;

  let SpecificModal;
  if (modal && modal.type === 'SignIn') {
    SpecificModal = SignIn;
  } else if (modal && modal.type === 'SignUp') {
    SpecificModal = SignUp;
  } else {
    return null;
  }

  return (
    <div>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          /* reset logic here */
        }}
      >
        <SpecificModal ref={modalRef} closeModal={closeModal} className={classes} />
      </ErrorBoundary>
    </div>
  );
};

export default Modal;
