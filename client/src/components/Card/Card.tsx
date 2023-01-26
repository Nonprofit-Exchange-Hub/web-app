import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import theme from '../../theme';

type Props = {
  title: string;
  type: 'need' | 'donation';
  date: Date;
  org: string;
  children?: ReactNode | ReactNode[];
};

export default function Card(props: Props) {
  return (
    <MuiCard sx={{ width: '20em' }}>
      <CardActionArea>
        {props.children}
        <Box
          sx={{
            padding: '0.5em 8% 5% 8%',
            background:
              props.type === 'need'
                ? `${theme.palette.primary.gradient}`
                : `${theme.palette.secondary.gradient}`,
          }}
        >
          <Typography variant="body2" color={theme.palette.primary.contrastText}>
            {`Posted on ${props.date}`}
          </Typography>
          <Typography variant="body2" color={theme.palette.primary.contrastText}>
            {`By ${props.org}`}
          </Typography>
        </Box>
      </CardActionArea>
    </MuiCard>
  );
}
