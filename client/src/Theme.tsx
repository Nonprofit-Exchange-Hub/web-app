import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        text: {
            primary: '#000000',
            secondary: '#999999',
        },
        primary: {
            main: '#A34AED',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#999999',
            contrastText: '#FFFFFF',
        },
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
        form: {
            borderRadius: '10px',
            borderColor: '#000000',
        }
    },
});

// Override anything listed in Material UI's Props for the component
theme.props = {
    MuiButton: {
        disableElevation: true,
    },
    MuiAccordion: {
        // disableGutters: true,        // Enable this when we get v5 of Material UI, will replace style overrides from QuestionList
    },
    MuiTextField: {
        
    },
}

// Override classes listed in Material UI's CSS for the component
theme.overrides = {
    MuiButton: {
        root: {
            textTransform: 'none',
        },
        containedPrimary: {
        },
        containedSecondary: {
            '&:hover': {
                backgroundColor: theme.palette.grey[100],
            },
        },
    },
    MuiContainer: {
        root: {
            paddingTop: '50px',
            paddingBottom: '50px',
            paddingLeft: '20px',
            paddingRight: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    MuiTypography: {
        h3: {
            width: '100%',
            marginBottom: '35px',
        },
    },
};

export default theme;