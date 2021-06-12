import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    home: { flexGrow: 1 },
    mainNav: {
        display: 'flex',
        justifyContent: 'space-around',
        flexGrow: 1
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
        }
    }
}));

function Header() {
    const classes = useStyles();

    return (
        <AppBar position="sticky" color="transparent">
            <Toolbar>
                <NavLink to="/" className={classes.home}>
                    Home
                </NavLink>
                <div className={classes.mainNav}>
                    <NavLink to="/about_us">About Us</NavLink>
                    <NavLink to="/how_it_works">How It Works</NavLink>
                    <NavLink to="/library_and_forum">Library & Forum</NavLink>
                    <NavLink to="/contact_us">Contact Us</NavLink>
                </div>
                <div className={classes.userButtons}>
                    <NavLink to="/signup">
                        <Button>Sign Up</Button>
                    </NavLink>
                    <NavLink to="/login">
                        <Button>Login</Button>
                    </NavLink>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
