import * as React from 'react';
import Button from '@material-ui/core/Button';
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

// interface GoogleAuthBtnProps {
//   children: string;
// }

// function GoogleAuthBtn({ children }: GoogleAuthBtnProps) {
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
