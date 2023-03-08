import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Box, Select, MenuItem, Chip, Avatar, TextField, SelectChangeEvent } from '@mui/material';

import type { Theme } from '@mui/material/styles';
import { placeholderImg } from '../assets/temp';
import EmailInput from '../components/Users/Auth/EmailInput';
import PasswordInput from '../components/Users/Auth/PasswordInput';
import StyledLink from '../components/StyledLink';
import routes from '../routes/routes';
import { UserContext } from '../providers';
import { APP_API_BASE_URL, US_STATE_NAMES } from '../configs';

const useStyles = makeStyles((theme: Theme) => ({
  sideImg: {
    backgroundImage: `url("${placeholderImg}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    borderTopRightRadius: '15px',
    borderBottomRightRadius: '15px',
  },
  signUpContainer: {
    margin: theme.spacing(5),
  },
  button: {
    borderRadius: 0,
    height: 44,
    textTransform: 'none',
    backgroundColor: '#C4C4C4',
    color: 'white',
  },
  header: {
    fontWeight: 'bold',
    paddingBottom: '40px',
  },
  input: {
    height: 44,
    border: '1px solid #C4C4C4',
    borderRadius: 10,
    boxSizing: 'border-box',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: 14,
    marginBottom: 20,
  },
  label: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  chip: {
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    height: 44,
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

const interests = [
  'Animal Care & Services',
  'Poverty',
  'Housing & Homeless',
  'Youth & Children',
  'Disaster Relief',
  'Health Care & Welness',
  'Environment & Sustainability',
  'Sports & Recreation',
  'Seniors',
  'Religion, Faith & Spirituality',
  'Civic Engagement',
  'LGTBQIA+',
  'Civil Rights & Advocacy',
  'Military & Veterans',
  'Social Justice',
  'Education & Literacy',
  'Arts & Culture',
];

function SignupCitizen() {
  const { sideImg, signUpContainer, button, header, input, label, chip } = useStyles();
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<string>('');
  const [formData, setFormData] = React.useState(initialFormData);
  const { user, setUser } = React.useContext(UserContext);

  const makeChips = () => {
    return interests.map((interest) => {
      return (
        <Chip
          className={chip}
          label={interest}
          variant="outlined"
          onClick={() => console.log(interest)}
        />
      );
    });
  };

  const makeStateSelectOptions = () => {
    return US_STATE_NAMES.map((state) => {
      return <MenuItem value={state}>{state}</MenuItem>;
    });
  };

  const makeCitySelectOptions = (state: string) => {
    // TODO: get list of cities from state
    console.log(state);
    let cities = Array.from(Array(50).keys()).map((num) => <MenuItem value={num}>{num}</MenuItem>);
    return cities;
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked }: { name: string; value: string; checked: boolean } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: name === 'accept_terms' ? checked : value,
      [name]: name === 'email_notification_opt_out' ? checked : value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode): void => {
    const { name, value }: { name: string; value: string } = event.target;
    setFormData((fData) => ({
      ...fData,
      [name]: name === 'city' && value,
      [name]: name === 'state' && value,
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
      setUser(data);
      handleNext();
    }
  };

  // handleNext and handleBack are also in SignUpUserAndNonProfit, refactor later
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="SignupCitizen">
      <Grid container>
        <Grid item xs={12} sx={{ height: '60px' }} />
        <Grid className={sideImg} item xs={3} />
        <Grid item xs={1} />
        <Grid container className={signUpContainer} item direction="column" xs={7}>
          <form onSubmit={handleSubmit}>
            {/* PAGE ONE ###########################################################*/}
            {activeStep === 0 && (
              <>
                <Typography
                  className={header}
                  variant="h4"
                  fontSize="58px"
                  lineHeight="87px"
                  component="h1"
                  align="left"
                  gutterBottom
                >
                  Let's get started
                </Typography>
                <Grid container item xs={12}>
                  <Grid item xs={5} sx={{ paddingRight: '10px' }}>
                    <FormControl>
                      <label className={label} htmlFor="firstName">
                        First Name
                      </label>
                      <Input
                        className={input}
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
                  <Grid item xs={7}>
                    <FormControl fullWidth>
                      <label className={label} htmlFor="last_name">
                        Last Name
                      </label>
                      <Input
                        className={input}
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
                  style={{
                    textAlign: 'left',
                    display: 'flex',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                  control={
                    <Checkbox
                      color="primary"
                      checked={formData.accept_terms}
                      onChange={handleChange}
                      name="accept_terms"
                      inputProps={{ 'aria-label': 'accept_terms_checkbox' }}
                      sx={{
                        input: {
                          "[(type = 'checkbox')]": { '::before': { outline: '1px solid black' } },
                        },
                      }}
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

            {/* PAGE TWO ######################################################## */}
            {activeStep === 1 && (
              <>
                <Typography
                  className={header}
                  variant="h4"
                  fontSize="58px"
                  component="h1"
                  align="left"
                >
                  Tell us about yourself
                </Typography>
                <Typography className={label} sx={{ fontWeight: 'bold' }}>
                  Personal Information
                </Typography>
                <Typography>You can always update this information later as needed.</Typography>
                <Grid item xs={12} sx={{ height: '50px' }} />
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={12}>
                    <label className={label}>Where are you located?</label>
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      className={input}
                      displayEmpty
                      fullWidth
                      onChange={handleSelectChange}
                      MenuProps={{
                        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
                        sx: {
                          borderRadius: '10px',
                          padding: '20px',
                          height: '240px',
                        },
                      }}
                      name="city"
                      renderValue={() => <MenuItem value="">City</MenuItem>}
                    >
                      {makeCitySelectOptions('WA')}
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      className={input}
                      displayEmpty
                      fullWidth
                      onChange={handleSelectChange}
                      MenuProps={{
                        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
                        sx: {
                          borderRadius: '10px',
                          padding: '20px',
                          height: '240px',
                        },
                      }}
                      name="state"
                      renderValue={() => <MenuItem value="">State</MenuItem>}
                    >
                      {makeStateSelectOptions()}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <Input className={input} placeholder="zip" fullWidth disableUnderline></Input>
                  </Grid>
                </Grid>
              </>
            )}

            {/* PAGE THREE ######################################################## */}
            {activeStep === 2 && (
              <>
                <Typography
                  className={header}
                  variant="h4"
                  fontSize="58px"
                  component="h1"
                  align="left"
                >
                  Tell us about your interests
                </Typography>
                <Typography className={label} sx={{ fontWeight: 'bold' }}>
                  Your Interests
                </Typography>
                <Typography>Please select one or more interest.</Typography>
                <Grid item xs={12} sx={{ height: '50px' }} />
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={12}>
                    <label className={label}>What type on nonprofits are you interested in?</label>
                  </Grid>
                  <Grid item xs={12}>
                    {makeChips()}
                  </Grid>
                </Grid>
              </>
            )}

            {/* PAGE FOUR ######################################################## */}
            {activeStep === 3 && (
              <>
                <Typography
                  className={header}
                  variant="h4"
                  fontSize="58px"
                  component="h1"
                  align="left"
                >
                  Upload your profile icon
                </Typography>
                <Typography className={label} sx={{ fontWeight: 'bold' }}>
                  Your Profile
                </Typography>
                <Typography>
                  You can update this information later in the settings of your account.
                </Typography>
                <Grid item xs={12} sx={{ height: '50px' }} />
                <Grid container item xs={12} alignItems="center">
                  <Grid item xs={3}>
                    <Avatar sx={{ bgcolor: 'gray', width: 110, height: 110 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <input accept="image/*" hidden id="upload-file" type="file" />
                    <label htmlFor="upload-file">
                      <Button
                        className={button}
                        component="span"
                        color="secondary"
                        variant="contained"
                      >
                        Upload
                      </Button>
                    </label>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ height: '50px' }} />
                <Typography className={label} sx={{ fontWeight: 'bold' }}>
                  About Yourself
                </Typography>
                <Grid item xs={10}>
                  <TextField multiline rows={4} fullWidth placeholder="Tell us about yourself..." />
                </Grid>
              </>
            )}

            {/* PAGE FIVE ######################################################## */}
            {/* SHOWN WHEN SIGNUP DONE ######################################################## */}
            {activeStep === 4 && (
              <>
                <Typography
                  className={header}
                  variant="h4"
                  fontSize="58px"
                  component="h1"
                  align="left"
                >
                  Sign up Complete!
                </Typography>
                <Typography className={label} sx={{ fontWeight: 'bold' }}>
                  Name: {user && user.firstName} {user && user.last_name}
                </Typography>
                <Typography>Email: {user && user.email}</Typography>
                <Grid item xs={12} sx={{ height: '50px' }} />
                <Typography>
                  Please check your email to finish the identity verification process. Otherwise,
                  start posting your organization needs.
                </Typography>
              </>
            )}

            {activeStep !== 4 && (
              <Grid container spacing={5}>
                <Grid item xs={12} sx={{ mt: 2, mb: 6 }}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleBack}
                      sx={{ display: activeStep === 0 ? 'none' : 'inherit', mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box />
                    {activeStep === 0 && (
                      <Button color="primary" variant="outlined" onClick={handleNext}>
                        Next
                      </Button>
                    )}
                    {activeStep === 1 && (
                      <Button color="primary" variant="outlined" onClick={handleNext}>
                        Next
                      </Button>
                    )}
                    {activeStep === 2 && (
                      <Button color="primary" variant="outlined" onClick={handleNext}>
                        Next
                      </Button>
                    )}
                    {activeStep === 3 && (
                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={!formData.accept_terms}
                      >
                        Sign Up
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            )}
            {/* Placeholder for loading  - waiting on UI/UX response as to what they want. */}
            {isLoading && <Typography>Loading</Typography>}
          </form>
        </Grid>
        <Grid item xs={12} sx={{ height: '65px' }} />
      </Grid>
      {activeStep === 4 && (
        <>
          <Grid container xs={12} justifyContent="center">
            <Grid container xs={10} justifyContent="space-between">
              <Button color="primary" variant="outlined">
                Back To Home Page
              </Button>
              <Button color="primary" variant="outlined">
                View Your Profile
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ height: '30px' }} />
        </>
      )}
    </div>
  );
}

export default SignupCitizen;
