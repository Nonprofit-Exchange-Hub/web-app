import React from 'react';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';

type TStepOneProps = {
  formData: {
    website: string;
    facebook: string;
    instagram: string;
    twitter: string;
  };
  classes: Record<'header' | 'input', string>;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StepZero({ classes, formData, handleChange }: TStepOneProps) {
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
        How can others reach you?
      </Typography>
      <Typography sx={{ fontWeight: 'bold' }}>Contact Information</Typography>
      <Grid container item xs={12} spacing={1}>
        <Grid item xs={12}>
          <label> Website </label>
          <FormControl fullWidth>
            <Input
              className={classes.input}
              type="text"
              id="website"
              name="website"
              fullWidth
              value={formData.website}
              onChange={handleChange}
              disableUnderline
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <label> Instagram </label>
          <FormControl fullWidth>
            <Input
              className={classes.input}
              type="text"
              id="instagram"
              name="instagram"
              fullWidth
              value={formData.instagram}
              onChange={handleChange}
              disableUnderline
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <label> Facebook </label>
          <FormControl fullWidth>
            <Input
              className={classes.input}
              type="text"
              id="facebook"
              name="facebook"
              fullWidth
              value={formData.facebook}
              onChange={handleChange}
              disableUnderline
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <label> Twitter </label>
          <FormControl fullWidth>
            <Input
              className={classes.input}
              type="text"
              id="twitter"
              name="twitter"
              fullWidth
              value={formData.twitter}
              onChange={handleChange}
              disableUnderline
              required
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
