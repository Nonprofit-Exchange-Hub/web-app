import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Typography from '@material-ui/core/Typography';
import TodayOutlined from '@material-ui/icons/TodayOutlined';
import RoomOutlined from '@material-ui/icons/RoomOutlined';

import { dumbyData } from './assets/temp';

import type { Theme } from '@material-ui/core/styles';
import type { Asset as AssetT } from './types';


const useStyles = makeStyles((theme: Theme) => ({
    topBar: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px 5%',
        borderRadius: 0,
        alignItems: 'center',
    },
    searchInput: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
    },
    // TODO i'm just copying these from other files,
    // either make them a component or make the styles shared objects somewhere
    iconButton: {
        padding: 10,
        '&:hover': {
            backgroundColor: 'inherit',
            borderRadius: '10px',
        },
        textDecoration: 'none',
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: '20px 15% 60px',
    },
    leftPanel: {
        width: '60%',
        marginRight: '5%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    rightPanel: {
        width: '35%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    },
    imgs: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    miniImgs: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '25%',
    },
    bigImg: {
        minHeight: '300px',
        minWidth: '300px',
        marginRight: '5px',
        borderRadius: '5px',
        objectFit: 'cover',
    },
    miniImg: {
        height: '50px',
        width: '50px',
        objectFit: 'cover',
        borderRadius: '5px',
        marginBottom: '10px',
        cursor: 'pointer',
    },
    subText: {
        display: 'flex',
        paddingTop: '10px',
        alignItems: 'center',
    },
    claimButton: {
        marginTop: '20px',
        width: '70%',
    },
}));

const useOffer = (id?: string): AssetT | null => {
  const [offer, setOffer] = React.useState<AssetT | null>(null);

  React.useEffect(() => {
    if (!id) { return; }

    // TODO replace find with fetch from BE
    const newOffer = dumbyData.find(dd => dd.id === parseInt(id, 10));
    setOffer(newOffer || null);
  }, [id]);

  return offer;
};


function Offer(): JSX.Element {
    const classes = useStyles();
    const { offerId } = useParams<{ offerId?: string }>();
    const offer = useOffer(offerId);

    const [searchText, setSearchText] = React.useState<string>('');
    const [selectedImgInd, setSelectedImgInd] = React.useState<number>(0);

    const handleClaim = () => {
      // TODOs
      // post request to claim this offer for this user
      // history.push to move us to confirmation page?
      // trigger top banner to drop down that says 'claimed'?
    }

    if (!offer) {
      return <>offer not found</>;
    }

    const bigImg = offer.imgs[selectedImgInd];

    return (
        <>
            <Paper elevation={0} className={classes.topBar}>
                <NavLink to="/assets" className={classes.iconButton}>
                    <Button><ArrowBackRoundedIcon />Go Back</Button>
                </NavLink>
                <Paper className={classes.searchInput}>
                    <InputBase
                        placeholder="ex. diapers"
                        inputProps={{ 'aria-label': 'ex. diapers' }}
                        type="text"
                        value={searchText}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearchText(e.target.value)}
                    />
                    <NavLink to={`/assets?search=${searchText}`} className={classes.iconButton}>
                        <SearchIcon />
                    </NavLink>
                </Paper>
            </Paper>
            <div className={classes.contentWrapper}>
                <div className={classes.leftPanel}>
                    <div className={classes.imgs}>
                        <img src={bigImg} alt={offer.title} className={classes.bigImg} />
                        <div className={classes.miniImgs}>
                            {offer.imgs.map((img, ind) => ind !== selectedImgInd ? (
                                <img
                                    src={img}
                                    alt={offer.title}
                                    className={classes.miniImg}
                                    onClick={() => setSelectedImgInd(ind)}
                                />
                            ) : null)}
                        </div>
                    </div>
                    <p style={{ textAlign: 'left', padding: '20px 0' }}>
                        {offer.description}
                    </p>
                </div>
                <div className={classes.rightPanel}>
                    <Typography variant="h3">
                        {offer.title}
                    </Typography>
                    <Typography className={classes.subText} variant="subtitle1">
                        {offer.categories.join(', ')}
                    </Typography>
                    <Typography className={classes.subText} variant="subtitle1">
                        Posted By {offer.postedBy}
                    </Typography>
                    <Typography className={classes.subText} variant="subtitle1">
                        <RoomOutlined />{offer.location}
                    </Typography>
                    <Typography className={classes.subText} variant="subtitle1">
                        <TodayOutlined />{offer.datePosted}
                    </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleClaim}
                        className={classes.claimButton}
                    >
                        Message to claim!
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Offer;
