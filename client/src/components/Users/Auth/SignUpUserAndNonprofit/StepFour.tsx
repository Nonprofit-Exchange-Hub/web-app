import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Avatar, TextField } from '@mui/material';

type TStepOneProps = {
  formData: {
    bio: string;
  };
  classes: Record<'header' | 'input' | 'label', string>;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StepFour({ classes, formData, handleChange }: TStepOneProps) {
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
        Finalize your organization's profile.
      </Typography>
      <label className={classes.label}> Photo </label>
      <Typography>A logo, image, or icon that represents your organization.</Typography>
      <Grid item xs={12} sx={{ height: '30px' }} />
      <Grid container item xs={12} lg={6} alignItems="center">
        <Grid item xs={3}>
          <Avatar sx={{ bgcolor: 'gray', width: 110, height: 110 }} />
        </Grid>
        <Grid item xs={3} sx={{ position: 'absolute' }}>
          <input accept="image/*" hidden id="upload-file" type="file" />
          <label htmlFor="upload-file">
            <Button
              sx={{
                backgroundColor: '#EF6A60',
                color: 'white',
                borderRadius: '4px',
                padding: '10px',
                left: '150px',
              }}
              color="primary"
            >
              Upload
            </Button>
          </label>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ height: '30px' }} />
      <label className={classes.label}> About </label>
      <Typography>A summary about your organization at a glance.</Typography>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={4}
          fullWidth
          placeholder="Tell us about your organization..."
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </Grid>
    </Box>
  );
}
