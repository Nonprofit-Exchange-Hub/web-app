import React, { createContext, FC, ReactNode, useContext } from 'react';

const marketingText = {
  banner: {
    mainHigh: 'Support Local',
    mainLow: 'Nonprofits',
    mainSubtext:
      'Be part of our community of volunteers, nonprofits, and individuals through the Givingful exchange platform.',
    CTAButton: 'Join Now',
  },

  signup: {
    buttonLabel: 'Example1',
    formFieldLabel: 'Example2',
  },
} as const;

const MarketingTextContext = createContext<typeof marketingText>(marketingText);

interface MarketingTextProviderProps {
  children: ReactNode;
}

export const MarketingTextProvider: FC<MarketingTextProviderProps> = ({ children }) => {
  return (
    <MarketingTextContext.Provider value={marketingText}>{children}</MarketingTextContext.Provider>
  );
};

// Custom hook for consuming the context
export const useMarketingText = () => {
  return useContext(MarketingTextContext);
};

export default MarketingTextProvider;
