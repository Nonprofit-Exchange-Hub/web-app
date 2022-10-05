# Nonprofit Circle Theme

This folder contains all the styling for our material UI components.

You can find relevant Material UI Theming documentation [here](https://mui.com/material-ui/customization/theming/).

## Quick Start Guide

The theme variables listed in the documentation like, `palette`, `typography`, `components`, etc. each have their own files in the theme folder for better organization and decreased file sizing.

### Best Practice

- When you're working with any Mui components that likely will be used in other parts of the application, add the specific styling to the component.ts file so that all components of that type will have that styling.
- We don't have a specific style guide yet to tell us what the default stylings should be (e.g. Body text should be 14pt, headers should be 24px, 32px, 48px, etc.), so use your best judgement based on what you see in the mocks and make those changes to the Theme when possible.
- Generally if you see that a particular Mui component has the same styling in multiple places, you'll want to edit the Theme to reflect that instead of making those style changes using the sx prop to the particular component you're working with.
- Default stylings from the Theme object can always be overridden (either using the sx prop or utilizing styled components).

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
