import Button from '@mui/material/Button';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextDivider from '../../components/TextDivider';
import { Link } from 'react-router-dom';
import routes from '../../routes/routes';

interface SignUpModalProps {
  closeModal: () => void;
  classes: {
    paper: string;
    content: string;
    header: string;
    button: string;
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
        <Dialog
          ref={ref}
          disableEscapeKeyDown={true}
          open={true}
          PaperProps={{ style: { borderRadius: 20 } }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            aria-label="close"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent className={classes.content}>
            <Paper elevation={3} className={classes.paper}>
              <Grid container justifyContent="center" direction="column" spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    className={classes.header}
                    variant="h3"
                    component={'span'}
                    align="center"
                  >
                    Welcome Aboard.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Link to={routes.SignupCitizen.path}>
                    <Button onClick={handleCloseModal} fullWidth>
                      Individual
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <TextDivider>or</TextDivider>
                </Grid>
                <Grid container item xs={12}></Grid>
                <Grid item xs={12}>
                  <Link to={routes.SignupNonProfit.path}>
                    <Button onClick={handleCloseModal} fullWidth>
                      Oganization
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Paper>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
);

export default SignUpModal;
