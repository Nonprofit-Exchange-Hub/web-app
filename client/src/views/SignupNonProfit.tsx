/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import * as React from 'react';
import routes from '../routes/routes';
import EmailInput from '../components/Users/Auth/EmailInput';
import StyledLink from '../components/StyledLink';
import PasswordInput from '../components/Users/Auth/PasswordInput';
import SvgSignUpContactInfoStep from '../components/Icons/SvgSignUpContactInfoStep';
import SvgSignUpLocationStep from '../components/Icons/SvgSignUpLocationStep';
import SvgSignUpfocusAreasStep from '../components/Icons/SvgSignUpFocusAreasStep';
import SvgSignUpProfileStep from '../components/Icons/SvgSignUpProfileStep';
import SvgSignUpFinishedStep from '../components/Icons/SvgSignUpFinishedStep';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { Theme } from '@mui/material/styles';
import { useEffect, useContext } from 'react';
import { ModalContext } from '../providers/ModalProvider';
import { focusAreas } from './FocusAreas';
import { makeStyles } from 'tss-react/mui';
import { UserContext } from '../providers';
import { placeholderImg } from '../assets/temp';
import { classifications } from '../components/Users/Auth/SignUpUserAndNonprofit/Classifications';
import { APP_API_BASE_URL, US_STATE_NAMES } from '../configs';
import {
  Box,
  Select,
  MenuItem,
  Avatar,
  TextField,
  OutlinedInput,
  SelectChangeEvent,
  Chip,
} from '@mui/material';

interface UserSignupData {
  organization_name: string;
  organization_phone: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  employer_identification_number: string;
  irs_classification: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  password: string;
  accept_terms?: boolean;
  email_notification_opt_out?: boolean;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  focusAreas: string[];
  bio: string;
}

const initialFormData: UserSignupData = {
  organization_name: '',
  organization_phone: '',
  street: '',
  city: '',
  state: '',
  zip_code: '',
  employer_identification_number: '',
  irs_classification: '',
  first_name: '',
  last_name: '',
  role: '',
  email: '',
  password: '',
  accept_terms: false,
  email_notification_opt_out: false,
  website: '',
  instagram: '',
  facebook: '',
  twitter: '',
  focusAreas: [],
  bio: '',
};

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

