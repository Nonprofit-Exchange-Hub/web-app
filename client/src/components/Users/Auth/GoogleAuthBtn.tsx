import * as React from 'react';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    button: {
      borderRadius: 0,
      height: 62,
      textTransform: 'none',
    },
  };
});

function GoogleAuthBtn(props: React.PropsWithChildren<{}>) {
  const { children } = props;
  const classes = useStyles();

  const googleSignIn = (evt: React.MouseEvent) => {
    // Handle googleSignIn
  };

  return (
    <Button className={classes.button} variant="outlined" onClick={googleSignIn}>
      {children}
    </Button>
  );
}

export default GoogleAuthBtn;
