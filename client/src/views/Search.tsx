import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import type { Theme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import { NavLink } from 'react-router-dom';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';
const useStyles = makeStyles((theme: Theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: '25px',
    '&:hover': {
      backgroundColor: 'inheret',
      borderRadius: '10px',
    },
  },
  divider: {
    height: 42,
    margin: 4,
  },
  searchBar: {
    display: 'flex',
    position: 'static',
    // flexDirection: 'row',
    background: 'white',
    borderRadius: '10px',
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 90,
  },
  select: {
    '&:before': {
      borderBottom: 'none',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
  },
}));
function Search() {
  const classes = useStyles();
  const [selectedSearchCategory, setSelectedSearchCategory] = React.useState<string>('');
  const [searchText, setSearchText] = React.useState<string>('');

  const selectSearchCategory = (event: SelectChangeEvent<string>) => {
    setSelectedSearchCategory(event.target.value as string);
  };
  return (
    <div className={classes.searchBar}>
      <FormControl className={classes.formControl}>
        <Select
          displayEmpty
          value={selectedSearchCategory}
          onChange={selectSearchCategory}
          renderValue={(value: any) => value || 'Search for'}
          className={classes.select}
        >
          <MenuItem value="All">Search All</MenuItem>
          <MenuItem value="Nonprofits">Search Nonprofits</MenuItem>
          <MenuItem value="Needs">Search Needs</MenuItem>
          <MenuItem value="Offers">Search Offers</MenuItem>
          <MenuItem value="Volunteer">Volunteer Openings</MenuItem>
        </Select>
      </FormControl>
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        className={classes.input}
        placeholder="Search nonprofit Needs"
        inputProps={{ 'aria-label': 'ex. diapers' }}
        type="text"
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
      />
      <NavLink to={`/assets?search=${searchText}`} className={classes.iconButton}>
        <SearchIcon />
      </NavLink>
    </div>
  );
}

export default Search;
