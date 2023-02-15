import makeStyles from '@mui/styles/makeStyles';

import Search from '../components/Search';
import BannerSection from '../components/BannerSection';
import NeedsCarousel from '../components/NeedsCarousel';
import DonationsCarousel from '../components/DonationsCarousel';
import FAQs from '../components/FAQs';

const useStyles = makeStyles(() => ({
  needsAndOffers: {
    padding: '10%',
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
      <FAQs />
    </>
  );
}

export default Home;
