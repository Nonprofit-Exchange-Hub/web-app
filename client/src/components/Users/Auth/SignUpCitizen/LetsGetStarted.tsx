import { useContext, useState } from 'react';
import { useStyles } from './styles';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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
import { SignUpContext } from './Provider';
import { UserSignupData, emptyUserSignupData } from './UserSignupData';

type LetsGetStartedForm = Pick<
  UserSignupData,
  'firstName' | 'last_name' | 'email' | 'password' | 'accept_terms'
>;

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
  const { setStep, setSignupUser } = useContext(SignUpContext);
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<LetsGetStartedForm>({
    defaultValues: initialFormData,
    mode: 'onChange',
    resolver: yupResolver(letsGetStartedSchema),
  });

  const handleNext = (): void => {
    setStep('about-yourself');
  };

  const onSubmit: SubmitHandler<LetsGetStartedForm> = (data, errors) => {
    setSignupUser({ ...emptyUserSignupData, ...data });
    handleNext();
  };

  return (
    <>
      {/* <pre>touched {JSON.stringify(touchedFields)}</pre> */}
      {/* <pre>errors {JSON.stringify(errors)}</pre> */}
      {/* <pre>dirty fields {JSON.stringify(dirtyFields)}</pre> */}
      {/* <pre>form {JSON.stringify(watch())}</pre> */}

      <form onSubmit={handleSubmit(onSubmit)}>
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
                      error={Boolean(errors.firstName && touchedFields.firstName)}
                    />
                  )}
                />
              </FormControl>
              {errors.firstName && touchedFields.firstName && (
                <FormHelperText error>{errors.firstName.message}</FormHelperText>
              )}
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
                      error={Boolean(errors.last_name && touchedFields.last_name)}
                    />
                  )}
                />
              </FormControl>
              {errors.last_name && touchedFields.last_name && (
                <FormHelperText error>{errors.last_name.message}</FormHelperText>
              )}
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
                    error={Boolean(errors.email && touchedFields.email)}
                    startAdornment={
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    }
                  />
                )}
              />
            </FormControl>
            {errors.email && touchedFields.email && (
              <FormHelperText error>{errors.email.message}</FormHelperText>
            )}
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
                    error={Boolean(errors.password && touchedFields.password)}
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
            {errors.password && touchedFields.password && (
              <FormHelperText error>{errors.password.message}</FormHelperText>
            )}
          </Box>

          <Box sx={{ marginBottom: '20px' }}>
            <FormControl fullWidth error={Boolean(errors.accept_terms)}>
              <Controller
                name="accept_terms"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    style={{
                      textAlign: 'left',
                      display: 'flex',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                    control={
                      <Checkbox
                        {...field}
                        color="primary"
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
                )}
              />
            </FormControl>
            {errors.accept_terms && (
              <FormHelperText error>{errors.accept_terms.message}</FormHelperText>
            )}
          </Box>

          <Box marginTop={'60px'}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
              }}
            >
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                disabled={!isValid || !!errors.accept_terms}
              >
                Next
              </Button>

              <Box />
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
};
