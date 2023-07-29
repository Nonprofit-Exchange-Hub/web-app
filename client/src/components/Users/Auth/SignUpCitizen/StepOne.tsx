import React, { useState } from 'react';
import { Box, Button, Checkbox, Typography, FormControlLabel } from '@mui/material';
import { string, boolean, ValidationError, StringSchema, BooleanSchema } from 'yup';

import StyledLink from '../../../../components/StyledLink';
import routes from '../../../../routes/routes';
import PasswordInput from '../PasswordInput';
import EmailInput from '../EmailInput';
import NameInput from '../NameInput';

import { useStyles } from './styles';

const initialFormData = {
  firstName: {
    value: '',
    error: '',
    rule: string().required('Required.'),
  },
  lastName: {
    value: '',
    error: '',
    rule: string().required('Required.'),
  },
  email: {
    value: '',
    error: '',
    rule: string().email('Invalid email.').required('Required.'),
  },
  password: {
    value: '',
    error: '',
    rule: string()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .required('Required.'),
  },
  passwordConfirm: {
    value: '',
    error: '',
    rule: string()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .required('Required.'),
  },
  acceptTerms: {
    value: false,
    error: '',
    rule: boolean().required('Required.'),
  },
};

const isValid = (rule: StringSchema | BooleanSchema, value: string | undefined) => {
  try {
    rule.validateSync(value);
    return '';
  } catch (error) {
    if (error instanceof ValidationError) {
      return error.message;
    }
  }
};

interface StepOneType {
  handleNext: () => void;
}

export default function StepOne({ handleNext }: StepOneType) {
  const { classes } = useStyles();

  const [formData, setFormData] = useState(initialFormData);
  const [nextDisabled, setNextDisabled] = React.useState(true);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked }: { name: string; value: string; checked: boolean } = evt.target;
    setFormData((fData) => {
      return {
        ...fData,
        [name]: {
          // @ts-ignore
          ...fData[name],
          value: name === 'acceptTerms' ? checked : value,
        },
      };
    });
    setNextDisabled(true);
  };

  const handleBlur = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name }: { name: string } = evt.target;

    console.log({ name });

    if (Object.keys(initialFormData).includes(name)) {
      setFormData((currFormData) => ({
        ...currFormData,
        [name]: {
          // @ts-ignore
          ...currFormData[name],
          // @ts-ignore
          error: isValid(currFormData[name].rule, currFormData[name].value),
        },
      }));
    }
  };

  console.log({ formData });

  return (
    <>
      <Box sx={{ height: '100%', width: '100%' }}>
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
              onBlur={handleBlur}
              onChange={handleChange}
              value={formData.firstName.value}
              error={formData.firstName.error}
            />
          </Box>
          <Box width={'100%'}>
            <NameInput
              id="lastName"
              name="lastName"
              label="Last Name"
              placeholder="Dosis"
              onBlur={handleBlur}
              onChange={handleChange}
              value={formData.lastName.value}
              error={formData.lastName.error}
            />
          </Box>
        </Box>
        <EmailInput
          showStartAdornment={true}
          onBlur={handleBlur}
          onChange={handleChange}
          value={formData.email.value}
          error={formData.email.error}
          placeholder="jane@citizen.com"
        />
        <PasswordInput
          id="password"
          value={formData.password.value}
          showStartAdornment={true}
          onChange={handleChange}
          error={formData.password.error}
        />
        <PasswordInput
          id="passwordConfirm"
          label="Confirm Password"
          value={formData.passwordConfirm.value}
          showStartAdornment={true}
          onChange={handleChange}
          error={formData.passwordConfirm.error}
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
              checked={formData.acceptTerms.value}
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
