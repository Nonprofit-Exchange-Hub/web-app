import React from 'react';

interface SignUpModalProps {
  closeModal: () => void; // Assuming closeModal is a function that takes no arguments and doesn't return anything
}

const SignUpModal: React.FC<SignUpModalProps> = ({ closeModal }) => {
  return (
    <div>
      <h2>Sign Up</h2>
      {/* ... sign up form ... */}
      <button onClick={() => closeModal()}>Close</button>
    </div>
  );
};

export default SignUpModal;
