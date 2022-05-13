import * as React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import type { Theme } from '@material-ui/core/styles';

import { UserContext } from '../providers';
import Logo from '../assets/logo.svg'; // placeholder
import routes from '../routes';
import { APP_API_BASE_URL } from '../configs';

const useStyles = makeStyles((theme: Theme) => ({
  home: {
    maxWidth: '100px',
    flexGrow: 1,
  },
  mainNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  userButtons: {
    borderRadius: theme.shape.borderRadius,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  navLink: {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'black',
    padding: '0 10px',
  },
  appBar: {
    backgroundColor: 'white',
    boxShadow: theme.shadows[1],
  },
  toolbar: {
    padding: '5px 5%',
  },
}));

function Header() {
  const classes = useStyles();
  const [user, setUser] = React.useContext(UserContext);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (): void => {
    handleClose();
    setUser(null);
    fetch(`${APP_API_BASE_URL}/auth/logout`, {
      credentials: 'include',
      method: 'GET',
    });
    history.push('/');
  };

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.mainNav}>
          <NavLink to={routes.Home.path} className={classes.home}>
            <img src={Logo} alt="NEH logo placeholder" />
          </NavLink>
          <NavLink className={classes.navLink} to={routes.AboutUs.path}>
            About Us
          </NavLink>
          <NavLink className={classes.navLink} to={routes.HowItWorks.path}>
            How It Works
          </NavLink>
          <NavLink className={classes.navLink} to={routes.ContactUs.path}>
            Contact Us
          </NavLink>
        </div>
        <div className={classes.userButtons}>
          {user ? (
            <>
              <IconButton aria-label="user dropdown" onClick={handleClick}>
                <AccountCircleTwoToneIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {/* TODO change to a react router link */}
                <MenuItem
                  onClick={() => {
                    handleClose();
                    history.push('/inbox');
                  }}
                >
                  Inbox
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    history.push(`/users/${user.id}`);
                  }}
                >
                  User Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <NavLink className={classes.navLink} to={routes.Signup.path}>
                <Button color="primary" variant="contained">
                  Sign Up
                </Button>
              </NavLink>
              <NavLink className={classes.navLink} to={routes.Login.path}>
                <Button color="secondary" variant="contained">
                  Login
                </Button>
              </NavLink>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
