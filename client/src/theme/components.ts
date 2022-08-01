import { grey } from '@mui/material/colors';

const components = {
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
};

export default components;
