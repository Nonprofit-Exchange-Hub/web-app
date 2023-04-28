const palette = {
  text: {
    primary: '#323232',
    secondary: '#6E6E6E',
  },
  primary: {
    main: '#EF6A60',
    light: '#43AFBF',
    gradient: 'linear-gradient(180deg, #37718E 0%, #285469 100%)',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#7C4164',
    light: '#C33D54',
    gradient: 'linear-gradient(180deg, #7C4164 0%, #5C304A 100%)',
    contrastText: '#FFFFFF',
  },
};
declare module '@mui/material/styles/createPalette' {
  interface PaletteColor {
    gradient?: string;
  }
  interface SimplePaletteColorOptions {
    gradient?: string;
  }
}

export default palette;
