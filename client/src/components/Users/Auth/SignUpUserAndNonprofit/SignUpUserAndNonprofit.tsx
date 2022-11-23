import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';

import routes from '../../../../routes';
import StyledLink from '../../../StyledLink';

import { useMutation, useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { green } from '@mui/material/colors';
import SimpleSnackbar from '../../../SimpleSnackbar';
import { calculateIsValid, validationSchema } from './validation-rules';
import { useStyles } from './styles';
import { FormData } from './FormData';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { classifications } from './Classifications';
import { httpGetValidateEin, httpPostNonprofitSignup } from './http-sing-up-nonprofit';

const defaultOrg: FormData = {
  name: '',
  doing_business_as: '',
  city: '',
  state: '',
  ein: '',
  description: '',
  website: '',
  address: '',
  phone: '',
  nonprofit_classification: '',
  firstName: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
  accept_terms: false,
  image_url: '',
  email_notification_opt_out: false,
};

const steps = [{ label: 'EIN number' }, { label: 'Contact details' }, { label: 'User info' }];

export const SignUpUserAndNonprofit = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [einStepIsValid, setEINStepIsValid] = React.useState(false);
  const [einApiValidateError, setEinApiValidateError] = React.useState('');
  const [triggerEinSearch, setTriggerEinSearch] = React.useState<boolean>(false);
  const [submitSuccessMessage, setSubmitSuccessMessage] = React.useState<string>('');
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState<string>('');
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    defaultValues: defaultOrg,
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepOneInvalid = !dirtyFields.ein || !!errors.ein || !einStepIsValid;

  const stepTwoInvalid =
    !!errors.name?.message ||
    !!errors.description?.message ||
    !!errors.address?.message ||
    !!errors.city?.message ||
    !!errors.state?.message ||
    !!errors.phone?.message ||
    !!errors.website?.message ||
    !getValues().nonprofit_classification;

  const handleEinApiValidationError = (errorResponse: Object) => {
    const res = Object.entries(errorResponse);
    const { status } = Object.fromEntries(res).response;
    switch (status) {
      case 404:
        setEinApiValidateError('Not Found');
        break;

      default:
        setEinApiValidateError('Server Error');
        break;
    }
  };

  const onSubmit = () => {
    orgSignUpMutation.mutate(getValues());
  };

  const onOrgSignUpSuccess = (): void => {
    reset();
    setSubmitSuccessMessage('Organization created successfully. Please log in');
  };

  const onOrgSignUpError = (err: any): void => {
    if (err.response.data.status === 409) {
      setSubmitErrorMessage(err.response.data.message ?? 'Unable to save');
    } else {
      setSubmitErrorMessage(`Unable to create account`);
    }
  };

  const save = (data: FormData) => {
    setSubmitErrorMessage('');
    return httpPostNonprofitSignup(data);
  };

  const orgSignUpMutation = useMutation<AxiosResponse<any, any>, AxiosError, FormData, Error>(
    (formData: FormData) => save(formData),
    {
      onSuccess: onOrgSignUpSuccess,
      onError: (err) => onOrgSignUpError(err),
    },
  );

  const orgValidateEinQuery = useQuery<
    AxiosResponse<any, any>,
    any,
    { ein: string; name: string },
    string[]
  >({
    enabled: triggerEinSearch,
    queryKey: ['orgValidateEinQuery', getValues().ein],
    queryFn: ({ queryKey }) => {
      const [, ein] = queryKey;
      return httpGetValidateEin(ein);
    },
    onSuccess: (res: any) => {
      setTriggerEinSearch(false);
      setEINStepIsValid(true);
      setValue('name', res.data.name);
    },
    onError: (res: any) => {
      setEINStepIsValid(false);
      setTriggerEinSearch(false);
      setValue('name', '');
      handleEinApiValidationError(res);
    },
    retry: 0,
  });

  return (
    <React.Fragment>
      <Grid container>
        <Grid className={classes.sideImg} item xs={5} />
        <Grid container className={classes.signUpContainer} item direction="column" xs={6}>
          <Grid item>
            <Typography
              className={classes.header}
              variant="h4"
              component="h1"
              align="left"
              gutterBottom
            >
              Let's get started.
            </Typography>
          </Grid>
          <Grid item sx={{ marginBottom: '30px' }}>
            <Typography component="p" align="left" gutterBottom>
              Already have an account? <StyledLink to={routes.Login.path}>Log In</StyledLink>
            </Typography>
          </Grid>

          <Grid item>
            {submitSuccessMessage && <SimpleSnackbar message={submitSuccessMessage} />}
            {submitErrorMessage && <SimpleSnackbar message={submitErrorMessage} />}

            <Grid container spacing={5} sx={{ marginY: '20px' }}>
              <Stepper activeStep={activeStep}>
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

            <form onSubmit={handleSubmit(onSubmit)}>
              {activeStep === 0 && (
                <Grid container spacing={5}>
                  <Grid item md={6} xs={12}>
                    <Controller
                      name="ein"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Employer Identification Number (EIN)"
                          placeholder="EIN: 99-9999999"
                          onKeyUp={() => {
                            if (!errors.ein) {
                              setTriggerEinSearch(true);
                            }
                          }}
                          error={!!errors.ein?.message}
                          helperText={errors.ein?.message ?? ''}
                        />
                      )}
                    />
                    {orgValidateEinQuery.isLoading ? (
                      <LinearProgress color="secondary" />
                    ) : (
                      <>
                        {orgValidateEinQuery.isError && (
                          <FormHelperText
                            sx={{ marginLeft: '13px' }}
                            error
                          >{`Invalid EIN ${einApiValidateError}`}</FormHelperText>
                        )}
                        {orgValidateEinQuery.isSuccess && !errors.ein && (
                          <FormHelperText>
                            <CheckIcon style={{ color: green[500] }} />
                          </FormHelperText>
                        )}
                      </>
                    )}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Legal Name"
                          placeholder="Legal Name"
                          fullWidth
                          disabled={true}
                        />
                      )}
                    />
                    {orgValidateEinQuery.isSuccess && !errors.ein && (
                      <FormHelperText>
                        <CheckIcon style={{ color: green[500] }} />
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Controller
                      name="image_url"
                      control={control}
                      defaultValue={'https://blah.png'}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Organization Profile Image"
                          placeholder="Organization Profile Image"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              )}

              {activeStep === 1 && (
                <Grid container spacing={5}>
                  <Grid item md={12} xs={12}>
                    <Controller
                      name="doing_business_as"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Organization Name"
                          placeholder="Organization"
                          helperText={
                            errors.doing_business_as?.message
                              ? errors.doing_business_as.message
                              : ''
                          }
                          error={!!errors.doing_business_as}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Organization Description"
                          placeholder="Description"
                          multiline={true}
                          helperText={errors.description?.message ? errors.description.message : ''}
                          error={!!errors.description}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Controller
                      name="address"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Address"
                          placeholder="Address"
                          multiline={true}
                          helperText={errors.address?.message ? errors.address.message : ''}
                          error={!!errors.address}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
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
                  <Grid item md={6} xs={12}>
                    <Controller
                      name="state"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="State"
                          placeholder="State"
                          helperText={errors.state ? errors.state.message : ''}
                          error={!!errors.state}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Phone"
                          placeholder="Phone"
                          error={!!errors.phone}
                          helperText={errors.phone ? errors.phone.message : ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Controller
                      name="website"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Website"
                          placeholder="Website"
                          error={!!errors.website}
                          helperText={errors.website ? errors.website.message : ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Controller
                      name="nonprofit_classification"
                      control={control}
                      render={({ field }) => (
                        <>
                          <FormLabel>IRS Nonprofit Organization Classification</FormLabel>
                          <Select
                            {...field}
                            placeholder="Select classification"
                            variant="outlined"
                            autoWidth
                            input={<OutlinedInput />}
                            inputProps={{ 'aria-label': 'Without label' }}
                            displayEmpty
                          >
                            <MenuItem disabled value="">
                              <em>Select classification</em>
                            </MenuItem>
                            {classifications.map((option, index) => {
                              return (
                                <MenuItem key={option.text} value={option.text}>
                                  {option.text}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </>
                      )}
                    />
                    <FormHelperText error>
                      {errors.nonprofit_classification
                        ? errors.nonprofit_classification.message
                        : ''}
                    </FormHelperText>
                  </Grid>
                </Grid>
              )}

              {activeStep === 2 && (
                <Grid container spacing={5}>
                  <Grid item md={6} xs={12}>
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="First Name"
                          placeholder="First Name"
                          error={!!errors.firstName}
                          helperText={errors.firstName ? errors.firstName?.message : ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Controller
                      name="last_name"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Last Name"
                          placeholder="Last Name"
                          error={!!errors.last_name}
                          helperText={errors.last_name ? errors.last_name.message : ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
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
                  <Grid item md={6} xs={12}>
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
                  <Grid item md={6} xs={12}>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      defaultValue={''}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Confirm Password"
                          placeholder="Confirm Password"
                          type="password"
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                        />
                      )}
                    />
                  </Grid>
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
                </Grid>
              )}

              <Grid container spacing={5}>
                <Grid item xs={12} sx={{ mt: 6, mb: 6 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
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
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={!calculateIsValid(errors, getValues())}
                        onClick={onSubmit}
                      >
                        Submit
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
