import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material/styles';

import PasswordInput from './PasswordInput';
import { UserContext } from '../../../providers';
import { APP_API_BASE_URL } from '../../../configs';

import SetNewPasswordImg from '../../../assets/set-new-password.svg';

const useStyles = makeStyles((theme: Theme) => {
  const xPadding = 12;
  const yPadding = 6;
  const yMargin = 8;

  return {
    paper: {
      maxWidth: 821 - theme.spacing(xPadding),
      maxHeight: 732 - theme.spacing(yPadding),
      borderRadius: 10,
      marginTop: theme.spacing(yMargin),
      marginBottom: theme.spacing(yMargin),
      paddingTop: theme.spacing(yPadding),
      paddingBottom: theme.spacing(yPadding),
      paddingLeft: theme.spacing(xPadding),
      paddingRight: theme.spacing(xPadding),
      margin: 'auto',
    },
    form: {
      width: '100%',
      paddingTop: 74,
    },
    ctaContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
      paddingTop: 50,
    },
    ctaBtn: {
      borderRadius: 8,
      color: 'white',
      height: 40,
      padding: '8px 20px',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: 134,
      paddingBottom: 160,
    },
    imgContainer: {
      display: 'block',
      maxWidth: 446,
      minWidth: 200,
      '@media (max-width:1050px)': {
        display: 'none',
      },
    },
    setNewPasswordImg: {
      width: '100%',
    },
  };
});

const PASSWORD_MIN_LENGTH = 8;

const ERRORS = {
  PASSWORD_MIN_LENGTH: `Password needs to be at least ${PASSWORD_MIN_LENGTH} characters.`,
  PASSWORD_MISMATCH: 'Passwords do not match.',
};

function SetNewPassword() {
  const RESOURCE_URL = `${APP_API_BASE_URL}/auth/users`;
  const classes = useStyles();

  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const [error, setError] = React.useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<string | null>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(evt.target.value);
  };

  const handleBlurPassword = (): void => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      setError(ERRORS.PASSWORD_MIN_LENGTH);
    } else {
      setError(null);
    }
  };

  const handleChangeConfirmPassword = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(evt.target.value);
  };

  const handleBlurConfirmPassword = (): void => {
    if (password !== confirmPassword) {
      setConfirmPasswordError(ERRORS.PASSWORD_MISMATCH);
    } else {
      setConfirmPasswordError(null);
    }
  };

  const handleClickReset = (): void => {
    setPassword('');
    setError(null);
    setConfirmPassword('');
    setConfirmPasswordError(null);
  };

  const { user } = React.useContext(UserContext);

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault();

    if (password !== confirmPassword) {
      setConfirmPasswordError(ERRORS.PASSWORD_MISMATCH);
      return;
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      setError(ERRORS.PASSWORD_MIN_LENGTH);
      return;
    }

    // ternary in url temporary. User should be logged in(?) id should be available once BE is built
    fetch(`${RESOURCE_URL}/${user ? user.id : null}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
      credentials: 'include',
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          // send user to home page/message lets them know password was changed successfully
        });
      } else {
        resp.json().then((errors) => setError(errors));
      }
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <img src={SetNewPasswordImg} alt="FAQs Image" className={classes.setNewPasswordImg} />
      </div>
      <Paper elevation={0} className={classes.paper}>
        <Typography variant="h2" align="center">
          Create New Password
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <PasswordInput
            error={error ? error : null}
            onBlur={handleBlurPassword}
            onChange={handleChange}
            label="New Password"
            showStartAdornment
            value={password}
          />
          <PasswordInput
            error={confirmPasswordError ? confirmPasswordError : null}
            onChange={handleChangeConfirmPassword}
            onBlur={handleBlurConfirmPassword}
            label="Confirm New Password"
            value={confirmPassword}
            name="confirmPassword"
            id="confirmPassword"
            showStartAdornment
          />
          <div className={classes.ctaContainer}>
            <Button
              onClick={handleClickReset}
              className={classes.ctaBtn}
              variant="outlined"
              color="inherit"
              disableElevation
            >
              Cancel
            </Button>
            <Button
              disabled={Boolean(error || confirmPasswordError)}
              className={classes.ctaBtn}
              variant="contained"
              color="primary"
              type="submit"
              disableElevation
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default SetNewPassword;
