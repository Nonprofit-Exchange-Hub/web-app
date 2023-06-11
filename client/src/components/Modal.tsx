import React, { useContext } from 'react';
import { ModalContext } from './../providers/ModalProvider';

const Modal = () => {
  const modalContext = useContext(ModalContext);
  console.log('Runs MODAL');

  if (!modalContext) return null;

  const { modal, closeModal, openModal } = modalContext;

  if (
    !modal ||
    typeof modal.component !== 'function' ||
    !React.isValidElement(<modal.component />)
  ) {
    return null;
  }

  const SpecificModal = modal.component;

  return (
    <div>
      <SpecificModal {...modal.props} closeModal={closeModal} openModal={openModal} />
    </div>
  );
};

export default Modal;
