import { createTheme } from '@mui/material';
import palette from './palette';
import typography from './typography';
import components from './components';
import custom from './custom';
import breakpoints from './breakpoints';
import transitions from './transitions';

const theme = createTheme({
  breakpoints,
  components,
  palette,
  transitions,
  typography,
  spacing: 8,
  ...custom,
});

export default theme;
