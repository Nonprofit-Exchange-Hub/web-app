import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Step, StepLabel, Stepper, Typography } from '@material-ui/core';

import type { Theme } from '@material-ui/core/styles';

import { placeholderImg } from '../../../assets/temp';
import CreateOrgForm from './Steps/CreateOrgForm';
import UserOrgForm from './Steps/UserOrgForm';
import Confirmation from './Steps/Confirmation';
import StyledLink from '../../../assets/sharedComponents/StyledLink';
import routes from '../../../routes';

const useStyles = makeStyles((theme: Theme) => ({
  sideImg: {
    backgroundImage: `url("${placeholderImg}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },
  signUpContainer: {
    margin: theme.spacing(5),
  },
  button: {
    borderRadius: 0,
    height: 62,
    textTransform: 'none',
    backgroundColor: '#C4C4C4',
    color: 'white',
  },
  header: { fontWeight: 'bold' },
  arrow: { cursor: 'pointer' },
}));

function SignupNonProfit() {
  const classes = useStyles();

  const labels = ['First Step', 'Second Step', 'Confirmation'];
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [newOrgId, setNewOrgId] = React.useState<number>(0);

  const handleChildStepChange = (step: number) => setActiveStep(step);

  const hangleChildNewOrgId = (orgId: number) => setNewOrgId(orgId);

  const handleSteps = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CreateOrgForm
            setNewOrgId={hangleChildNewOrgId}
            triggerNextStep={handleChildStepChange}
            classes={classes}
          />
        );
      case 1:
        return (
          <UserOrgForm orgId={newOrgId} triggerNextStep={handleChildStepChange} classes={classes} />
        );
      case 2:
        return <Confirmation onStepChange={handleChildStepChange} />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid className={classes.sideImg} item xs={5} />
        <Grid container className={classes.signUpContainer} item direction="column" xs={6}>
          <Typography
            className={classes.header}
            variant="h4"
            component="h1"
            align="left"
            gutterBottom
          >
            Let's get started.
          </Typography>
          <Typography component="p" align="left" gutterBottom>
            Already have an account? <StyledLink to={routes.Login.path}>Log In</StyledLink>
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel>
            {labels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {handleSteps(activeStep)}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SignupNonProfit;
