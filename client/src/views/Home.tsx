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

import type { Asset } from '../types';
import { APP_API_BASE_URL } from '../configs';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.';

const faqQuestions = [
  { question: 'How does it work?', answer: loremIpsum.slice(0, 150) },
  { question: 'Who can use the platform?', answer: loremIpsum.slice(0, 150) },
  { question: 'What services can I offer?', answer: loremIpsum.slice(0, 150) },
];

const useStyles = makeStyles((theme: Theme) => ({
  hero: {
    backgroundImage: `url("${placeholderImg}")`,
    backgroundSize: '100%',
    backgroundPosition: 'center center',
    minHeight: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'inherit',
      borderRadius: '10px',
    },
  },
  divider: {
    height: 42,
    margin: 4,
  },
  heroText: {
    margin: 'auto',
    textAlign: 'left',
  },
  heroContent: {
    width: '50%',
    marginLeft: '10%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 90,
  },
  select: {
    '&:before': {
      borderBottom: 'none',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
  },
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
  videoSectionVideo: {},
  needsAndOffersSub: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    margin: '3%',
  },
  cardImg: {
    borderRadius: '5px',
    margin: '10%',
    maxWidth: '80%',
  },
  needsAndOffersHeader: {
    textAlign: 'left',
  },
  needsAndOffers: {
    padding: '10%',
  },
  faqs: {
    padding: '10%',
  },
  faqsHeader: {
    paddingBottom: '30px',
  },
  cardText1: {
    padding: '0 10%',
  },
  cardText2: {
    padding: '0 10% 10%',
  },
  makeAPostButton: {
    marginLeft: '15px',
  },
  makeAPostLink: {
    textDecoration: 'none',
  },
  searchContainer: {
    marginTop: '-10px',
    marginLeft: '15%',
    width: '70%',
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
    assetsApiRequest.searchParams.append('limit', '15');
    assetsApiRequest.searchParams.append('offset', '0');
    fetch(assetsApiRequest.href)
      .then((resp) => resp.json())
      .then((data: Asset[]) => {
        setRequests(data);
      });
  }, []);

  return (
    <>
      <div className={classes.hero}>
        <div className={classes.searchContainer}>
          <Search />
        </div>
        <div className={classes.heroContent}>
          <Typography className={classes.heroText} variant="h3" component="h1" color="textPrimary">
            Support local nonprofits through the giving economy.
          </Typography>
        </div>
      </div>
      <BannerSection />
      <div className={classes.needsAndOffers}>
        <AssetsList
          assets={requests}
          headerContentRight={<HeaderContentRight />}
          headerText="Nonprofit Needs"
        />
        <AssetsList assets={donations} headerText="Offers" />
      </div>
      <div className={classes.videoSection}>
        <div className={classes.videoSectionVideo}>
          <img src={placeholderImg} alt="video placeholder" />
        </div>
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
      <Carousel label={'Recent Needs From Nonprofits'} assets={requests} />
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
