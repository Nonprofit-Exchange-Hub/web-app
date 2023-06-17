import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import EmailInput from '../../components/Users/Auth/EmailInput';
import FacebookAuthBtn from '../../components/Users/Auth/FacebookAuthBtn';
import GoogleAuthBtn from '../../components/Users/Auth/GoogleAuthBtn';
import PasswordInput from '../../components/Users/Auth/PasswordInput';
import StyledLink from '../../components/StyledLink';
import TextDivider from '../../components/TextDivider';
import { UserContext } from '../../providers';
import routes from '../../routes/routes';
import { APP_API_BASE_URL } from '../../configs';
interface SignInModalProps {
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
const SignInModal = React.forwardRef<HTMLDivElement, SignInModalProps>(
  ({ closeModal, classes }, ref) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<Error | null>(null);
    const { setUser } = React.useContext(UserContext);

    const [formData, setFormData] = React.useState<UserLoginData>(initialFormData);

    const handleCloseModal = React.useCallback(() => {
      closeModal();
    }, [closeModal]);

    React.useEffect(() => {
      // This function is called every time the URL changes
      const unlisten = history.listen(() => {
        handleCloseModal();
      });

      // Cleanup function to be run when the component unmounts
      return () => {
        unlisten();
      };
    }, [history, handleCloseModal]);

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
      <>
        <Dialog
          ref={ref}
          disableEscapeKeyDown={true}
          open={true}
          PaperProps={{ className: classes.outerShell }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            aria-label="close"
            className={classes.closeButton}
          >
            <CloseIcon style={{ fontSize: '1.1em' }} />
          </IconButton>
          <DialogContent className={classes.content}>
            <Paper elevation={0} className={classes.paper}>
              <Grid container justifyContent="center" direction="column" spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    className={classes.header}
                    variant="h3"
                    component={'span'}
                    align="center"
                  >
                    Welcome Back.
                  </Typography>
                </Grid>
                <Grid item xs={12} container justifyContent="space-between" wrap="nowrap">
                  <Grid item className={classes.buttonContainer}>
                    <GoogleAuthBtn>Sign In</GoogleAuthBtn>
                  </Grid>
                  <Grid item className={classes.buttonContainer}>
                    <FacebookAuthBtn>Sign In</FacebookAuthBtn>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextDivider>or</TextDivider>
                </Grid>
                <Grid container item xs={12} style={{ paddingTop: 0 }}>
                  <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <EmailInput
                      value={formData.email}
                      placeholder="jane@nonprofit.com"
                      onChange={handleChange}
                      error={error?.type === 'email' ? error.message : null}
                      showStartAdornment={true}
                    />
                    <PasswordInput
                      value={formData.password}
                      placeholder="oooooo"
                      onChange={handleChange}
                      error={error?.type === 'password' ? error.message : null}
                      showStartAdornment={true}
                    />
                    <Grid item xs={12} style={{ display: 'flex', paddingBottom: '30px' }}>
                      <Grid item xs={12}>
                        <Typography align="left" style={{ fontSize: '12px' }}>
                          <StyledLink to={routes.ForgotPassword.path}>Forgot Password?</StyledLink>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography align="right" style={{ fontSize: '12px' }}>
                          Not signed up yet?{' '}
                          <StyledLink to={routes.Signup.path}>Sign Up</StyledLink>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ display: 'flex', paddingBottom: '30px', justifyContent: 'center' }}
                    >
                      <Button
                        className={classes.loginButton}
                        style={{ backgroundColor: '#EF6A60', color: 'white' }}
                        fullWidth
                        type="submit"
                      >
                        Login
                      </Button>
                      {/* Placeholder for loading  - waiting on UI/UX response as to what they want. */}
                    </Grid>

                    {isLoading && <Typography>Loading</Typography>}
                  </form>
                </Grid>
              </Grid>
            </Paper>
          </DialogContent>
        </Dialog>
      </>
    );
  },
);

export default SignInModal;

// export default Login;
