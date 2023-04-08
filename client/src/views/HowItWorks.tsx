import * as React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Grid, Container } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { InstructionGrid } from '../components/DisplayGrids';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.';

const nonprofitInstructionList = [
  {
    title: '1. Post your Need.',
    body: loremIpsum,
    image: 'https://picsum.photos/seed/nonprofit/600',
  },
  {
    title: '2. Connect with donors.',
    body: loremIpsum,
    image: 'https://picsum.photos/seed/nonprofit/600',
  },
  {
    title: '3. Accomplish Goal.',
    body: loremIpsum,
    image: 'https://picsum.photos/seed/nonprofit/600',
  },
];
const citizenInstructionList = [
  {
    title: '1. Post your donation',
    body: loremIpsum,
    image: 'https://picsum.photos/seed/picsum/600',
  },
  {
    title: '2. Connect with nonprofits',
    body: loremIpsum,
    image: 'https://picsum.photos/seed/picsum/600',
  },
  {
    title: '3. Make a difference',
    body: loremIpsum,
    image: 'https://picsum.photos/seed/picsum/600',
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  questionSection: {
    width: '100%',
    padding: '0 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greySection: {
    backgroundColor: '#C4C4C4',
  },
  columns: {
    display: 'flex',
  },
  titleBox: {
    height: 200,
    backgroundColor: '#C4C4C4',
  },
  tabs: {
    margin: 'auto',
    padding: '0',
    borderBottom: '1px solid #C4C4C4',
    '& .MuiContainer-root': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  tabMenuLink: {
    padding: '20px',
    paddingBottom: '0!important',
  },
  button: {
    fontSize: '2rem',
    margin: '20px 0 0 0',
    borderBottom: '11px solid #FFFFFF',
  },
  hidden: {
    display: 'none',
  },
  selected: {
    borderBottom: `11px solid ${theme.palette.primary.main}`,
  },
  questions: {
    alignSelf: 'flex-end',
    width: '100%',
    maxWidth: '700px',
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
    <>
      <Box className={`${classes.titleBox}`}></Box>

      <Box className={`${classes.tabs}`}>
        <Container>
          <Grid container justifyContent="space-between">
            <Grid
              container
              item
              sm={6}
              xs={12}
              onClick={() => handleClickTab('nonprofit')}
              className={classes.tabMenuLink}
            >
              <h3
                className={`${classes.button} ${
                  tabSelected === 'nonprofit' ? classes.selected : ''
                }`}
              >
                For Nonprofits
              </h3>
            </Grid>
            <Grid
              container
              item
              sm={6}
              xs={12}
              onClick={() => handleClickTab('citizen')}
              className={classes.tabMenuLink}
            >
              <h3
                className={`${classes.button} ${tabSelected === 'citizen' ? classes.selected : ''}`}
              >
                For Individuals
              </h3>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container>
        <InstructionGrid
          instructionList={
            tabSelected === 'nonprofit' ? nonprofitInstructionList : citizenInstructionList
          }
        ></InstructionGrid>
      </Container>
    </>
  );
}

export default HowItWorks;
