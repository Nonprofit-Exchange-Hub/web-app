/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// import { SignUpUserAndNonprofit } from '../components/Users/Auth/SignUpUserAndNonprofit/SignUpUserAndNonprofit';
// function SignupNonProfit() {
//   return <SignUpUserAndNonprofit />;
// }
// export default SignupNonProfit;

import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { makeStyles } from 'tss-react/mui';
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
import routes from '../routes/routes';
import { UserContext } from '../providers';
import { APP_API_BASE_URL, US_STATE_NAMES } from '../configs';
import { Controller, useForm } from 'react-hook-form';
import { classifications } from '../components/Users/Auth/SignUpUserAndNonprofit/Classifications';
import SvgSignUpContactInfoStep from '../components/Icons/SvgSignUpContactInfoStep';
import SvgSignUpLocationStep from '../components/Icons/SvgSignUpLocationStep';
import SvgSignUpfocusAreasStep from '../components/Icons/SvgSignUpFocusAreasStep';
import SvgSignUpProfileStep from '../components/Icons/SvgSignUpProfileStep';
import SvgSignUpFinishedStep from '../components/Icons/SvgSignUpFinishedStep';
import { focusAreas } from './focusAreas';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  Avatar,
  TextField,
  OutlinedInput,
  InputLabel,
  SelectChangeEvent,
  Chip,
} from '@mui/material';

