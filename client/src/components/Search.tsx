import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';
import TextField from '@mui/material/TextField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  searchBar: {
    fontFamily: 'DM Sans',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  select: {
    background: theme.palette.background.default,
    borderRadius: '5px',
    flexBasis: '30%',
    left: '6px',
    position: 'relative',
    zIndex: 10,
  },
  textField: {
    background: theme.palette.background.default,
    borderRadius: '5px',
    flexBasis: '70%',
    color: 'red',
  },
}));

function getTextFieldLabel(selectValue: string, searchText: string): string {
  if (searchText) {
    return '';
  }

  switch (selectValue) {
    case 'All':
      return 'Search all categories';
    case 'Nonprofits':
      return 'Search Nonprofits';
    case 'Needs':
      return 'Search nonprofit Needs';
    case 'Offers':
      return 'Search nonprofit Offers';
    case 'Volunteer':
      return 'Search Volunteer Openings';
    default:
      return 'Search all categories';
  }
}

function Search() {
  const classes = useStyles();
  const [selectedSearchCategory, setSelectedSearchCategory] = React.useState<string>('Needs');
  const [searchText, setSearchText] = React.useState<string>('');

  const navigate = useNavigate();

  const handleDropdownChange = (event: SelectChangeEvent<string>) => {
    setSelectedSearchCategory(event.target.value as string);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      navigate(`/assets?search=${searchText}`);
    }
  };

  const textFieldLabel = getTextFieldLabel(selectedSearchCategory, searchText);
  return (
    <div className={classes.searchBar}>
      <Select
        className={classes.select}
        IconComponent={KeyboardArrowDownIcon}
        onChange={handleDropdownChange}
        renderValue={(value: string) => (value ? `Search ${value}` : 'Search All')}
        value={selectedSearchCategory}
      >
        <MenuItem value="All">Search All</MenuItem>
        <MenuItem value="Nonprofits">Search Nonprofits</MenuItem>
        <MenuItem value="Needs">Search Needs</MenuItem>
        <MenuItem value="Offers">Search Offers</MenuItem>
        <MenuItem value="Volunteer">Volunteer Openings</MenuItem>
      </Select>
      <TextField
        className={classes.textField}
        InputLabelProps={{ shrink: false }}
        label={textFieldLabel}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
        onKeyDown={handleKeyDown}
        value={searchText}
        variant="outlined"
      />
    </div>
  );
}

export default Search;
