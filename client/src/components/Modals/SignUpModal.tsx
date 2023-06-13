import Button from '@mui/material/Button';
import React from 'react';

interface SignUpModalProps {
  closeModal: () => void;
  classes: {
    paper: string;
    header: string;
    button: string;
    buttonContainer: string;
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
