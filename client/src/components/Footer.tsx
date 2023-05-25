import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import StyledLink from './StyledLink';
import routes from '../routes/routes';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    main: {
      backgroundColor: 'white',
      padding: theme.spacing(5),
    },
    linkBlock: {
      '& > *': {
        marginBottom: theme.spacing(1),
      },
    },
    header: {
      fontWeight: 'bold',
    },
    bottom: {
      marginTop: theme.spacing(4),
    },
    footer: {
      boxShadow: '0px -2px 1em grey',
      position: 'relative',
      bottom: 0,
      left: 0,
      right: 0,
    },
  };
});

function Footer() {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid className={classes.main} container>
        <Grid container>
          <Grid item xs={6} sm={8}>
            <Typography className={classes.header} marginLeft={6}>
              Tribio
            </Typography>
          </Grid>
          <Grid
            className={classes.linkBlock}
            container
            item
            xs={3}
            sm={2}
            direction="column"
            alignItems="flex-start"
            paddingLeft={{ xs: 1, sm: 3 }}
          >
            <Box>
              <Typography className={classes.header} align="left" gutterBottom>
                Get to know us
              </Typography>
            </Box>
            {/* <StyledLink to={routes.AboutUs.path}>About Us</StyledLink> */}
            <Box>
              <StyledLink to={routes.OurStory.path}>Our Story</StyledLink>
            </Box>
            <Box>
              <StyledLink to={routes.HowItWorks.path}>How It works</StyledLink>
            </Box>
            <Box>
              <StyledLink to={routes.ContactUs.path}>Contact Us</StyledLink>
            </Box>
          </Grid>
          <Grid
            className={classes.linkBlock}
            container
            item
            xs={3}
            sm={2}
            direction="column"
            alignItems="flex-start"
            paddingLeft={{ xs: 1, sm: 3 }}
          >
            <Box>
              <Typography className={classes.header} align="left" gutterBottom>
                Resources
              </Typography>
            </Box>
            <Box>
              <StyledLink to={routes.TrustAndSafety.path}>Library</StyledLink>
            </Box>
            <Box>
              <StyledLink to={routes.TrustAndSafety.path}>Trust and Safety</StyledLink>
            </Box>
            <Box>
              <StyledLink to={routes.Help.path}>Help & FAQ</StyledLink>
            </Box>
          </Grid>
        </Grid>
        <Grid
          className={classes.bottom}
          container
          item
          sm={8}
          xs={10}
          justifyContent="space-around"
          paddingTop={{ xs: 1, sm: 3 }}
        >
          {/* TODO Not sure if NEH 2021 is supposed to just be text, or a link.
                    Leaving as text for now, as the name seems like it is changing anyway.*/}
          <span>NEH 2021</span>
          <StyledLink to={routes.TermsOfService.path}>Terms of Service</StyledLink>
          <StyledLink to={routes.PrivacyPolicy.path}>Privacy Policy</StyledLink>
          <StyledLink to={routes.CookiePolicy.path}>Cookie Policy</StyledLink>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
