import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from 'tss-react/mui';
import FormHelperText from '@mui/material/FormHelperText';

import type { Theme } from '@mui/material/styles';

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
      marginTop: '20px',
    },
    error: {
      marginBottom: 0,
      border: '2px solid red',
    },
  };
});
interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
  showStartAdornment?: boolean;
  error: string | null;
  onBlur?: React.ChangeEventHandler<HTMLInputElement> | null;
}

function EmailInput({
  value,
  error,
  onChange,
  placeholder,
  onBlur = null,
  showStartAdornment = false,
}: Props) {
  const { classes } = useStyles();

  let additionalProps: { [key: string]: any } = {};

  if (onBlur) {
    additionalProps['onBlur'] = onBlur;
  }

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <label className={classes.label} htmlFor="email">
        Email
      </label>
      <Input
        className={`${classes.input} ${Boolean(error) && classes.error}`}
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        placeholder={placeholder}
        fullWidth
        value={value}
        onChange={onChange}
        disableUnderline
        required
        error={Boolean(error)}
        startAdornment={
          showStartAdornment && (
            <InputAdornment position="start">
              <MailOutlineIcon />
            </InputAdornment>
          )
        }
        {...additionalProps}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}

export default EmailInput;
