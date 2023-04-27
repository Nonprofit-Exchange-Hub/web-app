import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';

import type { Theme } from '@mui/material/styles';

import FacebookAuthBtn from '../components/Users/Auth/FacebookAuthBtn';
import GoogleAuthBtn from '../components/Users/Auth/GoogleAuthBtn';
import StyledLink from '../components/StyledLink';
import TextDivider from '../components/TextDivider';
import { UserContext } from '../providers';
import routes from '../routes/routes';
import { APP_API_BASE_URL } from '../configs';
import LoginForm from '../components/Users/Auth/Login/LoginForm';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

// Currently this is loaded from a route navigation.
// instead it should run independently of a route navigation and be controlled
// with the global `Login` button

const useStyles = makeStyles((theme: Theme) => {
  const xPadding = 12;
  const yPadding = 6;
  const yMargin = 8;

  return {
    paper: {
      maxWidth: 821 - theme.spacing(xPadding),
      maxHeight: 732 - theme.spacing(yPadding),
      borderRadius: 10,
      marginTop: theme.spacing(yMargin),
      marginBottom: theme.spacing(yMargin),
      paddingTop: theme.spacing(yPadding),
      paddingBottom: theme.spacing(yPadding),
      paddingLeft: theme.spacing(xPadding),
      paddingRight: theme.spacing(xPadding),
      margin: 'auto',
    },
    header: { fontWeight: 'bold', marginBottom: 68 },
    button: {
      borderRadius: 0,
      height: 62,
      textTransform: 'none',
    },
  };
});

interface UserLoginData {
  email: string;
  password: string;
}

const initialFormData: UserLoginData = {
  email: '',
  password: '',
};

interface Error {
  type: '' | 'email' | 'password';
  message: string;
}

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);
  const { setUser } = React.useContext(UserContext);

  const [formData, setFormData] = React.useState<UserLoginData>(initialFormData);

  const [open, setOpen] = React.useState(true);

  const onClose = (e: any, reason: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const buttonClose = () => {
    setOpen(false);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault();
    setIsLoading(true);
    const res = await fetch(`${APP_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });
    const response = await res.json();
    setIsLoading(false);

    if (!res.ok) {
      if (response.error === 'Email not found') {
        setError({ type: 'email', message: response.error });
      } else if (response.error === 'Invalid password') {
        setError({ type: 'password', message: response.error });
      } else {
        setError({ type: '', message: 'an unknown error occurred' });
      }
    } else {
      setUser(response.user, false, true);
      setError(null);
      history.push('/');
    }
  };

  return (
    <div className="Login" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container justifyContent="center" direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.header} variant="h3" component="h1" align="center">
              Welcome Back.
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="space-between">
            <GoogleAuthBtn>Sign In with Google</GoogleAuthBtn>
            <FacebookAuthBtn>Sign In with Facebook</FacebookAuthBtn>
          </Grid>
          <Grid item xs={12}>
            <TextDivider>or</TextDivider>
          </Grid>
          <div>
            <Dialog disableEscapeKeyDown={true} open={open} onClose={onClose}>
              <DialogTitle>Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <LoginForm
                    {...{ handleSubmit, formData, handleChange, error, classes, isLoading }}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={buttonClose}>Cancel</Button>
                <Button onClick={buttonClose}>Subscribe</Button>
              </DialogActions>
            </Dialog>
          </div>
          <Grid item xs={12}>
            <Typography align="left">
              Not signed up yet? <StyledLink to={routes.Signup.path}>Sign Up</StyledLink>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Login;
