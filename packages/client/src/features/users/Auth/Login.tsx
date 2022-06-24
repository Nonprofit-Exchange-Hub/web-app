import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';

import type { Theme } from '@mui/material/styles';

import EmailInput from './EmailInput';
import FacebookAuthBtn from './FacebookAuthBtn';
import GoogleAuthBtn from './GoogleAuthBtn';
import PasswordInput from './PasswordInput';
import StyledLink from '../../../assets/sharedComponents/StyledLink';
import TextDivider from '../../../assets/sharedComponents/TextDivider';
import { UserContext } from '../../../providers';
import routes from '../../../routes';

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
  const [, setUser] = React.useContext(UserContext);

  const [formData, setFormData] = React.useState<UserLoginData>(initialFormData);

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
    const res = await fetch('http://localhost:3001/api/auth/login', {
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
          <Grid container item xs={12}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <EmailInput
                value={formData.email}
                placeholder="jane@nonprofit.com"
                onChange={handleChange}
                error={error?.type === 'email' ? error.message : null}
              />
              <PasswordInput
                value={formData.password}
                onChange={handleChange}
                showForgot={true}
                error={error?.type === 'password' ? error.message : null}
              />
              <Button
                className={classes.button}
                style={{ backgroundColor: '#C4C4C4', color: 'white' }}
                fullWidth
                type="submit"
              >
                Sign In
              </Button>
              {/* Placeholder for loading  - waiting on UI/UX response as to what they want. */}
              {isLoading && <Typography>Loading</Typography>}
            </form>
          </Grid>
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
