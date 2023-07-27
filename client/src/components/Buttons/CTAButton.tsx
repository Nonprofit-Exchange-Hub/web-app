import { makeStyles } from 'tss-react/mui';
import { Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import React, { useContext } from 'react';
import { ModalContext } from '../../providers/ModalProvider';

const useStyles = makeStyles()((theme: Theme) => ({
  CTAButton: {
    color: 'white',
    backgroundColor: '#EF6A60',
    borderRadius: '10px',
    fontFamily: 'Poppins',
    fontWeight: 'semi-bold',
    border: 'none',
    '&:hover': {
      backgroundColor: '#EF6A60',
      cursor: 'pointer',
    },
  },
}));

type Props = {
  text: string;
};

function CTAButton({ text }: Props) {
  const { classes } = useStyles();
  const modalContext = useContext(ModalContext);
  const { openModal } = modalContext;

  return (
    <button onClick={() => openModal('SignUp')} className={classes.CTAButton}>
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

export default CTAButton;
