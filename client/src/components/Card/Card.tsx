import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import theme from '../../theme';

type Props = {
  title: string;
  type: 'need' | 'donation';
  sx?: object;
  date: Date;
  org: string;
  children?: ReactNode | ReactNode[];
};

export default function Card(props: Props) {
  return (
    <MuiCard sx={props.sx || {}}>
      <CardActionArea>
        {props.children}
        <Box
          sx={{
            padding: '0.5rem',
            background:
              props.type === 'need'
                ? `${theme.palette.primary.gradient}`
                : `${theme.palette.secondary.gradient}`,
          }}
        >
          <Typography
            variant="body2"
            color={theme.palette.secondary.contrastText}
            sx={{ fontSize: '0.9em !important', fontWeight: '300', marginBottom: '0 !important' }}
          >
            {`Posted on ${props.date ? props.date.toLocaleDateString() : ''}`}
          </Typography>
          <Typography
            variant="body2"
            color={theme.palette.secondary.contrastText}
            sx={{ marginTop: '0 !important' }}
          >
            by {`${props.org}`}
          </Typography>
        </Box>
      </CardActionArea>
    </MuiCard>
  );
}
