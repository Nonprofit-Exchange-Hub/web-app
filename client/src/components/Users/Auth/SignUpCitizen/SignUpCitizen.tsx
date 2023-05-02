import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Avatar,
  TextField,
  OutlinedInput,
  Select,
  MenuItem,
  FormLabel,
} from '@mui/material';

import FacebookAuthBtn from '../FacebookAuthBtn';
import GoogleAuthBtn from '../GoogleAuthBtn';
import StyledLink from '../../../../components/StyledLink';
import TextDivider from '../../../../components/TextDivider';
import routes from '../../../../routes/routes';
import { UserContext } from '../../../../providers';
import { useStyles } from './styles';
import { interests } from './interests';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation-rules';
import { UserSignupData } from './UserSignupData';
import { APP_API_BASE_URL, US_STATE_NAMES } from '../../../../configs';

const initialFormData: UserSignupData = {
  firstName: '',
  last_name: '',
  email: '',
  password: '',
  accept_terms: false,
  email_notification_opt_out: false,
  city: '',
  state: '',
  zip: '',
  interests: '',
  aboutyourself: '',
};

const steps = [
  { label: 'Basic Information' },
  { label: 'Personal Information' },
  { label: 'Interests' },
  { label: 'Profile' },
];

const SignupCitizen = () => {
  const { sideImg, signUpContainer, button, header, label, chip } = useStyles();
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [, setEmailError] = React.useState<string>('');
  const [formData] = React.useState(initialFormData);
  const { user, setUser } = React.useContext(UserContext);

  const {
    control,
    formState: { errors, dirtyFields },
  } = useForm<UserSignupData>({
    defaultValues: initialFormData,
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

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
  // handleNext and handleBack are also in SignUpUserAndNonProfit, refactor later
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepOneInValid =
    !dirtyFields.firstName ||
    !dirtyFields.last_name ||
    !dirtyFields.email ||
    !dirtyFields.password ||
    !dirtyFields.accept_terms ||
    !!errors.firstName ||
    !!errors.last_name ||
    !!errors.email ||
    !!errors.password ||
    !!errors.accept_terms;

  const stepTWoInValid =
    !dirtyFields.zip || !!errors.city?.message || !!errors.state?.message || !!errors.zip?.message;

  const makeStateSelectOptions = () => {
    return US_STATE_NAMES.map((state) => {
      return <MenuItem value={state}>{state}</MenuItem>;
    });
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

  return (
    <div className="SignupCitizen">
      <Grid container>
        <Grid item xs={12} sx={{ height: '60px' }} />
        <Grid className={sideImg} item xs={3} />
        <Grid item xs={1} />
        <Grid container className={signUpContainer} item direction="column" xs={7}>
          <Grid container spacing={0} justifyContent="center" sx={{ marginY: '20px' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === steps.length - 1 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>

          <form onSubmit={handleSubmit}>
            {/* PAGE ONE ###########################################################*/}
            {activeStep === 0 && (
              <>
                <Typography
                  className={header}
                  variant="h4"
                  fontSize="58px"
                  component="h1"
                  align="left"
                  gutterBottom
                >
                  Let's get started
                </Typography>
                <Grid container item sx={{ paddingBottom: '16px' }}>
                  <GoogleAuthBtn>Sign Up with Google</GoogleAuthBtn>
                  <FacebookAuthBtn>Sign Up With Facebook</FacebookAuthBtn>
                </Grid>
                <TextDivider>or</TextDivider>
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={5}>
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="First Name"
                          placeholder="First Name"
                          error={!!errors.firstName?.message} //when
                          helperText={errors.firstName?.message ?? ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      name="last_name"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Last Name"
                          placeholder="Last Name"
                          error={!!errors.last_name?.message}
                          helperText={errors.last_name?.message ?? ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          placeholder="Email"
                          error={!!errors.email}
                          helperText={errors.email ? errors.email.message : ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Password"
                          placeholder="Password"
                          type="password"
                          error={!!errors.password}
                          helperText={errors.password ? errors.password.message : ''}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container />
                <Grid item xs={12}>
                  <Controller
                    name="accept_terms"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        style={{ textAlign: 'left', display: 'block' }}
                        control={
                          <Checkbox
                            {...field}
                            color="primary"
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
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="email_notification_opt_out"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        style={{ textAlign: 'left', display: 'block' }}
                        control={
                          <Checkbox
                            {...field}
                            color="primary"
                            name="email_notification_opt_out"
                            inputProps={{ 'aria-label': 'email_notification_opt_out_checkbox' }}
                          />
                        }
                        label={<label>Opt Out Of Email Notifications </label>}
                      />
                    )}
                  />
                </Grid>
                <Typography
                  component="p"
                  align="left"
                  gutterBottom
                  sx={{ fontSize: '15px', color: '#404040', margin: '16px 0' }}
                >
                  Already have an account? <StyledLink to={routes.Login.path}>Log In</StyledLink>
                </Typography>
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
                    <Controller
                      name="city"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="City"
                          placeholder="City"
                          helperText={errors.city?.message ? errors.city?.message : ''}
                          error={!!errors.city}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <>
                          <FormLabel>State</FormLabel>
                          <Select
                            {...field}
                            placeholder="Select state"
                            variant="outlined"
                            autoWidth
                            input={<OutlinedInput />}
                            inputProps={{ 'aria-label': 'Without label' }}
                            displayEmpty
                          >
                            <MenuItem disabled value="">
                              <em>Select state</em>
                            </MenuItem>
                            {makeStateSelectOptions()}
                          </Select>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Controller
                      name="zip"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Zip"
                          placeholder="Zip"
                          helperText={errors.zip?.message ? errors.zip?.message : ''}
                          error={!!errors.zip}
                        />
                      )}
                    />
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
                  <Controller
                    name="aboutyourself"
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Tell us about yourself"
                        placeholder="Tell us about yourself..."
                        error={!!errors.aboutyourself}
                        helperText={errors.aboutyourself ? errors.aboutyourself.message : ''}
                        multiline
                        rows={4}
                        fullWidth
                      />
                    )}
                  />
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
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button
                      color="primary"
                      variant="outlined"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box />
                    {activeStep === 0 && (
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleNext}
                        disabled={stepOneInValid}
                      >
                        Next
                      </Button>
                    )}
                    {activeStep === 1 && (
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleNext}
                        disabled={stepTWoInValid}
                      >
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
                        // disabled={!formData.accept_terms}
                        onClick={handleSubmit}
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
};

export default SignupCitizen;
