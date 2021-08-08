import * as React from 'react';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import TodayOutlined from '@material-ui/icons/TodayOutlined';
// import RoomOutlined from '@material-ui/icons/RoomOutlined';
// import { NavLink } from 'react-router-dom';

import type { Theme } from '@material-ui/core/styles';

import { SubHeader } from './components';

// import type { Asset } from '../types';


const useStyles = makeStyles((theme: Theme) => ({
    // needsAndOffersSub: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    // card: {
    //     marginBottom: '30px',
    //     '&:not(:last-child)': {
    //         marginRight: '20px',
    //     },
    // },
    // cardImg: {
    //     borderRadius: '5px',
    //     margin: '10%',
    //     maxWidth: '80%',
    // },
    // needsAndOffersHeader: {
    //     textAlign: 'left',
    //     paddingBottom: '20px',
    // },
    // needsAndOffers: {
    //     padding: '10%',
    // },
    // cardText1: {
    //     padding: '0 10%',
    // },
    // cardText2: {
    //     padding: '0 10% 10%',
    // },
}));


type Props = {
  // headerText: string,
  // cards: Asset[],
};


// TODO use SubHeader component in Offer and Assets pages
// maybe call it SearchBar and have an optional leftContent prop?

function MessageInboxView(props: Props): JSX.Element {
    const classes = useStyles();

    return (
        <>
            <SubHeader backTo="/" searchTo="/inbox" />
        </>
    );
}

export default MessageInboxView;
