import * as React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { Box, Container } from '@mui/material';

import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    '& .MuiFormLabel-root': {
      color: theme.palette.text.primary,
      marginTop: '1rem',
      marginBottom: '14px',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: `1px solid grey`,
        borderRadius: '10px',
      },
    },
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiRadio-colorSecondary.Mui-checked': {
      color: theme.palette.text.primary,
    },
    '& .MuiSelect-root em': {
      color: theme.palette.text.secondary,
    },
    '& .MuiRadio-root': {
      padding: '2px 9px',
    },
    '& .MuiButton-root': {
      margin: '0.5rem 1rem',
      borderRadius: '10px',
    },
  },
  formBox: {
    width: '100%',
    padding: '0 2rem 4rem 2rem',
    marginTop: '3rem',
    '& h2': {
      width: '100%',
    },
  },
  borderBox: {
    width: '100%',
    border: '1px solid #C4C4C4',
    padding: '4rem 7rem',
    boxSizing: 'border-box',
  },
}));

type FormProps = {
  title: string;
};

function NeedOfferForm(props: React.PropsWithChildren<FormProps>) {
  const { classes } = useStyles();

  return (
    <>
      <Container className={classes.formBox}>
        <Typography variant="h2" component="h2" align="left">
          {props.title}
        </Typography>
        <Box className={classes.borderBox}>
          <form className={classes.root}>{props.children}</form>
        </Box>
      </Container>
    </>
  );
}

export default NeedOfferForm;
