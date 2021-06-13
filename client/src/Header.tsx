import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import type { Theme } from '@material-ui/core/styles';

import Logo from './assets/logo.svg'; // placeholder


const useStyles = makeStyles((theme: Theme) => ({
    home: {
        maxWidth: '100px',
        flexGrow: 1
    },
    mainNav: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexGrow: 1,
        margin: '10px',
    },
    userButtons: {
        flexGrow: 1,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        },
    },
    navLink: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black',
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: theme.shadows[1],
    },
}));

function Header() {
    const classes = useStyles();

    return (
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar>
                <div className={classes.mainNav}>
                    <NavLink to="/" className={classes.home}>
                        <img src={Logo} alt="NEH logo placeholder" />
                    </NavLink>
                    <NavLink className={classes.navLink} to="/about_us">About Us</NavLink>
                    <NavLink className={classes.navLink} to="/how_it_works">How It Works</NavLink>
                    <NavLink className={classes.navLink} to="/library_and_forum">Library & Forum</NavLink>
                    <NavLink className={classes.navLink} to="/contact_us">Contact Us</NavLink>
                </div>
                <div className={classes.userButtons}>
                    <NavLink className={classes.navLink} to="/signup">
                        <Button color="primary" variant="contained">Sign Up</Button>
                    </NavLink>
                    <NavLink className={classes.navLink} to="/login">
                        <Button>Login</Button>
                    </NavLink>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
