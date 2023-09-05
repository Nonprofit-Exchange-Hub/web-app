import * as React from 'react';
import { Box } from '@mui/material';
import SvgSignUpContactInfoStep from './SvgSignUpContactInfoStep';
// import SvgSignUpLocationStep from './SvgSignUpLocationStep';
// import SvgSignUpInterestsStep from './SvgSignUpInterestsStep';
// import SvgSignUpProfileStep from './SvgSignUpProfileStep';
// import SvgSignUpFinishedStep from './SvgSignUpFinishedStep';
import { SignUpContext } from './Provider';
import { LetsGetStarted } from './LetsGetStarted';

function SignupCitizenV2() {
  const { step } = React.useContext(SignUpContext);

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'left'}
      sx={{ marginRight: '130px' }}
    >
      <Box
        sx={{
          backgroundColor: '#FFC958',
          borderRadius: '0 20px 20px 0',
          maxHeight: '690px',
          maxWidth: '446px',
          padding: '19px 60px 120px 130px',
        }}
      >
        {
          step === 'lets-get-started' && (
            <SvgSignUpContactInfoStep height={'569px'} width={'256px'} />
          )
          // (step === 1 && <SvgSignUpLocationStep height={'569px'} width={'256px'} />) ||
          // (step === 2 && <SvgSignUpInterestsStep height={'569px'} width={'256px'} />) ||
          // (step === 3 && <SvgSignUpProfileStep height={'569px'} width={'256px'} />) ||
          // (step === 4 && <SvgSignUpFinishedStep height={'569px'} width={'256px'} />)
        }
      </Box>
      <Box sx={{ marginLeft: '84px', marginBottom: '78px', minWidth: '780px' }}>
        <LetsGetStarted />
      </Box>
    </Box>
  );
}

export default SignupCitizenV2;
