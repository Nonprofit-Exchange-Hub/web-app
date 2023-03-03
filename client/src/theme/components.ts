const components = {
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '20px',
        boxShadow: '0px 2px 4px 4px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        h1: {
          fontFamily: 'Poppins',
          fontSize: '20px',
          lineHeight: '30px',
        },
        outline: 'black',
        p: {
          fontSize: '14px',
          fontWeight: 400,
          marginBottom: '8px',
          marginTop: '8px',
        },
        margin: '10px',
        height: 'fit-content',
        width: '280px',
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: '8px',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '10px',
        fontSize: '16px',
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
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  MuiInput: {
    styleOverrides: {
      root: {
        borderRadius: '10px',
        marginTop: '10px',
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      h3: {
        width: '100%',
        marginBottom: '35px',
      },
      root: {
        marginBottom: 0,
      },
    },
  },
};

export default components;
