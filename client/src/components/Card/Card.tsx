import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardContent } from '@mui/material';
import theme from '../../theme';

type Props = {
  title: string;
  type: 'need' | 'donation';
  sx?: object;
  date: Date;
  org: string;
  children?: ReactNode | ReactNode[];
};

const mapAssetTypeToDisplayName = {
  need: 'Need',
  donation: 'Offer',
};

export default function Card(props: Props) {
  return (
    <MuiCard sx={props.sx || {}}>
      <CardActionArea>
        {props.children}
        <CardContent>
          <Typography
            variant="body2"
            color={theme.palette.text.secondary}
            sx={{ fontSize: '0.9em !important', fontWeight: '300', marginBottom: '0 !important' }}
          >
            {`Posted by`}
          </Typography>
          <Typography
            variant="body2"
            color={theme.palette.text.primary}
            sx={{ marginTop: '0 !important' }}
          >
            {`${props.org}`}
          </Typography>
        </CardContent>

        <Box
          sx={{
            padding: '0.5rem',
            background:
              props.type === 'need'
                ? `${theme.palette.primary.gradient}`
                : `${theme.palette.secondary.gradient}`,
          }}
        >
          <Typography variant="body2" color={theme.palette.secondary.contrastText}>
            {mapAssetTypeToDisplayName[props.type]}
          </Typography>
        </Box>
      </CardActionArea>
    </MuiCard>
  );
}
