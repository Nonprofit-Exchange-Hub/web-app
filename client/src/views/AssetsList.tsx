import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
// import Card from '@mui/material/Card';
// import TodayOutlined from '@mui/icons-material/TodayOutlined';
// import RoomOutlined from '@mui/icons-material/RoomOutlined';
// import Grid from '@mui/material/Grid';
import SortBy from '../components/SortBy';

import type { Theme } from '@mui/material/styles';

import type { Asset } from '../types';
import NeedCard from '../components/Card/NeedCard';

const useStyles = makeStyles((theme: Theme) => ({
  needsAndOffersSub: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    width: '100%',
  },
  card: {
    marginBottom: '30px',
    // '&:not(:last-child)': {
    //   marginRight: '20px',
    // },
    // flex: '0 0 30%',
  },
  cardImg: {
    borderRadius: '5px',
    margin: '10%',
    maxWidth: '100%',
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

function AssetsList(props: Props): JSX.Element {
  const classes = useStyles();
  const { assets, headerContentRight, headerText } = props;
  if (!assets) return <> </>;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" component="h4" className={classes.needsAndOffersHeader}>
          {headerText}
        </Typography>
        {headerContentRight ?? null}
        <SortBy />
      </div>
      <div className={classes.needsAndOffersSub}>
        {assets.map((asset) => (
          <NavLink to={`/asset/${asset.id}`} key={asset.id} className={classes.card}>
            <NeedCard title={asset.title} type="need" date={new Date(asset.datePosted)} org="org" />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default AssetsList;
