import makeStyles from '@mui/styles/makeStyles';
import { Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  CTAButton: {
    color: 'white',
    backgroundColor: '#C7244B',
    borderRadius: '10px',
    fontFamily: 'Poppins',
    fontWeight: 'semi-bold',
    border: 'none',
    '&:hover': {
      backgroundColor: '#C7244B',
      cursor: 'pointer',
    },
  },
}));

type Props = {
  text: string;
};
//more props - styleOverrides
function CTAButton({ text }: Props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <button onClick={() => history.push('/signup')} className={classes.CTAButton}>
      <Typography
        sx={{
          fontSize: '22px',
          padding: '18px 32px 18px 32px',
          '&:hover': {
            backgroundColor: '#C7244B',
            cursor: 'pointer',
          },
        }}
      >
        {text}
      </Typography>
    </button>
  );
}

export default CTAButton;
