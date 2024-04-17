import React from 'react';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import routes from '../../../../routes/routes';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import EmailInput from '../../../Users/Auth/EmailInput';
import PasswordInput from '../../../Users/Auth/PasswordInput';
import StyledLink from '../../../StyledLink';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';

type TStepOneProps = {
  formData: {
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    password: string;
    accept_terms?: boolean;
  };
  emailError: string;
  classes: Record<'header' | 'input', string>;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StepOne({ classes, formData, emailError, handleChange }: TStepOneProps) {
  return (
    <Box sx={{ height: '100%', minWidth: '780px' }}>
      <Typography
        className={classes.header}
        variant="h4"
        fontSize="40px"
        component="h1"
        align="left"
        sx={{ color: '#674E67' }}
      >
        Tell us about yourself.
      </Typography>
      <Typography sx={{ fontWeight: 'bold' }}>Representative Information</Typography>
      <Grid container item xs={12} spacing={1}>
        <Grid item xs={4}>
          <label>First Name</label>
          <FormControl fullWidth>
            <Input
              className={classes.input}
              type="text"
              id="first_name"
              name="first_name"
              fullWidth
              value={formData.first_name}
              onChange={handleChange}
              disableUnderline
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <label>Last Name</label>
          <FormControl fullWidth>
            <Input
              className={classes.input}
              type="text"
              id="last_name"
              name="last_name"
              fullWidth
              value={formData.last_name}
              onChange={handleChange}
              disableUnderline
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <label>Role</label>
          <FormControl fullWidth>
            <Input
              className={classes.input}
              type="text"
              id="role"
              name="role"
              fullWidth
              value={formData.role}
              onChange={handleChange}
              disableUnderline
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <EmailInput
            value={formData.email}
            placeholder=""
            onChange={handleChange}
            showStartAdornment={true}
            error={emailError}
          />
          <PasswordInput
            value={formData.password}
            onChange={handleChange}
            showStartAdornment={true}
          />
        </Grid>
        <FormControlLabel
          style={{
            textAlign: 'left',
            display: 'block',
          }}
          control={
            <Checkbox
              color="primary"
              checked={formData.accept_terms}
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
    </Box>
  );
}
