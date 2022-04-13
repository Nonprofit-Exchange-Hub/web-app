import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Formik } from 'formik';
import * as Yup from 'yup';

import type { Theme } from '@material-ui/core/styles';

import { placeholderImg } from '../../../assets/temp';
import StyledLink from '../../../assets/sharedComponents/StyledLink';
import { TextField, Select } from '../../../assets/sharedComponents/Forms';
import routes from '../../../routes';

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

interface SignupData {
  doing_business_as: string;
  city: string;
  state: string;
  ein: string;
  tax_exempt_id: string;
  nonprofit_classification: string;
  firstName: string;
  last_name: string;
  role_or_title: string;
  email: string;
  password: string;
  accept_terms: boolean;
  name: string;
  description: string;
  website: string;
  address: string;
  phone: string;
}

const initialFormData: SignupData = {
  doing_business_as: '',
  city: '',
  state: '',
  ein: '',
  tax_exempt_id: '',
  name: '',
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
  accept_terms: false,
};

const SignupSchema = Yup.object().shape({
  ein: Yup.string()
    .matches(/^[1-9]\d?-\d{7}$/, 'EIN must match: 99-9999999')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

function SignupNonProfit() {
  const classes = useStyles();

  const [formData] = React.useState(initialFormData);
  const [pageNum, setPageNum] = React.useState(1);

  const handleNextClick = (errors: any) => setPageNum(2);
  const handlePreviousClick = () => setPageNum(1);

  // validating completion of page 1
  // const step1Complete = formData.doing_business_as !== '' && formData.city !== '';
  // const step2Complete = formData.state !== '' && formData.ein !== '';
  // const step3Complete = formData.tax_exempt_id !== '' && formData.nonprofit_classification !== '';
  // const firstPageComplete = step1Complete && step2Complete && step3Complete;

  // validating completion of page 2
  const step4Complete = formData.firstName !== '' && formData.last_name !== '';
  const step5Complete = formData.role_or_title !== '' && formData.email !== '';
  const step6Complete = formData.password !== '' && !!formData.accept_terms;
  const secondPageComplete = step4Complete && step5Complete && step6Complete;

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

          <Formik
            initialValues={initialFormData}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                {pageNum === 1 ? (
                  <Grid container spacing={5}>
                    <Grid item>
                      <Typography component="p" align="left">
                        Step 1: About your organization
                      </Typography>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="doing_business_as"
                        label="Organization Name"
                        placeholder="Organization"
                        value={values.doing_business_as}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        id="city"
                        label="City"
                        placeholder="City"
                        value={values.city}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        id="state"
                        label="State"
                        placeholder="State"
                        value={values.state}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        id="ein"
                        label="Entity Identification Number (EIN)"
                        placeholder="EIN: 99-9999999"
                        value={values.ein}
                        onChange={handleChange}
                        errorText={errors.ein}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        id="tax_exempt_id"
                        label="Tax Exempt ID"
                        placeholder="Tax Exempt ID"
                        value={values.tax_exempt_id}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={8} xs={12}>
                      <Select
                        id="nonprofit_classification"
                        label="IRS Nonprofit Organization Classification"
                        placeholder="Select classification"
                        options={classifications}
                        value={values.nonprofit_classification}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={8} xs={12}>
                      <Button
                        onClick={() => handleNextClick(errors)}
                        disabled={!!errors.doing_business_as && !!errors.ein}
                        className={classes.button}
                        fullWidth
                      >
                        Next
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <ArrowBackIcon
                        className={classes.arrow}
                        fontSize="medium"
                        onClick={handlePreviousClick}
                      >
                        Back
                      </ArrowBackIcon>
                      <Typography component="p">Step 2: About You</Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        id="first_name"
                        label="First Name"
                        placeholder="First Name"
                        value={values.first_name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        id="last_name"
                        label="Last Name"
                        placeholder="Last Name"
                        value={values.last_name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="role_or_title"
                        label="Role Title"
                        placeholder="Role Title"
                        value={values.role_or_title}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        id="email"
                        label="Email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        id="password"
                        label="Password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
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
                    <Button
                      className={classes.button}
                      fullWidth
                      type="submit"
                      disabled={!secondPageComplete}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                )}
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SignupNonProfit;
