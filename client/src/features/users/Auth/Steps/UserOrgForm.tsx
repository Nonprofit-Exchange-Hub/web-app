import { Button, FormHelperText, Grid, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { TextField } from '../../../../assets/sharedComponents/Forms';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

interface UserAndOrg {
  firstName: string;
  last_name: string;
  role_or_title: string;
  email: string;
  password: string;
}

const initialUserOrg: UserAndOrg = {
  firstName: 'first4',
  last_name: 'last4',
  role_or_title: 'Primary',
  email: 'blah@blah.com',
  password: 'Secret1234%',
};

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  role_or_title: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('Required'),
});

interface Props {
  orgId: number;
  triggerNextStep: (step: number) => void;
  classes: ClassNameMap<any>;
}

const UserOrgForm = ({ orgId, triggerNextStep = () => {}, classes }: Props) => {
  const [userEntityApiErrors, setUserEntityApiErrors] = React.useState<string>('');

  const handleNext = (isValid: boolean, errors: FormikErrors<UserAndOrg>, values: UserAndOrg) => {
    console.log(values, 'values');
    if (isValid) {
      stageHttpCalls(values, () => triggerNextStep(2));
    }
  };

  const handlePreviousClick = () => {
    triggerNextStep(0);
  };

  const stageHttpCalls = (userAndOrg: UserAndOrg, afterSuccess: () => void) => {
    createUser(userAndOrg)
      .then((res) =>
        res.status === 409
          ? setUserEntityApiErrors(
              'User Already Exists. Log in to connect an existing user to an organization',
            )
          : res.json(),
      )
      .then((data) => {
        createUserOrg(data.id, userAndOrg).then((res) => console.log(res));
        afterSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createUser = (userAndOrg: UserAndOrg) => {
    return fetch(`http://localhost:3001/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: userAndOrg.email,
        firstName: userAndOrg.firstName,
        last_name: userAndOrg.last_name,
        password: userAndOrg.password,
      }),
    });
  };

  const createUserOrg = (createdUserId: number, userAndOrg: UserAndOrg) => {
    return fetch(`http://localhost:3001/api/userorganizations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        user: {
          id: createdUserId,
        },
        organization: {
          id: orgId,
        },
        role: 'OWNER',
      }),
    });
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialUserOrg}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          isValid,
          values,
          touched,
          validateForm,
          errors,
          isSubmitting,
          setFieldTouched,
        }) => (
          <form onSubmit={handleSubmit}>
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
                  id="firstName"
                  label="First Name"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
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
                  errorText={errors.last_name}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  id="role_or_title"
                  label="Role Title"
                  placeholder="Role Title"
                  value={values.role_or_title}
                  onChange={handleChange}
                  errorText={errors.role_or_title}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  errorText={errors.email}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id="password"
                  label="Password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  errorText={errors.password}
                />
              </Grid>
              {/* <FormControlLabel
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
              /> */}

              <FormHelperText error>{userEntityApiErrors}</FormHelperText>

              <Button
                onClick={() => handleNext(isValid, errors, values)}
                // disabled={!!errors.doing_business_as && !!errors.ein}
                className={classes.button}
                fullWidth
              >
                Next
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default UserOrgForm;
