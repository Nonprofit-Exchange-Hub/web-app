/* eslint-disable prettier/prettier */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';

type HowItWorksCardProps = {
  instructions: { title: string; body: string; image: string; buttonText: string };
};

function HowItWorksCard(props: HowItWorksCardProps) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: '20px',
        backgroundColor: 'white',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'top' }}>
        <img src={props.instructions.image} alt="How It Works" width="100%" />
      </Box>
      <Box
        sx={{
          marginX: '15px',
          minHeight: '140px',
          '@media (max-width: 2255px)': {
            marginX: '10px',
            minHeight: '200px',
            mt: '0px',
            mb: '10px',
          },
          '@media (max-width: 1611px)': {
            marginX: '10px',
            minHeight: '230px',
            mt: '0px',
            mb: '10px',
          },
          '@media (max-width: 1365px)': {
            marginX: '10px',
            minHeight: '270px',
            mt: '0px',
            mb: '0px',
          },
          '@media (max-width: 1111px)': {
            marginX: '10px',
            minHeight: '200px',
            mt: '0px',
            mb: '10px',
          },
          '@media (max-width: 600px)': {
            marginX: '0px',
            minHeight: '80px',
            mt: '0px',
            mb: '0px',
          },
        }}
      >
        <Typography
          sx={{
            fontSize: '1.8rem',
            fontWeight: 600,
            mb: '10px',
            '@media (max-width: 1411px)': {
              minHeight: '90px',
              mt: '0px',
              mb: '10px',
            },
            '@media (max-width: 600px)': {
              minHeight: '50px',
              mt: '0px',
              mb: '0px',
            },
          }}
        >
          {props.instructions.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            pb: '10px',
            flexGrow: 1,
          }}
        >
          {props.instructions.body}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'bottom',
          flexGrow: 1,
          '@media (max-width: 1111px)': {
            mt: '10px',
            mb: '20px',
          },
          '@media (max-width: 600px)': {
            mt: '20px',
            mb: '10px',
          },
        }}
      >
        <Button
          sx={{
            padding: '0.4rem 1rem 0.4rem 1rem',
            border: '1px solid #323232',
            borderRadius: '8px',
            color: '#323232',
            fontWeight: '900',
            fontSize: '1rem'
          }}
        >
          {props.instructions.buttonText}
        </Button>
      </Box>
    </Box>
  );
}

export default HowItWorksCard;
