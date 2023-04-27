import makeStyles from '@mui/styles/makeStyles';
import { Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
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
  const classes = useStyles();
  const history = useHistory();

  return (
    <button onClick={() => history.push('/signup')} className={classes.CTAButton}>
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
