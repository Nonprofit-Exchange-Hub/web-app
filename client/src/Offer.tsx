import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
// import * as queryString from 'query-string';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

import type { Theme } from '@material-ui/core/styles';
import type { Asset as AssetT } from './types';


const placeholderImg = 'https://optinmonster.com/wp-content/uploads/2019/09/nonprofit-newsletter.png';
const dumbyData: AssetT[] = [1, 2, 3].map(num => ({
    id: num,
    title: `title ${num}`,
    category: `category ${num}`,
    datePosted: `datePosted ${num}`,
    location: `location ${num}`,
    img: placeholderImg,
}));

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
        padding: '10px 5%',
    },
    leftPanel: {
      width: '50%',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    rightPanel: {
      width: '50%',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
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

    if (!offer) {
      return <>offer not found</>;
    }

    return (
        <>
            <Paper className={classes.topBar}>
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
                    left
                </div>
                <div className={classes.rightPanel}>
                    right
                </div>
            </div>
        </>
    );
}

export default Offer;
