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
import AppsIcon from '@mui/icons-material/Apps';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Loop from '@mui/icons-material/LoopOutlined';
import Widgets from '@mui/icons-material/WidgetsOutlined';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Logout from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';

import type { Theme } from '@mui/material/styles';

import { UserContext } from '../providers';
import Logo from '../assets/GivingfulLogo.png';
import routes from '../routes/routes';
import { APP_API_BASE_URL } from '../configs';
import { UserAvatar } from './Users/UserAvatar';

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
    flexGrow: 0.75,
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
  },
  signUp: {
    backgroundColor: '#EF6A60!important',
    color: 'white!important',
    borderRadius: '10px',
    marginRight: '5px!important',
  },
  signIn: {
    backgroundColor: 'white!important',
    color: '#323232!important',
    borderRadius: '10px',
    border: '1px solid #323232!important',
    marginLeft: '5px!important',
  },
  appBar: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows ? theme.shadows[1] : 'none',
  },
  toolbar: {
    margin: 'auto',
    padding: '5px 0',
    width: '83.3%',
  },
  menuItemIconRight: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    height: '30px',
  },
}));

function Header() {
  const LOGOUT_URL = `${APP_API_BASE_URL}/auth/logout`;
  const classes = useStyles();
  const { user, setUser } = React.useContext(UserContext);
  const history = useHistory();

  const [navAnchorEl, setNavAnchorEl] = React.useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);
  const [aboutAnchorEl, setAboutAnchorEl] = React.useState<null | HTMLElement>(null);

  const isNavMenuOpen = Boolean(navAnchorEl);
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isAboutMenuOpen = Boolean(aboutAnchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event?.currentTarget?.id === 'navigation-button') {
      setNavAnchorEl(event.currentTarget);
    } else if (event?.currentTarget?.id === 'profile-button') {
      setProfileAnchorEl(event.currentTarget);
    } else if (event?.currentTarget.id === 'about-button') {
      setAboutAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setNavAnchorEl(null);
    setProfileAnchorEl(null);
    setAboutAnchorEl(null);
  };

  const handleLogout = (): void => {
    handleClose();
    setUser(null);
    fetch(LOGOUT_URL, {
      credentials: 'include',
      method: 'GET',
    });
    history.push('/');
  };

  return (
    <AppBar position="sticky" className={classes.appBar} color="inherit">
      {/* if no color defaults to primary */}
      <Toolbar className={classes.toolbar}>
        <div className={classes.mainNav}>
          <NavLink to={routes.Home.path} className={classes.home}>
            <img className={classes.logo} src={Logo} alt="NEH logo placeholder" />
          </NavLink>
          <Button
            id="about-button"
            aria-label="about dropdown"
            aria-controls={isAboutMenuOpen ? 'about-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isAboutMenuOpen ? 'true' : undefined}
            onClick={handleClick}
          >
            About
          </Button>
          <Menu
            id="about-menu"
            anchorEl={aboutAnchorEl}
            keepMounted
            open={isAboutMenuOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'about-button',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1,
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 20,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem>
              <NavLink
                className={classes.navLink}
                to={routes.AboutUs.path}
                activeStyle={{ fontWeight: 'bold' }}
              >
                About Us
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                className={classes.navLink}
                to={routes.HowItWorks.path}
                activeStyle={{ fontWeight: 'bold' }}
              >
                How It Works
              </NavLink>
            </MenuItem>
          </Menu>
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
                <NotificationsIcon />
              </IconButton>
              <IconButton
                id="navigation-button"
                aria-label="navigation dropdown"
                aria-controls={isNavMenuOpen ? 'navigation-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isNavMenuOpen ? 'true' : undefined}
                onClick={handleClick}
                size="large"
              >
                <AppsIcon />
              </IconButton>
              <Menu
                id="navigation-menu"
                anchorEl={navAnchorEl}
                keepMounted
                open={isNavMenuOpen}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'navigation-button',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1,
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 20,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
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
                aria-controls={isProfileMenuOpen ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isProfileMenuOpen ? 'true' : undefined}
                onClick={handleClick}
                size="large"
              >
                <UserAvatar
                  userFirstName={user.firstName}
                  profileImageUrl={user.profile_image_url ?? ''}
                />
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={profileAnchorEl}
                keepMounted
                open={isProfileMenuOpen}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'profile-button',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1,
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 20,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
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
                <Button className={classes.signUp}>Sign Up</Button>
              </NavLink>
              <NavLink className={classes.navLink} to={routes.Login.path}>
                <Button className={classes.signIn} variant="contained">
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
