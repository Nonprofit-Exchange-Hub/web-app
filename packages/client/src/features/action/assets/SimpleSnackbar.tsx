import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
type Props = { message?: string };

export default function SimpleSnackbar(props: Props) {
  let message = props.message || 'You Claimed This!';
  const [isOpen, isSetOpen] = React.useState<boolean>(true);
  const handleClose = () => {
    isSetOpen(false);
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
            size="large"
          >
            <CloseIcon />
          </IconButton>,
        ]}
        message={<span id="message-id">{message}</span>}
      />
    </div>
  );
}
