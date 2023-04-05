import React from 'react';
import OfferCard from '../components/Card/OfferCard';
import { fetchDonations } from '../FetchActions';
import ResponsiveCarousel from './ResponsiveCarousel';

type DonationsCarouselProps = {
  label: string;
};
export default function DonationsCarousel(props: DonationsCarouselProps) {
  const renderCard = (donation: any) => (
    <OfferCard
      key={donation.id}
      type="donation"
      title={donation.title}
      datePosted={new Date(donation.datePosted)}
      poster={donation.poster}
      imgUrls={donation.imageUrls}
      description={donation.description}
      condition={donation.condition}
      category={donation.category}
    />
  );

  return (
    <div style={{ marginTop: '4em', minHeight: '300px' }}>
      <ResponsiveCarousel
        fetchMethod={fetchDonations}
        renderCard={renderCard}
        cardWidth={250}
        showControls={true}
        label={props.label || ''}
        viewMoreTo="/search-results?category=Offers"
      />
    </div>
  );
}
