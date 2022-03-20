import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
type Props = { message?: string };

export default function SimpleSnackbar(props: Props) {
  let message = props.message || 'You Claimed This!';
  const [isOpen, isSetOpen] = React.useState<boolean>(true);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
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
          <IconButton key="close" aria-label="Close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
        message={<span id="message-id">{message}</span>}
      />
    </div>
  );
}
