import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TodayOutlined from '@material-ui/icons/TodayOutlined';
import RoomOutlined from '@material-ui/icons/RoomOutlined';
import { NavLink } from 'react-router-dom';

import type { Theme } from '@material-ui/core/styles';

import type { Asset } from './types';


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
  headerText: string,
  assets: Asset[],
};

function NeedsAndOffers(props: Props): JSX.Element {
    const classes = useStyles();
    const { assets, headerText } = props;

    return (
        <>
            <Typography variant="h4" component="h4" className={classes.needsAndOffersHeader}>
                {headerText}
            </Typography>
            <div className={classes.needsAndOffersSub}>
                {assets.map(asset => (
                    <NavLink to={`/asset/${asset.id}`} key={asset.id} className={classes.card}>
                        <Card variant="outlined">
                            <img src={asset.imgUrls[0]} className={classes.cardImg} alt={asset.title} />
                            <Typography variant="h6" component="h4" className={classes.cardText1}>
                                {asset.title}, {asset.categories[0]}
                            </Typography>
                            <div className={classes.cardText2}>
                                <RoomOutlined />{asset.location}<TodayOutlined />{asset.datePosted}
                            </div>
                        </Card>
                    </NavLink>
                ))}
            </div>
        </>
    );
}

export default NeedsAndOffers;
