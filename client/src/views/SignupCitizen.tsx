import * as React from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import type { Theme } from '@mui/material/styles';

import { placeholderImg } from '../assets/temp';
import EmailInput from '../components/Users/Auth/EmailInput';
import FacebookAuthBtn from '../components/Users/Auth/FacebookAuthBtn';
import GoogleAuthBtn from '../components/Users/Auth/GoogleAuthBtn';
import PasswordInput from '../components/Users/Auth/PasswordInput';
import StyledLink from '../components/StyledLink';
import TextDivider from '../components/TextDivider';
import routes from '../routes';
import { APP_API_BASE_URL } from '../configs';

const useStyles = makeStyles((theme: Theme) => ({
  sideImg: {
    backgroundImage: `url("${placeholderImg}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },
  signUpContainer: {
    margin: theme.spacing(5),
  },
  button: {
    borderRadius: 0,
    height: 62,
    textTransform: 'none',
    backgroundColor: '#C4C4C4',
    color: 'white',
  },
  header: { fontWeight: 'bold' },
  input: {
    height: 62,
    border: '1px solid #C4C4C4',
    boxSizing: 'border-box',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    color: '#000000',
    textAlign: 'left',
  },
}));

interface UserSignupData {
  firstName: string;
  last_name: string;
  email: string;
  password: string;
  accept_terms?: boolean;
  email_notification_opt_out?: boolean;
}

const initialFormData: UserSignupData = {
  firstName: '',
  last_name: '',
  email: '',
  password: '',
  accept_terms: false,
  email_notification_opt_out: false,
};

function SignupCitizen() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<string>('');
  const [formData, setFormData] = React.useState(initialFormData);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked }: { name: string; value: string; checked: boolean } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: name === 'accept_terms' ? checked : value,
      [name]: name === 'email_notification_opt_out' ? checked : value,
    }));
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setIsLoading(true);
    // Backend doesn't need accept_terms. If a user is signed up they have agreed to the terms
    delete formData.accept_terms;
    const res = await fetch(`${APP_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setIsLoading(false);
    if (data.status === 409) {
      setEmailError(data.message);
    } else {
      history.push('/');
    }
  };

  return (
    <div className="SignupCitizen">
      <Grid container>
        <Grid className={classes.sideImg} item xs={5} />
        <Grid container className={classes.signUpContainer} item direction="column" xs={6}>
          <Typography
            className={classes.header}
            variant="h4"
            component="h1"
            align="left"
            gutterBottom
          >
            Let's get started.
          </Typography>
          <Typography component="p" align="left" gutterBottom>
            Already have an account? <StyledLink to={routes.Login.path}>Log In</StyledLink>
          </Typography>
          <Grid container item justifyContent="space-between">
            <GoogleAuthBtn>Sign Up with Google</GoogleAuthBtn>
            <FacebookAuthBtn>Sign Up With Facebook</FacebookAuthBtn>
          </Grid>
          <TextDivider>or</TextDivider>
          <form onSubmit={handleSubmit}>
            <Grid container item xs={12} justifyContent="space-between">
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <label className={classes.label} htmlFor="firstName">
                    First Name
                  </label>
                  <Input
                    className={classes.input}
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="Jane"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange}
                    disableUnderline
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <label className={classes.label} htmlFor="last_name">
                    Last Name
                  </label>
                  <Input
                    className={classes.input}
                    type="text"
                    id="last_name"
                    name="last_name"
                    autoComplete="family-name"
                    placeholder="Individual"
                    fullWidth
                    value={formData.last_name}
                    onChange={handleChange}
                    disableUnderline
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container />
            <EmailInput
              value={formData.email}
              placeholder="jane@citizen.com"
              onChange={handleChange}
              showStartAdornment={true}
              error={emailError}
            />
            <PasswordInput
              value={formData.password}
              onChange={handleChange}
              showStartAdornment={true}
            />
            <FormControlLabel
              style={{ textAlign: 'left', display: 'block' }}
              control={
                <Checkbox
                  color="primary"
                  checked={formData.accept_terms}
                  onChange={handleChange}
                  name="accept_terms"
                  inputProps={{ 'aria-label': 'accept_terms_checkbox' }}
                />
              }
              label={
                <label>
                  Accept the{' '}
                  <StyledLink to={routes.TermsOfService.path} target="_blank">
                    Terms of Service
                  </StyledLink>
                </label>
              }
            />
            <FormControlLabel
              style={{ textAlign: 'left', display: 'block' }}
              control={
                <Checkbox
                  color="primary"
                  checked={formData.email_notification_opt_out}
                  onChange={handleChange}
                  name="email_notification_opt_out"
                  inputProps={{ 'aria-label': 'email_notification_opt_out_checkbox' }}
                />
              }
              label={'Opt Out Of Email Notifications'}
            />

            <Button
              className={classes.button}
              fullWidth
              type="submit"
              disabled={!formData.accept_terms}
            >
              Sign Up
            </Button>
            {/* Placeholder for loading  - waiting on UI/UX response as to what they want. */}
            {isLoading && <Typography>Loading</Typography>}
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignupCitizen;
