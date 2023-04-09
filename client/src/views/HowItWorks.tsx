/* eslint-disable prettier/prettier */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Grid } from '@mui/material';
import type { Theme } from '@mui/material/styles'; 
import HowItworksImage from '../assets/HowItWorksIllustration.svg';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';

const nonprofitInstructionList = [
  {
    title: 'Sign up with Givingful',
    body: 'Create a profile to let our community know about your nonprofit.',
    image: 'https://picsum.photos/seed/nonprofit/600',
  },
  {
    title: 'Share your nonprofit’s needs',
    body: 'Post a description of items and skills that can help your organization.',
    image: 'https://picsum.photos/seed/nonprofit/600',
  },
  {
    title: 'Claim an offer',
    body: 'Coordinate to receive goods offered by those in the community.',
    image: 'https://picsum.photos/seed/nonprofit/600',
  },
  {
    title: 'Succeed in your goals',
    body: 'See your nonprofit thrive with your community’s help.',
    image: 'https://picsum.photos/seed/nonprofit/600',
  },
]; 

const citizenInstructionList = [
  {
    title: 'Sign up with Givingful',
    body: 'Create a profile to let our community know about your nonprofit.',
    image: 'https://picsum.photos/seed/nonprofit/600',
  },
  {
    title: 'Post your donation',
    body: loremIpsum,
    image: 'https://picsum.photos/seed/picsum/600',
  },
  {
    title: 'Connect with nonprofits',
    body: loremIpsum,
    image: 'https://picsum.photos/seed/picsum/600',
  },
  {
    title: 'Make a difference',
    body: loremIpsum,
    image: 'https://picsum.photos/seed/picsum/600',
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
    padding: '0px',
    paddingBottom: '0!important',
  },
  button: {
    fontFamily: 'Poppins',
    fontSize: '1.5rem',
  },
  selected: {
    fontWeight: 500,
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
    <Box sx={{ margin: 'auto', width: '80%', marginY: '50px'}}>
      <Box className={`${classes.tabs}`}>
          <Grid container className={`${classes.tabsGrid}`}>
            <Grid
              container
              item
              sm={2}
              xs={12}
              onClick={() => handleClickTab('nonprofit')}
              className={classes.tabMenuLink}
            >
              <Box
                className={`${classes.button} ${
                  tabSelected === 'nonprofit' ? classes.selected : ''
                }`}
              >
                For Nonprofits
              </Box>
            </Grid>
            <Grid
              container
              item
              sm={2}
              xs={12}
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
      <Typography sx={{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '40px',
        lineHeight: '48px',
        textAlign: 'center',
        marginY: '40px'
      }}>
        How it Works
      </Typography>
      <img src={HowItworksImage} alt="How It Works" width="100%"/>
      <HowItWorksCards instructionList={ tabSelected === 'nonprofit' ? nonprofitInstructionList : citizenInstructionList } />
    </Box>
  );
}

export default HowItWorks;

type HowItWorksCardsProps = {
  instructionList: { title: string; body: string; image: string }[];
};

function HowItWorksCards(props: HowItWorksCardsProps) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
    }}>
      {props.instructionList.map((instructionItem) => {
          return (
            <Box sx={{ textAlign: 'left', marginX: '10px' }}>
              <Typography sx={{                 
                fontSize: '1.8rem',
                fontWeight: 600,
                mt: '20px',
                mb: '20px'
              }}>
                {instructionItem.title}
              </Typography>
              <Typography sx={{
                fontSize: '1.2rem',
                mb: '20px'
              }}>
                {instructionItem.body}
              </Typography>
            </Box>
          );
        })
      }
  </Box>
  );
}
