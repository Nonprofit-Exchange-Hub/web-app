import * as React from 'react';
import { Box } from '@mui/material';
import SvgSignUpContactInfoStep from './SvgSignUpContactInfoStep';
import SvgSignUpLocationStep from './SvgSignUpLocationStep';
import { SignUpContext } from './Provider';
import { LetsGetStarted } from './LetsGetStarted';
import { AboutYourself } from './AboutYourself';
import { Interests } from './Interests';
import SvgSignUpInterestsStep from './SvgSignUpInterestsStep';

function SignupCitizenV2() {
  const { step } = React.useContext(SignUpContext);

  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
      <Box
        sx={{
          backgroundColor: '#FFC958',
          borderRadius: '0 20px 20px 0',
          maxHeight: '690px',
          maxWidth: '446px',
          padding: '19px 60px 120px 130px',
        }}
      >
        {step === 'lets-get-started' && (
          <SvgSignUpContactInfoStep height={'569px'} width={'256px'} />
        )}
        {step === 'about-yourself' && <SvgSignUpLocationStep height={'569px'} width={'256px'} />}
        {step === 'interests' && <SvgSignUpInterestsStep height={'569px'} width={'256px'} />}
        {/*|  (step
        === 3 && <SvgSignUpProfileStep height={'569px'} width={'256px'} />) ||  (step === 4 &&{' '}
        <SvgSignUpFinishedStep height={'569px'} width={'256px'} />) */}
      </Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'center'}
        sx={{ marginX: '84px', marginBottom: '78px', minWidth: '780px' }}
      >
        {step === 'lets-get-started' && <LetsGetStarted />}
        {step === 'about-yourself' && <AboutYourself />}
        {step === 'interests' && <Interests />}
      </Box>
    </Box>
  );
}

export default SignupCitizenV2;
