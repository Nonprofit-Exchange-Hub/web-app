import * as React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppsIcon from '@mui/icons-material/Apps';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Loop from '@mui/icons-material/LoopOutlined';
import Widgets from '@mui/icons-material/WidgetsOutlined';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Logout from '@mui/icons-material/Logout';

import type { Theme } from '@mui/material/styles';

import { UserContext } from '../providers';
import Logo from '../assets/logo.svg'; // placeholder
import Bell from '../assets/Bell Icon.png';
import routes from '../routes';

const useStyles = makeStyles((theme: Theme) => ({
  home: {
    minWidth: '25px',
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
    fontWeight: 'normal',
    textDecoration: 'none',
    color: 'black',
    // padding: '0 10px',
  },
  appBar: {
    backgroundColor: '#ffffff',
    boxShadow: theme.shadows ? theme.shadows[1] : 'none',
  },
  toolbar: {
    padding: '5px 5%',
  },
  menuItemIconRight: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bellIcon: {
    maxWidth: '50px',
    maxHeight: '50px',
  },
}));

function Header() {
  const classes = useStyles();
  const [user, setUser] = React.useContext(UserContext);
  const history = useHistory();

  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event?.currentTarget?.id === 'navigation-button') {
      setAnchorEl1(event.currentTarget);
    } else if (event?.currentTarget?.id === 'profile-button') {
      setAnchorEl2(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl1(null);
    setAnchorEl2(null);
  };

  const handleLogout = (): void => {
    handleClose();
    setUser(null);
    fetch('http://localhost:3001/api/auth/logout', {
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
          <NavLink
            className={classes.navLink}
            to={routes.AboutUs.path}
            activeStyle={{ fontWeight: 'bold' }}
          >
            About Us
          </NavLink>
          <NavLink
            className={classes.navLink}
            to={routes.HowItWorks.path}
            activeStyle={{ fontWeight: 'bold' }}
          >
            How It Works
          </NavLink>
          <NavLink
            className={classes.navLink}
            to={routes.Help.path}
            activeStyle={{ fontWeight: 'bold' }}
          >
            FAQs
          </NavLink>
        </div>
        <div className={classes.userButtons}>
          {user ? (
            <>
              <IconButton>
                <img src={Bell} className={classes.bellIcon} />
              </IconButton>
              <IconButton
                id="navigation-button"
                aria-label="navigation dropdown"
                aria-controls={open1 ? 'navigation-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open1 ? 'true' : undefined}
                onClick={handleClick}
                size="large"
              >
                <AppsIcon />
              </IconButton>
              <Menu
                id="navigation-menu"
                anchorEl={anchorEl1}
                keepMounted
                open={open1}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'navigation-button',
                }}
              >
                <NavLink className={classes.navLink} to={routes.Help.path}>
                  <MenuItem dense>
                    <ListItemAvatar>
                      <Avatar>
                        <Loop color="action" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Exchange"
                      secondary="Search items, volunters & organizations"
                    ></ListItemText>
                  </MenuItem>
                </NavLink>
                <NavLink className={classes.navLink} to={routes.Help.path}>
                  <MenuItem dense>
                    <ListItemAvatar>
                      <Avatar>
                        <Widgets color="action" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Listing Manager"
                      secondary="See posts you made and engaged with"
                    ></ListItemText>
                  </MenuItem>
                </NavLink>
                <Divider />
                <NavLink className={classes.navLink} to={routes.Help.path}>
                  <MenuItem dense className={classes.menuItemIconRight}>
                    <ListItemText>About & Help</ListItemText>
                    <ListItemIcon>
                      <ArrowForwardIos />
                    </ListItemIcon>
                  </MenuItem>
                </NavLink>
              </Menu>
              <IconButton
                id="profile-button"
                aria-label="user dropdown"
                aria-controls={open2 ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open2 ? 'true' : undefined}
                onClick={handleClick}
                size="large"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={open2}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'profile-button',
                }}
              >
                <MenuItem dense>
                  <NavLink className={classes.navLink} to={routes.User.path}>
                    View My Profile
                  </NavLink>
                </MenuItem>
                <MenuItem dense>
                  <NavLink className={classes.navLink} to={routes.User.path}>
                    See Dashboard
                  </NavLink>
                </MenuItem>
                <Divider />
                <MenuItem dense onClick={handleLogout} className={classes.menuItemIconRight}>
                  <ListItemText>Log Out</ListItemText>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                </MenuItem>
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
