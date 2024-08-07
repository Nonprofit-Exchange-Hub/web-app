import React, { useState } from 'react';
import routes from '../../routes/routes';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import type { Theme } from '@mui/material/styles';
import PasswordInput from '../Users/Auth/PasswordInput';
import EmailInput from '../Users/Auth/EmailInput';
import NameInput from '../Users/Auth/NameInput';
import { Button, Checkbox, Typography, Paper, FormControlLabel } from '@mui/material';
import { APP_API_BASE_URL } from '../../configs';
import StyledLink from '../StyledLink';
import { UserContext } from '../../providers';

interface SignUpModalProps {
  closeModal: () => void;
  className: {
    outerShell: string;
    paper: string;
    content: string;
    header: string;
    loginButton: string;
    buttonContainer: string;
    closeButton: string;
  };
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    border: 0,
    maxWidth: '1000px',
    maxHeight: '100px',
    minWidth: '100px',
    minHeight: '100px',
    padding: '0px',
  },
}));

const initialFormData = {
  firstName: '',
  last_name: '',
  email: '',
  password: '',
  acceptTerms: false,
};

interface Error {
  type: '' | 'email' | 'password';
  message: string;
}

const SignUpModal = React.forwardRef<HTMLDivElement, SignUpModalProps>(
  ({ closeModal, className }, ref) => {
    const handleCloseModal = () => {
      closeModal();
    };

    const { classes } = useStyles();
    const history = useHistory();
    const [signUpMode, setSignUpMode] = useState('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<Error | null>(null);
    const { setUser } = React.useContext(UserContext);

    const handleSignUpIndividualMode = () => {
      setSignUpMode('individual');
    };

    const handleSignUpOrganizationMode = () => {
      setSignUpMode('organization');
    };

    const handleSignUpCompleteMode = () => {
      setSignUpMode('complete');
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value, checked }: { name: string; value: string; checked: boolean } =
        evt.target;
      setFormData((fData) => {
        return {
          ...fData,
          [name]: name === 'acceptTerms' ? checked : value, // Correctly update the value
        };
      });
    };

    const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
      evt.preventDefault();
      setIsLoading(true);
      const res = await fetch(`${APP_API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      console.log('sign up user inputs', formData);
      const response = await res.json();
      setIsLoading(false);
      if (!res.ok) {
        console.log(response);
        setError({ type: '', message: 'an unknown error occurred' });
      } else {
        setUser(response.user, false, true);
        setError(null);
        handleSignUpCompleteMode();
        history.push('/');
      }
    };

    return (
      <>
        <div ref={ref}></div>
        <Dialog
          ref={ref}
          disableEscapeKeyDown={true}
          open={true}
          PaperProps={{ style: { borderRadius: 20 } }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            aria-label="close"
            className={className.closeButton}
          >
            <CloseIcon style={{ fontSize: '1.1em' }} />
          </IconButton>
          {signUpMode === '' && (
            <DialogContent className={className.content}>
              <Paper elevation={0} className={className.paper}>
                <Grid
                  container
                  item
                  xs={12}
                  style={{ paddingTop: 0, paddingLeft: 22, paddingRight: 16 }}
                >
                  <Grid item xs={12}>
                    <Typography
                      className={className.header}
                      variant="h4"
                      component={'span'}
                      align="center"
                    >
                      Welcome Aboard!
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={handleSignUpIndividualMode} fullWidth className={classes.root}>
                      I am an individual citizen
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      variant="middle"
                      sx={{ marginLeft: 3, borderBottomWidth: 1, borderColor: '#000000' }}
                    ></Divider>
                  </Grid>
                  <Grid container item xs={12}></Grid>
                  <Grid item xs={12}>
                    <Button
                      onClick={handleSignUpOrganizationMode}
                      fullWidth
                      className={classes.root}
                    >
                      I am part of an organization
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </DialogContent>
          )}
          {signUpMode === 'individual' && (
            <DialogContent className={className.content}>
              <Paper elevation={0} className={className.paper}>
                <Grid
                  container
                  item
                  xs={12}
                  style={{ paddingTop: 0, paddingLeft: 22, paddingRight: 16 }}
                >
                  <Grid item xs={12}>
                    <Typography
                      className={className.header}
                      variant="h3"
                      component={'span'}
                      align="center"
                    >
                      Individual Sign Up
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      variant="middle"
                      sx={{ marginLeft: 0, borderBottomWidth: 1, borderColor: '#000000' }}
                    ></Divider>
                  </Grid>
                  <Grid item xs={12} style={{ paddingTop: '30px', justifyContent: 'center' }}>
                    <NameInput
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      placeholder="Jane"
                      onChange={handleChange}
                      value={formData.firstName}
                    />
                    <NameInput
                      id="last_name"
                      name="last_name"
                      label="Last Name"
                      placeholder="Dosis"
                      onChange={handleChange}
                      value={formData.last_name}
                    />
                    <EmailInput
                      showStartAdornment={true}
                      onChange={handleChange}
                      value={formData.email}
                      placeholder="jane@citizen.com"
                      error={error?.type === 'email' ? error.message : null}
                    />
                    <PasswordInput
                      id="password"
                      name="password"
                      value={formData.password}
                      showStartAdornment={true}
                      onChange={handleChange}
                      error={error?.type === 'password' ? error.message : null}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ paddingBottom: '30px', paddingLeft: '25px', justifyContent: 'center' }}
                >
                  <FormControlLabel
                    style={{
                      textAlign: 'left',
                      display: 'flex',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                    control={
                      <Checkbox
                        color="primary"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        name="acceptTerms"
                        inputProps={{ 'aria-label': 'accept_terms_checkbox' }}
                        sx={{
                          input: {
                            "[(type = 'checkbox')]": {
                              '::before': { outline: '1px solid black' },
                            },
                          },
                        }}
                      />
                    }
                    label={
                      <label style={{ fontSize: '15px' }}>
                        Accept the{' '}
                        <StyledLink to={routes.TermsOfService.path} target="_blank">
                          Terms and Agreements
                        </StyledLink>
                      </label>
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: 'flex', paddingBottom: '30px', justifyContent: 'center' }}
                >
                  <Button
                    className={className.loginButton}
                    style={{ backgroundColor: '#EF6A60', color: 'white' }}
                    fullWidth
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </Button>
                  <Link to={routes.Home.path}></Link>
                </Grid>
                {isLoading && <Typography>Loading...</Typography>}
              </Paper>
            </DialogContent>
          )}
          {signUpMode === 'organization' && (
            <DialogContent className={className.content}>
              <Paper elevation={0} className={className.paper}>
                <Grid
                  container
                  item
                  xs={12}
                  style={{ paddingTop: 0, paddingLeft: 22, paddingRight: 16 }}
                >
                  <Grid item xs={12}>
                    <Typography
                      className={className.header}
                      variant="h3"
                      component={'span'}
                      align="center"
                    >
                      Organization Sign Up
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      variant="middle"
                      sx={{ marginLeft: 0, borderBottomWidth: 1, borderColor: '#000000' }}
                    ></Divider>
                  </Grid>
                  <Grid item xs={12} style={{ paddingTop: '30px', justifyContent: 'center' }}>
                    <NameInput
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      placeholder="Jane"
                      onChange={handleChange}
                      value={formData.firstName}
                    />
                    <NameInput
                      id="last_name"
                      name="last_name"
                      label="Last Name"
                      placeholder="Dosis"
                      onChange={handleChange}
                      value={formData.last_name}
                    />
                    <EmailInput
                      showStartAdornment={true}
                      onChange={handleChange}
                      value={formData.email}
                      placeholder="jane@citizen.com"
                      error={error?.type === 'email' ? error.message : null}
                    />
                    <PasswordInput
                      id="password"
                      name="password"
                      value={formData.password}
                      showStartAdornment={true}
                      onChange={handleChange}
                      error={error?.type === 'password' ? error.message : null}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ paddingBottom: '30px', paddingLeft: '25px', justifyContent: 'center' }}
                >
                  <FormControlLabel
                    style={{
                      textAlign: 'left',
                      display: 'flex',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                    control={
                      <Checkbox
                        color="primary"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        name="acceptTerms"
                        inputProps={{ 'aria-label': 'accept_terms_checkbox' }}
                        sx={{
                          input: {
                            "[(type = 'checkbox')]": {
                              '::before': { outline: '1px solid black' },
                            },
                          },
                        }}
                      />
                    }
                    label={
                      <label style={{ fontSize: '15px' }}>
                        Accept the{' '}
                        <StyledLink to={routes.TermsOfService.path} target="_blank">
                          Terms and Agreements
                        </StyledLink>
                      </label>
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: 'flex', paddingBottom: '30px', justifyContent: 'center' }}
                >
                  <Button
                    className={className.loginButton}
                    style={{ backgroundColor: '#EF6A60', color: 'white' }}
                    fullWidth
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </Button>
                  <Link to={routes.Home.path}></Link>
                </Grid>
                {isLoading && <Typography>Loading...</Typography>}
              </Paper>
            </DialogContent>
          )}
          {signUpMode === 'complete' && (
            <DialogContent className={className.content}>
              <Paper elevation={0} className={className.paper}>
                <Grid
                  container
                  item
                  xs={12}
                  style={{ paddingTop: 0, paddingLeft: 22, paddingRight: 16 }}
                >
                  <Grid item xs={12}>
                    <Typography
                      className={className.header}
                      variant="h3"
                      component={'span'}
                      align="center"
                    >
                      Sign Up Complete! Please return to homepage to sign in!
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </DialogContent>
          )}
        </Dialog>
      </>
    );
  },
);

export default SignUpModal;
