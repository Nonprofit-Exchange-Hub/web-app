import * as React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    separator: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      '&::before': {
        content: '""',
        flex: 1,
        borderBottom: '1px solid #C4C4C4',
      },
      '&::after': {
        content: '""',
        flex: 1,
        borderBottom: '1px solid #C4C4C4',
      },
      '&:not(:empty)::before': {
        marginRight: '.5em',
      },
      '&:not(:empty)::after': {
        marginLeft: '.5em',
      },
    },
    text: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  };
});

interface TextDividerProps {
  children: any;
}

function TextDivider({ children }: TextDividerProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.separator}>
      <Typography
        className={classes.text}
        variant="h6"
        component="span"
        align="center"
        style={{ color: '#C4C4C4' }}
      >
        {children}
      </Typography>
    </div>
  );
}

export default TextDivider;
