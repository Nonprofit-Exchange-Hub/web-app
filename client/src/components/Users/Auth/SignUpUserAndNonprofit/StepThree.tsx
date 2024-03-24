import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

type TStepOneProps = {
  formData: {
    focusAreas: string[];
  };
  classes: Record<'header' | 'input', string>;
  makeChips: () => any;
};

export default function StepThree({ classes, formData, makeChips }: TStepOneProps) {
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
        Tell us about your organization's focus area(s).
      </Typography>
      <Grid container item xs={12} spacing={1}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 'bold' }}>
            What type of work is your organization invovled with?
          </Typography>
          <label> Please choose one or more options</label>
        </Grid>
        <Grid item xs={12}>
          {makeChips()}
        </Grid>
      </Grid>
    </Box>
  );
}
