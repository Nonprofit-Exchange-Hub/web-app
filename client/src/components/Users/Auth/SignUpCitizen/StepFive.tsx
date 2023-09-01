import React from 'react';
import { Box, Typography } from '@mui/material';

import { useStyles } from './styles/styles';

interface StepFiveType {
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
}

export default function StepFive({ user }: StepFiveType) {
  const { classes } = useStyles();

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
        {user && user.firstName} {user && user.lastName}
      </Typography>
      <Typography>{user && user.email}</Typography>
      <Typography sx={{ marginBottom: '60px' }}>
        <strong>Please check your e-mail</strong> to finish the identity verification process.
        Afterwards, start contributing!
      </Typography>
    </Box>
  );
}
