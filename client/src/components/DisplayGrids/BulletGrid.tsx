import * as React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Grid } from '@mui/material';

import type { Theme } from '@mui/material/styles';

const bulletStyles = makeStyles<Theme, BulletProps>((theme: Theme) => ({
  grid: {
    marginTop: '30px',
  },
  square: {
    width: '100px',
    height: '100px',
    backgroundColor: 'white',
    marginRight: '20px',
  },
}));

type BulletProps = {
  list: string[];
};

function BulletGrid(props: BulletProps) {
  const classes = bulletStyles(props);

  return (
    <Grid container justifyContent="space-between">
      {props.list.map((listItem, idx) => {
        const key = `${listItem}_${idx}`;
        return (
          <Grid key={key} container item md={6} xs={12} className={classes.grid}>
            <Grid item>
              <Box className={classes.square}></Box>
            </Grid>
            <Grid item xs>
              <Typography variant="body1" component="div" align="left">
                {listItem}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default BulletGrid;
