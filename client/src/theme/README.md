# Nonprofit Circle Theme

This folder contains all the styling for our material UI components.

You can find relevant Material UI Theming documentation [here](https://mui.com/material-ui/customization/theming/).

## Quick Start Guide

The theme variables listed in the documentation like, `palette`, `typography`, `components`, etc. each have their own files in the theme folder for better organization and decreased file sizing.

### Custom Variables

Additional details and documentation [here](https://mui.com/material-ui/customization/theming/#custom-variables).

Custom variables allow you to create additional properties on the theme object. 

For example if you wanted to include status color styling, you could create a `status` property and utilize your theme object to style components using that property.

#### Usage

If you want to add a custom variable, append your property and its' values to the `custom.ts`. You will also need to declare a typescript module for the property you added, like so:

```typescript

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

```

This essentially modifies the default Theme interface.
