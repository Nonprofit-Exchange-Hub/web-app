import React, { useContext, useEffect, useRef } from 'react';
import { ModalContext } from './../providers/ModalProvider';
import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';
import SignIn from './Modals/SignInModal';
import SignUp from './Modals/SignUpModal';

const useStyles = makeStyles((theme: Theme) => {
  const xPadding = 12;
  const yPadding = 6;
  //   const yMargin = 8;

  return {
    paper: {
      maxWidth: 821 - theme.spacing(xPadding),
      maxHeight: 732 - theme.spacing(yPadding),
      borderRadius: '20px',
      //   marginTop: theme.spacing(yMargin),
      //   marginBottom: theme.spacing(yMargin),
      paddingTop: theme.spacing(yPadding),
      paddingBottom: theme.spacing(yPadding),
      paddingLeft: theme.spacing(xPadding),
      paddingRight: theme.spacing(xPadding),
      margin: 'auto',
    },
    content: {
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: { fontWeight: 'bold', marginBottom: 68 },
    button: {
      borderRadius: 0,
      height: 62,
      textTransform: 'none',
    },
    buttonContainer: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(1),
      width: '65%',
    },
    closeButton: {
      position: 'absolute',
      right: 20,
      top: 8,
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
  const classes = useStyles();
  const { modal, closeModal } = modalContext;

  useEffect(() => {
    if (!modalContext || !modalContext.modal || !closeModal) return;

    const handleClickOutside = (event: any) => {
      console.log('event.target', event.target);
      console.log('modalRef.current', modalRef.current);

      if (modalRef.current && !modalRef.current.contains(event.target)) {
        console.log('CLOSING');
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
    <div id="mango">
      <SpecificModal ref={modalRef} closeModal={closeModal} classes={classes} />
    </div>
  );
};

export default Modal;
