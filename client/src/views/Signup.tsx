import * as React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { Grid, Button } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import routes from '../routes/routes';
// import { Container } from '@mui/material'; keep for future commits
// import StyledLink from '../components/StyledLink';
// import TextDivider from '../components/TextDivider';
// import DialogContentText from '@mui/material/DialogContentText';

const useStyles = makeStyles()((theme: Theme) => ({
  imageBackground: {
    width: '200px',
    height: '200px',
    background: '#C4C4C4',
    borderRadius: '130px',
    marginBottom: '1rem',
  },
  linkText: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  formBox: {
    textAlign: 'center',
    width: '100%',
  },
  positionOptions: {
    marginLeft: '20%',
    marginTop: '5rem',
    alignContent: 'center',
  },
  caption: {
    width: '200px',
  },
}));

function Signup() {
  const { classes } = useStyles();

  const [open, setOpen] = React.useState(true);
  const onClose = (e: any, reason: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const buttonClose = () => {
    setOpen(false);
  };

  return (
    <div className="Signup" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3}>
        <div>
          <Dialog disableEscapeKeyDown={true} open={open} onClose={onClose}>
            <DialogTitle>Welcome!</DialogTitle>
            <DialogContent>
              {/* <Container className={classes.formBox}> */}
              <Typography variant="h3" component="h3">
                Account Type
              </Typography>
              <Grid container spacing={8}>
                <Grid item className={classes.positionOptions}>
                  <Link className={classes.linkText} to={routes.SignupNonProfit.path}>
                    <Button variant="contained">Organization</Button>
                  </Link>
                </Grid>
                <Grid item className={classes.positionOptions}>
                  <Link className={classes.linkText} to={routes.SignupCitizen.path}>
                    <Button variant="contained">Individual</Button>
                  </Link>
                </Grid>
              </Grid>
              {/* </Container> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={buttonClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Paper>
    </div>
  );
}

export default Signup;
