import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useHistory } from 'react-router-dom';

import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  searchBar: {
    fontFamily: 'DM Sans',
    display: 'flex',
    width: '100%',
    borderRadius: '10px',
    boxShadow: '0px 2px 4px 2px rgba(0, 0, 0, 0.25)',
  },
  select: {
    background: theme.palette.background.default,
    borderRadius: '10px',
    flexBasis: '30%',
    position: 'relative',
    zIndex: 10,
    borderBottom: 'none',
    paddingInline: '20px',
    [`&:before`]: {
      border: 'none !important',
    },
    [`& svg`]: {
      right: '26px',
    },
  },
  textField: {
    background: theme.palette.background.default,
    borderRadius: '10px',
    flexBasis: '70%',
    color: 'red',
    // height: '48px',
    boxSizing: 'border-box',
    border: '1px solid red',
    [`& label`]: {
      marginTop: '-8px',
      marginLeft: '20px',
    },
    [`& div`]: {
      marginTop: '0px !important',
      [`&:before`]: {
        borderBottom: 'none !important',
      },
      [`& input`]: {
        height: '48px',
        paddingLeft: '20px',
      },
    },
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
      return 'Search Needs';
    case 'Offers':
      return 'Search Offers';
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

  const history = useHistory();

  const handleDropdownChange = (event: SelectChangeEvent<string>) => {
    setSelectedSearchCategory(event.target.value as string);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      history.push(`/SearchResults?search=${searchText}&category=${selectedSearchCategory}`);
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
        variant="standard"
      >
        <MenuItem value="All">Search All</MenuItem>
        <MenuItem value="Nonprofits">Search Nonprofits</MenuItem>
        <MenuItem value="Needs">Search Needs</MenuItem>
        <MenuItem value="Offers">Search Offers</MenuItem>
        <MenuItem value="Volunteer">Volunteer Openings</MenuItem>
      </Select>
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
        title="Press 'Enter' to Begin Search"
      >
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
      </Tooltip>
    </div>
  );
}

export default Search;
