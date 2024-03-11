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
import { ValidationUtils } from '../../utils';
import { string, boolean } from 'yup';
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

interface Error {
  type: '' | 'email' | 'password';
  message: string;
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
  firstName: {
    value: '',
    error: null,
    rule: string().required('Required.'),
  },
  lastName: {
    value: '',
    error: null,
    rule: string().required('Required.'),
  },
  email: {
    value: '',
    error: null,
    rule: string().email('Invalid email.').required('Required.'),
  },
  password: {
    value: '',
    error: null,
    rule: string()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .required('Required.'),
  },
  passwordConfirm: {
    value: '',
    error: null,
    rule: string()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .required('Required.'),
  },
  acceptTerms: {
    value: false,
    error: null,
    rule: boolean().required('The terms and conditions must be accepted.'),
  },
};

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

    const [formData, setFormData] = useState(initialFormData);

    const handleBlur = (evt: React.ChangeEvent<HTMLInputElement>): void => {
      const { name }: { name: string } = evt.target;
      if (Object.keys(initialFormData).includes(name)) {
        setFormData((currFormData) => {
          let error = null;
          let passwordMismatched = false;

          if (name === 'passwordConfirm') {
            const passwordConfirmError = ValidationUtils.getError(
              currFormData.passwordConfirm.rule,
              currFormData.passwordConfirm.value,
            );
            error = passwordConfirmError;
            passwordMismatched = currFormData.password.value !== currFormData.passwordConfirm.value;
          } else if (name === 'password' && currFormData.passwordConfirm.value.length > 0) {
            passwordMismatched = currFormData.password.value !== currFormData.passwordConfirm.value;
          } else {
            // @ts-ignore
            error = ValidationUtils.getError(currFormData[name].rule, currFormData[name].value);
          }

          const passwordConfirmError = {
            passwordConfirm: {
              ...currFormData.passwordConfirm,
              error: passwordMismatched ? 'Passwords must match.' : null,
            },
          };

          const newFormData = Object.assign({}, currFormData, {
            [name]: {
              // @ts-ignore
              ...currFormData[name],
              error,
            },
            ...passwordConfirmError,
          });

          return newFormData;
        });
      }
    };

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value, checked }: { name: string; value: string; checked: boolean } =
        evt.target;
      setFormData((fData) => {
        return {
          ...fData,
          [name]: {
            // @ts-ignore
            ...fData[name],
            value: name === 'acceptTerms' ? checked : value,
          },
        };
      });
    };

    const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
      evt.preventDefault();
      setIsLoading(true);
      console.log('sign up user inputs', formData);
      const res = await fetch(`${APP_API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const response = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        setError({ type: '', message: 'an unknown error occurred' });
      } else {
        setUser(response.user, false, true);
        setError(null);
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
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={formData.firstName.value}
                      error={formData.firstName.error}
                    />
                    <NameInput
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      placeholder="Dosis"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={formData.lastName.value}
                      error={formData.lastName.error}
                    />
                    <EmailInput
                      showStartAdornment={true}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={formData.email.value}
                      placeholder="jane@citizen.com"
                      error={error?.type === 'email' ? error.message : null}
                    />
                    <PasswordInput
                      id="password"
                      name="password"
                      onBlur={handleBlur}
                      value={formData.password.value}
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
                        checked={formData.acceptTerms.value}
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
                      variant="h4"
                      component={'span'}
                      align="center"
                    >
                      Organization Sign Up
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
