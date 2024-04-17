const components = {
  MuiAccordion: {
    defaultProps: {
      disableGutters: true,
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        border: '1px solid #323232',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '24px',
        padding: '8px, 10px, 8px, 20px',
        color: '#323232',
      },
    },
    defaultProps: {
      disableElevation: true,
    },
  },
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
  MuiChip: {
    styleOverrides: {
      root: {
        margin: 5,
        background: '#FFFFFF',
        border: 'none',
        borderRadius: 10,
        boxShadow: '#000000 0px 1px 4px 1px rgba(0, 0, 0, 0.25)',
      },
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
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 10,
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
      p: {
        align: 'left',
        fontSize: '15px',
        marginTop: '10px',
      },
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
