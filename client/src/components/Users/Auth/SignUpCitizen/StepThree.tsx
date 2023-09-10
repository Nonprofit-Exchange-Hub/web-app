import React, { useState } from 'react';
import { Box, Chip, Button, Grid, Typography } from '@mui/material';

import { interests } from './constants/interests';

import { useStyles } from './styles/styles';

type TStepThreeProps = {
  initData: { interests: string[] };
  handleBack: () => void;
  handleNext: (formData: {}) => void;
};

export default function StepThree({ initData, handleBack, handleNext }: TStepThreeProps) {
  const { classes } = useStyles();

  const [formData, setFormData] = useState<{ interests: string[] }>(initData);

  const makeChips = () => {
    return interests.map((interest) => {
      // TODO: toggle chip style when interest is chosen
      const isSelected = formData.interests.includes(interest);
      return (
        <Chip
          key={interest}
          className={`${classes.chip} ${isSelected && classes.selectedChip}`}
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
      <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
        <Box>
          <Button color="primary" variant="outlined" onClick={handleClickBack}>
            Back
          </Button>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Button
            color="primary"
            sx={{ marginRight: '20px' }}
            variant="outlined"
            onClick={handleClickNext}
          >
            Skip
          </Button>
          <Button color="primary" variant="outlined" onClick={handleClickNext}>
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}
