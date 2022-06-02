declare module '@mui/material/styles' {
  interface Theme {
    [x: string]: any;
    form: {
      borderRadius: string;
      borderColor: string;
    };
  }

  interface ThemeOptions {
    form?: {
      borderRadius?: string;
      borderColor?: string;
    };
  }
}
