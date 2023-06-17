import Button from '@mui/material/Button';
import React from 'react';

interface SignUpModalProps {
  closeModal: () => void;
  classes: {
    outerShell: string;
    paper: string;
    content: string;
    header: string;
    loginButton: string;
    buttonContainer: string;
    closeButton: string;
  };
}

const SignUpModal = React.forwardRef<HTMLDivElement, SignUpModalProps>(
  ({ closeModal, classes }, ref) => {
    const handleCloseModal = () => {
      closeModal();
    };

    return (
      <div>
        <h2>Sign Up</h2>
        {/* ... SIGNUP CODE ... */}
        <Button onClick={handleCloseModal}>Cancel</Button>
      </div>
    );
  },
);

export default SignUpModal;
