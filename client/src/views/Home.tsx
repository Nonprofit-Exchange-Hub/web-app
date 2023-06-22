import Search from '../components/Search';
import BannerSection from '../components/BannerSection';
import NeedsCarousel from '../components/NeedsCarousel';
import DonationsCarousel from '../components/DonationsCarousel';
import FAQs from '../components/FAQs';
import HowItWorks from './HowItWorks';

function Home(): JSX.Element {
  return (
    <>
      <Search />
      <BannerSection />
      <NeedsCarousel label={'Recent Needs From Nonprofits'} />
      <DonationsCarousel label={'Recent Offers From Users'} />
      <HowItWorks />
      <FAQs />
    </>
  );
}

export default Home;
