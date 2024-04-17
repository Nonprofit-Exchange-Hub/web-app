import React, { createContext, useState, ReactNode } from 'react';

type ModalType = 'SignIn' | 'SignUp'; // This replaces ModalContent

interface IModalContext {
  modal: ModalState | null;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

interface ModalState {
  type: ModalType;
}

const ModalContext = createContext({} as IModalContext);

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = (type: ModalType) => {
    setModal({ type });
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
