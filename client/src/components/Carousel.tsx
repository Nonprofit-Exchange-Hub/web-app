import * as React from 'react';
// import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import makeStyles from '@mui/styles/makeStyles';
import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  topBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 0 1rem 0',
  },
  bannerLeft: {
    display: 'flex',
  },
  bannerRight: {},
  carouselContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carouselWrapper: {
    margin: 'auto',
    width: '80%',
  },
  questions: {
    margin: '0.75rem 0 0 3rem',
    color: 'gray',
  },
}));

type CarouselProps = {
  steps: { label: string; imgPath: string }[];
};

function Carousel(props: CarouselProps) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const maxSteps = props.steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div className={classes.carouselWrapper}>
      <div className={classes.topBanner}>
        <div className={classes.bannerLeft}>
          <Paper square elevation={0}>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '2rem' }}>
              Recent Needs From Nonprofits
            </Typography>
          </Paper>
          <a href="#" className={classes.questions}>
            Questions?
          </a>
        </div>
        <div className={classes.bannerRight}>
          <Button
            href="#"
            sx={{
              padding: '0.4rem 1rem 0.4rem 1rem',
              border: '1px solid #323232',
              borderRadius: '8px',
              color: '#323232',
              fontWeight: '900',
              fontSize: '1rem',
            }}
          >
            View More
          </Button>
          <Button
            sx={{ padding: '0' }}
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <ExpandCircleDownOutlinedIcon
              sx={{
                color: activeStep === 0 ? '#a2a1a1' : '#323232',
                fontSize: '3rem',
                transform: 'rotate(90deg)',
              }}
            />
          </Button>
          <Button
            sx={{ padding: '0' }}
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            <ExpandCircleDownOutlinedIcon
              sx={{
                color: activeStep === maxSteps - 1 ? '#a2a1a1' : '#323232',
                fontSize: '3rem',
                transform: 'rotate(270deg)',
              }}
            />
          </Button>
        </div>
      </div>
      <div className={classes.carouselContent}>
        <img src={props.steps[activeStep].imgPath} alt={props.steps[activeStep].label} />
        <img src={props.steps[activeStep].imgPath} alt={props.steps[activeStep].label} />
        <img src={props.steps[activeStep].imgPath} alt={props.steps[activeStep].label} />
        <img src={props.steps[activeStep].imgPath} alt={props.steps[activeStep].label} />
      </div>
    </div>
  );
}

export default Carousel;
