import React, { createContext, useState, ReactNode } from 'react';

type ModalContent = React.FC<any>; // Replace with the actual type of your modal content
type ModalProps = {}; // Replace with the actual type of your modal props

interface IModalContext {
  modal: ModalState | null;
  openModal: (component: ModalContent, props?: ModalProps) => void;
  closeModal: (component?: ModalContent) => void;
}

interface ModalState {
  component: ModalContent;
  props: ModalProps;
}

const ModalContext = createContext({} as IModalContext);

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  console.log('Runs ModalProvider');

  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = (component: ModalContent, props: ModalProps = {}) => {
    setModal({ component, props });
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
