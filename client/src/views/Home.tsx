import Search from '../components/Search';
import BannerSection from '../components/BannerSection';
import NeedsCarousel from '../components/NeedsCarousel';
import DonationsCarousel from '../components/DonationsCarousel';
import FAQs from '../components/FAQs';

function Home(): JSX.Element {
  return (
    <>
      <Search />
      <BannerSection />
      <NeedsCarousel label={'Recent Needs From Nonprofits'} />
      <DonationsCarousel label={'Recent Offers From Users'} />
      <FAQs />
    </>
  );
}

export default Home;
