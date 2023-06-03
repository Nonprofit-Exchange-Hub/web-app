import * as React from 'react';
import { Box } from '@mui/material';
import HowItWorksCard from './HowItWorksCard';

type HowItWorksCardsProps = {
  instructionList: { title: string; body: string; image: string; buttonText: string }[];
};

function HowItWorksCards(props: HowItWorksCardsProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0px',
        justifyContent: 'center',
        alignItems: 'top',
        '@media (max-width: 1111px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (max-width: 600px)': {
          gridTemplateColumns: '1fr',
        },
      }}
    >
      {props.instructionList.map((instructions, i) => {
        return <HowItWorksCard key={i} instructions={instructions} />;
      })}
    </Box>
  );
}

export default HowItWorksCards;
