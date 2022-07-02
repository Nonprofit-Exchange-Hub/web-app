import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Typography from '@mui/material/Typography';
import TodayOutlined from '@mui/icons-material/TodayOutlined';
import RoomOutlined from '@mui/icons-material/RoomOutlined';

import type { Theme } from '@mui/material/styles';

import SimpleSnackbar from './SimpleSnackbar';
import routes from '../../../routes';

import type { Asset as AssetT } from '../../../types';

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
  heading: {
    marginBottom: '10px',
  },
  claimButton: {
    marginTop: '20px',
    width: '70%',
  },
}));

const useAsset = (id?: string): AssetT | null => {
  const [asset, setAsset] = React.useState<AssetT | null>(null);
  React.useEffect(() => {
    if (!id) {
      return;
    }
    const newAsset = async () => {
      const data = await fetch(`http://localhost:3001/api/assets/${id}`);
      const json = await data.json();
      setAsset(json);
    };

    newAsset();
  }, [id]);

  return asset;
};

function Asset(): JSX.Element {
  const classes = useStyles();
  const { assetId } = useParams<{ assetId?: string }>();
  const asset = useAsset(assetId);
  const [searchText, setSearchText] = React.useState<string>('');
  const [selectedImgInd, setSelectedImgInd] = React.useState<number>(0);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const handleClaim = () => {
    setShowSnackbar(true);
  };
  // TODOs
  // post request to claim this asset for this user
  // history.push to move us to confirmation page?
  // trigger top banner to drop down that says 'claimed'?
  if (!asset) {
    return <>asset not found</>;
  }

  const bigImg = asset.imgUrls?.[selectedImgInd];

  const showMiniImgs =
    asset.imgUrls
      ?.filter((imgUrl, ind) => ind !== selectedImgInd)
      .map((imgUrl, ind) => {
        return (
          <img
            key={imgUrl}
            src={imgUrl}
            alt={asset!.title}
            className={classes.miniImg}
            onClick={() => setSelectedImgInd(ind)}
          />
        );
      }) ?? [];

  const aboutInfo = () => {
    if (asset.organization !== null) {
      return (
        <div>
          <Typography className={classes.subText} variant="subtitle1">
            About the Nonprofit
          </Typography>
          <Typography className={classes.subText} variant="subtitle1">
            {asset.description}
          </Typography>
        </div>
      );
    }
  };
  return (
    <>
      <Paper elevation={0} className={classes.topBar}>
        <NavLink to={routes.Assets.path} className={classes.iconButton}>
          <Button>
            <ArrowBackRoundedIcon />
            Go Back
          </Button>
        </NavLink>
        <Paper className={classes.searchInput}>
          <InputBase
            placeholder="ex. diapers"
            inputProps={{ 'aria-label': 'ex. diapers' }}
            type="text"
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
          />
          <NavLink to={`${routes.Assets.path}?search=${searchText}`} className={classes.iconButton}>
            <SearchIcon />
          </NavLink>
        </Paper>
      </Paper>
      <div className={classes.contentWrapper}>
        <div className={classes.leftPanel}>
          <div className={classes.imgs}>
            <img src={bigImg} alt={asset.title} className={classes.bigImg} />
            <div id="miniImgs" className={classes.miniImgs}>
              {showMiniImgs}
            </div>
          </div>
          <p style={{ textAlign: 'left', padding: '20px 0' }}>{asset.description}</p>
        </div>
        <div className={classes.rightPanel}>
          <Typography className={classes.heading} variant="h3">
            {asset.title}
          </Typography>
          {asset.categories?.length && (
            <Typography className={classes.subText} variant="subtitle1">
              {asset.categories.join(', ')}
            </Typography>
          )}
          <Typography className={classes.subText} variant="subtitle1">
            {asset.organization ? '' : 'Posted By:'}
            {asset.poster.firstName}
          </Typography>
          <Typography className={classes.subText} variant="subtitle1">
            <RoomOutlined />
            {asset.location}
          </Typography>
          <Typography className={classes.subText} variant="subtitle1">
            <TodayOutlined />
            {asset.datePosted}
          </Typography>
          {aboutInfo()}
          <Button
            color="primary"
            variant="contained"
            onClick={handleClaim}
            className={classes.claimButton}
          >
            {asset.organization ? 'I can donate this!' : 'Message to claim!'}
          </Button>
          {showSnackbar ? <SimpleSnackbar /> : null}
        </div>
      </div>
    </>
  );
}

export default Asset;
