import { UserSignupData } from './UserSignupData';
import { useStyles } from './styles';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { aboutYourselfSchema } from './validation-rules';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { US_STATE_NAMES } from '../../../../configs';
import { useContext } from 'react';
import { SignUpContext } from './Provider';

type AboutYourselfForm = Pick<UserSignupData, 'state' | 'city' | 'zip_code'>;

const initialFormData: AboutYourselfForm = {
  state: '',
  city: '',
  zip_code: '',
};

export const AboutYourself = () => {
  const { classes } = useStyles();
  const { setStep, signUpUser, setSignupUser } = useContext(SignUpContext);
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<AboutYourselfForm>({
    defaultValues: initialFormData,
    mode: 'onChange',
    resolver: yupResolver(aboutYourselfSchema),
  });

  const makeStateSelectOptions = () => {
    return US_STATE_NAMES.map((state) => {
      return (
        <MenuItem key={state} value={state}>
          {state}
        </MenuItem>
      );
    });
  };

  function handleBack(): void {
    throw new Error('Function not implemented.');
  }

  const handleNext = (): void => {
    setStep('interests');
  };

  const onSubmit: SubmitHandler<AboutYourselfForm> = (data, errors) => {
    setSignupUser({ ...signUpUser, ...data });
    handleNext();
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(watch())}</pre> */}
      {/* <pre>{JSON.stringify(errors)}</pre> */}
      {/* <pre>{JSON.stringify(touchedFields)}</pre> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          className={classes.header}
          variant="h4"
          fontSize="58px"
          component="h1"
          align="left"
          sx={{ color: '#674E67' }}
        >
          Tell us about yourself
        </Typography>
        <Typography className={classes.label} sx={{ fontWeight: 'bold' }}>
          Personal Information
        </Typography>
        <Typography>You can always update this information later as needed.</Typography>

        <Box sx={{ marginTop: '40px' }}>
          <Typography className={classes.label}>Where are you located?</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
          <Box
            sx={{ marginY: '20px' }}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'center'}
          >
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <Box sx={{ width: '50%' }} marginRight={'20px'}>
                <FormControl fullWidth error={Boolean(errors.state)}>
                  <label className={classes.label} htmlFor="state">
                    State
                  </label>
                  <Controller
                    name="state"
                    control={control}
                    defaultValue={''}
                    render={({ field: { onChange, value }, field }) => (
                      <Select
                        {...field}
                        className={classes.input}
                        displayEmpty
                        fullWidth
                        value={value}
                        onChange={
                          onChange as (
                            event: SelectChangeEvent<string>,
                            child: React.ReactNode,
                          ) => void
                        }
                        sx={{ marginTop: '16px', border: '1px solid' }}
                        MenuProps={{
                          anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
                          sx: {
                            borderRadius: '10px',
                            padding: '20px',
                            height: '240px',
                          },
                        }}
                      >
                        {makeStateSelectOptions()}
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.state && touchedFields.state && (
                  <FormHelperText error>{errors.state.message}</FormHelperText>
                )}
              </Box>
              <Box sx={{ width: '50%' }}>
                <FormControl fullWidth error={Boolean(errors.city)}>
                  <label className={classes.label} htmlFor="city">
                    City
                  </label>
                  <Controller
                    name="city"
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="city"
                        className={classes.input}
                        fullWidth
                        disableUnderline
                        error={Boolean(errors.city && touchedFields.city)}
                      />
                    )}
                  />
                </FormControl>
                {errors.city && touchedFields.city && (
                  <FormHelperText error>{errors.city.message}</FormHelperText>
                )}
              </Box>
            </Box>
          </Box>
          <Box marginTop={'20px'}>
            <FormControl>
              <label className={classes.label} htmlFor="zip_code">
                Zip
              </label>
              <Controller
                name="zip_code"
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="zip"
                    className={classes.input}
                    fullWidth
                    disableUnderline
                    error={Boolean(errors.zip_code && touchedFields.zip_code)}
                  />
                )}
              />
            </FormControl>
            {errors.zip_code && touchedFields.zip_code && (
              <FormHelperText error>{errors.zip_code.message}</FormHelperText>
            )}
          </Box>

          <Box marginTop={'60px'}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Button
                color="primary"
                variant="outlined"
                onClick={handleBack}
                sx={{ display: 'inherit', mr: 1 }}
              >
                Back
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'right',
                }}
              >
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleNext}
                  sx={{ marginRight: '20px' }}
                >
                  Skip
                </Button>

                <Button color="primary" variant="outlined" type="submit" disabled={!isValid}>
                  Next
                </Button>

                <Box />
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
};
