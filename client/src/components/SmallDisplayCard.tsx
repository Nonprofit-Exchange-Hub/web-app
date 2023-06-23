import * as React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { Card, Box } from '@mui/material';

import type { Theme } from '@mui/material/styles';

// Should probably move the width and height out of the component, maybe pass it in
const circleSize = 76;
const width = 325;
const height = 133;

const useStyles = makeStyles()((theme: Theme) => ({
  smallDisplayCard: {
    maxWidth: `${width}px`,
    height: `${height}px`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#767676',
    color: '#FFFFFF',
  },
  content: {
    height: '100%',
    paddingLeft: '50px',
    paddingRight: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: '28px',
    textAlign: 'left',
  },
  cardBody: {
    fontSize: '15px',
    textAlign: 'left',
    maxHeight: `${height - 40}px`,
  },
  circleWrapper: {
    width: '1px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
  },
  circle: {
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    width: `${circleSize}px`,
    height: `${circleSize}px`,
    left: `-${circleSize / 2}px`,
    position: 'relative',
  },
}));

type Props = {
  headerText: string;
  bodyText: string;
};

function SmallDisplayCard(props: Props): JSX.Element {
  const { classes } = useStyles();
  const { headerText, bodyText } = props;

  return (
    <Card className={classes.smallDisplayCard}>
      <Box className={classes.circleWrapper}>
        <Box className={classes.circle}></Box>
      </Box>
      <Box className={classes.content}>
        <Typography className={classes.cardTitle} variant="body1" component="div">
          {headerText}
        </Typography>
        <Typography className={classes.cardBody} variant="body1" component="div">
          {bodyText}
        </Typography>
      </Box>
    </Card>
  );
}

export default SmallDisplayCard;
