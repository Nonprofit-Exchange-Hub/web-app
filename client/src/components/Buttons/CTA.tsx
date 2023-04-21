import makeStyles from '@mui/styles/makeStyles';
import { Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  CTA: {
    color: 'white',
    backgroundColor: '#C7244B',
    borderRadius: '10px',
    fontFamily: 'Poppins',
    fontWeight: 'semi-bold',
    border: 'none',
  },
}));

type Props = {
  text: string;
};

function CTA({ text }: Props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <button onClick={() => history.push('/signup')} className={classes.CTA}>
      <Typography
        sx={{
          fontSize: '22px',
          padding: '18px 32px 18px 32px',
        }}
      >
        {text}
      </Typography>
    </button>
  );
}

export default CTA;
