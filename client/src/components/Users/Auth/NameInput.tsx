import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import type { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    input: {
      height: 44,
      border: '1px solid #C4C4C4',
      borderRadius: 10,
      boxSizing: 'border-box',
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      fontSize: 14,
      marginBottom: 20,
    },
    label: {
      color: '#000000',
      fontWeight: 'bold',
      textAlign: 'left',
    },
    sublabel: {
      color: '#6E6E6E',
      fontSize: 14,
      fontWeight: 300,
      marginLeft: 5,
    },
    error: {
      border: '2px solid red',
      marginBottom: 0,
    },
  };
});

type TNameInputProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  error?: string | null;
  showStartAdornment?: boolean;
  showForgot?: boolean;
  placeholder?: string;
  label?: string | null;
  id?: string | null;
  name?: string | null;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | null;
  sublabel?: string | null;
};

export default function NameInput({
  value,
  error,
  onBlur,
  onChange,
  id = null,
  name = null,
  placeholder,
  label = null,
  sublabel = null,
}: TNameInputProps) {
  const { classes } = useStyles();

  const getAdditionalProps = () => {
    let additionalProps: { [key: string]: any } = {};

    if (onBlur) {
      additionalProps['onBlur'] = onBlur;
    }

    return additionalProps;
  };

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <label className={classes.label} htmlFor={id || 'name'}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {label || 'Name'}
            {sublabel && <span className={classes.sublabel}>{sublabel}</span>}
          </div>
        </div>
      </label>
      <Input
        className={`${classes.input} ${Boolean(error) && classes.error}`}
        id={id || 'name'}
        placeholder={placeholder || 'Jane'}
        name={name || 'name'}
        value={value}
        onChange={onChange}
        disableUnderline
        error={Boolean(error)}
        required
        {...getAdditionalProps()}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}