const useStyles = makeStyles()((theme: Theme) => ({
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
  state: string;
  city: string;
  focusAreas: string[];
  role: string;
  zip_code: string;
  bio: string;
  email: string;
  password: string;
  accept_terms?: boolean;
  email_notification_opt_out?: boolean;
}

const initialFormData: UserSignupData = {
  firstName: '',
  last_name: '',
  city: '',
  focusAreas: [],
  role: '',
  email: '',
  password: '',
  accept_terms: false,
  email_notification_opt_out: false,
  state: '',
  zip_code: '',
  bio: '',
};

function SignupNonProfit() {
  const { classes } = useStyles();
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<string>('');
  const [formData, setFormData] = React.useState(initialFormData);
  const { user, setUser } = React.useContext(UserContext);
  const { control } = useForm();
  const steps = [
    { label: 'Basic Information' },
    { label: 'Representative' },
    { label: 'Organization' },
    { label: 'Profile' },
  ];

  const makeChips = () => {
    return focusAreas.map((focusArea) => {
      // TODO: toggle chip style when focusArea is chosen
      return (
        <Chip
          className={classes.chip}
          label={focusArea}
          sx={{ fontSize: '16px' }}
          variant="outlined"
          onClick={() => togglefocusArea(focusArea)}
        />
      );
    });
  };

  const togglefocusArea = (focusArea: string): void => {
    const existingfocusAreaIdx = formData.focusAreas.findIndex(
      (existingfocusArea) => existingfocusArea === focusArea,
    );

    if (existingfocusAreaIdx !== -1) {
      formData.focusAreas.splice(existingfocusAreaIdx, 1);
    } else {
      formData.focusAreas.push(focusArea);
    }

    setFormData({ ...formData, focusAreas: formData.focusAreas });
  };

  const makeStateSelectOptions = () => {
    return US_STATE_NAMES.map((state) => {
      return <MenuItem value={state}>{state}</MenuItem>;
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode): void => {
    const { name, value }: { name: string; value: string } = event.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

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
        {(activeStep === 0 && <SvgSignUpContactInfoStep height={'569px'} width={'256px'} />) ||
          (activeStep === 1 && <SvgSignUpLocationStep height={'569px'} width={'256px'} />) ||
          (activeStep === 2 && <SvgSignUpfocusAreasStep height={'569px'} width={'256px'} />) ||
          (activeStep === 3 && <SvgSignUpProfileStep height={'569px'} width={'256px'} />) ||
          (activeStep === 4 && <SvgSignUpFinishedStep height={'569px'} width={'256px'} />)}
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
              {activeStep === 0 && (
                <Box sx={{ height: '100%', minWidth: '780px' }}>
                  <Typography
                    className={classes.header}
                    variant="h4"
                    fontSize="40px"
                    lineHeight="87px"
                    component="h1"
                    align="left"
                    sx={{ color: '#674E67' }}
                    gutterBottom
                  >
                    Let's get started!
                  </Typography>
                  <Box display={'flex'} flexDirection={'row'} width={'100%'}>
                    <Box width={'100%'}>
                      <label className={classes.label}> About Your Organization</label>
                      <Grid container item xs={12} spacing={2}>
                        <Grid item xs={12}>
                          <InputLabel id="state-select">Organization Name</InputLabel>
                          <FormControl fullWidth>
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
                        <Grid item xs={6}>
                          <InputLabel id="city-select">City</InputLabel>
                          <Input
                            className={classes.input}
                            placeholder="city"
                            disableUnderline
                            fullWidth
                            onChange={handleChange}
                            name="city"
                          ></Input>
                        </Grid>
                        <Grid item xs={6}>
                          <InputLabel id="state-select">State</InputLabel>
                          <Select
                            label="State"
                            className={classes.input}
                            displayEmpty
                            fullWidth
                            onChange={handleSelectChange}
                            sx={{ marginTop: '10px', border: '1px solid' }}
                            MenuProps={{
                              anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
                              sx: {
                                borderRadius: '10px',
                                padding: '20px',
                                height: '240px',
                              },
                            }}
                            name="state"
                            value={formData.state}
                          >
                            {makeStateSelectOptions()}
                          </Select>
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel id="employer-identification-number">
                            Employer Identification Number (EIN)
                          </InputLabel>
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
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel id="irs-nonprofit-organization-classfication">
                            IRS Nonprofit Organization Classification
                          </InputLabel>
                          <Select
                            placeholder="Select classification"
                            variant="outlined"
                            autoWidth
                            input={<OutlinedInput />}
                            inputProps={{ 'aria-label': 'Without label' }}
                            displayEmpty
                          >
                            <MenuItem disabled value="">
                              <em>Select Classification</em>
                            </MenuItem>
                            {classifications.map((option, index) => {
                              return (
                                <MenuItem key={option.text} value={option.text}>
                                  {option.text}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              )}
              {activeStep === 1 && (
                <Box sx={{ height: '100%', minWidth: '780px' }}>
                  <Typography
                    className={classes.header}
                    variant="h4"
                    fontSize="40px"
                    component="h1"
                    align="left"
                    sx={{ color: '#674E67' }}
                  >
                    Tell us about yourself.
                  </Typography>
                  <label className={classes.label}> Representative Information </label>
                  <Grid item xs={12} sx={{ height: '50px' }} />
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <InputLabel id="state-select">First Name</InputLabel>
                      <FormControl fullWidth>
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
                    <Grid item xs={6}>
                      <InputLabel id="state-select">Last Name</InputLabel>
                      <FormControl fullWidth>
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
                    <Grid item xs={12}>
                      <InputLabel id="state-select">Role/Position</InputLabel>
                      <FormControl fullWidth>
                        <Input
                          className={classes.input}
                          type="text"
                          id="role_position"
                          name="role_position"
                          fullWidth
                          value={formData.last_name}
                          onChange={handleChange}
                          disableUnderline
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <EmailInput
                        value={formData.email}
                        placeholder="Organization Email"
                        onChange={handleChange}
                        showStartAdornment={true}
                        error={emailError}
                      />
                      <PasswordInput
                        value={formData.password}
                        onChange={handleChange}
                        showStartAdornment={true}
                      />
                    </Grid>
                    <FormControlLabel
                      style={{
                        textAlign: 'left',
                        display: 'block',
                      }}
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
                  </Grid>
                </Box>
              )}
              {activeStep === 2 && (
                <Box sx={{ height: '100%', minWidth: '780px' }}>
                  <Typography
                    className={classes.header}
                    variant="h4"
                    fontSize="40px"
                    component="h1"
                    align="left"
                    sx={{ color: '#674E67' }}
                  >
                    Tell us about your focus area.
                  </Typography>
                  <Grid item xs={12} sx={{ height: '50px' }} />
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12}>
                      <label className={classes.label}>
                        What type of work is your organization invovled with?
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                      {makeChips()}
                    </Grid>
                  </Grid>
                </Box>
              )}
              {activeStep === 3 && (
                <Box sx={{ height: '100%', minWidth: '780px' }}>
                  <Typography
                    className={classes.header}
                    variant="h4"
                    fontSize="40px"
                    component="h1"
                    align="left"
                    sx={{ color: '#674E67' }}
                  >
                    Finalize your organization's profile.
                  </Typography>
                  <Typography className={classes.label} sx={{ fontWeight: 'bold' }}>
                    Photo
                  </Typography>
                  <Typography>A logo, image, or icon that represents your organization.</Typography>
                  <Grid item xs={12} sx={{ height: '10px' }} />
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
                  <Typography
                    className={classes.label}
                    sx={{ fontWeight: 'bold', marginBottom: '10px' }}
                  >
                    About
                  </Typography>
                  <Typography>A summary about your organization at a glance.</Typography>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="Tell us about your organization..."
                      name="bio"
                      onChange={handleChange}
                    />
                  </Grid>
                </Box>
              )}
              {activeStep === 4 && (
                <Box sx={{ height: '100%', minWidth: '780px' }}>
                  <Typography
                    className={classes.header}
                    variant="h4"
                    fontSize="58px"
                    component="h1"
                    align="left"
                  >
                    Sign up almost complete!
                  </Typography>
                  <Typography
                    className={classes.label}
                    sx={{ fontWeight: 'bold', marginTop: '60px' }}
                  >
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
            {isLoading && <Typography>Loading</Typography>}
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default SignupNonProfit;
