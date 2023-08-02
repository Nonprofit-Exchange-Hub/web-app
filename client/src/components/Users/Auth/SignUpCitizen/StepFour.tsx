import React, { useState } from 'react';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useStyles } from './styles';

interface StepFourType {
  initData: { bio: string };
  handleBack: () => void;
  handleNext: (formData: {}) => void;
}

export default function StepFour({ initData, handleBack, handleNext }: StepFourType) {
  const { classes } = useStyles();

  const [formData, setFormData] = useState(initData);

  console.log({ initData, formData });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = evt.target;
    setFormData((fData) => {
      return {
        ...fData,
        [name]: value,
      };
    });
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
          Upload your profile icon
        </Typography>
        <Typography className={classes.label} sx={{ fontWeight: 'bold' }}>
          Your Profile
        </Typography>
        <Typography>
          You can update this information later in the settings of your account.
        </Typography>
        <Grid item xs={12} sx={{ height: '50px' }} />
        <Grid container item xs={12} lg={6} alignItems="center">
          <Grid item xs={3}>
            <Avatar sx={{ bgcolor: 'gray', width: 110, height: 110 }} />
          </Grid>
          <Grid item xs={3}>
            <input accept="image/*" hidden id="upload-file" type="file" />
            <label htmlFor="upload-file">
              <Button
                sx={{
                  backgroundColor: '#EF6A60',
                  color: 'white',
                  borderRadius: '4px',
                  padding: '10px',
                }}
                color="primary"
              >
                Upload
              </Button>
            </label>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ height: '50px' }} />
        <Typography className={classes.label} sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          About Yourself
        </Typography>
        <Grid item xs={10}>
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Tell us about yourself..."
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
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
          <Button type="submit" color="primary" variant="outlined">
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}
