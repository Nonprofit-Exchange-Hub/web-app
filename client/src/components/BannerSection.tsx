import { useHistory } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  gridTitle: {
    backgroundColor: 'red',
  },
  gridButtons: {
    color: 'white',
    backgroundColor: '#C7244B',
    borderRadius: '2rem',
    fontFamily: 'Poppins',
    fontSize: '22px',
    fontWeight: 'semi-bold',
    border: 'none',
    padding: '0.8rem 2rem 0.8rem 2rem',
    cursor: 'pointer',
  },
  gridContent: {
    height: '45rem',
    backgroundImage:
      'url(https://images-ext-2.discordapp.net/external/TAfP2xMv2YzlJX7X1UtBTnb8MZ5lKcfTlL70XRUvOdg/https/t4.ftcdn.net/jpg/03/30/54/59/360_F_330545902_1guQc0CoC4R15HhWPpOuAWtxF3YCm58e.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

function BannerSection() {
  const classes = useStyles();
  const history = useHistory();
  console.log(classes);
  return (
    <div className={classes.gridContent}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={1}>
            <></>
          </Grid>
          <Grid item xs={5}>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '54px', fontWeight: 'bold' }}>
              One stop nonprofit exchange hub
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <></>
          </Grid>
          <Grid item xs={1}>
            <></>
          </Grid>
          <Grid item xs={5}>
            <Typography sx={{ fontSize: '28px', margin: '0.6rem 0 2.3rem 0' }}>
              A free service to help you connect to resources in you community
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <></>
          </Grid>
          <Grid item xs={1}>
            <></>
          </Grid>
          <Grid item xs={5}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '800px',
              }}
            >
              <button
                onClick={() => history.push('/signup-nonprofit')}
                className={classes.gridButtons}
              >
                Join as a Nonprofit
              </button>
              <button
                onClick={() => history.push('/signup-citizen')}
                className={classes.gridButtons}
              >
                Join as an Individual
              </button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <></>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default BannerSection;
