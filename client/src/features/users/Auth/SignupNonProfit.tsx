import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import CheckIcon from '@mui/icons-material/Check';

import type { Theme } from '@mui/material/styles';

import { placeholderImg } from '../../../assets/temp';
import StyledLink from '../../../assets/sharedComponents/StyledLink';
import routes from '../../../routes';
import { Select, TextField } from '../../../assets/sharedComponents/Forms';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { green } from '@mui/material/colors';
import { Redirect } from 'react-router-dom';
import SimpleSnackbar from '../../action/assets/SimpleSnackbar';

const classifications = [
  { value: 'charitable', text: 'Charitable Organization' },
  { value: 'religious', text: 'Religious Organization' },
  { value: 'private', text: 'Private Foundation' },
  { value: 'political', text: 'Political Organizations' },
  { value: 'other', text: 'Other' },
];

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
  arrow: { cursor: 'pointer' },
}));

interface FormData {
  name: string;
  doing_business_as: string;
  city: string;
  state: string;
  ein: string;
  description: string;
  website: string;
  address: string;
  phone: string;
  nonprofit_classification: string;
  firstName: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  accept_terms: boolean;
}

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
};

const steps = [{ label: 'EIN number' }, { label: 'Contact details' }, { label: 'User info' }];

const validationSchema = Yup.object().shape({
  doing_business_as: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required').min(2).max(2),
  ein: Yup.string()
    .matches(/^[0-9]\d?-\d{7}$/, 'EIN must match: 99-9999999')
    .required('Required'),
  name: Yup.string(),
  description: Yup.string().required('Required'),
  website: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  phone: Yup.string()
    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'EIN must match: 99-9999999')
    .required('Required'),
  nonprofit_classification: Yup.string().min(2).required('Required'),
  firstName: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  role_or_title: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  accept_terms: Yup.boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
});

