import { useState } from 'react';
import { useStyles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { letsGetStartedSchema } from './validation-rules';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from '@mui/material';
import StyledLink from '../../../StyledLink';
import routes from '../../../../routes/routes';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LetsGetStartedForm {
  firstName: string;
  last_name: string;
  email: string;
  password: string;
  accept_terms: boolean;
}

const initialFormData: LetsGetStartedForm = {
  firstName: '',
  last_name: '',
  email: '',
  password: '',
  accept_terms: false,
};

export const LetsGetStarted = () => {
  const { classes } = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [formData] = useState(initialFormData);
  const {
    control,
    formState: { errors },
  } = useForm<LetsGetStartedForm>({
    defaultValues: initialFormData,
    mode: 'onChange',
    resolver: yupResolver(letsGetStartedSchema),
  });

  return (
    <>
      {/* <pre>control {JSON.stringify(control)}</pre> */}
      {/* <pre>errors {JSON.stringify(errors)}</pre> */}
      {/* <pre>dirty fields {JSON.stringify(dirtyFields)}</pre> */}
      <Box display={'flex'} flexDirection={'column'} justifyContent={'left'}>
        <Typography
          className={classes.header}
          variant="h4"
          fontSize="58px"
          lineHeight="87px"
          component="h1"
          align="left"
          sx={{ color: '#674E67' }}
          gutterBottom
        >
          Let's get started
        </Typography>
        <Box display={'flex'} flexDirection={'row'} width={'100%'} sx={{ marginBottom: '20px' }}>
          <Box marginRight={'20px'}>
            <FormControl>
              <label className={classes.label} htmlFor="firstName">
                First Name
              </label>
              <Controller
                name="firstName"
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Jane"
                    className={classes.input}
                    fullWidth
                    disableUnderline
                    error={Boolean(errors.firstName)}
                  />
                )}
              />
            </FormControl>
            {errors.firstName && <FormHelperText error>{errors.firstName.message}</FormHelperText>}
          </Box>
          <Box width={'100%'}>
            <FormControl>
              <label className={classes.label} htmlFor="last_name">
                Last Name
              </label>
              <Controller
                name="last_name"
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Individual"
                    className={classes.input}
                    fullWidth
                    disableUnderline
                    error={Boolean(errors.last_name)}
                  />
                )}
              />
            </FormControl>
            {errors.last_name && <FormHelperText error>{errors.last_name.message}</FormHelperText>}
          </Box>
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
          <FormControl fullWidth error={Boolean(errors.email)}>
            <label className={classes.label} htmlFor="email">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <Input
                  {...field}
                  className={classes.input}
                  type="email"
                  placeholder="jane@citizen.com"
                  fullWidth
                  disableUnderline
                  error={Boolean(errors.email)}
                  startAdornment={
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  }
                />
              )}
            />
          </FormControl>
          {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
          <FormControl fullWidth error={Boolean(errors.password)}>
            <label className={classes.label} htmlFor="password">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Password</div>
                {/* to prop to be updated to use routes once page is set up */}
                {/* {showForgot && (
                <StyledLink to={routes.ForgotPassword.path}>Forgot Password?</StyledLink>
              )} */}
              </div>
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className={classes.input}
                  placeholder={'oooooo'}
                  type={showPassword ? 'text' : 'password'}
                  disableUnderline
                  error={Boolean(errors.password)}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
          </FormControl>
          {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
        </Box>

        <FormControlLabel
          style={{
            textAlign: 'left',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
          }}
          control={
            <Checkbox
              color="primary"
              checked={formData.accept_terms}
              onChange={() => {}}
              name="accept_terms"
              inputProps={{ 'aria-label': 'accept_terms_checkbox' }}
              sx={{
                input: {
                  "[(type = 'checkbox')]": {
                    '::before': { outline: '1px solid black' },
                  },
                },
              }}
            />
          }
          label={
            <label>
              Accept the{' '}
              <StyledLink to={routes.TermsOfService.path} target="_blank">
                Terms and Agreements
              </StyledLink>
            </label>
          }
        />

        <Box marginTop={'60px'}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button color="primary" variant="outlined">
              Back
            </Button>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Button color="primary" variant="outlined">
                Next
              </Button>

              <Box />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
