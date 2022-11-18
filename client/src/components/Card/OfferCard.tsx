import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from './Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Example from '../../assets/offer-example.png';

type Props = {
  title: string;
  type: 'need' | 'donation';
  datePosted: Date;
  sx: object;
  description: string;
  condition: string;
  category: string;
  poster: any;
  imgUrls?: Array<string>;
  children?: ReactNode | ReactNode[];
};

export default function OfferCard(props: Props) {
  const posterName = props.poster ? `${props.poster.firstName}` : 'Anonymous';
  return (
    <Card title={props.title} type={props.type} date={props.datePosted} org={posterName}>
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
        <Typography variant="h1">{props.title}</Typography>
      </CardContent>
    </Card>
  );
}
