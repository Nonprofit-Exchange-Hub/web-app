import { createTheme } from '@mui/material';
import palette from './palette';
import typography from './typography';
import components from './components';
import custom from './custom';

const theme = createTheme({
  components,
  palette,
  typography,
  ...custom,
});

export default theme;
