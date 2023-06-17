import * as React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Box, Grid } from '@mui/material';

import type { Theme } from '@mui/material/styles';
import HowItWorksCards from './HowItWorksCards';
import HowItworksStep1 from '../assets/HowItWorks/people-signup.svg';
import HowItworksStep2 from '../assets/HowItWorks/people-sharing.svg';
import HowItworksStep3 from '../assets/HowItWorks/people-working.svg';
import HowItworksStep4 from '../assets/HowItWorks/people-flag.svg';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';

const nonprofitinstructionsArray = [
  {
    title: 'Sign up with Givingful',
    body: 'Create a profile to let our community know about your nonprofit.',
    image: HowItworksStep1,
    buttonText: 'View More',
  },
  {
    title: 'Share your nonprofit’s needs',
    body: 'Post a description of items and skills that can help your organization.',
    image: HowItworksStep2,
    buttonText: 'Post a Need',
  },
  {
    title: 'Claim an offer',
    body: 'Coordinate to receive goods offered by those in the community.',
    image: HowItworksStep3,
    buttonText: 'See Offers',
  },
  {
    title: 'Succeed in your goals',
    body: 'See your nonprofit thrive with your community’s help.',
    image: HowItworksStep4,
    buttonText: 'Read Testimonials',
  },
];

const citizeninstructionsArray = [
  {
    title: 'Sign up with Givingful',
    body: 'Create a profile to let our community know about your nonprofit.',
    image: HowItworksStep1,
    buttonText: 'View More',
  },
  {
    title: 'Post your donation',
    body: loremIpsum,
    image: HowItworksStep2,
    buttonText: 'View More',
  },
  {
    title: 'Connect with nonprofits',
    body: loremIpsum,
    image: HowItworksStep3,
    buttonText: 'View More',
  },
  {
    title: 'Make a difference',
    body: loremIpsum,
    image: HowItworksStep4,
    buttonText: 'View More',
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  columns: {
    display: 'flex',
  },
  tabs: {
    padding: '0',
  },
  tabsGrid: {
    gridTemplateColumns: 'repeat(2, 3fr)',
    justifyItems: 'start',
  },
  tabMenuLink: {
    padding: '10px',
    paddingBottom: '0!important',
    minWidth: '200px',
  },
  button: {
    fontFamily: 'Poppins',
    fontSize: '1.5rem',
  },
  selected: {
    fontWeight: 500,
    borderRadius: '5px',
    borderBottom: `8px solid #EF6A60`,
  },
  hidden: {
    display: 'none',
  },
}));

function HowItWorks() {
  const classes = useStyles();

  type Tab = 'nonprofit' | 'citizen';

  const [tabSelected, setTabSelected] = React.useState<Tab>('nonprofit');

  const handleClickTab = (tabName: Tab) => {
    setTabSelected(tabName);
  };

  return (
    <Box sx={{ margin: 'auto', width: '80%', marginY: '50px' }}>
      <Box className={`${classes.tabs}`}>
        <Grid container className={`${classes.tabsGrid}`}>
          <Grid
            container
            item
            sm={2}
            xs={6}
            onClick={() => handleClickTab('nonprofit')}
            className={classes.tabMenuLink}
          >
            <Box
              className={`${classes.button} ${tabSelected === 'nonprofit' ? classes.selected : ''}`}
            >
              For Nonprofits
            </Box>
          </Grid>
          <Grid
            container
            item
            sm={2}
            xs={6}
            onClick={() => handleClickTab('citizen')}
            className={classes.tabMenuLink}
          >
            <Box
              className={`${classes.button} ${tabSelected === 'citizen' ? classes.selected : ''}`}
            >
              For Individuals
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: '40px',
          lineHeight: '48px',
          textAlign: 'center',
          mt: '20px',
          mb: '40px',
        }}
      >
        How it Works
      </Typography>
      <HowItWorksCards
        instructionsArray={
          tabSelected === 'nonprofit' ? nonprofitinstructionsArray : citizeninstructionsArray
        }
      />
    </Box>
  );
}

export default HowItWorks;
