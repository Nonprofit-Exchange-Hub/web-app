import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';

import type { Theme } from '@material-ui/core/styles';

import StyledLink from '../../../assets/sharedComponents/StyledLink';

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
  error?: string | null;
  showStartAdornment?: boolean;
  showForgot?: boolean;
}

function PasswordInput({
  onChange,
  value,
  error,
  showStartAdornment = false,
  showForgot = false,
}: Props) {
  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <label className={classes.label} htmlFor="password">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          Password
          {/* to prop to be updated to use routes once page is set up */}
          {showForgot && <StyledLink to="/forgot-password">Forgot Password?</StyledLink>}
        </div>
      </label>
      {error && <FormHelperText error>{error}</FormHelperText>}
      <Input
        className={classes.input}
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        autoComplete={showForgot ? 'current-password' : 'new-password'}
        disableUnderline
        error={Boolean(error)}
        required
        startAdornment={
          showStartAdornment && (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          )
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default PasswordInput;
