import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//still need to implement functionality of the filters
export default function SortBy() {
  const [filter, setFilter] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: '200px' }}>
        <Select
          value={filter}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label', style: { fontSize: '18px' } }}
        >
          <MenuItem value="">Sort By...</MenuItem>
          <MenuItem value={'date'}>Sort By Posted Date</MenuItem>
          <MenuItem value={'relevance'}>Sort By Relevance</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
