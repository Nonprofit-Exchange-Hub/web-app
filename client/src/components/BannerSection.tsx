import { Grid, Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import type { Theme } from '@mui/material/styles';
import MainImage from '../assets/MainImage.svg';
import CTAButton from './Buttons/CTAButton';

const useStyles = makeStyles((theme: Theme) => ({
  gridTitle: {
    backgroundColor: 'red',
  },
  bannerRight: {
    padding: '1.8rem 2rem 2rem 2rem',
    background: '#FFC958',
  },
  MainImage: {
    width: '100%',
  },
}));

function BannerText() {
  return (
    <>
      <Typography sx={{ fontSize: '3.5rem', margin: '0 0 0 0', letterSpacing: '0.005em' }}>
        Support Local
      </Typography>
      <Typography
        sx={{
          fontSize: '5.7rem',
          lineHeight: '100px',
          margin: '0 0 0 0',
          letterSpacing: '-1.5px',
        }}
      >
        Nonprofits
      </Typography>
      <Typography sx={{ fontSize: '1.5rem', margin: '30px 0 55px 0' }}>
        Be part of our community of volunteers, nonprofits, and individuals through the Givingful
        exchange platform.
      </Typography>
    </>
  );
}

function BannerSection() {
  const classes = useStyles();

  return (
    <Box>
      <Grid container spacing={3} sx={{ height: '600px' }}>
        <Grid xs={6} item justifyContent="center" sx={{ display: 'flex' }}>
          <Box sx={{ width: '550px', mt: '180px', mb: '66px', ml: '40px' }}>
            <BannerText />
            <CTAButton text="Join Now" />
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          className={classes.bannerRight}
          alignItems="center"
          sx={{ display: 'flex', borderRadius: '0px 0px 0px 20px' }}
        >
          <Box sx={{ minWidth: '550px', mt: '180px', mb: '66px', ml: '20px' }}>
            <img src={MainImage} alt="Banner" className={classes.MainImage} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BannerSection;
