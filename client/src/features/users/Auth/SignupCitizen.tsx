import * as React from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import type { Theme } from '@material-ui/core/styles';

import { placeholderImg } from '../../../assets/temp';
import EmailInput from './EmailInput';
import FacebookAuthBtn from './FacebookAuthBtn';
import GoogleAuthBtn from './GoogleAuthBtn';
import PasswordInput from './PasswordInput';
import StyledLink from '../../../assets/sharedComponents/StyledLink';
import TextDivider from '../../../assets/sharedComponents/TextDivider';
import routes from '../../../routes';

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
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  accept_terms?: boolean;
}

const initialFormData: UserSignupData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  accept_terms: false,
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
    }));
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setIsLoading(true);
    // Backend doesn't need accept_terms. If a user is signed up they have agreed to the terms
    delete formData.accept_terms;
    const res = await fetch('http://localhost:3001/api/users', {
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
                  <label className={classes.label} htmlFor="first_name">
                    First Name
                  </label>
                  <Input
                    className={classes.input}
                    type="text"
                    id="first_name"
                    name="first_name"
                    autoComplete="given-name"
                    placeholder="Jane"
                    fullWidth
                    value={formData.first_name}
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
