declare module '@mui/material/styles' {
  interface Theme {
    [x: string]: any;
    form: {
      borderRadius: string;
      borderColor: string;
    };
  }

  interface DeprecatedThemeOptions {
    form?: {
      borderRadius?: string;
      borderColor?: string;
    };
  }
}
