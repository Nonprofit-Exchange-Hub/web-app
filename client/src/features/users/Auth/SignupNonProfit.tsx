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
import { ApprovalStatus, Organization, Role, UserEntity, UserOrg } from '../../../types';

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

const defaultOrg: Organization = {
  name: '',
  doing_business_as: '',
  city: '',
  state: '',
  ein: '',
  description: '',
  website: '',
  address: '',
  phone: '',
  nonprofit_classification: '',
};

const defaultUser: UserEntity = {
  firstName: '',
  last_name: '',
  email: '',
};

const defaultUserOrg: UserOrg = {
  approvalStatus: ApprovalStatus.pending,
  role: Role.owner,
};

function SignupNonProfit() {
  const classes = useStyles();
  const labels = ['First Step', 'Second Step', 'Confirmation'];
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [org, setOrg] = React.useState<Organization>(
    (JSON.parse(sessionStorage.getItem('org') as string) as Organization) ?? defaultOrg,
  );
  const [user, setUser] = React.useState<UserEntity>(
    (JSON.parse(sessionStorage.getItem('user') as string) as UserEntity) ?? defaultUser,
  );

  const [userOrg, setUserOrg] = React.useState<UserOrg>(
    (JSON.parse(sessionStorage.getItem('org') as string) as UserOrg) ?? defaultUserOrg,
  );

  const onChildSetParentOrg = (org: Organization): void => {
    sessionStorage.setItem('org', JSON.stringify(org));
    setOrg(org);
  };

  const onChildSetParentUserOrg = (userOrg: UserOrg): void => {
    sessionStorage.setItem('userOrg', JSON.stringify(userOrg));
    setUserOrg(userOrg);
  };

  const onChildSetParentUser = (user: UserEntity): void => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const handleSteps = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CreateOrgForm
            parentOrg={org}
            setParentOrg={onChildSetParentOrg}
            triggerNextStep={setActiveStep}
            classes={classes}
          />
        );
      case 1:
        return (
          <UserOrgForm
            orgFromPreviousStep={org}
            parentUser={user}
            parentUserOrg={userOrg}
            setParentUser={onChildSetParentUser}
            setParentUserOrg={onChildSetParentUserOrg}
            triggerNextStep={setActiveStep}
            classes={classes}
          />
        );
      case 2:
        return <Confirmation onStepChange={setActiveStep} />;
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
