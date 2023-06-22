import { Theme } from '@mui/material/styles';
import * as React from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    main: {
      height: '100vh',
    },
  };
});
function Help() {
  const { classes } = useStyles();
  return <div className={classes.main}>Help</div>;
}

export default Help;
