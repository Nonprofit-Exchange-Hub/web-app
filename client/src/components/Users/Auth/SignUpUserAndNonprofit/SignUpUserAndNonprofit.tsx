import * as React from 'react';
import StepZero from './StepZero';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SvgSignUpContactInfoStep from '../../../Icons/SvgSignUpContactInfoStep';
import SvgSignUpLocationStep from '../../../Icons/SvgSignUpLocationStep';
import SvgSignUpfocusAreasStep from '../../../Icons/SvgSignUpFocusAreasStep';
import SvgSignUpProfileStep from '../../../Icons/SvgSignUpProfileStep';
import SvgSignUpFinishedStep from '../../../Icons/SvgSignUpFinishedStep';
import type { Theme } from '@mui/material/styles';
import { useEffect } from 'react';
import { focusAreas } from '../../../../views/FocusAreas';
import { makeStyles } from 'tss-react/mui';
import { UserContext } from '../../../../providers';
import { placeholderImg } from '../../../../assets/temp';
import { APP_API_BASE_URL, US_STATE_NAMES } from '../../../../configs';
import { Box, MenuItem, SelectChangeEvent, Chip } from '@mui/material';

interface UserSignupData {
  organization_name: string;
  organization_phone: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  employer_identification_number: string;
  irs_classification: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  password: string;
  accept_terms?: boolean;
  email_notification_opt_out?: boolean;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  focusAreas: string[];
  bio: string;
}

const initialFormData: UserSignupData = {
  organization_name: '',
  organization_phone: '',
  street: '',
  city: '',
  state: '',
  zip_code: '',
  employer_identification_number: '',
  irs_classification: '',
  first_name: '',
  last_name: '',
  role: '',
  email: '',
  password: '',
  accept_terms: false,
  email_notification_opt_out: false,
  website: '',
  instagram: '',
  facebook: '',
  twitter: '',
  focusAreas: [],
  bio: '',
};

const useStyles = makeStyles()((theme: Theme) => ({
  sideImg: {
    backgroundImage: `url("${placeholderImg}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    borderTopRightRadius: '15px',
    borderBottomRightRadius: '15px',
  },
  signUpContainer: {
    margin: theme.spacing(5),
  },
  button: {
    borderRadius: 0,
    height: 44,
    textTransform: 'none',
    backgroundColor: '#C4C4C4',
    color: 'white',
  },
  header: {
    fontWeight: 'bold',
    paddingBottom: '40px',
  },
  input: {
    height: 44,
    border: '1px solid #C4C4C4',
    borderRadius: 10,
    boxSizing: 'border-box',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: 14,
    marginBottom: 20,
  },
  label: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  chip: {
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    height: 44,
  },
}));

function SignupNonProfit() {
  const { classes } = useStyles();
  const [selectedChips, setSelectedChips] = React.useState<string[]>([]);
  const [disableNext, setDisableNext] = React.useState<boolean>(true);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<string>('');
  const [formData, setFormData] = React.useState(initialFormData);
  const { setUser } = React.useContext(UserContext);

  const makeChips = () => {
    return focusAreas.map((focusArea) => {
      return (
        <Chip
          className={classes.chip}
          label={focusArea}
          sx={{ fontSize: '16px' }}
          variant="outlined"
          onClick={() => togglefocusArea(focusArea)}
          color={selectedChips.includes(focusArea) ? 'primary' : 'default'}
        />
      );
    });
  };

  const togglefocusArea = (focusArea: string): void => {
    const existingfocusAreaIdx = formData.focusAreas.findIndex(
      (existingfocusArea) => existingfocusArea === focusArea,
    );
    if (existingfocusAreaIdx !== -1) {
      formData.focusAreas.splice(existingfocusAreaIdx, 1);
      setSelectedChips(formData.focusAreas);
    } else {
      formData.focusAreas.push(focusArea);
      setSelectedChips(formData.focusAreas);
    }
    setFormData({ ...formData, focusAreas: formData.focusAreas });
    console.log(formData.focusAreas);
  };

  const makeStateSelectOptions = () => {
    return US_STATE_NAMES.map((state) => {
      return <MenuItem value={state}>{state}</MenuItem>;
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode): void => {
    const { name, value }: { name: string; value: string } = event.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
    nextOrNot(activeStep);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked }: { name: string; value: string; checked: boolean } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: name === 'accept_terms' ? checked : value,
      [name]: name === 'email_notification_opt_out' ? checked : value,
    }));
    nextOrNot(activeStep);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setIsLoading(true);
    delete formData.accept_terms;
    const res = await fetch(`${APP_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setIsLoading(false);
    if (data.status === 409) {
      setEmailError(data.message);
    } else {
      setUser(data);
      handleNext();
    }
  };

  const handleNext = () => {
    setDisableNext(true);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const nextOrNot = (step: number) => {
    if (step === 0) {
      if (
        formData.organization_name.length > 0 &&
        formData.organization_phone.length > 0 &&
        formData.street.length > 0 &&
        formData.city.length > 0 &&
        formData.state.length > 0 &&
        formData.employer_identification_number.length > 0 &&
        formData.irs_classification.length > 0
      ) {
        setDisableNext(false);
      }
    }
    if (step === 1) {
      if (
        formData.first_name.length > 0 &&
        formData.last_name.length > 0 &&
        formData.role.length > 0 &&
        formData.email.length > 0 &&
        formData.password.length > 0 &&
        !formData.accept_terms
      ) {
        setDisableNext(false);
      }
    }
    if (step === 2 || step === 3 || step === 4) {
      setDisableNext(false);
    }
  };

  useEffect(() => {
    nextOrNot(activeStep);
  });

  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent={'left'}>
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
          (activeStep === 2 && <SvgSignUpProfileStep height={'569px'} width={'256px'} />) ||
          (activeStep === 3 && <SvgSignUpfocusAreasStep height={'569px'} width={'256px'} />) ||
          (activeStep === 4 && <SvgSignUpProfileStep height={'569px'} width={'256px'} />) ||
          (activeStep === 5 && <SvgSignUpFinishedStep height={'569px'} width={'256px'} />)}
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
              {activeStep === 0 && (
                <StepZero
                  classes={classes}
                  formData={formData}
                  handleNext={handleNext}
                  handleChange={handleChange}
                  handleSelectChange={handleSelectChange}
                  makeStateSelectOptions={makeStateSelectOptions}
                />
              )}
              {activeStep === 1 && (
                <StepOne
                  classes={classes}
                  formData={formData}
                  emailError={emailError}
                  handleChange={handleChange}
                />
              )}
              {activeStep === 2 && (
                <StepTwo classes={classes} formData={formData} handleChange={handleChange} />
              )}
              {activeStep === 3 && (
                <StepThree classes={classes} formData={formData} makeChips={makeChips} />
              )}
              {activeStep === 4 && (
                <StepFour classes={classes} formData={formData} handleChange={handleChange} />
              )}
              {activeStep === 5 && <StepFive classes={classes} formData={formData} />}
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
                      activeStep === 1 || activeStep === 2 || activeStep === 3 || activeStep === 4
                        ? 'right'
                        : 'space-between',
                  }}
                >
                  {(activeStep === 0 ||
                    activeStep === 1 ||
                    activeStep === 2 ||
                    activeStep === 3 ||
                    activeStep === 4) && (
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
                    activeStep === 3 ||
                    activeStep === 4) && (
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleNext}
                      disabled={disableNext}
                    >
                      Next
                    </Button>
                  )}
                  <Box />
                </Box>
              </Box>
            </Box>
            {isLoading && <Typography>Loading</Typography>}
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default SignupNonProfit;
