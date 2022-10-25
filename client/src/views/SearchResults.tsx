import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import * as queryString from 'query-string';
import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import type { Theme } from '@mui/material/styles';

import AssetsList from './AssetsList';
import OrgsList from './OrgsList';
import VolunteerList from './VolunteerList';
import FilterGroup from '../components/FilterGroup';
import { filters1, filters2, filters3 } from '../assets/temp';
import type { Asset } from '../types';
import { APP_API_BASE_URL } from '../configs';

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
  const location = useLocation<{ category: '' }>();
  //implement below line to input filters at render
  const querySearchCategory = location.state.category || '';
  const querySearchText = queryString.parse(location.search).search;
  const [searchCategory, setSearchCategory] = React.useState<string>(
    (querySearchCategory as string) || '',
  );
  const [searchText, setSearchText] = React.useState<string>((querySearchText as string) || '');
  const [inputText, setInputText] = React.useState<string>('');
  const [selectedFilters, setSelectedFilters] = React.useState<{ [key: string]: boolean }>({});

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters({
      ...selectedFilters,
      [event.target.value]: event.target.checked,
    });
  };

  const [offers, setOffers] = React.useState<Asset[]>([]);
  const [needs, setNeeds] = React.useState<Asset[]>([]);
  const [orgs, setOrgs] = React.useState<Asset[]>([]);
  const [volunteer, setVolunteer] = React.useState<Asset[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setSearchCategory(event.target.value);
  };

  const handleSearch = () => {
    setSearchText(inputText);
    setInputText('');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  React.useEffect(() => {
    // fetch assets with searchText
    console.log(`Search this: ${searchCategory}`);
    if (searchCategory === 'Volunteer') {
      //TODO: Change API to /volunteer
      fetch(`${APP_API_BASE_URL}/organizations`)
        .then((resp) => resp.json())
        .then((data: Asset[]) => {
          setVolunteer(data);
        });
    } else if (searchCategory === 'Offers' || searchCategory === 'Needs') {
      fetch(
        `${APP_API_BASE_URL}/assets?type=${searchCategory === 'Needs' ? 'donation' : 'request'}${
          searchText ? `&title=${searchText}` : ''
        }`,
      )
        .then((resp) => resp.json())
        .then((data: Asset[]) => {
          if (searchCategory === 'Needs') {
            setNeeds(data);
          } else {
            setOffers(data);
          }
        });
    } else if (searchCategory === 'Nonprofits') {
      fetch(`${APP_API_BASE_URL}/organizations`)
        .then((resp) => resp.json())
        .then((data: Asset[]) => {
          setOrgs(data);
        });
    } else {
      //TODO: Change API to fetch ALL data
      fetch(`${APP_API_BASE_URL}/organizations`)
        .then((resp) => resp.json())
        .then((data: Asset[]) => {
          setVolunteer(data);
        });
    }
  }, [location, searchText, searchCategory]);

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
              onChange={handleChange}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Nonprofits">Nonprofits</MenuItem>
              <MenuItem value="Needs">Needs</MenuItem>
              <MenuItem value="Offers">Offers</MenuItem>
              <MenuItem value="Volunteer">Volunteer</MenuItem>
            </Select>
          </FormControl>

          <Paper className={classes.searchInput}>
            <TextField
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '0 none',
                },
              }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'ex. diapers' }}
              type="text"
              value={inputText}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onChange={(e) => handleInput(e)}
            />
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
          {/* {TODO:   Need to combine all lists under one "List" component to decrease complexity} */}
          {searchCategory === 'All' ? <div>All LIST</div> : <></>}
          {searchCategory === 'Needs' || searchCategory === 'Offers' ? (
            <AssetsList
              headerText={searchCategory === 'Needs' ? 'Needs' : 'Offers'}
              assets={searchCategory === 'Needs' ? offers : needs}
            />
          ) : (
            <></>
          )}
          {searchCategory === 'Nonprofits' ? (
            <OrgsList headerText={'Nonprofits'} assets={orgs} />
          ) : (
            <></>
          )}
          {searchCategory === 'Volunteer' ? (
            <VolunteerList headerText={'Volunteer'} assets={volunteer} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchResults;
