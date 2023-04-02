import { useHistory } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import type { Theme } from '@mui/material/styles';
import MainImage from '../assets/MainImage.svg';

const useStyles = makeStyles((theme: Theme) => ({
  gridTitle: {
    backgroundColor: 'red',
  },
  gridButtons: {
    color: 'white',
    backgroundColor: '#C7244B',
    borderRadius: '1rem',
    fontFamily: 'Poppins',
    fontSize: '22px',
    fontWeight: 'semi-bold',
    border: 'none',
    padding: '0.8rem 2rem 0.8rem 2rem',
    cursor: 'pointer',
  },
  gridContent: {
    
  },
  bannerRight: {
    padding: '1.8rem 2rem 2rem 2rem',
    background: '#FFC958',
  },
  MainImage: {
    width: '100%',
  },
}));

function BannerSection() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.gridContent} >
      <Box >
        <Grid container spacing={3} sx={{ height: '600px'}}>
          <Grid xs={6} item alignItems="center" justifyContent="center"sx={{ display: 'flex' }}>
            <Box sx={{ width: '500px', mt: '8rem', mb: '2rem' }}>
              <Typography sx={{ fontSize: '3rem', margin: '0rem 0 0rem 0', letterSpacing: '0.005em' }}>
                Support Local
              </Typography>
              <Typography sx={{ fontSize: '5rem', lineHeight: '100px', margin: '0 0 0 0', letterSpacing: '-1.5px'  }}>
                Nonprofits
              </Typography>
              <Typography sx={{ fontSize: '1.5rem', margin: '2rem 0 3.3rem 0' }}>
                Be part of our community of volunteers, nonprofits, and individuals through the
                Givingful exchange platform.
              </Typography>
              <button
                onClick={() => history.push('/signup-nonprofit')}
                className={classes.gridButtons}
              >
                Join Now
              </button>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.bannerRight} alignItems="center" sx={{ display: 'flex', borderRadius: '0px 0px 0px 20px' }}>
            <Box sx={{ minWidth: '500px', mt: '8rem', mb: '2rem'}}>
              <img src={MainImage} alt="Banner Image" className={classes.MainImage} />
            </Box> 
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default BannerSection;
