import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import StyledLink from './StyledLink';


const useStyles = makeStyles((theme: Theme) => {
    return {
        main: {
            backgroundColor: '#C4C4C4',
            padding: theme.spacing(5)
        },
        linkBlock: {
            '& > *': {
                marginBottom: theme.spacing(1)
            }
        },
        header: {
            fontWeight: 'bold'
        },
        bottom: {
            marginTop: theme.spacing(4)
        }
    };
});

function Footer() {
    const classes = useStyles();

    return (
        <footer className="Footer">
            <Grid className={classes.main} container>
                <Grid container>
                    <Grid
                        className={classes.linkBlock}
                        container
                        item
                        xs={6}
                        direction="column"
                        alignItems="flex-start"
                    >
                        <Typography className={classes.header} align="left" gutterBottom>
                            Non-Profit Exchange Hub
                        </Typography>
                        <StyledLink to="/about_us">About Us</StyledLink>
                        <StyledLink to="/our_story">Our Story</StyledLink>
                        <StyledLink to="/contact_us">Contact Us</StyledLink>
                    </Grid>
                    <Grid
                        className={classes.linkBlock}
                        container
                        item
                        xs={6}
                        direction="column"
                        alignItems="flex-start"
                    >
                        <Typography className={classes.header} align="left" gutterBottom>
                            Resources
                        </Typography>
                        <StyledLink to="/how_it_works">How It Works</StyledLink>
                        <StyledLink to="/trust_and_safety">Trust and Safety</StyledLink>
                        <StyledLink to="/help">Help & FAQs</StyledLink>
                    </Grid>
                </Grid>
                <Grid className={classes.bottom} container item md={8} xs={10} justify="space-between">
                    {/* TODO Not sure if NEH 2021 is supposed to just be text, or a link.
                    Leaving as text for now, as the name seems like it is changing anyway.*/}
                    <span>NEH 2021</span>
                    <StyledLink to="/terms_of_service">Terms of Service</StyledLink>
                    <StyledLink to="/privacy_policy">Privacy Policy</StyledLink>
                    <StyledLink to="/cookie_policy">Cookie Policy</StyledLink>
                </Grid>
            </Grid>
        </footer>
    );
}

export default Footer;
