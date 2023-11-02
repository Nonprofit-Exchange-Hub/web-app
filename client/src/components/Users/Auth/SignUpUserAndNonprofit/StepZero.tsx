import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { ModalContext } from '../../../../providers/ModalProvider';
import { Box, Select, MenuItem, OutlinedInput } from '@mui/material';

type TStepOneProps = {
  formData: {
    organization_name: string;
    organization_phone: string;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    employer_identification_number: string;
    irs_classification: string;
  };
  classes: {
    sideImg: {};
    signUpContainer: {};
    button: {};
    header: {};
    input: {};
    label: {};
    chip: {};
  };
  classifications: [];
  handleNext: (formData: {}) => void;
  handleChange: (formData: {}) => void;
  handleSelectChange: () => void;
  makeStateSelectOptions: () => any;
};

export default function StepZero({
  classes,
  formData,
  classifications,
  handleChange,
  handleSelectChange,
  makeStateSelectOptions,
}: TStepOneProps) {
  const modalContext = useContext(ModalContext);
  const { openModal } = modalContext;

  return (
    <Box sx={{ height: '100%', minWidth: '780px' }}>
      <Typography
        className={classes.header}
        variant="h4"
        fontSize="40px"
        lineHeight="10px"
        align="left"
        sx={{ color: '#674E67' }}
      >
        Let's get started!
      </Typography>
      <Box display={'flex'} flexDirection={'row'} width={'100%'}>
        <Box width={'100%'}>
          <Typography sx={{ fontWeight: 'bold' }}>About Your Organization</Typography>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={7}>
              <label>Organization Name</label>
              <Input
                className={classes.input}
                type="text"
                id="organization_name"
                name="organization_name"
                fullWidth
                onChange={handleChange}
                value={formData.organization_name}
                disableUnderline
              />
            </Grid>
            <Grid item xs={5}>
              <label>Phone Number</label>
              <Input
                className={classes.input}
                type="text"
                id="organization_phone"
                name="organization_phone"
                fullWidth
                onChange={handleChange}
                value={formData.organization_phone}
                disableUnderline
              />
            </Grid>
            <Grid item xs={7}>
              <label>Street Address</label>
              <Input
                className={classes.input}
                disableUnderline
                fullWidth
                onChange={handleChange}
                type="text"
                id="street"
                name="street"
                value={formData.street}
              ></Input>
            </Grid>
            <Grid item xs={3}>
              <label>City</label>
              <Input
                className={classes.input}
                disableUnderline
                fullWidth
                onChange={handleChange}
                type="text"
                id="city"
                name="city"
                value={formData.city}
              ></Input>
            </Grid>
            <Grid item xs={2}>
              <label>State</label>
              <Select
                label="state"
                className={classes.input}
                displayEmpty
                fullWidth
                onChange={handleSelectChange}
                sx={{ marginTop: '10px', border: '1px solid' }}
                MenuProps={{
                  anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
                  sx: {
                    borderRadius: '10px',
                    padding: '20px',
                    height: '240px',
                  },
                }}
                name="state"
                value={formData.state}
              >
                {makeStateSelectOptions()}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <label>Employer Identification Number (EIN)</label>
              <Input
                className={classes.input}
                type="text"
                id="employer_identification_number"
                name="employer_identification_number"
                fullWidth
                value={formData.employer_identification_number}
                onChange={handleChange}
                disableUnderline
                required
              />
            </Grid>
            <Grid item xs={12}>
              <label>IRS Nonprofit Organization Classification</label>
              {/* @ts-ignore */}
              <Select
                input={<OutlinedInput />}
                inputProps={{ 'aria-label': 'Without label' }}
                className={classes.input}
                value={formData.irs_classification}
                displayEmpty
                fullWidth
                type="text"
                id="irs_classification"
                name="irs_classification"
                onChange={handleSelectChange}
                sx={{ marginTop: '10px', border: '1px solid' }}
                MenuProps={{
                  anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
                  sx: {
                    borderRadius: '10px',
                    padding: '20px',
                    height: '240px',
                  },
                }}
              >
                {classifications.map((option, index) => {
                  return (
                    <MenuItem key={option['text']} value={option['text']}>
                      {option['text']}
                    </MenuItem>
                  );
                })}
              </Select>
              <Typography align="left" style={{ fontSize: '14px' }}>
                Already have an account?
                <Typography
                  display="inline"
                  sx={{
                    fontSize: '14px',
                    padding: '4px',
                    '&:hover': {
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={() => openModal('SignIn')}
                >
                  Sign In
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
