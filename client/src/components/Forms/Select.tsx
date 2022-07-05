import * as React from 'react';
import {
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Select as MUISelect,
} from '@mui/material';

import type { Option } from '../../types';

type CustomProps = {
  id: string;
  label: string;
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (event: any) => void;
};

function Select({ id, label, placeholder, options, value, onChange }: CustomProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MUISelect
        name={id}
        variant="outlined"
        autoWidth={true}
        input={<OutlinedInput />}
        inputProps={{ 'aria-label': 'Without label' }}
        displayEmpty
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        }}
        value={value}
        renderValue={(value: any) => {
          if (value.length === 0) {
            return <em>{placeholder}</em>;
          }
          return value;
        }}
        onChange={onChange}
      >
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map((option, index) => {
          return (
            <MenuItem key={option.text} value={option.text}>
              {option.text}
            </MenuItem>
          );
        })}
      </MUISelect>
    </FormControl>
  );
}

export default Select;
