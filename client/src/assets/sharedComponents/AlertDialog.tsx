import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props: any) {
  const { when, onConfirmation, onCancel } = props;

  const history = useHistory();

  const [showPrompt, setShowPrompt] = React.useState(false);
  const [selectedRoute, setSelectedRoute] = React.useState('');

  useEffect(() => {
    if (when) {
      history.block((prompt) => {
        setSelectedRoute(prompt.pathname);
        setShowPrompt(true);
        return 'true';
      });
    } else {
      history.block(() => {});
    }

    return () => {
      history.block(() => {});
    };
  }, [history, when]);

  const handleOK = useCallback(async () => {
    if (onConfirmation) {
      const routing = await Promise.resolve(onConfirmation());
      if (routing) {
        history.block(() => {});
        history.push(selectedRoute);
      }
    }
  }, [selectedRoute, history, onConfirmation]);

  const handleCancel = useCallback(async () => {
    if (onCancel) {
      const routing = await Promise.resolve(onCancel());
      if (routing) {
        history.block(() => {});
        history.push(selectedRoute);
      }
    }
    setShowPrompt(false);
  }, [selectedRoute, history, onCancel]);

  return showPrompt ? (
    <div>
      <Dialog
        open={showPrompt}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to leave the page without submitting your data. Are you sure about this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOK} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : null;
}
