import { Checkbox, FormControlLabel, makeStyles, Theme } from '@material-ui/core';
import { placeholderImg } from '../../../../assets/temp';

import { Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import StyledLink from '../../../../assets/sharedComponents/StyledLink';
import routes from '../../../../routes';

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
  accept_terms: boolean;
}

const initialState: SignupData = {
  accept_terms: false,
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
  onStepChange: (step: number) => void;
}

const Confirmation = ({ onStepChange = () => {} }: Props) => {
  const classes = useStyles();
  console.log(classes);

  return (
    <React.Fragment>
      <Formik
        initialValues={initialState}
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
          values,
          touched,
          validateForm,
          errors,
          isSubmitting,
          setFieldTouched,
        }) => (
          <form onSubmit={handleSubmit}>
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
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default Confirmation;
