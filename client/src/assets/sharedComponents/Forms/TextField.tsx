import * as React from 'react';
import { FormControl, FormLabel, TextField as MUITextField } from '@mui/material';

type CustomProps = {
  id: string;
  label: string;
  placeholder: string;
  isMultiline?: boolean;
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

function TextField({ label, id, placeholder, isMultiline = false, value, onChange }: CustomProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MUITextField
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        multiline={isMultiline}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
}

export default TextField;
