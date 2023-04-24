import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import makeStyles from '@mui/styles/makeStyles';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';

import type { Theme } from '@mui/material/styles';

import StyledLink from '../../StyledLink';
import routes from '../../../routes/routes';

const useStyles = makeStyles((theme: Theme) => {
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
  };
});

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  error?: string | null;
  showStartAdornment?: boolean;
  showForgot?: boolean;
  label?: string | null;
  id?: string | null;
  name?: string | null;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | null;
}

function PasswordInput({
  onChange,
  onBlur,
  value,
  error,
  showStartAdornment = false,
  showForgot = false,
  label = null,
  id = null,
  name = null,
}: Props) {
  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let additionalProps = {};

  if (onBlur) {
    additionalProps = {
      onBlur,
    };
  }

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <label className={classes.label} htmlFor={id || 'password'}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {label || 'Password'}
          {/* to prop to be updated to use routes once page is set up */}
          {showForgot && <StyledLink to={routes.ForgotPassword.path}>Forgot Password?</StyledLink>}
        </div>
      </label>
      {error && <FormHelperText error>{error}</FormHelperText>}
      <Input
        className={classes.input}
        id={id || 'password'}
        name={name || 'password'}
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
              size="large"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        {...additionalProps}
      />
    </FormControl>
  );
}

export default PasswordInput;
