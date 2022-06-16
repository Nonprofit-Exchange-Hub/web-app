import {
  Button,
  Checkbox,
  ClassNameMap,
  FormControlLabel,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { TextField } from '../../../../assets/sharedComponents/Forms';
import {
  ApprovalStatus,
  Organization,
  Role,
  BaseUserEntity,
  UserOrg,
  UserOrgCreateObj,
} from '../../../../types';
import { useMutation } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import StyledLink from '../../../../assets/sharedComponents/StyledLink';
import routes from '../../../../routes';
import SimpleSnackbar from '../../../action/assets/SimpleSnackbar';
import { Redirect } from 'react-router-dom';

interface UserFormData {
  firstName: string;
  last_name: string;
  role_or_title: string;
  email: string;
  password: string;
  confirmPassword: string;
  accept_terms: boolean;
}

type UserEntityCreateObj = BaseUserEntity & {
  password: string;
};

const userOrgValidationSchema = Yup.object().shape({
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

interface Props {
  orgFromPreviousStep: Organization;
  parentUserOrg: UserOrg;
  parentUser: BaseUserEntity;
  setParentUser: (user: BaseUserEntity) => void;
  setParentUserOrg: (userOrg: UserOrg) => void;
  triggerNextStep: (step: number) => void;
  classes: ClassNameMap<'button' | 'header' | 'arrow' | 'sideImg' | 'signUpContainer'>;
}

const UserOrgForm = ({
  orgFromPreviousStep,
  triggerNextStep = () => {},
  parentUserOrg,
  parentUser,
  setParentUser = () => {},
  setParentUserOrg = () => {},
  classes,
}: Props) => {
  const [userAndOrg] = React.useState<UserFormData>({
    firstName: parentUser.firstName,
    last_name: parentUser.last_name,
    role_or_title: '',
    email: parentUser.email,
    password: '',
    confirmPassword: '',
    accept_terms: false,
  });
  const [userEntityApiErrors, setUserEntityApiErrors] = React.useState<string>('');
  const [submitSuccessMessage, setSubmitSuccessMessage] = React.useState<string>('');
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState<string>('');
  const [redirect, setRedirect] = React.useState<boolean>(false);

  const handleNext = (isValid: boolean, values: UserFormData) => {
    if (isValid) {
      userCreateMutation.mutate({
        firstName: values.firstName,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
      });
    }
  };

  const handlePreviousClick = () => {
    triggerNextStep(0);
  };

  const userCreateMutation = useMutation(
    (userCreateObj: UserEntityCreateObj) => {
      return axios.post(`http://localhost:3001/api/users`, userCreateObj);
    },
    {
      onSuccess: (data: any) => {
        onCreateUserSuccess(data);
      },
      onError: (res: any) => {
        onCreateUserError(res);
      },
    },
  );

  const onCreateUserSuccess = (data: any): void => {
    const user = data.data as BaseUserEntity;
    setParentUser({ ...user });
    userOrgCreateMutation.mutate({
      user: { id: user.id as number },
      organization: { id: orgFromPreviousStep.id as number },
      role: Role.owner,
      approvalStatus: ApprovalStatus.pending,
    });
  };

  const onCreateUserError = (res: any): void => {
    if (res.status === 409) {
      setUserEntityApiErrors(
        'User Already Exists. Log in to connect an existing user to an organization',
      );
    }
  };

  const userOrgCreateMutation = useMutation<
    AxiosResponse<any, any>,
    Error,
    UserOrgCreateObj,
    unknown
  >(
    (userOrg: UserOrgCreateObj) => {
      return axios.post(`http://localhost:3001/api/userorganizations`, userOrg);
    },
    {
      onSuccess: (data: any) => {
        onUserOrgSuccess(data);
      },
      onError: (err: any) => {
        setSubmitErrorMessage('Unable to create account');
      },
    },
  );

  const onUserOrgSuccess = (data: any): void => {
    setParentUserOrg((data as any).data);
    setSubmitSuccessMessage('Organization created successfully. Please log in');
    sessionStorage.clear();
    setTimeout(() => setRedirect(true), 5000);
  };

  if (redirect) {
    return <Redirect to={'/login'} />;
  }

  return (
    <React.Fragment>
      {submitSuccessMessage && <SimpleSnackbar message={submitSuccessMessage} />}
      {submitErrorMessage && <SimpleSnackbar message={submitErrorMessage} />}
      <Formik
        initialValues={userAndOrg}
        validationSchema={userOrgValidationSchema}
        onSubmit={() => {}}
      >
        {({ handleChange, isValid, values, touched, errors, setFieldTouched }) => (
          <form>
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

              <FormHelperText error>{userEntityApiErrors}</FormHelperText>

              <Button
                disabled={!isValid}
                onClick={() => handleNext(isValid, values)}
                className={classes.button}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default UserOrgForm;
