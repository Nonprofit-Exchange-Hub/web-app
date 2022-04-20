import * as React from 'react';
import { FormControl, FormLabel, TextField as MUITextField } from '@material-ui/core';

type CustomProps = {
  id: string;
  label: string;
  placeholder: string;
  isMultiline?: boolean;
  value: string;
  errorText?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

function TextField({
  label,
  id,
  placeholder,
  isMultiline = false,
  value,
  onChange,
  onBlur,
  errorText,
}: CustomProps) {
  return (
    <FormControl style={{ width: '100%' }}>
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
        onBlur={onBlur}
        helperText={errorText}
        error={errorText === '' || errorText === undefined ? undefined : true}
      />
    </FormControl>
  );
}

export default TextField;
