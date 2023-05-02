const typography = {
  fontFamily: ['Poppins', 'Mulish'].join(','),
  body1: {
    fontSize: '1.3rem',
  },
  body2: {
    fontSize: '14px',
  },
  h1: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
  },
  h2: {
    fontSize: '3.625rem',
    fontWeight: 400,
    '@media (max-width:600px)': {
      fontSize: '2.5rem',
    },
  },
  h3: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
  },
  marginBottom: 0,
};

export default typography;
