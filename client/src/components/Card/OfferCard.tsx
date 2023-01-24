import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from './Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Example from '../../assets/offer-example.png';
import { Tooltip } from '@mui/material';

type Props = {
  title: string;
  type: 'need' | 'donation';
  datePosted: Date;
  sx?: object;
  description: string;
  condition: string;
  category: string;
  poster: any;
  imgUrls?: Array<string>;
  children?: ReactNode | ReactNode[];
};
const ellipsesStyle = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
};

export default function OfferCard(props: Props) {
  const posterName = props.poster ? `${props.poster.firstName}` : 'Anonymous';

  return (
    <Card title={props.title} type={props.type} datePosted={props.datePosted} org={posterName}>
      <CardMedia
        component="img"
        image={props.imgUrls ? props.imgUrls[0] : Example}
        alt="Need example"
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography gutterBottom>{props.category ? props.category : null}</Typography>
          <Typography
            gutterBottom
            variant={'subtitle2'}
            sx={{ fontWeight: '600', fontSize: '0.9em' }}
          >
            {props.condition}
          </Typography>
        </Box>
        <Tooltip title={props.title}>
          <Typography variant="h1" sx={ellipsesStyle}>
            {props.title}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
