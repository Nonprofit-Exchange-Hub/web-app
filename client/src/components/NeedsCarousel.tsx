import React from 'react';
import NeedCard from '../components/Card/NeedCard';
import { fetchNeeds } from '../FetchActions';
import ResponsiveCarousel from './ResponsiveCarousel';

type NeedsCarouselProps = {
  label: string;
};
export default function NeedsCarousel(props: NeedsCarouselProps) {
  const renderCard = (need: any) => (
    <NeedCard
      key={need.id}
      type="need"
      title={need.title}
      datePosted={new Date(need.datePosted)}
      poster={need.poster}
      imgUrls={need.imageUrls}
      description={need.description}
      condition={need.condition}
      location={need.location}
      org={need.org}
    />
  );

  return (
    <div style={{ marginTop: '160px', minHeight: '300px' }}>
      <ResponsiveCarousel
        fetchMethod={fetchNeeds}
        renderCard={renderCard}
        cardWidth={250}
        showControls={true}
        label={props.label || ''}
        viewMoreTo="/search-results?category=Needs"
      />
    </div>
  );
}
