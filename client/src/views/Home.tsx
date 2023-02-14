import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';

import type { Theme } from '@mui/material/styles';

import Carousel from '../components/Carousel';
import Search from '../components/Search';
import AssetsList from './AssetsList';
import { placeholderImg } from '../assets/temp';
import QuestionList from '../components/QuestionList';
import BannerSection from '../components/BannerSection';
import routes from '../routes';
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
  { question: 'Can someone pick up the item?', answer: loremIpsum.slice(0, 150) },
  { question: 'Can I collect items on the site?', answer: loremIpsum.slice(0, 150) },
  { question: 'Is this platform free?', answer: loremIpsum.slice(0, 150) },
  { question: 'Other questions about this service?', answer: loremIpsum.slice(0, 150) },
];

const useStyles = makeStyles((theme: Theme) => ({
  videoSection: {
    backgroundColor: '#1fc8db',
    backgroundImage: 'linear-gradient(140deg, #ffffff 0%, #66ffff 50%, #000000 75%)',
    padding: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoSectionText: {
    color: 'white',
    padding: '0 0 0 5%',
  },
  needsAndOffers: {
    padding: '10%',
  },
  faqs: {
    display: 'flex',
    height: 'auto',
    overflow: 'auto',
  },
  faqsVisual: {
    width: '33%',
    background: '#FFC958',
    borderRadius: '0px 20px 0px 0px',
    position: 'relative',
  },
  faqsImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: '40px',
    paddingRight: '40px',
  },
  faqsInfo: {
    width: '67%',
    paddingLeft: '80px',
    paddingRight: '130px',
    paddingTop: '40px',
  },
  faqsHeader: {
    paddingBottom: '30px',
  },
  faqsSubheader: {
    paddingBottom: '20px',
    color: '#6E6E6E',
  },
  faqsQuestions: {
    paddingTop: '20px',
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

function HeaderContentRight(): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <NavLink to={routes.Assets.path}>See all Needs and Offers</NavLink>
      <NavLink to={routes.NeedForm.path} className={classes.makeAPostLink}>
        <Button className={classes.makeAPostButton} color="primary" variant="contained">
          Make a Post
        </Button>
      </NavLink>
    </div>
  );
}

function Home(): JSX.Element {
  const ASSETS_API_URL = `${APP_API_BASE_URL}/assets`;
  const classes = useStyles();
  const [donations, setDonations] = React.useState<Asset[]>([]);
  const [requests, setRequests] = React.useState<Asset[]>([]);

  React.useEffect(() => {
    // fetch assets with querySearchText
    const assetsApiDonate = new URL(ASSETS_API_URL);
    assetsApiDonate.searchParams.append('type', 'donation');
    assetsApiDonate.searchParams.append('limit', '3');
    assetsApiDonate.searchParams.append('offset', '0');
    fetch(assetsApiDonate.href)
      .then((resp) => resp.json())
      .then((data: Asset[]) => {
        setDonations(data);
      });
    const assetsApiRequest = new URL(ASSETS_API_URL);
    assetsApiRequest.searchParams.append('type', 'request');
    assetsApiRequest.searchParams.append('limit', '3');
    assetsApiRequest.searchParams.append('offset', '0');
    fetch(assetsApiRequest.href)
      .then((resp) => resp.json())
      .then((data: Asset[]) => {
        setRequests(data);
      });
  }, []);

  return (
    <>
      <div className={classes.searchContainer}>
        <Search />
      </div>
      <BannerSection />
      <CallToActionCards />
      <div className={classes.needsAndOffers}>
        <AssetsList
          assets={requests}
          headerContentRight={<HeaderContentRight />}
          headerText="Nonprofit Needs"
        />
        <AssetsList assets={donations} headerText="Offers" />
      </div>
      <div className={classes.videoSection}>
        <img src={placeholderImg} alt="video placeholder" />
        <Typography
          variant="h4"
          component="div"
          align="center"
          className={classes.videoSectionText}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper et purus
          vestibulum consequat.
        </Typography>
      </div>
      <Carousel label={'Recent Needs From Nonprofits'} cardGroups={carouselSteps} />
      <div className={classes.faqs}>
        <div className={classes.faqsVisual}>
          <img src={placeholderImg} alt="FAQs Image" className={classes.faqsImage} />
        </div>
        <div className={classes.faqsInfo}>
          <Typography variant="h4" component="h4">
            FAQs
          </Typography>
          <Typography className={classes.faqsSubheader}>
            Frequently asked questions by our community
          </Typography>
          <QuestionList questionList={faqQuestions}></QuestionList>
          <Button
            variant="outlined"
            sx={{
              mt: '60px',
              mb: '101px',
              borderRadius: '10px',
              color: '#323232',
              fontWeight: 'bold',
              borderColor: '#323232',
            }}
          >
            View More
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
