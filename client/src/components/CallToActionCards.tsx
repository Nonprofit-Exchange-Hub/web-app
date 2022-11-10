import * as React from 'react';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  CTAGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: '25px',
  },

  CTACardLayout: {
    border: '1',
    borderColor: '#37718E',
  },

  CTACardContent1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#37718E',
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'left',
  },

  CTACardContent2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7C4164',
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'left',
  },

  CTACardContent3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C33D54',
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'left',
  },

  HeaderStyle: {
    paddingY: '2',
    my: '2',
    mt: '2',
  },

  ParagraphStyle: {
    textColor: '#FFFFFF',
    fontSize: '10',
    textAlign: 'left',
    width: '80%',
  },

  CTAButton: {
    display: 'inline-block',
    justifyContent: 'bottom',
    marginTop: '100px',
    variant: '',
    width: '60%',
  },

  BottomCTACard: {
    display: 'flex',
  },
}));

function CallToActionCards() {
  const classes = useStyles({});

  const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique.';
  const headerText = 'Tertiary Headline Title';

  const [btnText, setBtnText] = React.useState<string>('');
  const [btnText2, setBtnText2] = React.useState<string>('');
  const [btnText3, setBtnText3] = React.useState<string>('');

  return (
    <>
      <Grid className={classes.CTAGrid} container gap="20px">
        <Grid item xs={2}>
          <Card className={classes.CTACardLayout} sx={{ borderRadius: 5 }}>
            <CardContent className={classes.CTACardContent1}>
              <Typography
                fontSize="28px"
                textAlign="left"
                fontWeight="semi-bold"
                paddingTop="40px"
                marginLeft="20px"
                marginBottom="40px"
              >
                {headerText}
              </Typography>
              <Typography className={classes.ParagraphStyle} marginLeft="20px">
                {' '}
                {loremIpsum}{' '}
              </Typography>
              <Grid
                item
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                  paddingLeft: '10px',
                  marginTop: '75px',
                }}
              >
                <Avatar
                  alt="Image placeholder"
                  src="client\public\blank-bio-pic.png"
                  sx={{ width: '150px', height: '150px' }}
                />
                <IconButton
                  className={classes.CTAButton}
                  onMouseEnter={() => setBtnText('More Info ')}
                  onMouseLeave={() => setBtnText('')}
                >
                  {' '}
                  {btnText}
                  <ArrowForwardIcon
                    style={{ alignContent: 'bottom' }}
                    sx={{
                      height: '50px',
                      width: '70px',
                      backgroundColor: 'transparent',
                      color: '#FFFFFF',
                      paddingRight: '10px',
                    }}
                  />
                </IconButton>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.CTACardLayout} sx={{ borderRadius: 5 }}>
            <CardContent className={classes.CTACardContent2}>
              <Typography
                fontSize="28px"
                textAlign="left"
                fontWeight="semi-bold"
                paddingTop="40px"
                marginLeft="20px"
                marginBottom="40px"
              >
                {headerText}
              </Typography>
              <Typography className={classes.ParagraphStyle} marginLeft="20px">
                {' '}
                {loremIpsum}{' '}
              </Typography>
              <Grid
                item
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                  paddingLeft: '10px',
                  marginTop: '75px',
                }}
              >
                <Avatar
                  alt="Image placeholder"
                  src="client\public\blank-bio-pic.png"
                  sx={{ width: '150px', height: '150px' }}
                />
                <IconButton
                  className={classes.CTAButton}
                  onMouseEnter={() => setBtnText2('More Info ')}
                  onMouseLeave={() => setBtnText2('')}
                >
                  {' '}
                  {btnText2}
                  <ArrowForwardIcon
                    style={{ alignContent: 'bottom' }}
                    sx={{
                      height: '50px',
                      width: '70px',
                      backgroundColor: 'trasparent',
                      color: '#FFFFFF',
                      paddingRight: '10px',
                    }}
                  />
                </IconButton>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.CTACardLayout} sx={{ borderRadius: 5 }}>
            <CardContent className={classes.CTACardContent3}>
              <Typography
                fontSize="28px"
                textAlign="left"
                fontWeight="semi-bold"
                paddingTop="40px"
                marginLeft="20px"
                marginBottom="40px"
              >
                {headerText}
              </Typography>
              <Typography className={classes.ParagraphStyle} marginLeft="20px">
                {' '}
                {loremIpsum}{' '}
              </Typography>
              <Grid
                item
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                  paddingLeft: '10px',
                  marginTop: '75px',
                }}
              >
                <Avatar
                  alt="Image placeholder"
                  src="client\public\blank-bio-pic.png"
                  sx={{ width: '150px', height: '150px' }}
                />
                <IconButton
                  className={classes.CTAButton}
                  onMouseEnter={() => setBtnText3('More Info ')}
                  onMouseLeave={() => setBtnText3('')}
                >
                  {' '}
                  {btnText3}
                  <ArrowForwardIcon
                    style={{ alignContent: 'bottom' }}
                    sx={{
                      height: '50px',
                      width: '70px',
                      backgroundColor: 'trasparent',
                      color: '#FFFFFF',
                      paddingRight: '10px',
                    }}
                  />
                </IconButton>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default CallToActionCards;
