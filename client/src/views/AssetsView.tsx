import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import * as queryString from 'query-string';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import type { Theme } from '@mui/material/styles';

import AssetsList from './AssetsList';
import FilterGroup from '../components/FilterGroup';
import { mockData, filters1, filters2, filters3 } from '../assets/temp';
import routes from '../routes';
import type { Asset } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  searchBar: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px 5%',
    borderRadius: 0,
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
    '&:hover': {
      backgroundColor: 'inherit',
      borderRadius: '10px',
    },
  },
  searchInput: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  leftPanel: {
    borderRight: '1px solid grey',
    width: '20%',
  },
  createBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '10px 5%',
    width: '80%',
  },
  makeAPost: {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'black',
  },
}));

function AssetsView(): JSX.Element {
  const classes = useStyles();
  const location = useLocation();
  const querySearchText = queryString.parse(location.search).search;
  const [searchText, setSearchText] = React.useState<string>((querySearchText as string) || '');
  const [selectedFilters, setSelectedFilters] = React.useState<{ [key: string]: boolean }>({});

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters({
      ...selectedFilters,
      [event.target.value]: event.target.checked,
    });
  };

  const [selectedAssetType, setSelectedAssetType] = React.useState<'donation' | 'request'>(
    'donation',
  );
  const [donations, setDonations] = React.useState<Asset[]>([]);
  const [needs, setNeeds] = React.useState<Asset[]>([]);

  React.useEffect(() => {
    // fetch assets with querySearchText
    fetch(
      `http://localhost:3001/api/assets?type=${selectedAssetType}${
        querySearchText ? `&title=${querySearchText}` : ''
      }`,
    )
      .then((resp) => resp.json())
      .then((data: Asset[]) => {
        if (selectedAssetType === 'donation') {
          setDonations(data);
        } else {
          setNeeds(data);
        }
      });
  }, [location, querySearchText, selectedAssetType]);

  return (
    <>
      <Paper className={classes.searchBar}>
        <>X of Y results for "{querySearchText}"</>
        <Paper className={classes.searchInput}>
          <InputBase
            placeholder="ex. diapers"
            inputProps={{ 'aria-label': 'ex. diapers' }}
            type="text"
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setSearchText(e.target.value);
              // next line only here temporarily to prevent app from erroring out. Intended to be attached to user input in the future
              setSelectedAssetType('donation');
            }}
          />
          <NavLink to={`${routes.Assets.path}?search=${searchText}`} className={classes.iconButton}>
            <SearchIcon />
          </NavLink>
        </Paper>
      </Paper>
      <div className={classes.contentWrapper}>
        <div className={classes.leftPanel}>
          <FilterGroup
            header="Location"
            onHandleCheck={handleCheck}
            filters={filters1}
            selectedFilters={selectedFilters}
          />
          <FilterGroup
            header="Category"
            onHandleCheck={handleCheck}
            filters={filters2}
            selectedFilters={selectedFilters}
          />
          <FilterGroup
            header="Nonprofit"
            onHandleCheck={handleCheck}
            filters={filters3}
            selectedFilters={selectedFilters}
          />
        </div>
        <div className={classes.rightPanel}>
          <Paper elevation={0} className={classes.createBar}>
            {/* where is this meant to link to? */}
            <NavLink className={classes.makeAPost} to="/create">
              <Button color="primary" variant="contained">
                Make a Post
              </Button>
            </NavLink>
          </Paper>
          <AssetsList headerText="Nonprofit Needs" assets={mockData} />
          <AssetsList
            headerText="Offers"
            assets={selectedAssetType === 'donation' ? donations : needs}
          />
        </div>
      </div>
    </>
  );
}

export default AssetsView;
