import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import type { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

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
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  value: string,
  placeholder: string,
  showStartAdornment?: boolean,
  error: string | null,
}

function EmailInput({
  onChange,
  value,
  placeholder,
  showStartAdornment = false,
  error,
}: Props) {
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
