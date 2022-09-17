import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import SimpleSnackbar from '../../SimpleSnackbar';

import type { Theme } from '@mui/material/styles';

import EmailInput from './EmailInput';
import { APP_API_BASE_URL } from '../../../configs';

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
    header: { fontWeight: 'bold', marginBottom: 68 },
    button: {
      borderRadius: 0,
      height: 62,
      textTransform: 'none',
    },
  };
});

interface UserLoginData {
  email: string;
}

const initialFormData: UserLoginData = {
  email: '',
};

function ForgotPassword() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState(initialFormData);
  const instructions =
    "Enter your email and we'll send you a link to reset you password if you have an account.";
  const emailResponse =
    'If this email exists as a user you will be sent an email to reset your password.';

  const generateForm = () => {
    return (
      <Grid container item xs={12}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <EmailInput
            value={formData.email}
            placeholder="jane@nonprofit.com"
            onChange={handleChange}
            error={null}
          />
          <Button
            className={classes.button}
            style={{ backgroundColor: '#C4C4C4', color: 'white' }}
            fullWidth
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'sending...' : 'Send Email To Set New Password'}
          </Button>
        </form>
      </Grid>
    );
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault();
    setIsLoading(true);

    await fetch(`${APP_API_BASE_URL}/api/users/reset_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // sends user email, backend finds email, sends link to reset password
        console.log(data);
      });

    setIsLoading(false);
    setShowSnackbar(true);
    setFormData((fData) => ({
      ...fData,
      email: '',
    }));
  };

  return (
    <div className="Login" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container justifyContent="center" direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.header} variant="h3" component="h1" align="center">
              Forgot Your Password?
            </Typography>
            <Typography component="p" align="left" gutterBottom>
              {showSnackbar ? emailResponse : instructions}
            </Typography>
            {showSnackbar ? null : generateForm()}
          </Grid>
        </Grid>
      </Paper>
      {showSnackbar ? <SimpleSnackbar message="Email Has Sent!" /> : null}
    </div>
  );
}

export default ForgotPassword;
