import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import { APP_API_BASE_URL } from '../configs';

function EmailVerification() {
  const [fail, setFail] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const verifyEmail = async () => {
      const res = await fetch(`${APP_API_BASE_URL}/auth/verify-email`, {
        method: 'PATCH',
      });
      if (res.ok) {
        history.push('/login');
      } else {
        setFail(true);
      }
    };
    verifyEmail();
  }, []);
  return (
    <Box>
      {fail ? (
        <Typography>Email verification failed</Typography>
      ) : (
        <Typography>Verfifying email, please wait...</Typography>
      )}
    </Box>
  );
}

export default EmailVerification;
