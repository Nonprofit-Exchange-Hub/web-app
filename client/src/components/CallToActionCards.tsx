import * as React from 'react';

import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';

import CallToActionCard from './CallToActionCard';
import routes from '../routes/routes';

const useStyles = makeStyles()((theme) => ({
  grid: {
    justifyContent: 'center',
    paddingTop: '25px',
  },
}));

function CallToActionCards() {
  const { classes } = useStyles();

  return (
    <Grid className={classes.grid} container gap="20px">
      <Grid item xs={12} sm={3}>
        <CallToActionCard
          headerText="Help For Nonprofits"
          subText="As a nonprofit, you can request the items and skills you need most from the community — for free!"
          btnText="Join Now"
          color="#37718E"
          to={routes.SignupNonProfit.path}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <CallToActionCard
          headerText="Donate Your Time and Skills"
          subText="Use your time and skills for good by volunteering with a local nonprofit."
          btnText="Browse Opportunities"
          color="#7C4164"
          to={`${routes.Assets.path}?category=Volunteer`}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <CallToActionCard
          headerText="Give Items For Good"
          subText="Give your unwanted items to a great cause or donate something new to a nonprofit in need."
          btnText="See What's Needed"
          color="#C33D54"
          to={`${routes.Assets.path}?category=Needs`}
        />
      </Grid>
    </Grid>
  );
}

export default CallToActionCards;
