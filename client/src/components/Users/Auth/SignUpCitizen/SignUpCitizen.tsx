import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { UserContext } from '../../../../providers';
import { UserSignupData } from './UserSignupData';
import { APP_API_BASE_URL } from '../../../../configs';
import SvgSignUpContactInfoStep from './SvgSignUpContactInfoStep';
import SvgSignUpLocationStep from './SvgSignUpLocationStep';
import SvgSignUpInterestsStep from './SvgSignUpInterestsStep';
import SvgSignUpProfileStep from './SvgSignUpProfileStep';
import SvgSignUpFinishedStep from './SvgSignUpFinishedStep';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

const initialFormData: UserSignupData = {
  firstName: '',
  last_name: '',
  city: '',
  interests: [],
  email: '',
  password: '',
  accept_terms: false,
  email_notification_opt_out: false,
  state: '',
  zip_code: '',
  bio: '',
};

function SignupCitizen() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState(initialFormData);
  const { user, setUser } = React.useContext(UserContext);

  console.log({ formData });

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    console.log(formData);
    setIsLoading(true);
    // Backend doesn't need accept_terms. If a user is signed up they have agreed to the terms
    delete formData.accept_terms;
    const res = await fetch(`${APP_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, interests: { names: formData.interests } }),
    });
    const data = await res.json();
    setIsLoading(false);
    if (data.status === 409) {
      // setEmailError(data.message);
    } else {
      setUser(data);
      // handleNext();
    }
  };

  // handleNext and handleBack are also in SignUpUserAndNonProfit, refactor later
  const handleNext = (newFormData: {}) => {
    console.log('HANDLENEXT');
    setFormData((currFormData) => ({
      ...currFormData,
      ...newFormData,
    }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'left'}
      sx={{
        marginTop: '134px',
        marginBottom: '160px',
      }}
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
        {(activeStep === 0 && <SvgSignUpContactInfoStep height={'569px'} width={'256px'} />) ||
          (activeStep === 1 && <SvgSignUpLocationStep height={'569px'} width={'256px'} />) ||
          (activeStep === 2 && <SvgSignUpInterestsStep height={'569px'} width={'256px'} />) ||
          (activeStep === 3 && <SvgSignUpProfileStep height={'569px'} width={'256px'} />) ||
          (activeStep === 4 && <SvgSignUpFinishedStep height={'569px'} width={'256px'} />)}
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          height={'690px'}
          justifyContent={'center'}
          sx={{ marginLeft: '84px', marginBottom: '78px', marginRight: '130px' }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <Box>
              {/* PAGE ONE ###########################################################*/}
              {activeStep === 0 && <StepOne handleNext={handleNext} />}

              {/* PAGE TWO ######################################################## */}
              {activeStep === 1 && <StepTwo handleBack={handleBack} handleNext={handleNext} />}

              {/* PAGE THREE ######################################################## */}
              {activeStep === 2 && <StepThree handleBack={handleBack} handleNext={handleNext} />}

              {/* PAGE FOUR ######################################################## */}
              {activeStep === 3 && <StepFour handleBack={handleBack} handleNext={handleNext} />}

              {/* PAGE FIVE ######################################################## */}
              {/* SHOWN WHEN SIGNUP DONE ######################################################## */}
              {activeStep === 4 && <StepFive user={user} />}
            </Box>
            <Box marginTop={'60px'}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: activeStep === 0 ? 'right' : 'space-between',
                }}
              >
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ display: activeStep === 0 ? 'none' : 'inherit', mr: 1 }}
                >
                  Back
                </Button>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent:
                      activeStep === 1 || activeStep === 2 || activeStep === 3
                        ? 'right'
                        : 'space-between',
                  }}
                >
                  {(activeStep === 1 || activeStep === 2 || activeStep === 3) && (
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleNext}
                      sx={{ marginRight: '20px' }}
                    >
                      Skip
                    </Button>
                  )}
                  {(activeStep === 0 ||
                    activeStep === 1 ||
                    activeStep === 2 ||
                    activeStep === 3) && (
                    <Button color="primary" variant="outlined" onClick={handleNext}>
                      Next
                    </Button>
                  )}
                  <Box />
                </Box>
                {activeStep === 4 && (
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!formData.accept_terms}
                  >
                    Sign Up
                  </Button>
                )}
              </Box>
            </Box>
            {/* Placeholder for loading  - waiting on UI/UX response as to what they want. */}
            {isLoading && <Typography>Loading</Typography>}
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default SignupCitizen;
