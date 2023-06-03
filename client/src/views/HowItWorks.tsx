import * as React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Grid } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import HowItWorksCards from './HowItWorksCards';
import HowItworks1 from '../assets/HowItWorks/HowItWorks1.svg';
import HowItworks2 from '../assets/HowItWorks/HowItWorks2.svg';
import HowItworks3 from '../assets/HowItWorks/HowItWorks3.svg';
import HowItworks4 from '../assets/HowItWorks/HowItWorks4.svg';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';

const nonprofitInstructionList = [
  {
    title: 'Sign up with Givingful',
    body: 'Create a profile to let our community know about your nonprofit.',
    image: HowItworks1,
    buttonText: 'View More',
  },
  {
    title: 'Share your nonprofit’s needs',
    body: 'Post a description of items and skills that can help your organization.',
    image: HowItworks2,
    buttonText: 'Post a Need',
  },
  {
    title: 'Claim an offer',
    body: 'Coordinate to receive goods offered by those in the community.',
    image: HowItworks3,
    buttonText: 'See Offers',
  },
  {
    title: 'Succeed in your goals',
    body: 'See your nonprofit thrive with your community’s help.',
    image: HowItworks4,
    buttonText: 'Read Testimonials',
  },
];

const citizenInstructionList = [
  {
    title: 'Sign up with Givingful',
    body: 'Create a profile to let our community know about your nonprofit.',
    image: HowItworks1,
    buttonText: 'View More',
  },
  {
    title: 'Post your donation',
    body: loremIpsum,
    image: HowItworks2,
    buttonText: 'View More',
  },
  {
    title: 'Connect with nonprofits',
    body: loremIpsum,
    image: HowItworks3,
    buttonText: 'View More',
  },
  {
    title: 'Make a difference',
    body: loremIpsum,
    image: HowItworks4,
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
        instructionList={
          tabSelected === 'nonprofit' ? nonprofitInstructionList : citizenInstructionList
        }
      />
    </Box>
  );
}

export default HowItWorks;
