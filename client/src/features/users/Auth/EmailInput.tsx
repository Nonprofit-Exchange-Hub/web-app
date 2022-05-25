import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InputAdornment from '@mui/material/InputAdornment';
import makeStyles from '@mui/styles/makeStyles';
import FormHelperText from '@mui/material/FormHelperText';

import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    input: {
      height: 62,
      border: '1px solid #C4C4C4',
      boxSizing: 'border-box',
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      fontSize: 18,
      marginBottom: 20,
    },
    label: {
      color: '#000000',
      textAlign: 'left',
    },
  };
});
interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
  showStartAdornment?: boolean;
  error: string | null;
}

function EmailInput({ onChange, value, placeholder, showStartAdornment = false, error }: Props) {
  const classes = useStyles();

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <label className={classes.label} htmlFor="email">
        Email Address
      </label>
      {error && <FormHelperText error>{error}</FormHelperText>}
      <Input
        className={classes.input}
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
      />
    </FormControl>
  );
}

export default EmailInput;
