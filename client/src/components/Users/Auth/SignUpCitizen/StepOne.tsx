import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, Typography, FormControlLabel } from '@mui/material';
import { string, ValidationError } from 'yup';

import StyledLink from '../../../../components/StyledLink';
import routes from '../../../../routes/routes';
import PasswordInput from '../PasswordInput';
import EmailInput from '../EmailInput';
import NameInput from '../NameInput';

import { useStyles } from './styles';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  acceptTerms: false,
};

const validation = {
  firstName: {
    isValid: (value: string | undefined) => {
      const rule = string().required();
      return rule.isValidSync(value);
    },
  },
  lastName: {
    isValid: (value: string | undefined) => {
      const rule = string().required();
      return rule.isValidSync(value);
    },
  },
  email: {
    isValid: (value: string | undefined) => {
      const rule = string().email().required();
      return rule.isValidSync(value);
    },
  },
  password: {
    isValid: (value: string | undefined) => {
      const rule = string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required('Required');
      try {
        return rule.validateSync(value);
      } catch (error) {
        if (error instanceof ValidationError) {
          return error.message;
        }
      }
    },
  },
  passwordConfirm: {
    isValid: (value: string | undefined) => {
      const rule = string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required('Required');
      return rule.isValidSync(value);
    },
  },
  acceptTerms: {
    isValid: (value: boolean) => {
      return value;
    },
  },
};

interface StepOneType {
  handleNext: () => void;
}

export default function StepOne({ handleNext }: StepOneType) {
  const { classes } = useStyles();

  const [formData, setFormData] = useState(initialFormData);
  const [nextDisabled, setNextDisabled] = React.useState(true);
  const [emailError, setEmailError] = React.useState<string>('');
  const [firstNameError, setFirstNameError] = React.useState(null);
  const [lastNameError, setLastNameError] = React.useState(null);

  useEffect(() => {
    // yup validation
  }, [formData]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked }: { name: string; value: string; checked: boolean } = evt.target;
    setFormData((fData) => {
      return {
        ...fData,
        [name]: name === 'acceptTerms' ? checked : value,
      };
    });
    setEmailError('test');
    setNextDisabled(true);
  };

  const handleBlur = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    // const { name }: { name: string } = evt.target;
    console.log(evt.target);
    setFirstNameError(null);
    setLastNameError(null);
  };

  console.log(validation.password.isValid(''));

  return (
    <>
      <Box component="form" sx={{ height: '100%', width: '100%' }}>
        <Typography
          sx={{ color: '#674E67' }}
          className={classes.header}
          lineHeight="87px"
          fontSize="58px"
          component="h1"
          align="left"
          variant="h4"
          gutterBottom
        >
          Let's get started
        </Typography>
        <Box display={'flex'} flexDirection={'row'} width={'100%'}>
          <Box marginRight={'20px'}>
            <NameInput
              id="firstName"
              name="firstName"
              label="First Name"
              placeholder="Jane"
              onChange={handleChange}
              value={formData.firstName}
              error={firstNameError}
              onBlur={handleBlur}
            />
          </Box>
          <Box width={'100%'}>
            <NameInput
              id="lastName"
              name="lastName"
              label="Last Name"
              placeholder="Dosis"
              onChange={handleChange}
              value={formData.lastName}
              error={lastNameError}
              onBlur={handleBlur}
            />
          </Box>
        </Box>
        <EmailInput
          value={formData.email}
          placeholder="jane@citizen.com"
          onChange={handleChange}
          showStartAdornment={true}
          error={emailError}
        />
        <PasswordInput
          id="password"
          value={formData.password}
          showStartAdornment={true}
          onChange={handleChange}
          error="true"
        />
        <PasswordInput
          id="passwordConfirm"
          label="Confirm Password"
          value={formData.passwordConfirm}
          showStartAdornment={true}
          onChange={handleChange}
        />
        <FormControlLabel
          style={{
            textAlign: 'left',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
          }}
          control={
            <Checkbox
              color="primary"
              checked={formData.acceptTerms}
              onChange={handleChange}
              name="acceptTerms"
              inputProps={{ 'aria-label': 'accept_terms_checkbox' }}
              sx={{
                input: {
                  "[(type = 'checkbox')]": {
                    '::before': { outline: '1px solid black' },
                  },
                },
              }}
            />
          }
          label={
            <label>
              Accept the{' '}
              <StyledLink to={routes.TermsOfService.path} target="_blank">
                Terms and Agreements
              </StyledLink>
            </label>
          }
        />
      </Box>
      <Box>
        <Button color="primary" variant="outlined" onClick={handleNext} disabled={nextDisabled}>
          Next
        </Button>
      </Box>
    </>
  );
}
