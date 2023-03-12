import * as React from 'react';
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';

import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  searchBar: {
    gridArea: 'searchBar',
    boxShadow: 'none',
    margin: '50px auto',
    width: '70%',
  },
  searchInput: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '70px',
  },
}));

function Search() {
  const classes = useStyles();
  const history = useHistory();

  const searchParams = new URLSearchParams(history.location.search);
  const querySearchText = searchParams.get('search');
  const querySearchCategory = searchParams.get('category');

  const [searchCategory, setSearchCategory] = React.useState<string>(
    (querySearchCategory as string) || 'Needs',
  );
  const [searchText, setSearchText] = React.useState<string>((querySearchText as string) || '');

  const handleSearch = () => {
    history.push(`/SearchResults?search=${searchText}&category=${searchCategory}`);
  };

  return (
    <div className={classes.searchBar}>
      <Box
        sx={{
          display: 'flex',
          border: '1px solid rgba(110, 110, 110, .22)',
          borderRadius: '10px',
          overflow: 'hidden',
          height: '50px',
          alignItems: 'center',
        }}
      >
        <FormControl
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
            inputProps={{ sx: { border: 'none' } }}
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
                  border: 'none',
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
          <SearchIcon fontSize="large" onClick={handleSearch} sx={{ paddingRight: '10px' }} />
        </Paper>
      </Box>
    </div>
  );
}

export default Search;
