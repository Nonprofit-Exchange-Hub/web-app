import * as React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Grid, Container } from '@mui/material';

import type { Theme } from '@mui/material/styles';

import SmallDisplayCard from '../components/SmallDisplayCard';
import { GridImages } from '../components/DisplayGrids';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.';

const bios: { id: number; name: string; image: string }[] = [
  { id: 1, name: 'Bob', image: '../blank-bio-pic.png' },
  { id: 2, name: 'Kathy', image: '../blank-bio-pic.png' },
  { id: 3, name: 'Fred', image: '../blank-bio-pic.png' },
  { id: 4, name: 'Alice', image: '../blank-bio-pic.png' },
  { id: 5, name: 'Zachary', image: '../blank-bio-pic.png' },
  { id: 6, name: 'Emily', image: '../blank-bio-pic.png' },
  { id: 7, name: 'Albert', image: '../blank-bio-pic.png' },
  { id: 8, name: 'Zoe', image: '../blank-bio-pic.png' },
];
const orgs: { id: number; name: string; image: string }[] = [
  { id: 1, name: 'Google', image: '' },
  { id: 2, name: 'Twitter', image: '' },
  { id: 3, name: 'Facebook', image: '' },
  { id: 4, name: 'Chrome', image: '' },
  { id: 5, name: 'Amazon', image: '' },
  { id: 6, name: 'UnOrg', image: '' },
  { id: 7, name: 'Nonprofit', image: '' },
  { id: 8, name: 'GiveCycle', image: '' },
];
const missionStatements = [
  { row: 1, title: 'Mission Statement', text: loremIpsum.slice(0, 97) },
  { row: 2, title: 'Vision Statement', text: loremIpsum.slice(0, 97) },
  { row: 3, title: 'Values', text: loremIpsum.slice(0, 97) },
];
const wideImage = '../small-images/island-orange.jpg';
const smallImages = [
  '../small-images/green-forest.jpg',
  '../small-images/lake-forest.jpg',
  '../small-images/green-forest.jpg',
  '../small-images/lake-forest.jpg',
  '../small-images/green-forest.jpg',
  '../small-images/lake-forest.jpg',
  '../small-images/green-forest.jpg',
  '../small-images/lake-forest.jpg',
  '../small-images/green-forest.jpg',
];

const useStyles = makeStyles((theme: Theme) => ({
  titleBox: {
    height: 600,
    margin: 'auto',
  },
  whyContainer: {
    backgroundColor: '#EBEBEB',
  },
  centerHorizontally: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  whyImagePlaceholder: {
    width: '100%',
    maxWidth: '474px',
    height: '300px',
    border: '1px solid black',
    backgroundColor: '#C4C4C4',
  },
  biosImagePlaceholder: {
    width: '168px',
    height: '168px',
    border: '1px solid black',
    backgroundColor: '#C4C4C4',
    '& img': {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
  },
  biosContainer: {
    '& $MuiTypography-body1': {
      marginBottom: '20px',
    },
  },
  biosImagesContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  biosItem: {
    padding: '15px',
  },
  trustContainer: {
    backgroundColor: '#EBEBEB',
  },
  trustContent: {
    position: 'relative',
    zIndex: 10,
  },
  trustImage: {
    width: '90%',
    height: '389px',
    border: '1px solid black',
    backgroundColor: '#C4C4C4',
    margin: '40px auto 20px auto',
  },
  buttonRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingTop: '30px',
    paddingBottom: '10px',
    '& > div': {
      margin: '10px',
    },
  },
  guidelinesBGWrapper: {
    position: 'relative',
    width: '100%',
    height: '0',
    zIndex: 2,
    '& svg': {
      position: 'absolute',
      top: '-300px',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '300px',
      fill: '#F8F8F8',
    },
  },
  orgContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  orgImage: {
    width: '60px',
    height: '60px',
    border: '1px solid black',
    backgroundColor: '#000000',
    borderRadius: '50%',
    margin: '30px 80px 30px 80px',
  },
  titleText: {
    fontSize: '1.3rem',
    marginTop: '6px',
  },
}));

function AboutUs() {
  const classes = useStyles();

  return (
    <>
      {/*
        Add this back in when we have a header image
        <Box className={`${classes.titleBox} ${classes.mainPageSection}`}>
      */}
      <Box className={`${classes.whyContainer}`}>
        <Container>
          <Typography variant="h3" component="h3" align="left">
            Why was NEH created?
          </Typography>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} sm={6} md={8}>
              <Typography variant="body1" component="div">
                {loremIpsum}
                {loremIpsum}
              </Typography>
            </Grid>
            <Grid item xs sm>
              <Box className={classes.whyImagePlaceholder}></Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container>
        <Typography variant="h3" component="h3" align="center">
          Org mission & values
        </Typography>
        <Typography variant="body1" component="div">
          {loremIpsum}
        </Typography>
        <GridImages
          missionStatements={missionStatements}
          wideImage={wideImage}
          smallImages={smallImages}
        ></GridImages>
      </Container>
      <Container className={`${classes.biosContainer}`}>
        <Typography variant="h3" component="h3" align="center">
          Who we are (bios)
        </Typography>
        <Typography variant="body1" component="div">
          {loremIpsum}
        </Typography>
        <Box className={`${classes.biosImagesContainer}`}>
          {bios.map((person) => {
            return (
              <Box key={person.id} className={`${classes.biosItem}`}>
                <Box className={classes.biosImagePlaceholder}>
                  <img src={`${person.image}`} alt={`Bio pic for ${person.name}`} />
                </Box>
                <Typography className={classes.titleText} variant="body1" component="div">
                  {person.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
      <Box className={`${classes.trustContainer}`}>
        <Container>
          <Box className={`${classes.trustContent}`}>
            <Typography variant="h3" component="h3" align="center">
              Trust, Safety, & Privacy
            </Typography>
            <Typography variant="body1" component="div">
              {loremIpsum}
            </Typography>
            <Box className={`${classes.trustImage}`}></Box>
            <Box className={`${classes.buttonRow}`}>
              <SmallDisplayCard headerText="Trust" bodyText={loremIpsum.slice(0, 56)} />
              <SmallDisplayCard headerText="Safety" bodyText={loremIpsum.slice(0, 56)} />
              <SmallDisplayCard headerText="Privacy" bodyText={loremIpsum.slice(0, 56)} />
            </Box>
          </Box>
        </Container>
        <Box className={classes.guidelinesBGWrapper}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </Box>
      </Box>
      <Container>
        <Typography variant="h3" component="h3" align="center">
          Partnerships w/ organizations
        </Typography>
        <Typography variant="body1" component="div">
          {loremIpsum}
        </Typography>
        <Box className={`${classes.orgContent}`}>
          {orgs.map((value) => (
            <Box key={value.id} className={classes.orgImage} />
          ))}
        </Box>
      </Container>
    </>
  );
}

export default AboutUs;
