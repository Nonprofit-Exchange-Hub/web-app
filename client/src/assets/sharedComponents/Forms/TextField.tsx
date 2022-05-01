import * as React from 'react';
import { FormControl, FormLabel, TextField as MUITextField } from '@material-ui/core';

type CustomProps = {
  id: string;
  label: string;
  placeholder: string;
  isMultiline?: boolean;
  value: string;
  type?: string;
  errorText?: string;
  disabled?: boolean;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
};

function TextField({
  label,
  id,
  placeholder,
  isMultiline = false,
  value,
  type,
  disabled,
  onChange,
  onBlur,
  onKeyUp,
  errorText,
}: CustomProps) {
  return (
    <FormControl style={{ width: '100%' }}>
      <FormLabel>{label}</FormLabel>
      <MUITextField
        id={id}
        name={id}
        type={type ?? 'text'}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        multiline={isMultiline}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        helperText={errorText}
        error={errorText === '' || errorText === undefined ? undefined : true}
        disabled={disabled}
      />
    </FormControl>
  );
}

export default TextField;
