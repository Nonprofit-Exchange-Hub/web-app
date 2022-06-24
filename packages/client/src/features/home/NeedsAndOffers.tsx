import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import TodayOutlined from '@mui/icons-material/TodayOutlined';
import RoomOutlined from '@mui/icons-material/RoomOutlined';
import Grid from '@mui/material/Grid';

import type { Theme } from '@mui/material/styles';

import type { Asset } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  needsAndOffersSub: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: '30px',
    '&:not(:last-child)': {
      marginRight: '20px',
    },
  },
  cardImg: {
    borderRadius: '5px',
    margin: '10%',
    maxWidth: '80%',
  },
  needsAndOffersHeader: {
    textAlign: 'left',
    paddingBottom: '20px',
  },
  needsAndOffers: {
    padding: '10%',
  },
  cardText1: {
    padding: '0 10%',
  },
  cardText2: {
    padding: '0 10% 10%',
  },
}));

type Props = {
  assets: Asset[];
  headerContentRight?: JSX.Element;
  headerText: string;
};

function NeedsAndOffers(props: Props): JSX.Element {
  const classes = useStyles();
  const { assets, headerContentRight, headerText } = props;

  return (
    <>
      <Grid container item justifyContent="space-between">
        <Typography variant="h4" component="h4" className={classes.needsAndOffersHeader}>
          {headerText}
        </Typography>
        {headerContentRight ?? null}
      </Grid>
      <div className={classes.needsAndOffersSub}>
        {assets.map((asset) => (
          <NavLink to={`/asset/${asset.id}`} key={asset.id} className={classes.card}>
            <Card variant="outlined">
              <img
                src={
                  asset?.imgUrls?.[0] ??
                  'https://optinmonster.com/wp-content/uploads/2019/09/nonprofit-newsletter.png'
                }
                className={classes.cardImg}
                alt={asset.title}
              />
              <Typography variant="h6" component="h4" className={classes.cardText1}>
                {asset.title}, {asset.categories ? asset.categories[0] : null}
              </Typography>
              <div className={classes.cardText2}>
                <RoomOutlined />
                {asset.location}
                <TodayOutlined />
                {new Date(asset.datePosted).toLocaleDateString()}
              </div>
            </Card>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default NeedsAndOffers;
