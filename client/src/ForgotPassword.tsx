import * as React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import { useHistory } from 'react-router-dom';
//import jwt from 'jsonwebtoken';
import SimpleSnackbar from './SimpleSnackbar';

import type { Theme } from '@material-ui/core/styles';

import EmailInput from './EmailInput';
//import StyledLink from './StyledLink';
//import { UserContext } from './providers';

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

interface Error {
  type: '' | 'email';
  message: string;
}

function ForgotPassword() {
  const classes = useStyles();
  //const history = useHistory();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error] = React.useState<Error | null>(null);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  //const [, setUser] = React.useContext(UserContext);

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
            error={error?.type === 'email' ? error.message : null}
          />
          <Button
            className={classes.button}
            style={{ backgroundColor: '#C4C4C4', color: 'white' }}
            fullWidth
            type="submit"
          >
            Send Email To Set New Password
          </Button>
          {/* Placeholder for loading  - waiting on UI/UX response as to what they want. */}
          {isLoading && <Typography>Loading</Typography>}
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

    await fetch('http://localhost:3001/api/users/reset_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setIsLoading(false);
    setShowSnackbar(true);
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
