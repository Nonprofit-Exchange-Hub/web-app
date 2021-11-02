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
import SimpleSnackbar from './SimpleSnackbar'
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
        padding: '50px 4% 150px 7%',
    },
    leftPanel: {
        width: '45%',
        marginRight: '7%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    rightPanel: {
        width: '50%',
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
    heading:{
        marginBottom: '10px',
    },
    subText: {
        display: 'flex',
        paddingTop: '7px',
        alignItems: 'center',
    },
    linkedText:{
        display:'flex',
        paddingTop: '10px',
        fontWeight: 'bold',
        fontSize: '1.1em',
    },
    claimButton: {
        marginTop: '30px',
        width: '40%',
        borderRadius: '10px',
        minWidth: '150px',
    },
}));

const useAsset = (id?: string): AssetT | null => {
  const [asset, setAsset] = React.useState<AssetT | null>(null);

  React.useEffect(() => {
    if (!id) { return; }

    // TODO replace find with fetch from BE
    const newAsset = dumbyData.find(dd => dd.id === parseInt(id, 10));
    setAsset(newAsset || null);
  }, [id]);

  return asset;
};


function Asset(): JSX.Element {
    const classes = useStyles();
    const { assetId } = useParams<{ assetId?: string }>();
    const asset = useAsset(assetId);
    const [searchText, setSearchText] = React.useState<string>('');
    const [selectedImgInd, setSelectedImgInd] = React.useState<number>(0);
    let buttonLabel;
    const [snackbar, setSnackbar] = React.useState(false)
    const handleClaim = () => {
        setSnackbar(true)
      // TODOs
      // post request to claim this asset for this user
      // history.push to move us to confirmation page?
      // trigger top banner to drop down that says 'claimed'?
    }

    if (!asset) {
      return <>asset not found</>;
    }

    const bigImg = asset.imgUrls[selectedImgInd];
    //postedFrom function to differentiate between individuals and nonprofits posting
    const postedFrom = () =>{
        if(asset.organization == "null"){
            buttonLabel="Message to claim!"
            return(
                <Typography className={classes.subText} variant="subtitle1">
                    Posted By {asset.postedBy.firstName}
                </Typography>
            )
        }else{
            buttonLabel= "I can donate this!"
            return(
                <Typography className={classes.linkedText} variant="subtitle1">
                    {asset.postedBy.firstName}
                </Typography>
            )
        }

    }

    const aboutInfo = () =>{
        if(asset.organization !== "null"){
            return(
                <div>
                    <Typography className={classes.linkedText} variant="subtitle1">
                    About the Nonprofit
                    </Typography>
                    <Typography className={classes.subText} variant="subtitle1">
                    {asset.description}
                    </Typography>
                </div>)
        }
    }
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
                        <img src={bigImg} alt={asset.title} className={classes.bigImg} />
                        <div className={classes.miniImgs}>
                            {asset.imgUrls.map((imgUrl, ind) => ind !== selectedImgInd ? (
                                <img
                                    key={imgUrl}
                                    src={imgUrl}
                                    alt={asset.title}
                                    className={classes.miniImg}
                                    onClick={() => setSelectedImgInd(ind)}
                                />
                            ) : null)}
                        </div>
                    </div>
                    <p style={{ textAlign: 'left', padding: '20px 0' }}>
                        {asset.description}
                    </p>
                </div>
                <div className={classes.rightPanel}>
                    <Typography className={classes.heading} variant="h3">
                        {asset.title}
                    </Typography>
                    <Typography className={classes.subText} variant="subtitle1">
                        {asset.categories.join(', ')}
                    </Typography>
                    {postedFrom()}
                    <Typography className={classes.subText} variant="subtitle1">
                        <RoomOutlined />{asset.location}
                    </Typography>
                    <Typography className={classes.subText} variant="subtitle1">
                        <TodayOutlined />{asset.datePosted}
                    </Typography>
                    {aboutInfo()}
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleClaim}
                        className={classes.claimButton}
                    >
                        {buttonLabel}
                    </Button>
                    {snackbar ? <SimpleSnackbar/> : null}
                </div>
            </div>
        </>
    );
}

export default Asset;
