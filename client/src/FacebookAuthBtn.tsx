import * as React from 'react';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    button: {
      borderRadius: 0,
      height: 62,
      textTransform: 'none',
    },
  };
});

interface FacebookAuthBtnProps {
  children: string;
}

function FacebookAuthBtn({ children }: FacebookAuthBtnProps) {
  const classes = useStyles();

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
