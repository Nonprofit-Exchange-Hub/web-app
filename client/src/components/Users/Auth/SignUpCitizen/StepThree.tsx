import React, { useState } from 'react';
import { Box, Chip, Button, Grid, Typography } from '@mui/material';

import { interests } from './interests';

import { useStyles } from './styles';

const initialFormData = {
  interests: [],
};

interface StepThreeType {
  initData: {};
  handleBack: () => void;
  handleNext: (formData: {}) => void;
}

export default function StepThree({ initData, handleBack, handleNext }: StepThreeType) {
  const { classes } = useStyles();

  Object.keys(initialFormData).forEach((key) => {
    //@ts-ignore
    initialFormData[key].value = initData[key];
  });

  const [formData, setFormData] = useState<{ interests: string[] }>(initialFormData);

  const makeChips = () => {
    return interests.map((interest) => {
      // TODO: toggle chip style when interest is chosen
      return (
        <Chip
          className={classes.chip}
          label={interest}
          sx={{ fontSize: '16px' }}
          variant="outlined"
          onClick={() => toggleInterest(interest)}
        />
      );
    });
  };

  const toggleInterest = (interest: string): void => {
    const existingInterestIdx = formData.interests.findIndex(
      (existingInterest) => existingInterest === interest,
    );

    let newInterests: string[] = [...formData.interests];

    if (existingInterestIdx !== -1) {
      newInterests.splice(existingInterestIdx, 1);
    } else {
      newInterests.push(interest);
    }

    setFormData({ interests: newInterests });
  };

  const handleClickBack = () => {
    handleBack();
  };

  const handleClickNext = () => {
    handleNext(formData);
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
          Tell us about your interests
        </Typography>
        <Typography className={classes.label} sx={{ fontWeight: 'bold' }}>
          Your Interests
        </Typography>
        <Typography>Please select one or more interest.</Typography>
        <Grid item xs={12} sx={{ height: '50px' }} />
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <label className={classes.label}>What type on nonprofits are you interested in?</label>
          </Grid>
          <Grid item xs={12}>
            {makeChips()}
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
