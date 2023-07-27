// import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import logo from './../assets/GivingfulLogoPlum.svg';
import routes from '../routes/routes';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    main: {
      backgroundColor: 'white',
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    linkBlock: {
      '& > *': {
        marginBottom: theme.spacing(1),
      },
    },
    header: {
      fontWeight: 'bold',
    },
    footer: {
      boxShadow: '0px -2px 1em grey',
      position: 'relative',
      bottom: 0,
      left: 0,
      right: 0,
    },
    textBox: {
      marginBottom: theme.spacing(2),
      width: '550px',
    },
    text: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
      fontFamily: 'Poppins',
      textAlign: 'center',
    },
    navLink: {
      fontWeight: '600',
      textDecoration: 'none',
      color: 'black',
      fontSize: '16px',
      lineHeight: '24px',
      marginRight: '21px',
      fontFamily: 'Poppins',
    },
    logo: {
      width: '175px',
      height: '40px',
      // marginBottom: theme.spacing(1),
    },
  };
});

function Footer() {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid
        className={classes.main}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item flexGrow={1} className={classes.textBox}>
          <Box className={classes.text}>
            We want to extend a special thank you to all those who work hard to support non-profit
            organizations.
          </Box>
        </Grid>
        <Grid item flexGrow={1}>
          <Box>
            <img className={classes.logo} alt="logo" src={logo}></img>
          </Box>
        </Grid>
        <Grid item flexGrow={1}>
          <Grid container item justifyContent="center">
            <NavLink className={classes.navLink} to={routes.OurStory.path}>
              Our Mission
            </NavLink>
            <NavLink className={classes.navLink} to={routes.HowItWorks.path}>
              How It works
            </NavLink>
            <NavLink className={classes.navLink} to={routes.Help.path}>
              FAQ
            </NavLink>
            <NavLink className={classes.navLink} to={routes.TermsOfService.path}>
              Terms of Service
            </NavLink>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
