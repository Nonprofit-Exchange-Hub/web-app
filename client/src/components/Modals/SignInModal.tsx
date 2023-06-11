import React from 'react';

interface SignInModalProps {
  openModal: () => void; // Assuming openModal is a function that takes no arguments and doesn't return anything
}
const SignInModal: React.FC<SignInModalProps> = ({ openModal }) => {
  console.log('Runs SignInModal');

  return (
    <div>
      <h2>Sign In</h2>
      {/* ... sign in form ... */}
      <button onClick={openModal}>Close</button>
    </div>
  );
};

export default SignInModal;
