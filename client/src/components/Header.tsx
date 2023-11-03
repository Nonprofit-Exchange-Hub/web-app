import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Loop from '@mui/icons-material/LoopOutlined';
import Widgets from '@mui/icons-material/WidgetsOutlined';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Logout from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import theme from '../theme';

import { UserContext } from '../providers';
import Logo from '../assets/GivingfulLogo.png';
import routes from '../routes/routes';
import { APP_API_BASE_URL } from '../configs';
import { UserAvatar } from './Users/UserAvatar';
import { ModalContext } from './../providers/ModalProvider';
import { PrimaryCTAButton } from './Buttons/Button';

const useStyles = makeStyles()(() => ({
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
    width: 'inherit',
    marginRight: '5px',
    minWidth: '340px',
  },
  userButtons: {
    borderRadius: theme.shape.borderRadius,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navLink: {
    fontWeight: 'normal',
    textDecoration: 'none',
    color: 'black',
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
  signInButton: {
    textTransform: 'capitalize',
    backgroundColor: `${theme.palette.primary.contrastText}`,
    color: `${theme.palette.text.primary}`,
    borderRadius: '10px',
    border: `1px solid ${theme.palette.primary.dark}`,
    marginLeft: '10px',
    width: '100px',
  },
  menuButton: {
    width: '94%',
    margin: '0 5px 0 5px',
  },
}));

function Header() {
  const LOGOUT_URL = `${APP_API_BASE_URL}/auth/logout`;
  const { classes } = useStyles();
  const { user, setUser } = React.useContext(UserContext);
  const history = useHistory();

  const [navAnchorEl, setNavAnchorEl] = React.useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);
  const [aboutAnchorEl, setAboutAnchorEl] = React.useState<null | HTMLElement>(null);
  const [exchangeAnchorEl, setExchangeAnchorEl] = React.useState<null | HTMLElement>(null);

  const isNavMenuOpen = Boolean(navAnchorEl);
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isAboutMenuOpen = Boolean(aboutAnchorEl);
  const isExchangeMenuOpen = Boolean(exchangeAnchorEl);

  const modalContext = useContext(ModalContext);
  const { openModal } = modalContext;

  const handleOpenModal = (modalType: 'SignIn' | 'SignUp') => {
    if (modalType === 'SignIn') {
      openModal('SignIn');
    } else if (modalType === 'SignUp') {
      openModal('SignUp');
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    switch (event?.currentTarget?.id) {
      case 'navigation-button': {
        setNavAnchorEl(event.currentTarget);
        break;
      }
      case 'profile-button': {
        setProfileAnchorEl(event.currentTarget);
        break;
      }
      case 'about-button': {
        setAboutAnchorEl(event.currentTarget);
        break;
      }
      case 'exchange-button': {
        setExchangeAnchorEl(event.currentTarget);
        break;
      }
    }
  };

  const handleClose = () => {
    setNavAnchorEl(null);
    setProfileAnchorEl(null);
    setAboutAnchorEl(null);
    setExchangeAnchorEl(null);
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
          <div>
            <>
              <IconButton size="large">{/* Mailbox icon here */}</IconButton>
              <IconButton size="large">{/* Bell icon here */}</IconButton>
              <IconButton size="large">{/* Profile icon here */}</IconButton>

              <Button
                id="exchange-button"
                aria-label="exchange dropdown"
                aria-controls={isExchangeMenuOpen ? 'about-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isExchangeMenuOpen ? 'true' : undefined}
                onClick={handleClick}
                endIcon={isExchangeMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{
                  textTransform: 'capitalize',
                  color: '#323232',
                  fontWeight: 400,
                  marginRight: '1.5em',
                  border: 0,
                  '&:hover, &:active, &[aria-expanded="true"]': {
                    fontWeight: 600,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Exchange
              </Button>
              <Menu
                id="exchange-menu"
                anchorEl={exchangeAnchorEl}
                keepMounted
                open={isExchangeMenuOpen}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'exchange-button',
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
                    minWidth: '120px',
                    marginTop: '1.5em',
                    borderRadius: '.625em',
                    alignItems: 'center',
                    flexShrink: 0,
                  },
                }}
              >
                <MenuItem onClick={handleClose} className={classes.menuButton}>
                  <NavLink className={classes.navLink} to={routes.Help.path}>
                    FAQs
                  </NavLink>
                </MenuItem>
              </Menu>
              <Button
                id="about-button"
                aria-label="about dropdown"
                aria-controls={isAboutMenuOpen ? 'about-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isAboutMenuOpen ? 'true' : undefined}
                onClick={handleClick}
                endIcon={isAboutMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 400,
                  marginRight: '1.5em',
                  border: 0,
                  '&:hover, &:active, &[aria-expanded="true"]': {
                    fontWeight: 600,
                    backgroundColor: 'transparent',
                  },
                }}
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
                  sx: {
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '.5rem',
                    margin: '5px 0 5px 0',
                  },
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
                    gap: 0,
                    marginLeft: '2.5em',
                    marginTop: '1.5em',
                    borderRadius: '.625em',
                    alignItems: 'center',
                    flexShrink: 0,
                  },
                }}
              >
                <MenuItem onClick={handleClose} className={classes.menuButton}>
                  <NavLink
                    className={classes.navLink}
                    to={routes.AboutUs.path}
                    activeStyle={{
                      fontStyle: 'bold',
                    }}
                  >
                    About Us
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose} className={classes.menuButton}>
                  <NavLink
                    className={classes.navLink}
                    to={routes.HowItWorks.path}
                    activeStyle={{
                      fontStyle: 'bold',
                    }}
                  >
                    How It Works
                  </NavLink>
                </MenuItem>
              </Menu>
            </>
          </div>
        </div>
        <div className={classes.userButtons}>
          {user ? (
            <>
              <IconButton
                id="navigation-button"
                aria-label="navigation dropdown"
                aria-controls={isNavMenuOpen ? 'navigation-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isNavMenuOpen ? 'true' : undefined}
                onClick={handleClick}
                style={{
                  transform: 'scale(1.5)',
                  color: 'black',
                  marginRight: '1em',
                  maxHeight: '40px',
                }}
              >
                <MailOutlineIcon />
              </IconButton>
              <IconButton
                style={{
                  transform: 'scale(1.5)',
                  color: 'black',
                  marginRight: '.7em',
                  maxHeight: '40px',
                }}
              >
                <NotificationsNoneIcon />
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
                sx={{ marginRight: '.5em', fill: 'black' }}
              >
                <UserAvatar
                  userFirstName={user.firstName}
                  profileImageUrl={user.profile_image_url ?? ''}
                  style={{ backgroundColor: 'black' }}
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
              <PrimaryCTAButton
                text="Join Now"
                onClick={() => handleOpenModal('SignUp')}
              ></PrimaryCTAButton>
              <Button className={classes.signInButton} onClick={() => handleOpenModal('SignIn')}>
                Sign In
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
