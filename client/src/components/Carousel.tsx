import * as React from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const steps = [
  {
    label: 'cat 1',
    imgPath: 'http://placekitten.com/200/200',
  },
  {
    label: 'cat 2',
    imgPath: 'http://placekitten.com/199/199',
  },
  {
    label: 'cat 3',
    imgPath: 'http://placekitten.com/201/201',
  },
];

function SwipeableTextMobileStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div>
      <Paper square elevation={0}>
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <img src={steps[activeStep].imgPath} alt={steps[activeStep].label} />
        <img src={steps[activeStep].imgPath} alt={steps[activeStep].label} />
        <img src={steps[activeStep].imgPath} alt={steps[activeStep].label} />
      </div>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
}

export default SwipeableTextMobileStepper;
