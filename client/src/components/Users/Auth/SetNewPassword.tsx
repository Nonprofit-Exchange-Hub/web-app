import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material/styles';

import PasswordInput from './PasswordInput';
import { UserContext } from '../../../providers';

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

function SetNewPassword() {
  const classes = useStyles();

  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(evt.target.value);
  };

  const [user] = React.useContext(UserContext);

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault();
    // ternary in url temporary. User should be logged in(?) id should be available once BE is built
    fetch(`http://localhost:3001/api/users/${user ? user.id : null}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password }),
      credentials: 'include',
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          // send user to home page/message lets them know password was changed successfully
          console.log(data);
        });
      } else {
        resp.json().then((errors) => setError(errors));
      }
    });
  };

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <Typography className={classes.header} variant="h3" component="h1" align="center">
          I Forget My Passwords Too
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <PasswordInput value={password} onChange={handleChange} error={error ? error : null} />
          <Button
            className={classes.button}
            style={{ backgroundColor: '#C4C4C4', color: 'white' }}
            fullWidth
            type="submit"
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default SetNewPassword;
