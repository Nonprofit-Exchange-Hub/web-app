import { Button, Grid, Typography } from '@mui/material';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';

const LoginForm = ({ handleSubmit, formData, handleChange, error, classes, isLoading }: any) => {
  return (
    <Grid container item xs={12}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <EmailInput
          value={formData.email}
          placeholder="jane@nonprofit.com"
          onChange={handleChange}
          error={error?.type === 'email' ? error.message : null}
        />
        <PasswordInput
          value={formData.password}
          onChange={handleChange}
          showForgot={true}
          error={error?.type === 'password' ? error.message : null}
        />
        <Button
          className={classes.button}
          style={{ backgroundColor: '#C4C4C4', color: 'white' }}
          fullWidth
          type="submit"
        >
          Sign In
        </Button>
        {/* Placeholder for loading  - waiting on UI/UX response as to what they want. */}
        {isLoading && <Typography>Loading</Typography>}
      </form>
    </Grid>
  );
};

export default LoginForm;
