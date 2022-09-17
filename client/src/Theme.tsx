import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: grey[100],
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '50px',
          paddingBottom: '50px',
          paddingLeft: '20px',
          paddingRight: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h3: {
          width: '100%',
          marginBottom: '35px',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#999999',
    },
    primary: {
      main: '#A34AED',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#999999',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    body1: {
      fontSize: '1.3rem',
    },
    body2: {
      fontSize: '1.1rem',
    },
    h1: {
      fontSize: '2.8rem',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '2.2rem',
      fontWeight: 'bold',
    },
  },
});

export default theme;
