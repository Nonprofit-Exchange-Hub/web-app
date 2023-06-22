import * as React from 'react';
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
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

function FacebookAuthBtn(props: React.PropsWithChildren<{}>) {
  const { children } = props;
  const { classes } = useStyles();

  const facebookSignIn = (evt: React.MouseEvent) => {
    // Handle facebook sign up/in
  };

  return (
    <Button
      className={classes.button}
      startIcon={<FacebookIcon />}
      onClick={facebookSignIn}
      style={{ backgroundColor: '#1877F2', color: 'white' }}
    >
      {children}
    </Button>
  );
}

export default FacebookAuthBtn;
