import { Theme, ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

declare module "@material-ui/core/styles" {
  interface Theme {
    custom: {
      maxContentWidth: string;
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom?: {
        maxContentWidth?: string;
    };
  }
}