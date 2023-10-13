import React, { useState } from 'react';
import { Alert, Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useStyles } from './styles/styles';
import { FileUploadInput } from '../../../Forms';

type TStepFourProps = {
  initData: { bio: string };
  handleBack: () => void;
  handleNext: (formData: {}, submitForm?: boolean) => void;
  setImage: (image: File | null) => void;
};

export default function StepFour({ initData, handleBack, handleNext, setImage }: TStepFourProps) {
  const { classes } = useStyles();
  const [formData, setFormData] = useState(initData);
  const [imageError, setImageError] = useState<'too-big' | 'unsupported-text' | ''>('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = evt.target;
    setFormData((fData) => {
      return {
        ...fData,
        [name]: value,
      };
    });
  };

  const handleImageChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (!evt.target.files || evt.target.files.length === 0) {
      return;
    }
    if (evt.target.files[0].size > 1000000) {
      setImageError('too-big');
      return;
    }
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(evt.target.files[0].type)) {
      setImageError('unsupported-text');
      return;
    }
    setImageError('');
    setImage(evt.target.files![0]);
  };

  const handleClickNext = () => {
    handleNext(formData, true);
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
          <Grid item xs={12}>
            <Avatar sx={{ bgcolor: 'gray', width: 110, height: 110 }} />
          </Grid>
          <Grid item xs={12}>
            <FileUploadInput
              label=""
              id="upload-file"
              text="Upload"
              onChange={handleImageChange}
              buttonVariant="primaryCTAButton"
            ></FileUploadInput>
          </Grid>
          <Grid item xs={12}>
            {imageError === 'too-big' ? (
              <Alert severity="error">Please upload a file up to 1 megabyte in size.</Alert>
            ) : imageError === 'unsupported-text' ? (
              <Alert severity="error">Supported files: jpeg, jpg png and gif</Alert>
            ) : null}
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
          <Button color="primary" variant="outlined" onClick={handleBack}>
            Back
          </Button>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Button color="primary" variant="outlined" onClick={handleClickNext}>
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}
