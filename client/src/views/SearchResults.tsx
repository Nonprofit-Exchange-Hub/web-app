import * as React from 'react';
import * as queryString from 'query-string';
import { NavLink, useHistory } from 'react-router-dom';

import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';

import type { Theme } from '@mui/material/styles';

import AssetsList from './AssetsList';
import OrgsList from './OrgsList';
import FilterGroup from '../components/FilterGroup';
import { filters1, filters2, filters3 } from '../assets/temp';
import { APP_API_BASE_URL } from '../configs';

import type { Asset, Organization } from '../types';

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

function SearchResults(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();

  const { search: querySearchText, category: querySearchCategory } = queryString.parse(
    history.location.search,
  );

  const [searchCategory, setSearchCategory] = React.useState<string>(
    (querySearchCategory as string) || '',
  );
  const [searchText, setSearchText] = React.useState<string>((querySearchText as string) || '');
  const [selectedFilters, setSelectedFilters] = React.useState<{ [key: string]: boolean }>({});

  const [offers, setOffers] = React.useState<Asset[]>([]);
  const [needs, setNeeds] = React.useState<Asset[]>([]);
  const [orgs, setOrgs] = React.useState<Organization[]>([]);
  //TODO: create Volunteer Type in types/index.ts and change Object[] to Volunteer[] below
  const [volunteer, setVolunteer] = React.useState<Object[]>([]);

  function fetchSearchData() {
    if (querySearchCategory === 'Volunteer') {
      //TODO: Change API to /volunteer
      fetch(`${APP_API_BASE_URL}/organizations`)
        .then((resp) => resp.json())
        .then((data: Asset[]) => {
          setVolunteer(data);
        });
    } else if (querySearchCategory === 'Offers' || querySearchCategory === 'Needs') {
      fetch(
        `${APP_API_BASE_URL}/assets?type=${
          querySearchCategory === 'Needs' ? 'request' : 'donation'
        }${querySearchText ? `&title=${querySearchText}` : ''}`,
      )
        .then((resp) => resp.json())
        .then((data: Asset[]) => {
          if (querySearchCategory === 'Needs') {
            setNeeds(data);
          } else {
            setOffers(data);
          }
        });
    } else if (querySearchCategory === 'Nonprofits') {
      fetch(`${APP_API_BASE_URL}/organizations?search=${querySearchText}`)
        .then((resp) => resp.json())
        .then((data: Organization[]) => {
          setOrgs(data);
        });
    } else {
      //TODO: Change API to fetch ALL combined data
    }
  }

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters({
      ...selectedFilters,
      [event.target.value]: event.target.checked,
    });
  };

  const handleSearch = () => {
    history.push(`/SearchResults?search=${searchText}&category=${searchCategory}`);
  };

  React.useEffect(() => {
    fetchSearchData();
  }, [querySearchText, querySearchCategory]);

  return (
    <>
      <Paper className={classes.searchBar}>
        <Box sx={{ display: 'flex' }}>
          <>
            X of Y results for "<b>{searchText}</b>"
          </>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchCategory}
              label="Age"
              onChange={(e: SelectChangeEvent) => {
                setSearchCategory(e.target.value);
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Nonprofits">Nonprofits</MenuItem>
              <MenuItem value="Needs">Needs</MenuItem>
              <MenuItem value="Offers">Offers</MenuItem>
              <MenuItem value="Volunteer">Volunteer</MenuItem>
            </Select>
          </FormControl>

          <Paper className={classes.searchInput}>
            <Tooltip
              placement="top-end"
              componentsProps={{
                tooltip: {
                  sx: {
                    color: 'rgba(0, 0, 0, 0.87)',
                    fontSize: 13,
                    bgcolor: 'common.white',
                    '& .MuiTooltip-arrow': {
                      color: 'common.white',
                    },
                  },
                },
              }}
              title="Press 'Enter' key or Click the Icon to Search"
            >
              <TextField
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '0 none',
                  },
                }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'ex. diapers' }}
                type="text"
                value={searchText}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                  setSearchText(e.target.value);
                }}
              />
            </Tooltip>
            <SearchIcon fontSize="large" onClick={handleSearch} />
          </Paper>
        </Box>
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
            {/* TODO: where is this meant to link to? */}
            <NavLink className={classes.makeAPost} to="/create">
              <Button color="primary" variant="contained">
                Make a Post
              </Button>
            </NavLink>
          </Paper>
          {/* {TODO:   Need to combine all lists under one "List" component} */}
          {/* {TODO:   Create and add a VolunteerList component below */}
          {querySearchCategory === 'All' ? (
            <div>
              {needs.length > 0 ? <AssetsList headerText={'Needs'} assets={needs} /> : <></>}
              {offers.length > 0 ? <AssetsList headerText={'Offers'} assets={offers} /> : <></>}
              {orgs.length > 0 ? <OrgsList headerText={'Nonprofits'} orgs={orgs} /> : <></>}
              {volunteer.length > 0 ? `<VolunteerList Componet TBD />` : <></>}
            </div>
          ) : (
            <></>
          )}
          {querySearchCategory === 'Needs' || querySearchCategory === 'Offers' ? (
            <AssetsList
              headerText={querySearchCategory === 'Needs' ? 'Needs' : 'Offers'}
              assets={querySearchCategory === 'Needs' ? needs : offers}
            />
          ) : (
            <></>
          )}
          {querySearchCategory === 'Nonprofits' ? (
            <OrgsList headerText={'Nonprofits'} orgs={orgs} />
          ) : (
            <></>
          )}
          {querySearchCategory === 'Volunteer' ? `<VolunteerList Componet TBD />` : <></>}
          {needs.length + offers.length + orgs.length + volunteer.length === 0 && 'No Results'}
        </div>
      </div>
    </>
  );
}

export default SearchResults;
