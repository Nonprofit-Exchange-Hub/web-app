import * as React from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { makeStyles } from 'tss-react/mui';

import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    button: {
      fontSize: 17,
      width: 180,
      height: 50,
      textTransform: 'none',
    },
  };
});

function GoogleAuthBtn(props: React.PropsWithChildren<{}>) {
  const { children } = props;
  const { classes } = useStyles();

  const googleSignIn = (evt: React.MouseEvent) => {
    // Handle googleSignIn
  };

  return (
    <Button
      className={classes.button}
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={googleSignIn}
    >
      {children}
    </Button>
  );
}

export default GoogleAuthBtn;
