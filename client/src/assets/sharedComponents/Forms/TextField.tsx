import * as React from 'react';
import { FormControl, FormLabel, TextField as MUITextField } from '@material-ui/core';

type CustomProps = {
  id: string;
  label: string;
  placeholder: string;
  isMultiline?: boolean;
  value: string;
  errorText?: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

function TextField({
  label,
  id,
  placeholder,
  isMultiline = false,
  value,
  onChange,
  errorText,
}: CustomProps) {
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
        helperText={errorText}
        error={errorText === '' || errorText === undefined ? undefined : true}
      />
    </FormControl>
  );
}

export default TextField;
