import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
    },
    typography: {
        body1: {
            fontSize: '1.3rem',
        },
        body2: {
            fontSize: '1.1rem',
        },
        h1: {
            fontSize: '2.8rem',
            fontWeight: 'bold',
        },
        h3: {
            fontSize: '2.2rem',
            fontWeight: 'bold',
        },
    },
    // To add more custom variables you must add to the Theme interface in /src/types/material-ui.d.ts
    custom: {
        maxContentWidth: '1100px',
    },
});

export default theme;