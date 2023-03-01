import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import SortBy from '../components/SortBy';

import type { Theme } from '@mui/material/styles';

import type { Asset } from '../types';
import NeedCard from '../components/Card/NeedCard';

const useStyles = makeStyles((theme: Theme) => ({
  needsAndOffersSub: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    width: '100%',
  },
  card: {
    marginBottom: '30px',
    textDecoration: 'none',
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
            <NeedCard
              title={asset.title}
              datePosted={new Date(asset.datePosted)}
              location={asset.location}
              poster={asset.poster}
              type="need"
              org="exampleOrg"
              description={asset.description}
              condition={asset.condition}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default AssetsList;
