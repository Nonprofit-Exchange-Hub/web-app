import * as React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

import Search from '../components/Search';
import QuestionList from '../components/QuestionList';
import BannerSection from '../components/BannerSection';
import NeedsCarousel from '../components/NeedsCarousel';
import DonationsCarousel from '../components/DonationsCarousel';
import routes from '../routes/routes';
import CallToActionCards from '../components/CallToActionCards';
import { APP_API_BASE_URL } from '../configs';

import type { Asset } from '../types';

const carouselSteps = [
  [
    {
      label: 'cat 1',
      imgPath: 'http://placekitten.com/150/150',
    },
    {
      label: 'cat 1',
      imgPath: 'http://placekitten.com/151/151',
    },
    {
      label: 'cat 1',
      imgPath: 'http://placekitten.com/152/152',
    },
    {
      label: 'cat 1',
      imgPath: 'http://placekitten.com/153/153',
    },
  ],
  [
    {
      label: 'cat 2',
      imgPath: 'http://placekitten.com/154/154',
    },
    {
      label: 'cat 2',
      imgPath: 'http://placekitten.com/155/155',
    },
    {
      label: 'cat 2',
      imgPath: 'http://placekitten.com/156/156',
    },
    {
      label: 'cat 2',
      imgPath: 'http://placekitten.com/157/157',
    },
  ],
  [
    {
      label: 'cat 3',
      imgPath: 'http://placekitten.com/158/158',
    },
    {
      label: 'cat 3',
      imgPath: 'http://placekitten.com/159/159',
    },
    {
      label: 'cat 3',
      imgPath: 'http://placekitten.com/160/160',
    },
    {
      label: 'cat 3',
      imgPath: 'http://placekitten.com/161/161',
    },
  ],
];

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.';

const faqQuestions = [
  { question: 'How does it work?', answer: loremIpsum.slice(0, 150) },
  { question: 'Who can use the platform?', answer: loremIpsum.slice(0, 150) },
  { question: 'What services can I offer?', answer: loremIpsum.slice(0, 150) },
];

const useStyles = makeStyles(() => ({
  needsAndOffers: {
    padding: '10%',
  },
  faqs: {
    padding: '10%',
  },
  faqsHeader: {
    paddingBottom: '30px',
  },
  makeAPostButton: {
    marginLeft: '15px',
  },
  makeAPostLink: {
    textDecoration: 'none',
  },
  searchContainer: {
    maxWidth: '980px',
    width: '70%',
    margin: '30px auto',
  },
}));

function Home(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <div className={classes.searchContainer}>
        <Search />
      </div>
      <BannerSection />
      <NeedsCarousel label={'Recent Needs From Nonprofits'} />
      <DonationsCarousel label={'Recent Offers From Users'} />
      <div className={classes.faqs}>
        <Typography variant="h4" component="h4" className={classes.faqsHeader}>
          FAQs
        </Typography>
        <QuestionList questionList={faqQuestions}></QuestionList>
      </div>
    </>
  );
}

export default Home;
