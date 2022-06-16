import * as React from 'react';
import { Radio, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { RadioGroup as MUIRadioGroup } from '@mui/material';

import type { Option } from '../../../types';

type CustomProps = {
  id: string;
  label: string;
  options: Option[];
  value: string;
  onChange: (event: any) => void;
};

function RadioGroup({ id, label, options, value, onChange }: CustomProps) {
  return (
    <FormControl component="fieldset">
      <FormLabel>{label}</FormLabel>
      <MUIRadioGroup id={id} name={id} value={value} onChange={onChange}>
        {options.map((option, index) => {
          return (
            <FormControlLabel
              key={option.text}
              value={option.value}
              control={<Radio />}
              label={option.text}
            />
          );
        })}
      </MUIRadioGroup>
    </FormControl>
  );
}

export default RadioGroup;
