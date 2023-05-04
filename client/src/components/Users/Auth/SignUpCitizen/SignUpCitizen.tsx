import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  FormControl,
  FormControlLabel,
  Input,
  Avatar,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  Typography,
} from '@mui/material';
import StyledLink from '../../../../components/StyledLink';
import routes from '../../../../routes/routes';
import { UserContext } from '../../../../providers';
import { useStyles } from './styles';
import { interests } from './interests';
import { UserSignupData } from './UserSignupData';
import { APP_API_BASE_URL, US_STATE_NAMES } from '../../../../configs';
import SignUpStep1Image from '../../../../react-svg-assets/SignUpStep1';
import SignUpStep2Image from '../../../../react-svg-assets/SignUpStep2';
import SignUpStep3Image from '../../../../react-svg-assets/SignUpStep3';
import SignUpStep4Image from '../../../../react-svg-assets/SignUpStep4';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';

const initialFormData: UserSignupData = {
  firstName: '',
  last_name: '',
  city: '',
  interests: '',
  email: '',
  password: '',
  accept_terms: false,
  email_notification_opt_out: false,
  state: '',
  zip: '',
  aboutyourself: '',
};

function SignupCitizen() {
  const { header, input, label, chip } = useStyles();
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
          sx={{ fontSize: '16px' }}
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
    <Box display={'flex'} flexDirection={'row'} justifyContent={'left'}>
      <Box
        sx={{
          backgroundColor: '#FFC958',
          borderRadius: '0 20px 20px 0',
          maxHeight: '690px',
          maxWidth: '446px',
          padding: '19px 60px 120px 130px',
        }}
      >
        {(activeStep === 0 && <SignUpStep1Image height={'569px'} width={'256px'} />) ||
          (activeStep === 1 && <SignUpStep2Image height={'569px'} width={'256px'} />) ||
          (activeStep === 2 && <SignUpStep3Image height={'569px'} width={'256px'} />) ||
          (activeStep === 3 && <SignUpStep2Image height={'569px'} width={'256px'} />) ||
          (activeStep === 4 && <SignUpStep4Image height={'569px'} width={'256px'} />)}
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          height={'690px'}
          justifyContent={'center'}
          sx={{ marginLeft: '84px', marginBottom: '78px', marginRight: '130px' }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <Box>
              {/* PAGE ONE ###########################################################*/}
              {activeStep === 0 && (
                <Box sx={{ height: '100%', minWidth: '780px' }}>
                  <Typography
                    className={header}
                    variant="h4"
                    fontSize="58px"
                    lineHeight="87px"
                    component="h1"
                    align="left"
                    sx={{ color: '#674E67' }}
                    gutterBottom
                  >
                    Let's get started
                  </Typography>
                  <Box display={'flex'} flexDirection={'row'} width={'100%'}>
                    <Box marginRight={'20px'}>
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
                    </Box>
                    <Box width={'100%'}>
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
                    </Box>
                  </Box>
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
                            "[(type = 'checkbox')]": {
                              '::before': { outline: '1px solid black' },
                            },
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
                </Box>
              )}

              {/* PAGE TWO ######################################################## */}
              {activeStep === 1 && (
                <Box sx={{ height: '100%', minWidth: '780px' }}>
                  <Typography
                    className={header}
                    variant="h4"
                    fontSize="58px"
                    component="h1"
                    align="left"
                    sx={{ color: '#674E67' }}
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
                </Box>
              )}

              {/* PAGE THREE ######################################################## */}
              {activeStep === 2 && (
                <Box sx={{ height: '100%', minWidth: '780px' }}>
                  <Typography
                    className={header}
                    variant="h4"
                    fontSize="58px"
                    component="h1"
                    align="left"
                    sx={{ color: '#674E67' }}
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
                      <label className={label}>
                        What type on nonprofits are you interested in?
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                      {makeChips()}
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* PAGE FOUR ######################################################## */}
              {activeStep === 3 && (
                <Box sx={{ height: '100%', minWidth: '780px' }}>
                  <Typography
                    className={header}
                    variant="h4"
                    fontSize="58px"
                    component="h1"
                    align="left"
                    sx={{ color: '#674E67' }}
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
                  <Grid container item xs={12} lg={6} alignItems="center">
                    <Grid item xs={3}>
                      <Avatar sx={{ bgcolor: 'gray', width: 110, height: 110 }} />
                    </Grid>
                    <Grid item xs={3}>
                      <input accept="image/*" hidden id="upload-file" type="file" />
                      <label htmlFor="upload-file">
                        <Button
                          sx={{
                            backgroundColor: '#EF6A60',
                            color: 'white',
                            borderRadius: '4px',
                            padding: '10px',
                          }}
                          color="primary"
                        >
                          Upload
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ height: '50px' }} />
                  <Typography className={label} sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    About Yourself
                  </Typography>
                  <Grid item xs={10}>
                    <TextField
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="Tell us about yourself..."
                    />
                  </Grid>
                </Box>
              )}

              {/* PAGE FIVE ######################################################## */}
              {/* SHOWN WHEN SIGNUP DONE ######################################################## */}
              {activeStep === 4 && (
                <Box sx={{ height: '100%', minWidth: '780px' }}>
                  <Typography
                    className={header}
                    variant="h4"
                    fontSize="58px"
                    component="h1"
                    align="left"
                  >
                    Sign up almost complete!
                  </Typography>
                  <Typography className={label} sx={{ fontWeight: 'bold', marginTop: '60px' }}>
                    {user && user.firstName} {user && user.last_name}
                  </Typography>
                  <Typography>{user && user.email}</Typography>
                  <Typography sx={{ marginBottom: '60px' }}>
                    <strong>Please check your e-mail</strong> to finish the identity verification
                    process. Afterwards, start contributing!
                  </Typography>
                </Box>
              )}
            </Box>
            <Box marginTop={'60px'}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: activeStep === 0 ? 'right' : 'space-between',
                }}
              >
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ display: activeStep === 0 ? 'none' : 'inherit', mr: 1 }}
                >
                  Back
                </Button>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent:
                      activeStep === 1 || activeStep === 2 || activeStep === 3
                        ? 'right'
                        : 'space-between',
                  }}
                >
                  {(activeStep === 1 || activeStep === 2 || activeStep === 3) && (
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleNext}
                      sx={{ marginRight: '20px' }}
                    >
                      Skip
                    </Button>
                  )}
                  {(activeStep === 0 ||
                    activeStep === 1 ||
                    activeStep === 2 ||
                    activeStep === 3) && (
                    <Button color="primary" variant="outlined" onClick={handleNext}>
                      Next
                    </Button>
                  )}
                  <Box />
                </Box>
                {activeStep === 4 && (
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
            </Box>
            {/* Placeholder for loading  - waiting on UI/UX response as to what they want. */}
            {isLoading && <Typography>Loading</Typography>}
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default SignupCitizen;
