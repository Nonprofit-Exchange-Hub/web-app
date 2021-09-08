import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TodayOutlined from '@material-ui/icons/TodayOutlined';
import RoomOutlined from '@material-ui/icons/RoomOutlined';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

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
    cards: Asset[],
    headerContentRight?: JSX.Element,
    headerText: string,
};

function NeedsAndOffers(props: Props): JSX.Element {
    const classes = useStyles();
    const { cards, headerContentRight, headerText } = props;

    return (
        <>
            <Grid container item justifyContent="space-between">
                <Typography variant="h4" component="h4" className={classes.needsAndOffersHeader}>
                    {headerText}
                </Typography>
                {headerContentRight ?? null}
            </Grid>
            <div className={classes.needsAndOffersSub}>
                {cards.map(card => (
                    <NavLink to={`/offer/${card.id}`} key={card.id} className={classes.card}>
                        <Card variant="outlined">
                            <img src={card.imgs[0]} className={classes.cardImg} alt={card.title} />
                            <Typography variant="h6" component="h4" className={classes.cardText1}>
                                {card.title}, {card.categories[0]}
                            </Typography>
                            <div className={classes.cardText2}>
                                <RoomOutlined />{card.location}<TodayOutlined />{card.datePosted}
                            </div>
                        </Card>
                    </NavLink>
                ))}
            </div>
        </>
    );
}

export default NeedsAndOffers;