function SignupNonProfit() {
  const { classes } = useStyles();
  const [selectedChips, setSelectedChips] = React.useState<string[]>([]);
  const [disableNext, setDisableNext] = React.useState<boolean>(true);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<string>('');
  const [formData, setFormData] = React.useState(initialFormData);
  const { user, setUser } = React.useContext(UserContext);
  const modalContext = useContext(ModalContext);
  const { openModal } = modalContext;

  const makeChips = () => {
    return focusAreas.map((focusArea) => {
      return (
        <Chip
          className={classes.chip}
          label={focusArea}
          sx={{ fontSize: '16px' }}
          variant="outlined"
          onClick={() => togglefocusArea(focusArea)}
          color={selectedChips.includes(focusArea) ? 'primary' : 'default'}
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
      setSelectedChips(formData.focusAreas);
    } else {
      formData.focusAreas.push(focusArea);
      setSelectedChips(formData.focusAreas);
    }
    setFormData({ ...formData, focusAreas: formData.focusAreas });
    console.log(formData.focusAreas);
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
    nextOrNot(activeStep);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('handleChange!');
    const { name, value, checked }: { name: string; value: string; checked: boolean } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: name === 'accept_terms' ? checked : value,
      [name]: name === 'email_notification_opt_out' ? checked : value,
    }));
    nextOrNot(activeStep);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setIsLoading(true);
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

  const handleNext = () => {
    setDisableNext(true);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const nextOrNot = (step: number) => {
    if (step === 0) {
      if (
        formData.organization_name.length > 0 &&
        formData.organization_phone.length > 0 &&
        formData.street.length > 0 &&
        formData.city.length > 0 &&
        formData.state.length > 0 &&
        formData.employer_identification_number.length > 0 &&
        formData.irs_classification.length > 0
      ) {
        setDisableNext(false);
      }
    }
    if (step === 1) {
      if (
        formData.first_name.length > 0 &&
        formData.last_name.length > 0 &&
        formData.role.length > 0 &&
        formData.email.length > 0 &&
        formData.password.length > 0 &&
        !formData.accept_terms
      ) {
        setDisableNext(false);
      }
    }
    if (step === 2 || step === 3 || step === 4) {
      setDisableNext(false);
    }
  };

  useEffect(() => {
    nextOrNot(activeStep);
  });

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
          (activeStep === 2 && <SvgSignUpProfileStep height={'569px'} width={'256px'} />) ||
          (activeStep === 3 && <SvgSignUpfocusAreasStep height={'569px'} width={'256px'} />) ||
          (activeStep === 4 && <SvgSignUpProfileStep height={'569px'} width={'256px'} />) ||
          (activeStep === 5 && <SvgSignUpFinishedStep height={'569px'} width={'256px'} />)}
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
                    lineHeight="10px"
                    align="left"
                    sx={{ color: '#674E67' }}
                  >
                    Let's get started!
                  </Typography>
                  <Box display={'flex'} flexDirection={'row'} width={'100%'}>
                    <Box width={'100%'}>
                      <Typography sx={{ fontWeight: 'bold' }}>About Your Organization</Typography>
                      <Grid container item xs={12} spacing={1}>
                        <Grid item xs={7}>
                          <label>Organization Name</label>
                          <Input
                            className={classes.input}
                            type="text"
                            id="organization_name"
                            name="organization_name"
                            fullWidth
                            onChange={handleChange}
                            value={formData.organization_name}
                            disableUnderline
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <label>Phone Number</label>
                          <Input
                            className={classes.input}
                            type="text"
                            id="organization_phone"
                            name="organization_phone"
                            fullWidth
                            onChange={handleChange}
                            value={formData.organization_phone}
                            disableUnderline
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <label>Street Address</label>
                          <Input
                            className={classes.input}
                            disableUnderline
                            fullWidth
                            onChange={handleChange}
                            type="text"
                            id="street"
                            name="street"
                            value={formData.street}
                          ></Input>
                        </Grid>
                        <Grid item xs={3}>
                          <label>City</label>
                          <Input
                            className={classes.input}
                            disableUnderline
                            fullWidth
                            onChange={handleChange}
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                          ></Input>
                        </Grid>
                        <Grid item xs={2}>
                          <label>State</label>
                          <Select
                            label="state"
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
                          <label>Employer Identification Number (EIN)</label>
                          <Input
                            className={classes.input}
                            type="text"
                            id="employer_identification_number"
                            name="employer_identification_number"
                            fullWidth
                            value={formData.employer_identification_number}
                            onChange={handleChange}
                            disableUnderline
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <label>IRS Nonprofit Organization Classification</label>
                          {/* @ts-ignore */}
                          <Select
                            input={<OutlinedInput />}
                            inputProps={{ 'aria-label': 'Without label' }}
                            className={classes.input}
                            value={formData.irs_classification}
                            displayEmpty
                            fullWidth
                            type="text"
                            id="irs_classification"
                            name="irs_classification"
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
                          >
                            {classifications.map((option, index) => {
                              return (
                                <MenuItem key={option.text} value={option.text}>
                                  {option.text}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          <Typography align="left" style={{ fontSize: '14px' }}>
                            Already have an account?
                            <Typography
                              display="inline"
                              sx={{
                                fontSize: '14px',
                                padding: '4px',
                                '&:hover': {
                                  cursor: 'pointer',
                                  textDecoration: 'underline',
                                },
                              }}
                              onClick={() => openModal('SignIn')}
                            >
                              Sign In
                            </Typography>
                          </Typography>
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
                  <Typography sx={{ fontWeight: 'bold' }}>Representative Information</Typography>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={4}>
                      <label>First Name</label>
                      <FormControl fullWidth>
                        <Input
                          className={classes.input}
                          type="text"
                          id="first_name"
                          name="first_name"
                          fullWidth
                          value={formData.first_name}
                          onChange={handleChange}
                          disableUnderline
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <label>Last Name</label>
                      <FormControl fullWidth>
                        <Input
                          className={classes.input}
                          type="text"
                          id="last_name"
                          name="last_name"
                          fullWidth
                          value={formData.last_name}
                          onChange={handleChange}
                          disableUnderline
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <label>Role</label>
                      <FormControl fullWidth>
                        <Input
                          className={classes.input}
                          type="text"
                          id="role"
                          name="role"
                          fullWidth
                          value={formData.role}
                          onChange={handleChange}
                          disableUnderline
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
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
                    How can others reach you?
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>Contact Information</Typography>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <label> Website </label>
                      <FormControl fullWidth>
                        <Input
                          className={classes.input}
                          type="text"
                          id="website"
                          name="website"
                          fullWidth
                          value={formData.website}
                          onChange={handleChange}
                          disableUnderline
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <label> Instagram </label>
                      <FormControl fullWidth>
                        <Input
                          className={classes.input}
                          type="text"
                          id="instagram"
                          name="instagram"
                          fullWidth
                          value={formData.instagram}
                          onChange={handleChange}
                          disableUnderline
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <label> Facebook </label>
                      <FormControl fullWidth>
                        <Input
                          className={classes.input}
                          type="text"
                          id="facebook"
                          name="facebook"
                          fullWidth
                          value={formData.facebook}
                          onChange={handleChange}
                          disableUnderline
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <label> Twitter </label>
                      <FormControl fullWidth>
                        <Input
                          className={classes.input}
                          type="text"
                          id="twitter"
                          name="twitter"
                          fullWidth
                          value={formData.twitter}
                          onChange={handleChange}
                          disableUnderline
                          required
                        />
                      </FormControl>
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
                    Tell us about your organization's focus area(s).
                  </Typography>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        What type of work is your organization invovled with?
                      </Typography>
                      <label> Please choose one or more options</label>
                    </Grid>
                    <Grid item xs={12}>
                      {makeChips()}
                    </Grid>
                  </Grid>
                </Box>
              )}
              {activeStep === 4 && (
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
                  <label className={classes.label}> Photo </label>
                  <Typography>A logo, image, or icon that represents your organization.</Typography>
                  <Grid item xs={12} sx={{ height: '30px' }} />
                  <Grid container item xs={12} lg={6} alignItems="center">
                    <Grid item xs={3}>
                      <Avatar sx={{ bgcolor: 'gray', width: 110, height: 110 }} />
                    </Grid>
                    <Grid item xs={3} sx={{ position: 'absolute' }}>
                      <input accept="image/*" hidden id="upload-file" type="file" />
                      <label htmlFor="upload-file">
                        <Button
                          sx={{
                            backgroundColor: '#EF6A60',
                            color: 'white',
                            borderRadius: '4px',
                            padding: '10px',
                            left: '150px',
                          }}
                          color="primary"
                        >
                          Upload
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ height: '30px' }} />
                  <label className={classes.label}> About </label>
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
              {activeStep === 5 && (
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
                    {formData.first_name} {formData.last_name}
                  </Typography>
                  <Typography>{formData.email}</Typography>
                  <Typography>
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
                      activeStep === 1 || activeStep === 2 || activeStep === 3 || activeStep === 4
                        ? 'right'
                        : 'space-between',
                  }}
                >
                  {(activeStep === 0 ||
                    activeStep === 1 ||
                    activeStep === 2 ||
                    activeStep === 3 ||
                    activeStep === 4) && (
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
                    activeStep === 3 ||
                    activeStep === 4) && (
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleNext}
                      disabled={disableNext}
                    >
                      Next
                    </Button>
                  )}
                  <Box />
                </Box>
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
