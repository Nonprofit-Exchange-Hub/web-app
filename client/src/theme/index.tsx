import { createTheme } from '@mui/material';
// import { adaptV4Theme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import components from './components';
import custom from './custom';
import breakpoints from './breakpoints';
import transitions from './transitions';

// import { ThemeProvider, createMuiTheme, makeStyles } from '@mui/base';

// const theme = createMuiTheme();

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
