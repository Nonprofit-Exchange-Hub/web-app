// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles' {
  interface Theme {
    custom: {
      maxContentWidth: string;
      form: {
        borderRadius: string;
        borderColor: string;
      };
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom?: {
      maxContentWidth?: string;
      form?: {
        borderRadius?: string;
        borderColor?: string;
      };
    };
  }
}
