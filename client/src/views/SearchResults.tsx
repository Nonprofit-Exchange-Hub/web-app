import * as React from 'react';
import * as queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import type { Theme } from '@mui/material/styles';

import AssetsList from './AssetsList';
import OrgsList from './OrgsList';
import FilterGroup from '../components/FilterGroup';
import SearchCategoryCard from '../components/SearchCategoryCard';
import { filters1, filters2, filters3 } from '../assets/temp';
import { APP_API_BASE_URL } from '../configs';

import type { Asset, Organization } from '../types';
// import { createBinary } from 'typescript';

const useStyles = makeStyles((theme: Theme) => ({
  searchResultsContainer: {
    display: 'grid',
    padding: '20px 10%',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `' searchBar '
                      'searchBody '`,
    gap: '4em 0',
    backgroundColor: '#f7fbfd',
  },
  searchBar: {
    gridArea: 'searchBar',
    // backgroundColor: 'white',
    boxShadow: 'none',
    margin: '20px 100px',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '70px',
  },
  searchBody: {
    gridArea: 'searchBody',
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `'leftPanel rightPanel'`,
    gap: '1em',
  },
  leftPanel: {
    gridArea: 'leftPanel',
    minWidth: '200px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
  },
  groupHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginLeft: '15%',
  },
  createBar: {},
  rightHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',
  },
  rightPanel: {
    gridArea: 'rightPanel',
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
          querySearchCategory === 'Needs' ? 'donation' : 'request'
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
    <div className={classes.searchResultsContainer}>
      <div className={classes.searchBar}>
        <Box
          sx={{
            display: 'flex',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.2)',
            height: '50px',
            alignItems: 'center',
          }}
        >
          <FormControl
            // variant="standard"
            sx={{
              minWidth: '200px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchCategory}
              label="Age"
              sx={{
                '& #demo-simple-select': {
                  fontSize: '20px',
                  paddingLeft: '20%',
                  backgroundColor: 'white',
                },
              }}
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
                    fontSize: '18px',
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
                inputProps={{ 'aria-label': 'ex. diapers', style: { fontSize: '18px' } }}
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
      </div>
      <div className={classes.searchBody}>
        <div className={classes.leftPanel}>
          <SearchCategoryCard />
          <Typography
            variant="inherit"
            component="h5"
            color="textPrimary"
            className={classes.groupHeader}
          >
            Location
          </Typography>
          <span style={{ fontSize: '15px' }}>
            <a href="#">Join now</a> to view posts from your local community.
          </span>
          <div
            style={{ paddingTop: '40px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <FilterGroup
              header="Delivery Method"
              onHandleCheck={handleCheck}
              filters={filters1}
              selectedFilters={selectedFilters}
            />
            <FilterGroup
              header="Condition"
              onHandleCheck={handleCheck}
              filters={filters2}
              selectedFilters={selectedFilters}
            />
            <FilterGroup
              header="Categories"
              onHandleCheck={handleCheck}
              filters={filters3}
              selectedFilters={selectedFilters}
            />
          </div>
        </div>
        <div className={classes.rightPanel}>
          <div className={classes.rightHeader}>
            <Paper elevation={0} className={classes.createBar}>
              {/* TODO: where is this meant to link to? */}
              {/* <NavLink className={classes.makeAPost} to="/create">
                <Button color="primary" variant="contained">
                  Make a Post
                </Button>
              </NavLink> */}
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
                headerText={querySearchCategory === 'Needs' ? 'All Recent Needed Items' : 'Offers'}
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
          </div>
          {querySearchCategory === 'Volunteer' ? `<VolunteerList Componet TBD />` : <></>}
          {needs.length + offers.length + orgs.length + volunteer.length === 0 && 'No Results'}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
