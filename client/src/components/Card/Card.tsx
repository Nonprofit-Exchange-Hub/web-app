import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import MuiBox from '@mui/material/Box';
import { Avatar, CardActionArea } from '@mui/material';
import theme from '../../theme';

type Props = {
  title: string;
  type: 'need' | 'donation';
  sx?: object;
  datePosted: Date;
  avatarUrl?: string;
  org: string;
  children?: ReactNode | ReactNode[];
};

export default function Card(props: Props) {
  const boxType = {
    padding: '0.5em 8% 5% 8%',
    display: 'flex',
    background: (() => {
      switch (props.type) {
        case 'need':
          return `${theme.palette.primary.gradient}`;
        case 'donation':
          return `${theme.palette.secondary.gradient}`;
        default:
          return `${theme.palette.background.default}`;
      }
    })(),
    // add other styles as needed
  };
  return (
    <MuiCard sx={{ width: '20em' }}>
      <CardActionArea>
        {props.children}
        <Box style={{ padding: '.2em 4% 1% 4%', display: 'flex' }}>
          <Avatar
            sx={{
              display: 'inline-flex',
              padding: '0.5em',
              width: 22,
              height: 22,
              alignSelf: 'center',
              margin: '0 0.5em',
            }}
            src={props.avatarUrl || ''}
            alt={props.org}
          >
            {props.avatarUrl ? props.avatarUrl : props.org?.slice(0, 1)}
          </Avatar>
          <MuiBox
            style={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: '0.9em !important', fontWeight: '300', marginBottom: '0 !important' }}
            >
              {`Posted by `}
            </Typography>
            <Typography style={{ fontSize: '1.1em' }} sx={{ marginTop: '0 !important' }}>
              by {`${props.org}`}
            </Typography>
          </MuiBox>
        </Box>
        <Box sx={boxType} style={{ padding: '0.5em 8% 5% 8%', display: 'flex', height: '2em' }}>
          <Typography variant="h6" color={theme.palette.secondary.contrastText}>
            {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
          </Typography>
        </Box>
      </CardActionArea>
    </MuiCard>
  );
}
