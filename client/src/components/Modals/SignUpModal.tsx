import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import routes from '../../routes/routes';
import { makeStyles } from 'tss-react/mui';
import type { Theme } from '@mui/material/styles';

interface SignUpModalProps {
  closeModal: () => void;
  className: {
    outerShell: string;
    paper: string;
    content: string;
    header: string;
    loginButton: string;
    buttonContainer: string;
    closeButton: string;
  };
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    border: 0,
    maxWidth: '1000px',
    maxHeight: '100px',
    minWidth: '100px',
    minHeight: '100px',
    padding: '0px',
  },
}));

const SignUpModal = React.forwardRef<HTMLDivElement, SignUpModalProps>(
  ({ closeModal, className }, ref) => {
    const handleCloseModal = () => {
      closeModal();
    };

    const { classes } = useStyles();

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
            className={className.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent className={className.content}>
            {/* <Paper elevation={3} className={className.paper}> */}
            <Grid
              container
              item
              xs={12}
              style={{ paddingTop: 0, paddingLeft: 22, paddingRight: 16 }}
            >
              <Grid item xs={12}>
                <Typography
                  className={className.header}
                  variant="h4"
                  component={'span'}
                  align="center"
                >
                  Welcome Aboard.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link to={routes.SignupCitizen.path}>
                  <Button onClick={handleCloseModal} fullWidth className={classes.root}>
                    I am an individual citizen.
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Divider
                  variant="middle"
                  sx={{ marginLeft: 3, borderBottomWidth: 1, borderColor: '#000000' }}
                ></Divider>
              </Grid>
              <Grid container item xs={12}></Grid>
              <Grid item xs={12}>
                <Link to={routes.SignupNonProfit.path}>
                  <Button onClick={handleCloseModal} fullWidth className={classes.root}>
                    I am part of an organization.
                  </Button>
                </Link>
              </Grid>
            </Grid>
            {/* </Paper> */}
          </DialogContent>
        </Dialog>
        <div ref={ref}></div>
      </div>
    );
  },
);

export default SignUpModal;
