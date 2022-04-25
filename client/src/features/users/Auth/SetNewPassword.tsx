import * as React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import type { Theme } from '@material-ui/core/styles';

import PasswordInput from './PasswordInput';

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

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault();
    console.log(password);
  };

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <Typography className={classes.header} variant="h3" component="h1" align="center">
          I Forget My Passwords Too
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <PasswordInput value={password} onChange={handleChange} error={null} />
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
