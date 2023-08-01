import React, { useState } from 'react';
import { Box, Button, Grid, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';
import { string } from 'yup';

import { US_STATE_NAMES } from '../../../../configs';
import NameInput from '../NameInput';

import { useStyles } from './styles';

const initialFormData = {
  city: {
    value: '',
    error: null,
    rule: string().required('Required.'),
  },
  state: {
    value: '',
    error: null,
    rule: string().required('Required.'),
  },
  zipCode: {
    value: '',
    error: null,
    rule: string().email('Invalid email.').required('Required.'),
  },
};

interface StepTwoType {
  handleBack: () => void;
  handleNext: (formData: {}) => void;
}

export default function StepTwo({ handleBack, handleNext }: StepTwoType) {
  const { classes } = useStyles();

  const [formData, setFormData] = useState(initialFormData);

  const makeStateSelectOptions = () => {
    return US_STATE_NAMES.map((state) => {
      return <MenuItem value={state}>{state}</MenuItem>;
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode): void => {
    const { name, value }: { name: string; value: string } = event.target;
    setFormData((fData) => ({
      ...fData,
      [name]: {
        // @ts-ignore
        ...fData[name],
        value,
      },
    }));
  };

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
  };

  const handleClickBack = () => {
    handleBack();
  };

  const handleClickNext = () => {
    const formValues = Object.values(formData).map((inputObj) => inputObj.value);
    handleNext(formValues);
  };

  return (
    <>
      <Box sx={{ height: '100%', minWidth: '780px' }}>
        <Typography
          className={classes.header}
          variant="h4"
          fontSize="58px"
          component="h1"
          align="left"
          sx={{ color: '#674E67' }}
        >
          Tell us about yourself
        </Typography>
        <Typography className={classes.label} sx={{ fontWeight: 'bold' }}>
          Personal Information
        </Typography>
        <Typography>You can always update this information later as needed.</Typography>
        <Grid item xs={12} sx={{ height: '50px' }} />
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <label className={classes.label}>Where are you located?</label>
          </Grid>
          <Grid item xs={6}>
            <label className={classes.label} htmlFor="state">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>State</div>
              </div>
            </label>
            <Select
              id="state"
              className={classes.input}
              displayEmpty
              fullWidth
              onChange={handleSelectChange}
              sx={{ marginTop: '16px' }}
              MenuProps={{
                anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
                sx: {
                  borderRadius: '10px',
                  padding: '20px 10px',
                  height: '240px',
                },
              }}
              name="state"
              value={formData.state.value}
            >
              {makeStateSelectOptions()}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <NameInput
              id="city"
              name="city"
              label="City"
              placeholder="Seattle"
              onChange={handleChange}
              value={formData.city.value}
              error={formData.city.error}
            />
          </Grid>
          <Grid item xs={4}>
            <NameInput
              id="zipCode"
              name="zipCode"
              label="Zip Code"
              placeholder="98101"
              onChange={handleChange}
              value={formData.zipCode.value}
              error={formData.zipCode.error}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box>
          <Button color="primary" variant="outlined" onClick={handleClickBack}>
            Back
          </Button>
        </Box>
        <Button color="primary" variant="outlined" onClick={handleClickNext}>
          Skip
        </Button>
        <Button color="primary" variant="outlined" onClick={handleClickNext}>
          Next
        </Button>
      </Box>
    </>
  );
}
