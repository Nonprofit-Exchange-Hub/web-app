import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TodayOutlined from '@material-ui/icons/TodayOutlined';
import RoomOutlined from '@material-ui/icons/RoomOutlined';

import type { Theme } from '@material-ui/core/styles';

import type { Assets } from './types';


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
  cards: Assets,
};

function NeedsAndOffers(props: Props): JSX.Element {
    const classes = useStyles();
    const { cards, headerText } = props;

    return (
        <>
            <Typography variant="h4" component="h4" className={classes.needsAndOffersHeader}>
                {headerText}
            </Typography>
            <div className={classes.needsAndOffersSub}>
                {cards.map(card => (
                    <Card className={classes.card} variant="outlined" key={card.id}>
                        <img src={card.img} className={classes.cardImg} alt={card.title} />
                        <Typography variant="h6" component="h4" className={classes.cardText1}>
                            {card.title}, {card.category}
                        </Typography>
                        <div className={classes.cardText2}>
                            <RoomOutlined />{card.location}<TodayOutlined />{card.datePosted}
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default NeedsAndOffers;
