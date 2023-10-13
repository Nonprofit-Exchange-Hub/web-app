import { makeStyles } from 'tss-react/mui';
import { Button, Typography } from '@mui/material';
import theme from '../../theme';
import { ReactNode } from 'react';

const useStyles = makeStyles()(() => ({
  CTAHeroButton: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '10px',
    fontWeight: 'semi-bold',
    border: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
  primaryCTAButton: {
    textTransform: 'capitalize',
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.primary.contrastText}`,
    borderRadius: '10px',
    border: `1px solid ${theme.palette.primary.main}`,
    marginLeft: '0px',
    width: '100px',
    '&:hover': {
      color: `${theme.palette.text.primary}`,
    },
  },
}));

type Props = {
  text: string;
  onClick?: () => void;
  children?: ReactNode;
};

export function CTAHeroButton({ text, onClick }: Props) {
  const { classes } = useStyles();

  return (
    <button onClick={onClick} className={classes.CTAHeroButton}>
      <Typography
        sx={{
          fontSize: '22px',
          padding: '15px 25px 15px 25px',
        }}
      >
        {text}
      </Typography>
    </button>
  );
}

export function PrimaryCTAButton({ text, onClick, children }: Props) {
  const { classes } = useStyles();
  return (
    <Button component="span" onClick={onClick} className={classes.primaryCTAButton}>
      {text}
      {children}
    </Button>
  );
}
