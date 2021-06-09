import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import TodayOutlined from '@material-ui/icons/TodayOutlined';
import RoomOutlined from '@material-ui/icons/RoomOutlined';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import type { Theme } from '@material-ui/core/styles';

import type { Assets } from './types';


const placeholderImg = 'https://optinmonster.com/wp-content/uploads/2019/09/nonprofit-newsletter.png';


const useStyles = makeStyles((theme: Theme) => ({
    needsAndOffersSub: {
        display: 'flex',
        flexDirection: 'row',
    },
    card: {
        margin: '3%',
    },
    cardImg: {
        borderRadius: '5px',
        margin: '10%',
        maxWidth: '80%',
    },
    needsAndOffersHeader: {
        textAlign: 'left',
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
                    <Card className={classes.card} variant="outlined">
                        <img src={card.img} className={classes.cardImg} />
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
