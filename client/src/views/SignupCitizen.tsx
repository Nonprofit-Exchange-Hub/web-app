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
import Box from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';
import { placeholderImg } from '../assets/temp';
import EmailInput from '../components/Users/Auth/EmailInput';
import PasswordInput from '../components/Users/Auth/PasswordInput';
import StyledLink from '../components/StyledLink';
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
    padding: '10px 20px',
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    color: '#323232',
    fontSize: '16px',
    fontWeight: 600,
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
  const [activeStep, setActiveStep] = React.useState(0);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepOneInvalid = false;
  const stepTwoInvalid = false;
  const onSubmit = () => {
    console.log('nice');
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setIsLoading(true);
    // Backend doesn't need accept_terms. If a user is signed up they have agreed to the terms
    delete formData.accept_terms;
    const res = await fetch(`${APP_API_BASE_URL}/users`, {
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
      <Grid container sx={{ paddingTop: '115px' }}>
        <Grid className={classes.sideImg} item xs={5} />
        <Grid container className={classes.signUpContainer} item direction="column" xs={6}>
          <Grid item>
            <Typography
              align="left"
              color="#674E67"
              component="h1"
              lineHeight="87px"
              fontSize="58px"
              gutterBottom
              variant="h4"
            >
              Let's get started.
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            {activeStep === 0 && (
              <>
                <Grid container item xs={12} justifyContent="space-between">
                  <Grid container sx={{ marginTop: '60px' }}>
                    <Typography
                      align="left"
                      component="h1"
                      lineHeight="33px"
                      fontSize="22px"
                      gutterBottom
                      variant="h4"
                    >
                      Basic Information
                    </Typography>
                  </Grid>
                  <Grid item sx={{ marginBottom: '30px' }}>
                    <Typography
                      component="p"
                      align="left"
                      gutterBottom
                      fontSize={'15px'}
                      marginTop={'10px'}
                    >
                      Already have an account? <StyledLink to={routes.Login.path}>Login</StyledLink>
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
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
                          fullWidth
                          value={formData.firstName}
                          onChange={handleChange}
                          disableUnderline
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={8} paddingLeft={'20px'}>
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
                          fullWidth
                          value={formData.last_name}
                          onChange={handleChange}
                          disableUnderline
                          required
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container />
                <EmailInput
                  value={formData.email}
                  placeholder=""
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
                      sx={{ borderRadius: '50px' }}
                    />
                  }
                  label={
                    <label>
                      Accept the{' '}
                      <StyledLink to={routes.TermsOfService.path} target="_blank">
                        Terms and Agreements
                      </StyledLink>
                    </label>
                  }
                />
              </>
            )}
            {activeStep === 1 && (
              <>
                <Grid container item xs={12} justifyContent="space-between">
                  <Grid item xs={4}>
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
                        fullWidth
                        value={formData.firstName}
                        onChange={handleChange}
                        disableUnderline
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={8} paddingLeft={'20px'}>
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
                  placeholder=""
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
                      sx={{ borderRadius: '50px' }}
                    />
                  }
                  label={
                    <label>
                      Accept the{' '}
                      <StyledLink to={routes.TermsOfService.path} target="_blank">
                        Terms and Agreements
                      </StyledLink>
                    </label>
                  }
                />
              </>
            )}
            {activeStep === 2 && (
              <>
                <Grid container item xs={12} justifyContent="space-between">
                  <Grid item xs={4}>
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
                        fullWidth
                        value={formData.firstName}
                        onChange={handleChange}
                        disableUnderline
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={8} paddingLeft={'20px'}>
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
                  placeholder=""
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
                      sx={{ borderRadius: '50px' }}
                    />
                  }
                  label={
                    <label>
                      Accept the{' '}
                      <StyledLink to={routes.TermsOfService.path} target="_blank">
                        Terms and Agreements
                      </StyledLink>
                    </label>
                  }
                />
              </>
            )}
            {isLoading && <Typography>Loading</Typography>}
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ mt: 6, mb: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1, display: `${activeStep === 0 && 'none'}` }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {activeStep === 0 && (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleNext}
                      disabled={stepOneInvalid}
                    >
                      Next
                    </Button>
                  )}
                  {activeStep === 1 && (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleNext}
                      disabled={stepTwoInvalid}
                    >
                      Next
                    </Button>
                  )}
                  {activeStep === 2 && (
                    <Button color="primary" variant="contained" disabled={false} onClick={onSubmit}>
                      Submit
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignupCitizen;