function SignupNonProfit() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [einStepIsValid, seteinStepIsValid] = React.useState(false);
  const [formDataValues, setFormDataValues] = React.useState<FormData>(defaultOrg);
  const [triggerEinSearch, setTriggerEinSearch] = React.useState<boolean>(false);
  const [submitSuccessMessage, setSubmitSuccessMessage] = React.useState<string>('');
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState<string>('');
  const [redirect, setRedirect] = React.useState<boolean>(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const devNull = () => {};

  const handleSubmit = (values: FormData) => {
    orgSignUpMutation.mutate({ ...values, name: formDataValues.name });
  };

  const onOrgSignUpSuccess = (): void => {
    setSubmitSuccessMessage('Organization created successfully. Please log in');
    setTimeout(() => setRedirect(true), 5000);
  };

  const onOrgSignUpError = (err: any): void => {
    if (err.response.data.status === 409) {
      setSubmitErrorMessage(err.response.data.message ?? 'Unable to save');
    } else {
      setSubmitErrorMessage(`Unable to create account`);
    }
  };

  const apiPostFormData = (data: FormData) => {
    setSubmitErrorMessage('');
    const { email, password, firstName, last_name } = data;
    const {
      name,
      doing_business_as,
      description,
      website,
      address,
      phone,
      city,
      state,
      ein,
      nonprofit_classification,
    } = data;
    const user = {
      email,
      password,
      firstName,
      last_name,
    };
    const organization = {
      name,
      doing_business_as,
      description,
      website,
      address,
      phone,
      city,
      state,
      ein,
      nonprofit_classification,
    };
    return axios.post(`http://localhost:3001/api/userOrganizations`, { organization, user });
  };

  const orgSignUpMutation = useMutation<AxiosResponse<any, any>, AxiosError, FormData, Error>(
    (formData: FormData) => {
      return apiPostFormData(formData);
    },
    {
      onSuccess: onOrgSignUpSuccess,
      onError: (err) => onOrgSignUpError(err),
    },
  );

  const orgValidateEinQuery = useQuery<
    AxiosResponse<any, any>,
    unknown,
    { ein: string; name: string },
    string[]
  >({
    enabled: triggerEinSearch,
    queryKey: ['orgValidateEinQuery', formDataValues.ein],
    queryFn: ({ queryKey }) => {
      const [, ein] = queryKey;
      return axios.get(`http://localhost:3001/api/organizations/ein/${ein}`);
    },
    onSuccess: (res: any) => {
      setTriggerEinSearch(false);
      seteinStepIsValid(true);
      setFormDataValues({ ...formDataValues, name: res.data.name });
    },
    onError: (res: any) => {
      seteinStepIsValid(false);
      setFormDataValues({ ...formDataValues, name: '' });
    },
    retry: 0,
  });

  if (redirect) {
    return <Redirect to={'/login'} />;
  }

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
            <Formik
              initialValues={formDataValues}
              validationSchema={validationSchema}
              onSubmit={devNull}
            >
              {({
                handleChange,
                values,
                touched,
                errors,
                setFieldTouched,
                setFieldValue,
                isValid,
              }) => (
                <form>
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
                  {activeStep === 0 && (
                    <Grid container spacing={5}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="ein"
                          label="Employer Identification Number (EIN)"
                          placeholder="EIN: 99-9999999"
                          value={values.ein}
                          onChange={handleChange}
                          onKeyUp={() => {
                            setFieldValue('ein', values.ein.trim());
                            setFormDataValues({ ...values, name: '' });
                            if (!errors.ein) {
                              setTriggerEinSearch(true);
                              setFormDataValues({ ...values });
                            }
                          }}
                          onBlur={(e) => setFieldTouched('ein')}
                          errorText={touched.ein && errors.ein ? errors.ein : ''}
                        />
                        {orgValidateEinQuery.isLoading ? (
                          <LinearProgress color="secondary" />
                        ) : (
                          <>
                            {orgValidateEinQuery.isError && (
                              <FormHelperText sx={{ marginLeft: '13px' }} error>{`Invalid EIN ${
                                orgValidateEinQuery.error === 404 ? ': Not found' : ''
                              }`}</FormHelperText>
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
                        <TextField
                          id="name"
                          label="Legal Name"
                          placeholder="Legal Name"
                          value={formDataValues.name}
                          disabled={true}
                          onChange={devNull}
                        />
                        {orgValidateEinQuery.isSuccess && !errors.ein && (
                          <FormHelperText>
                            <CheckIcon style={{ color: green[500] }} />
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  )}
                  {activeStep === 1 && (
                    <Grid container spacing={5}>
                      <Grid item md={12} xs={12}>
                        <TextField
                          id="doing_business_as"
                          label="Organization Name"
                          placeholder="Organization"
                          value={values.doing_business_as}
                          onChange={handleChange}
                          onBlur={(e) => setFieldTouched('doing_business_as')}
                          errorText={
                            touched.doing_business_as && errors.doing_business_as
                              ? errors.doing_business_as
                              : ''
                          }
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          id="description"
                          label="Organization Description"
                          placeholder="Description"
                          isMultiline={true}
                          value={values.description}
                          onChange={handleChange}
                          onBlur={(e) => setFieldTouched('description')}
                          errorText={
                            touched.description && errors.description ? errors.description : ''
                          }
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          id="address"
                          label="Address"
                          placeholder="Address"
                          isMultiline={true}
                          value={values.address}
                          onChange={handleChange}
                          onBlur={(e) => setFieldTouched('address')}
                          errorText={touched.address && errors.address ? errors.address : ''}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="city"
                          label="City"
                          placeholder="City"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={(e) => setFieldTouched('city')}
                          errorText={touched.city && errors.city ? errors.city : ''}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="state"
                          label="State"
                          placeholder="State"
                          value={values.state}
                          onChange={handleChange}
                          onBlur={(e) => setFieldTouched('state')}
                          errorText={touched.state && errors.state ? errors.state : ''}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="phone"
                          label="Phone"
                          placeholder="Phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={(e) => setFieldTouched('phone')}
                          errorText={touched.phone && errors.phone ? errors.phone : ''}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="website"
                          label="Website"
                          placeholder="Website"
                          value={values.website}
                          onChange={handleChange}
                          onBlur={(e) => setFieldTouched('website')}
                          errorText={touched.website && errors.website ? errors.website : ''}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Select
                          id="nonprofit_classification"
                          label="IRS Nonprofit Organization Classification"
                          placeholder="Select classification"
                          options={classifications}
                          value={values.nonprofit_classification}
                          onChange={handleChange}
                        />
                        <FormHelperText error>
                          {errors.nonprofit_classification ? errors.nonprofit_classification : ''}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  )}
                  {activeStep === 2 && (
                    <Grid container spacing={5}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="firstName"
                          label="First Name"
                          placeholder="First Name"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={(e) => setFieldTouched('firstName')}
                          errorText={touched.firstName ? errors.firstName : ''}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="last_name"
                          label="Last Name"
                          placeholder="Last Name"
                          value={values.last_name}
                          onChange={handleChange}
                          onBlur={(e) => setFieldTouched('last_name')}
                          errorText={touched.last_name && errors.last_name ? errors.last_name : ''}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          id="email"
                          label="Email"
                          placeholder="Email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={(e) => setFieldTouched('email')}
                          errorText={touched.email && errors.email ? errors.email : ''}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="password"
                          label="Password"
                          placeholder="Password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={(e) => setFieldTouched('password')}
                          errorText={touched.password && errors.password ? errors.password : ''}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="confirmPassword"
                          label="Confirm Password"
                          placeholder="Confirm Password"
                          type="password"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={(e) => setFieldTouched('confirmPassword')}
                          errorText={
                            touched.password && errors.confirmPassword ? errors.confirmPassword : ''
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          style={{ textAlign: 'left', display: 'block' }}
                          control={
                            <Checkbox
                              color="primary"
                              checked={values.accept_terms}
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
                            disabled={!!errors.ein || !einStepIsValid}
                          >
                            Next
                          </Button>
                        )}
                        {activeStep === 1 && (
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={handleNext}
                            disabled={
                              (!!touched.name && !!errors.name) ||
                              (!!touched.description && !!errors.description) ||
                              (!!touched.address && !!errors.address) ||
                              (!!touched.city && !!errors.city) ||
                              (!!touched.state && !!errors.state) ||
                              (!!touched.phone && !!errors.phone) ||
                              (!!touched.website && !!errors.website) ||
                              (!!touched.nonprofit_classification &&
                                !!errors.nonprofit_classification)
                            }
                          >
                            Next
                          </Button>
                        )}
                        {activeStep === 2 && (
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => handleSubmit(values)}
                            disabled={
                              !isValid &&
                              ((!!touched.firstName && !!errors.firstName) ||
                                (!!touched.last_name && !!errors.last_name) ||
                                (!!touched.email && !!errors.email) ||
                                (!!touched.password && !!errors.password) ||
                                (!!touched.confirmPassword && !!errors.confirmPassword) ||
                                !!errors.accept_terms)
                            }
                          >
                            Submit
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SignupNonProfit;
