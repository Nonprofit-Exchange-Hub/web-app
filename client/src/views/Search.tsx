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
// import NativeSelect from '@mui/material/NativeSelect';
import Avatar from '@mui/material/Avatar';
const useStyles = makeStyles((theme: Theme) => ({
  input: {
    marginLeft: theme.spacing(3),
    flex: 10,
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
  searchBar: {
    fontFamily: 'DM Sans',
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    background: 'white',
    borderRadius: '40px',
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 90,
    borderRadius: '40px',
    borderColor: 'pink',
    notched: 'false',
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
      <FormControl variant="standard" sx={{ borderRadius: '20px' }}>
        <Select
          displayEmpty
          value={selectedSearchCategory}
          onChange={selectSearchCategory}
          renderValue={(value: any) => value || 'Search All'}
          MenuProps={{
            anchorOrigin: {
              vertical: 52,
              horizontal: -28,
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            PaperProps: {
              sx: { borderRadius: '20px', boxShadow: '0px -2px 1em grey' },
            },
          }}
          sx={{
            fontSize: '20px',
            border: 0,
            padding: 1.5,
            paddingLeft: 3,
            paddingRight: 5,
          }}
          disableUnderline
        >
          <MenuItem value="All">Search All</MenuItem>
          <MenuItem value="Nonprofits">Search Nonprofits</MenuItem>
          <MenuItem value="Needs">Search Needs</MenuItem>
          <MenuItem value="Offers">Search Offers</MenuItem>
          <MenuItem value="Volunteer">Volunteer Openings</MenuItem>
        </Select>
      </FormControl>
      <Divider
        sx={{ height: 62, marginLeft: 1, borderRightWidth: 3, bgcolor: 'grey' }}
        orientation="vertical"
      />
      <InputBase
        className={classes.input}
        sx={{ notched: 'false' }}
        placeholder="Search nonprofit needs"
        inputProps={{ 'aria-label': 'ex. diapers' }}
        type="text"
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
        endAdornment={
          <NavLink to={`/assets?search=${searchText}`}>
            <Avatar sx={{ backgroundColor: 'rgba(68, 98, 54, 1)', marginRight: 2 }}>
              <SearchIcon />
            </Avatar>
          </NavLink>
        }
      />
    </div>
  );
}

export default Search;
