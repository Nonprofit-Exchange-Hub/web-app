import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';
import SigninModal from './SigninModal';

interface Props {
  isShown: boolean;
  setModalShown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // children: JSX.Element | JSX.Element[];
}

const Modal = ({ isShown, setModalShown }: Props) => {
  //handle click outside of modal
  const handleClickOutside = () => {
    return setModalShown(false);
  };
  // //handle on key press
  // const handleKeyPress = useCallback(
  //   (e: KeyboardEvent) => {
  //     if (e.key === 'Escape') setModalShown(false);
  //   },
  //   [setModalShown],
  // );

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={handleClickOutside} />,
        document.getElementById('backdrop-root') as HTMLElement,
      )}
      {ReactDOM.createPortal(
        <SigninModal />,
        document.getElementById('overlay-root') as HTMLElement,
      )}
    </React.Fragment>
  );
};

export default Modal;
