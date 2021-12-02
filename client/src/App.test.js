import { render } from '@testing-library/react';
import App from './App';

test('renders the header', () => {
  const { getByAltText } = render(<App />);
  const NEHLogo = getByAltText(/NEH logo placeholder/i);
  expect(NEHLogo).toBeInTheDocument();
});
