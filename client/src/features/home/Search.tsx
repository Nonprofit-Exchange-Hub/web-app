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
    '&:hover': {
      backgroundColor: 'inherit',
      borderRadius: '10px',
    },
  },
  divider: {
    height: 42,
    margin: 4,
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    background: 'white',
    borderRadius: '10px',
    marginTop: '20px',
    width: '80%',
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
          <MenuItem value="Goods">Goods</MenuItem>
          <MenuItem value="Services">Services</MenuItem>
        </Select>
      </FormControl>
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        className={classes.input}
        placeholder="ex. diapers"
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
