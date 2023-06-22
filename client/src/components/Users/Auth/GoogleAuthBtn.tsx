import * as React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';

import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    button: {
      height: 44,
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
    <Button className={classes.button} variant="outlined" onClick={googleSignIn}>
      {children}
    </Button>
  );
}

export default GoogleAuthBtn;
