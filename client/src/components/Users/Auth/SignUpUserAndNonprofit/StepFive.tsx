import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

type TStepOneProps = {
  formData: {
    first_name: string;
    last_name: string;
    email: string;
  };
  classes: Record<'header' | 'input' | 'label', string>;
};

export default function StepZero({ classes, formData }: TStepOneProps) {
  return (
    <Box sx={{ height: '100%', minWidth: '780px' }}>
      <Typography
        className={classes.header}
        variant="h4"
        fontSize="58px"
        component="h1"
        align="left"
      >
        Sign up almost complete!
      </Typography>
      <Typography className={classes.label} sx={{ fontWeight: 'bold', marginTop: '60px' }}>
        {formData.first_name} {formData.last_name}
      </Typography>
      <Typography>{formData.email}</Typography>
      <Typography>
        <strong>Please check your e-mail</strong> to finish the identity verification process.
        Afterwards, start contributing!
      </Typography>
    </Box>
  );
}
