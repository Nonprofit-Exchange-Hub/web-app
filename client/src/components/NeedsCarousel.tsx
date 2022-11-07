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
      title={need.id}
      sx={{ marginRight: '1em' }}
      datePosted={need.datePosted}
      org="place"
    />
  );

  return (
    <ResponsiveCarousel
      fetchMethod={fetchNeeds}
      renderCard={renderCard}
      cardWidth={200}
      label={props.label || ''}
    />
  );
}
