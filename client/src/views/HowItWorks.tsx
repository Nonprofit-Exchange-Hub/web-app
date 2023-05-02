/* eslint-disable prettier/prettier */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Grid, Button } from '@mui/material';
import type { Theme } from '@mui/material/styles'; 
import HowItworks1 from '../assets/HowItWorks/HowItWorks1.svg';
import HowItworks2 from '../assets/HowItWorks/HowItWorks2.svg';
import HowItworks3 from '../assets/HowItWorks/HowItWorks3.svg';
import HowItworks4 from '../assets/HowItWorks/HowItWorks4.svg';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';

const nonprofitInstructionList = [
  {
    title: 'Sign up with Givingful',
    body: 'Create a profile to let our community know about your nonprofit.',
    image: 'https://picsum.photos/seed/nonprofit/600',
    buttonText: 'View More',
  },
  {
    title: 'Share your nonprofit’s needs',
    body: 'Post a description of items and skills that can help your organization.',
    image: 'https://picsum.photos/seed/nonprofit/600',
    buttonText: 'Post a Need',
  },
  {
    title: 'Claim an offer',
    body: 'Coordinate to receive goods offered by those in the community.',
    image: 'https://picsum.photos/seed/nonprofit/600',
    buttonText: 'See Offers',
  },
  {
    title: 'Succeed in your goals',
    body: 'See your nonprofit thrive with your community’s help.',
    image: 'https://picsum.photos/seed/nonprofit/600',
    buttonText: 'Read Testimonials',
  },
]; 

const citizenInstructionList = [
  {
    title: 'Sign up with Givingful',
    body: 'Create a profile to let our community know about your nonprofit.',
    image: 'https://picsum.photos/seed/nonprofit/600',
    buttonText: 'View More',
  },
  {
    title: 'Post your donation',
    body: loremIpsum,
    image: 'https://picsum.photos/seed/picsum/600',
    buttonText: 'View More',
  },
  {
    title: 'Connect with nonprofits',
    body: loremIpsum,
    image: 'https://picsum.photos/seed/picsum/600',
    buttonText: 'View More',
  },
  {
    title: 'Make a difference',
    body: loremIpsum,
    image: 'https://picsum.photos/seed/picsum/600',
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
    minWidth: '200px'
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
    <Box sx={{ margin: 'auto', width: '80%', marginY: '50px'}}>
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
      <Typography sx={{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '40px',
        lineHeight: '48px',
        textAlign: 'center',
        mt: '10px',
        mb: '10px'
      }}>
        How it Works
      </Typography>
      <HowItWorksCards instructionList={ tabSelected === 'nonprofit' ? nonprofitInstructionList : citizenInstructionList } />
    </Box>
  );
}

export default HowItWorks;

type HowItWorksCardsProps = {
  instructionList: { title: string; body: string; image: string, buttonText: string }[];
};

function HowItWorksCards(props: HowItWorksCardsProps) {
  const howItWorksImages = [HowItworks1, HowItworks2, HowItworks3, HowItworks4];
  
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '0px',
      justifyContent: 'center',
      alignItems: 'center',
      '@media (max-width: 960px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      '@media (max-width: 600px)': {
        gridTemplateColumns: '1fr',
      },
    }}>
      {props.instructionList.map((instructionItem, i) => {
          return (
            <Box sx={{
              textAlign: 'center',
              mb: '20px',
              backgroundColor: 'white',
            }}>
              <Box sx={{ height: '200px', display: 'flex', alignItems: 'bottom', }}>
                <img src={howItWorksImages[i]} alt="How It Works" width="100%"/>
              </Box>
              <Box sx={{marginX: '10px', minHeight: '230px'}}>
                <Typography sx={{    
                  minHeight: '100px',              
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  mt: '0px',
                  mb: '10px'
                }}>
                  {instructionItem.title}
                </Typography>
                <Typography variant='body1'>
                  {instructionItem.body}
                </Typography>
              </Box>
              {/* reminder - make button template */}
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'bottom', mt: '30px'}}>
                <Button
                sx={{
                  padding: '0.4rem 1rem 0.4rem 1rem',
                  border: '1px solid #323232',
                  borderRadius: '8px',
                  color: '#323232',
                  fontWeight: '900',
                  fontSize: '1rem',
                }}>
                  {instructionItem.buttonText}
                </Button>
              </Box>
            </Box>
          );
        })
      }
  </Box>
  );
}
