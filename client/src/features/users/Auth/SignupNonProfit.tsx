import * as React from 'react';
import { Button, Checkbox, FormControlLabel, FormHelperText, LinearProgress } from '@mui/material';
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
import axios, { AxiosResponse } from 'axios';
import { green } from '@mui/material/colors';

/**
 *
 * !Possible multi-step single form:
 * !https://piyushsinha.tech/multi-step-form-with-react-and-formik
 */

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
  role_or_title: string;
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
  role_or_title: '',
  email: '',
  password: '',
  confirmPassword: '',
  accept_terms: false,
};

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
  //
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
  // const labels = ['First Step', 'Second Step'];
  // const [activeStep, setActiveStep] = React.useState<number>(0);
  const [org, setOrg] = React.useState<FormData>(
    (JSON.parse(sessionStorage.getItem('org') as string) as FormData) ?? defaultOrg,
  );
  // const [user, setUser] = React.useState<BaseUserEntity>(
  //   (JSON.parse(sessionStorage.getItem('user') as string) as BaseUserEntity) ?? defaultUser,
  // );

  // const [userOrg, setUserOrg] = React.useState<UserOrg>(
  //   JSON.parse(sessionStorage.getItem('org') as string) as UserOrg,
  // );

  const [triggerEinSearch, setTriggerEinSearch] = React.useState<boolean>(false);

  const devNull = () => {};

  const handleSubmit = (values: FormData) => {
    sessionStorage.setItem('org', JSON.stringify(values));
    orgCreateMutation.mutate({ ...values, name: org.name });
  };

  const orgCreateMutation = useMutation<AxiosResponse<any, any>, Error, FormData, Error>(
    (formData: FormData) => {
      const { email, password, firstName, last_name } = formData;
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
      } = formData;
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
    },
    {
      onSuccess: (data: any) => {
        // triggerNextStep(1);
        // setParentOrg((data as any).data);
      },
    },
  );

  const orgValidateEinQuery = useQuery<
    AxiosResponse<any, any>,
    unknown,
    { ein: string; name: string },
    string[]
  >({
    enabled: triggerEinSearch,
    queryKey: ['orgValidateEinQuery', org.ein],
    queryFn: ({ queryKey }) => {
      const [, ein] = queryKey;
      return axios.get(`http://localhost:3001/api/organizations/ein/${ein}`);
    },
    onSuccess: (res: any) => {
      setTriggerEinSearch(false);
      setOrg({ ...org, name: res.data.name });
    },
    onError: (res: any) => {
      setOrg({ ...org, name: '' });
    },
    retry: 0,
  });

  // const handleSteps = (step: number) => {
  //   switch (step) {
  //     case 0:
  //       return (
  //         <CreateOrgForm
  //           parentOrg={org}
  //           setParentOrg={onChildSetParentOrg}
  //           triggerNextStep={setActiveStep}
  //           classes={classes}
  //         />
  //       );
  //     case 1:
  //       return (
  //         <UserOrgForm
  //           orgFromPreviousStep={org}
  //           parentUser={user}
  //           parentUserOrg={userOrg}
  //           setParentUser={onChildSetParentUser}
  //           setParentUserOrg={onChildSetParentUserOrg}
  //           triggerNextStep={setActiveStep}
  //           classes={classes}
  //         />
  //       );
  //     default:
  //       throw new Error('Unknown step');
  //   }
  // };

  return (
    <React.Fragment>
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

          {/* <Stepper activeStep={activeStep} alternativeLabel>
            {labels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
          {/* {handleSteps(activeStep)} */}

          <Formik initialValues={org} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              setFieldTouched,
              setFieldValue,
              isValid,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item md={12} xs={12}>
                    <Typography component="p" align="left">
                      Step 1: About your organization
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="ein"
                      label="Employer Identification Number (EIN)"
                      placeholder="EIN: 99-9999999"
                      value={values.ein}
                      onChange={handleChange}
                      onKeyUp={() => {
                        setFieldValue('ein', values.ein.trim());
                        setOrg({ ...values, name: '' });
                        if (!errors.ein) {
                          setTriggerEinSearch(true);
                          setOrg({ ...values });
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
                          <FormHelperText error>{`Invalid EIN ${
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
                      value={org.name}
                      disabled={true}
                      onChange={devNull}
                    />
                    {orgValidateEinQuery.isSuccess && !errors.ein && (
                      <FormHelperText>
                        <CheckIcon style={{ color: green[500] }} />
                      </FormHelperText>
                    )}
                  </Grid>
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
                  {/* <Grid item md={12} xs={12}>
                    <Button
                      onClick={() => handleNext(values)}
                      disabled={!isValid || orgValidateEinQuery.isLoading || !org.name}
                      className={classes.button}
                      fullWidth
                    >
                      Next
                    </Button>
                  </Grid> */}
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
                      id="role_or_title"
                      label="Role Title"
                      placeholder="Role Title"
                      value={values.role_or_title}
                      onChange={handleChange}
                      onBlur={(e) => setFieldTouched('role_or_title')}
                      errorText={
                        touched.role_or_title && errors.role_or_title ? errors.role_or_title : ''
                      }
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

                  {/* <FormHelperText error>{userEntityApiErrors}</FormHelperText> */}
                  <Button disabled={!isValid} type="submit" className={classes.button} fullWidth>
                    Submit
                  </Button>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SignupNonProfit;
