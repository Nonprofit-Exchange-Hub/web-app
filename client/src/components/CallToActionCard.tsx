import * as React from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    borderRadius: 5,
  },
  content: {
    width: '100%',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  grid: {
    height: '90%',
  },
  subText: {
    fontSize: '18px',
  },
  navLink: {
    fontWeight: 'normal',
    textDecoration: 'none',
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    borderRadius: 5,
    padding: '5px',
  },
}));

type Props = {
  btnText: string;
  color: string;
  headerText: string;
  subText: string;
  to: string;
};

function CallToActionCard({ btnText, color, headerText, subText, to }: Props) {
  const { classes } = useStyles();

  return (
    <Card className={classes.wrapper} sx={{ height: '500px', width: '100%' }}>
      <CardContent
        className={classes.content}
        sx={{ backgroundColor: color, padding: '40px 20px' }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          className={classes.grid}
        >
          <Grid item sx={{ marginBottom: '30px' }}>
            <Typography component="h3" variant="h4" textAlign="left" fontWeight="semi-bold">
              {headerText}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.subText}>{subText}</Typography>
          </Grid>
        </Grid>
        <NavLink to={to} className={classes.navLink}>
          {btnText}
        </NavLink>
      </CardContent>
    </Card>
  );
}

export default CallToActionCard;
